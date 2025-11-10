<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Customer;

class CustomerProfileController extends Controller
{
    /**
     * 🔹 Menampilkan profil user yang sedang login
     */
    public function show(Request $request)
    {
        $customer = $request->user();

        // Pastikan avatar dikirim sebagai URL penuh
        if ($customer->avatar && Storage::disk('public')->exists($customer->avatar)) {
            $customer->avatar = asset('storage/' . $customer->avatar);
        } else {
            $customer->avatar = null;
        }

        // Auto-generate username dari name
        $customer->username = str_replace(' ', '_', strtolower($customer->name));

        return response()->json([
            'message' => 'Profile fetched successfully.',
            'customer' => $customer,
        ]);
    }

    /**
     * 🔹 Update profil (nama, email, gender, no hp, tanggal lahir)
     */
    public function update(Request $request)
    {
        $customer = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:customers,email,' . $customer->id,
            'phone_number' => 'nullable|string|max:20',
            'gender' => 'nullable|in:Male,Female',
            'date_of_birth' => 'nullable|date',
        ]);

        $customer->update($validated);

        // pastikan avatar tetap bisa diakses setelah update
        if ($customer->avatar && Storage::disk('public')->exists($customer->avatar)) {
            $customer->avatar = asset('storage/' . $customer->avatar);
        }

        return response()->json([
            'message' => 'Profile updated successfully.',
            'customer' => [
                ...$customer->toArray(),
                'avatar' => $customer->avatar,
                'username' => str_replace(' ', '_', strtolower($customer->name)),
            ],
        ]);
    }

    /**
     * 🔹 Upload atau ubah foto profil
     */
    public function updateAvatar(Request $request)
    {
        $customer = $request->user();

        $request->validate([
            'avatar' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // hapus avatar lama kalau ada
        if ($customer->avatar && Storage::disk('public')->exists($customer->avatar)) {
            Storage::disk('public')->delete($customer->avatar);
        }

        // simpan ke storage/app/public/avatars
        $path = $request->file('avatar')->store('avatars', 'public');

        // simpan path relatif ke database (misal: avatars/namafile.jpg)
        $customer->avatar = $path;
        $customer->save();

        return response()->json([
            'message' => 'Avatar updated successfully.',
            'avatar_url' => asset('storage/' . $path),
        ]);
    }
}
