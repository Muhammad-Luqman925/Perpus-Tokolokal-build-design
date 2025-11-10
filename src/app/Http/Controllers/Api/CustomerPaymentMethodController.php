<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CustomerPaymentMethod;
use App\Models\PaymentChannel;
use Illuminate\Http\Request;

class CustomerPaymentMethodController extends Controller
{
    /**
     * 🔹 Ambil semua metode pembayaran milik customer yang login
     */
    public function index(Request $request)
    {
        $customer = $request->user();

        $methods = CustomerPaymentMethod::with('channel')
            ->where('customer_id', $customer->id)
            ->orderByDesc('is_primary')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Payment methods fetched successfully.',
            'payment_methods' => $methods,
        ]);
    }

    /**
     * 🔹 Ambil daftar channel aktif (untuk pilihan ketika menambah metode baru)
     */
    public function channels()
    {
        $channels = PaymentChannel::where('is_active', true)
            ->orderBy('type')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Payment channels fetched successfully.',
            'channels' => $channels,
        ]);
    }

    /**
     * 🔹 Tambah metode pembayaran baru
     */
    public function store(Request $request)
    {
        $customer = $request->user();

        $validated = $request->validate([
            'payment_channel_id' => 'required|exists:payment_channels,id',
            'account_number' => 'required|string|max:50',
            'account_name' => 'required|string|max:100',
            'is_primary' => 'boolean',
        ]);

        $validated['customer_id'] = $customer->id;

        // Jika user centang "is_primary", matikan yang lain
        if (!empty($validated['is_primary']) && $validated['is_primary']) {
            CustomerPaymentMethod::where('customer_id', $customer->id)
                ->update(['is_primary' => false]);
        }

        $method = CustomerPaymentMethod::create($validated)->load('channel');

        return response()->json([
            'success' => true,
            'message' => 'Payment method added successfully.',
            'payment_method' => $method,
        ], 201);
    }

    /**
     * 🔹 Update metode pembayaran
     */
    public function update(Request $request, $id)
    {
        $customer = $request->user();

        $method = CustomerPaymentMethod::where('customer_id', $customer->id)
            ->findOrFail($id);

        $validated = $request->validate([
            'account_number' => 'required|string|max:50',
            'account_name' => 'required|string|max:100',
            'is_primary' => 'boolean',
        ]);

        // Jika diubah jadi primary, nonaktifkan yang lain
        if (!empty($validated['is_primary']) && $validated['is_primary']) {
            CustomerPaymentMethod::where('customer_id', $customer->id)
                ->update(['is_primary' => false]);
        }

        $method->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Payment method updated successfully.',
            'payment_method' => $method->load('channel'),
        ]);
    }

    /**
     * 🔹 Hapus metode pembayaran
     */
    public function destroy(Request $request, $id)
    {
        $customer = $request->user();

        $method = CustomerPaymentMethod::where('customer_id', $customer->id)
            ->findOrFail($id);

        $method->delete();

        return response()->json([
            'success' => true,
            'message' => 'Payment method deleted successfully.',
        ]);
    }
}
