<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use App\Models\Voucher;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * 🔹 Simpan pesanan baru (checkout)
     */
    public function store(Request $request)
    {
        // ✅ Validasi SUDAH DITAMBAH
        $request->validate([
            'address_id' => 'required|exists:customer_addresses,id',
            'payment_method_id' => 'required|exists:customer_payment_methods,id',
            'orders.*.items.*.cart_item_id' => 'required|integer|exists:cart_items,id', // 👈 WAJIB ADA
            'orders' => 'required|array',
            'orders.*.items' => 'required|array',
        ]);

        $customer = $request->user();
        $cartItemIdsToDelete = [];
        DB::beginTransaction();
        try {
            foreach ($request->orders as $orderData) {
                $orderCode = 'ORD-' . strtoupper(Str::random(6));

                $order = Order::create([
                    'order_code'        => $orderCode,
                    'customer_id'       => $customer->id,
                    'seller_id'         => $orderData['seller_id'],
                    'address_id'        => $request->address_id,
                    'voucher_id'        => $request->voucher_id ?? null,
                    'payment_method_id' => $request->payment_method_id, // 👈 SUDAH DITAMBAH
                    
                    // Ini masih ambil dari frontend (Nanti bisa di-improve)
                    'subtotal'          => $orderData['subtotal'],
                    'shipping_cost'     => $orderData['shipping_cost'],
                    'discount'          => $orderData['discount'] ?? 0,
                    'grand_total'       => $orderData['grand_total'],

                    'courier_name'      => $orderData['courier_name'],
                    'courier_service'   => $orderData['courier_service'],
                    'shipping_estimate' => $orderData['shipping_estimate'],
                    'status'            => 'pending', // Status awal
                ]);

                foreach ($orderData['items'] as $item) {
                    OrderItem::create([
                        'order_id'   => $order->id,
                        'product_id' => $item['product_id'],
                        'quantity'   => $item['quantity'],
                        'price'      => $item['price'],
                        'subtotal'      => $item['quantity'] * $item['price'],
                        'note'       => $item['note'] ?? null,
                        'product_name' => $item['product_name'], // 👈 SUDAH DITAMBAH
                    ]);
                     $cartItemIdsToDelete[] = $item['cart_item_id'];
                }

                // Update voucher
                if ($request->voucher_id) {
                    $voucher = Voucher::find($request->voucher_id);
                    if ($voucher) {
                        $customer->vouchers()->updateExistingPivot($voucher->id, [
                            'is_used' => true,
                            'redeemed_at' => now(),
                        ]);
                    }
                }
            }
            
            // 5. 🌟 HAPUS CART ITEMS SETELAH SEMUA BERHASIL 🌟
            if (!empty($cartItemIdsToDelete)) {
                CartItem::where('customer_id', $customer->id) // Keamanan (hanya hapus punya user ini)
                        ->whereIn('id', $cartItemIdsToDelete)
                        ->delete();
            }
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Order created successfully!',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create order',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // ... (Sisa file kamu biarkan saja, sudah benar) ...
    // ... (index, show, addReview) ...

    /**
     * 🔹 GET /api/orders - semua pesanan user
     */
    public function index(Request $request)
    {
        $customer = $request->user();

        $orders = Order::with(['items.product', 'seller'])
            ->where('customer_id', $customer->id)
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'success' => true,
            'orders' => $orders,
        ]);
    }

    /**
     * 🔹 GET /api/orders/{id} - detail pesanan
     */
    public function show($id)
    {
        $order = Order::with(['items.product', 'seller'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'order' => $order,
        ]);
    }

    /**
     * 🔹 POST /api/orders/{id}/review - tambah ulasan
     */
    public function addReview(Request $request, $id)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:10',
        ]);

        $order = Order::findOrFail($id);

        if (!empty($order->review)) {
            return response()->json([
                'success' => false,
                'message' => 'Review sudah pernah dikirim untuk pesanan ini.',
            ], 400);
        }

        $order->review = [
            'rating' => $request->rating,
            'comment' => $request->comment,
            'submitted_at' => now(),
        ];
        $order->save();

        return response()->json([
            'success' => true,
            'message' => 'Review berhasil disimpan!',
            'review' => $order->review,
        ]);
    }
}