<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Services\ShippingService;

class CheckoutController extends Controller
{
    // ------------------------------------
    // PREVIEW CHECKOUT
    // ------------------------------------
    public function preview(Request $request)
    {
        $customer = $request->user();
        if (!$customer) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $cartItems = CartItem::with('product.user')
            ->where('customer_id', $customer->id)
            // ->where('is_selected', true) // <-- Opsional: Nanti kalau mau checkout sebagian
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Keranjang kosong'], 400);
        }

        // Group berdasarkan toko (user_id)
        $grouped = $cartItems->groupBy(fn ($item) => $item->product->user_id);
        $shippingOptions = ShippingService::getAll();
        $orders = [];
        $grandTotal = 0;

        foreach ($grouped as $sellerId => $items) {
            $store = optional($items->first()->product->user);
            $storeName = $store->store_name ?? 'Toko Tidak Dikenal';

            // Subtotal barang
            $subtotal = $items->sum(fn ($i) => $i->product->price * $i->quantity);

            // Default ekspedisi
            $defaultShipping = $shippingOptions[0];
            $total = $subtotal + $defaultShipping['price'];
            $grandTotal += $total;

            $orders[] = [
                'seller_id' => $sellerId,
                'store_name' => $storeName,
                'subtotal' => $subtotal,
                'selected_shipping' => $defaultShipping, // <— ekspedisi aktif
                'shipping_options' => $shippingOptions, // <— list pilihan
                'total' => $total,

                // 🌟🌟🌟 INI DIA PERBAIKANNYA 🌟🌟🌟
                'items' => $items->map(fn ($i) => [
                    
                    'product_id' => $i->product_id,    // 👈 KITA TAMBAHKAN INI
                    
                    'product_name' => $i->product->name, // 👈 Kita ganti nama 'product'
                    'variant' => $i->variant,
                    'quantity' => $i->quantity,
                    'price' => $i->product->price,
                    'image' => $i->product->image ?? null,
                    'note' => $i->note ?? null,
                    'cart_item_id' => $i->id,     // 👈 Kita tambahkan note juga
                ]),
            ];
        }

        return response()->json([
            'message' => 'Checkout preview berhasil',
            'orders' => $orders,
            'grand_total' => $grandTotal,
        ]);
    }

    // ------------------------------------
    // UPDATE SHIPPING TIAP TOKO
    // ------------------------------------
    public function updateShipping(Request $request)
    {
        $data = $request->validate([
            'seller_id' => 'required|integer',
            'shipping_name' => 'required|string',
        ]);

        $shipping = collect(\App\Services\ShippingService::getAll())
            ->firstWhere('name', $data['shipping_name']);

        if (!$shipping) {
            return response()->json(['message' => 'Ekspedisi tidak valid'], 422);
        }

        return response()->json([
            'message' => 'Ekspedisi diperbarui',
            'seller_id' => $data['seller_id'],
            'selected_shipping' => $shipping,
        ]);
    }
}