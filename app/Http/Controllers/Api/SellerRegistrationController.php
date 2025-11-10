<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SellerRegistrationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'store_name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        $storeName = $validated['store_name']
            ?? ($validated['email'] ?? null
                ? Str::before($validated['email'], '@')
                : 'Seller ' . Str::random(5));

        $user = User::create([
            'name' => $storeName,
            'email' => $validated['email'],
            'phone_number' => null,
            'store_name' => $storeName,
            'store_slug' => Str::slug($storeName) ?: null,
            'role' => 'seller',
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Seller registered successfully.',
            'seller' => $user,
        ], 201);
    }
}
