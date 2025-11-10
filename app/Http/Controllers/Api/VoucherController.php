<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Voucher;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    /**
     * 🔹 GET /api/vouchers
     * Menampilkan semua voucher milik user, dan auto-attach voucher publik.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Voucher publik yang aktif dan bukan code_only
        $publicVouchers = Voucher::where('is_active', true)
            ->where('is_public', true)
            ->where('type', '!=', 'code_only')
            ->get();

        // Auto-attach untuk customer yang belum punya voucher publik
        foreach ($publicVouchers as $voucher) {
            if (!$user->vouchers()->where('voucher_id', $voucher->id)->exists()) {
                $user->vouchers()->attach($voucher->id, [
                    'redeemed_at' => now(),
                    'is_used' => false,
                ]);
            }
        }

        // Ambil semua voucher milik user (termasuk hasil redeem)
        $vouchers = $user->vouchers()
            ->where('is_active', true)
            ->get();

        return response()->json([
            'success' => true,
            'vouchers' => $vouchers,
        ]);
    }

    /**
     * 🔹 POST /api/vouchers/redeem
     * Redeem manual untuk voucher dengan type = code_only.
     */
    public function redeem(Request $request)
{
    $request->validate(['code' => 'required|string']);

    $voucher = Voucher::where('code', strtoupper($request->code))
        ->where('is_active', true)
        ->first();

    if (!$voucher) {
        return response()->json([
            'success' => false,
            'message' => 'Invalid or expired voucher code.',
        ], 404);
    }

    // Hanya voucher type code_only yang bisa diredeem manual
    if ($voucher->type !== 'code_only') {
        return response()->json([
            'success' => false,
            'message' => 'This voucher cannot be redeemed manually.',
        ], 400);
    }

    $user = $request->user();

    // ✅ Cek apakah user sudah pernah redeem voucher ini
    if ($user->vouchers()->where('voucher_id', $voucher->id)->exists()) {
        return response()->json([
            'success' => false,
            'message' => 'You have already redeemed this voucher.',
        ], 400);
    }

    // ✅ Tambahkan voucher ke akun user (pertama kali saja)
    $user->vouchers()->attach($voucher->id, [
        'redeemed_at' => now(),
        'is_used' => false,
    ]);

    // Ambil voucher lengkap untuk dikembalikan
    $voucher = $user->vouchers()
        ->where('vouchers.id', $voucher->id)
        ->first()
        ->toArray();

    return response()->json([
        'success' => true,
        'message' => 'Voucher redeemed successfully!',
        'voucher' => $voucher,
    ]);
}
/**
 * 🔹 POST /api/vouchers/use/{id}
 * Tandai voucher milik user sebagai "used" saat checkout.
 */
public function useVoucher(Request $request, $id)
{
    $user = $request->user();

    // Cek apakah voucher dimiliki oleh user
    $voucher = $user->vouchers()->where('vouchers.id', $id)->first();

    if (!$voucher) {
        return response()->json([
            'success' => false,
            'message' => 'Voucher not found or not owned by this user.',
        ], 404);
    }

    // Cek apakah sudah digunakan
    if ($voucher->pivot->is_used) {
        return response()->json([
            'success' => false,
            'message' => 'Voucher already used.',
        ], 400);
    }

    // Tandai sebagai digunakan
    $user->vouchers()->updateExistingPivot($id, [
        'is_used' => true,
        'updated_at' => now(),
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Voucher marked as used successfully!',
        'voucher_id' => $id,
    ]);
}


}
