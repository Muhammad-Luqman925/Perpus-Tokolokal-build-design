<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\Voucher;
use App\Models\CustomerSession;
use Jenssegers\Agent\Agent;
class CustomerAuthController extends Controller
{
    // 🔹 REGISTER
    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:100',
                'email' => 'nullable|email|unique:customers,email',
                'phone_number' => 'nullable|string|unique:customers,phone_number',
                'password' => 'required|string|min:6',
            ]);

            if (empty($validated['email']) && empty($validated['phone_number'])) {
                throw ValidationException::withMessages([
                    'identifier' => 'Either email or phone number is required.',
                ]);
            }

            $customer = Customer::create([
                'name' => $validated['name'],
                'email' => $validated['email'] ?? null,
                'phone_number' => $validated['phone_number'] ?? null,
                'password' => Hash::make($validated['password']),
                
            ]);
            $welcomeVoucher = Voucher::where('type', 'welcome')->first();
            if ($welcomeVoucher) {
                $customer->vouchers()->attach($welcomeVoucher->id, [
                    'redeemed_at' => now(),
                ]);
            }
            $token = $customer->createToken('customer_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Customer registered successfully!',
                'token' => $token,
                'customer' => $customer,
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to register: ' . $e->getMessage(),
            ], 500);
        }
    }
    
    // 🔹 LOGIN
    public function login(Request $request)
        {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            // 🔍 Cari customer berdasarkan email
            $customer = Customer::where('email', $request->email)->first();

            // 🚫 Validasi login
            if (!$customer || !Hash::check($request->password, $customer->password)) {
                return response()->json([
                    'message' => 'Invalid credentials',
                ], 401);
            }

            // ✅ Buat token
            $token = $customer->createToken('customer-token')->plainTextToken;

            // ✅ Catat sesi login
            $agent = new Agent();
            CustomerSession::create([
                'customer_id' => $customer->id,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'device' => $agent->device() ?: 'Unknown Device',
                'platform' => $agent->platform() . ' ' . $agent->version($agent->platform()),
                'is_current' => true,
                'last_active_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Login successful!',
                'token' => $token,
                'customer' => $customer,
            ], 200);
        }

    // 🔹 LOGOUT
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    // 🔹 CEK EMAIL UNTUK RESET PASSWORD
    public function checkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $customer = Customer::where('email', $request->email)->first();

        if (!$customer) {
            return response()->json([
                'success' => false,
                'message' => 'Email not found in our records.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Email verified successfully.',
        ]);
    }

    // 🔹 RESET PASSWORD
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:customers,email',
            'password' => 'required|string|min:6',
        ]);

        $customer = Customer::where('email', $request->email)->first();

        if (!$customer) {
            return response()->json([
                'success' => false,
                'message' => 'Customer not found.',
            ], 404);
        }

        $customer->password = Hash::make($request->password);
        $customer->save();

        return response()->json([
            'success' => true,
            'message' => 'Password has been reset successfully.',
        ]);
    }

    // 🔹 CHANGE PASSWORD (auth:sanctum required)
    public function changePassword(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Current password is incorrect.'
            ], 422);
        }

        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password updated successfully.'
        ]);
    }
}
