<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CustomerAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomerAddressController extends Controller
{
    /**
     * 🔹 Ambil semua alamat milik customer yang login
     */
    public function index(Request $request)
    {
        $customer = $request->user();

        $addresses = $customer->addresses()
            ->orderByDesc('is_primary')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'message' => 'Addresses fetched successfully.',
            'addresses' => $addresses,
        ]);
    }

    /**
     * 🔹 Tambah alamat baru
     */
    public function store(Request $request)
    {
        $customer = $request->user();

        $validated = $request->validate([
            'label' => 'nullable|string|max:100',
            'recipient_name' => 'required|string|max:150',
            'phone' => 'required|string|max:20',
            'address_line' => 'required|string',
            'city' => 'required|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
            'is_primary' => 'boolean',
        ]);

        // jika alamat ini ditandai utama, set semua lainnya ke false
        if (!empty($validated['is_primary']) && $validated['is_primary']) {
            $customer->addresses()->update(['is_primary' => false]);
        }

        $address = $customer->addresses()->create($validated);

        return response()->json([
            'message' => 'Address created successfully.',
            'address' => $address,
        ], 201);
    }

    /**
     * 🔹 Update alamat
     */
    public function update(Request $request, $id)
    {
        $customer = $request->user();
        $address = $customer->addresses()->findOrFail($id);

        $validated = $request->validate([
            'label' => 'nullable|string|max:100',
            'recipient_name' => 'required|string|max:150',
            'phone' => 'required|string|max:20',
            'address_line' => 'required|string',
            'city' => 'required|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
            'is_primary' => 'boolean',
        ]);

        // kalau diubah jadi utama
        if (!empty($validated['is_primary']) && $validated['is_primary']) {
            $customer->addresses()->update(['is_primary' => false]);
        }

        $address->update($validated);

        return response()->json([
            'message' => 'Address updated successfully.',
            'address' => $address,
        ]);
    }
    public function active()
{
    $address = CustomerAddress::where('customer_id',Auth::id())
        ->where('is_primary', true)
        ->first();

    if (!$address) {
        return response()->json([
            'success' => false,
            'message' => 'No primary address found for this customer.',
        ], 404);
    }

    return response()->json([
        'success' => true,
        'address' => $address,
    ]);
}
    /**
     * 🔹 Hapus alamat
     */
    public function destroy(Request $request, $id)
    {
        $customer = $request->user();
        $address = $customer->addresses()->findOrFail($id);

        $address->delete();

        return response()->json([
            'message' => 'Address deleted successfully.',
        ]);
    }

    /**
     * 🔹 Set alamat utama
     */
    public function setPrimary(Request $request, $id)
    {
        $customer = $request->user();
        $address = $customer->addresses()->findOrFail($id);

        // reset semua ke false, lalu set satu ini jadi true
        $customer->addresses()->update(['is_primary' => false]);
        $address->update(['is_primary' => true]);

        return response()->json([
            'message' => 'Primary address updated successfully.',
        ]);
    }
    
}
