<?php
use App\Http\Controllers\Api\CustomerAuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\CustomerProfileController;
use App\Http\Controllers\Api\CustomerAddressController;
use App\Http\Controllers\Api\CustomerPaymentMethodController;
use App\Http\Controllers\Api\VoucherController;
use App\Http\Controllers\Api\CustomerSessionController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\SellerRegistrationController;
// 🔹 Tes sederhana
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});
#lOGIN & REGISTER CUSTOMER
Route::post('/customer/register', [CustomerAuthController::class, 'register']);
Route::post('/customer/login', [CustomerAuthController::class, 'login']);
Route::post('/customer/check-email', [CustomerAuthController::class, 'checkEmail']);
Route::post('/customer/reset-password', [CustomerAuthController::class, 'resetPassword']);
Route::post('/seller/register', [SellerRegistrationController::class, 'store']);
Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [CustomerAuthController::class, 'logout']);
        Route::post('/change-password', [CustomerAuthController::class, 'changePassword']);
    });

# PRODUCT ROUTES

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);

    // ✅ letakkan ini di atas sebelum {id}
    Route::get('/featured', [ProductController::class, 'featured']);
    Route::get('/flash-sale', [ProductController::class, 'flashSale']);

    // ⚠️ baru yang {id} di bawah
    Route::get('/{id}', [ProductController::class, 'show']);
});

# CART ROUTES

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
});

# CHECKOUT ROUTES
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/checkout/preview', [CheckoutController::class, 'preview']);
    Route::post('/checkout/update-shipping', [CheckoutController::class, 'updateShipping']);
});

# CUSTOMER PROFILE ROUTES
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/customer/profile', [CustomerProfileController::class, 'show']);
    Route::put('/customer/profile', [CustomerProfileController::class, 'update']);
    Route::post('/customer/profile/avatar', [CustomerProfileController::class, 'updateAvatar']);
});

# CUSTOMER ADDRESS ROUTES
Route::middleware('auth:sanctum')->prefix('customer')->group(function () {
    Route::get('/addresses', [CustomerAddressController::class, 'index']);
    Route::post('/addresses', [CustomerAddressController::class, 'store']);
    Route::put('/addresses/{id}', [CustomerAddressController::class, 'update']);
    Route::delete('/addresses/{id}', [CustomerAddressController::class, 'destroy']);
    Route::put('/addresses/{id}/set-primary', [CustomerAddressController::class, 'setPrimary']);
    Route::get('/addresses/active', [CustomerAddressController::class, 'active']);
});

# CUSTOMER PAYMENT METHOD ROUTES
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/payment-channels', [CustomerPaymentMethodController::class, 'channels']);
    Route::get('/customer/payment-methods', [CustomerPaymentMethodController::class, 'index']);
    Route::post('/customer/payment-methods', [CustomerPaymentMethodController::class, 'store']);
    Route::put('/customer/payment-methods/{id}', [CustomerPaymentMethodController::class, 'update']);
    Route::delete('/customer/payment-methods/{id}', [CustomerPaymentMethodController::class, 'destroy']);
    Route::get('/customer/payment-methods/active', [CustomerPaymentMethodController::class, 'active']);
    Route::put('/customer/payment-methods/{id}/set-primary', [CustomerPaymentMethodController::class, 'setPrimary']);
});

# Voucher Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/vouchers', [VoucherController::class, 'index']);
    Route::get('/my-vouchers', [VoucherController::class, 'myVouchers']);
    Route::post('/vouchers/use/{id}', [VoucherController::class, 'useVoucher']); 
    Route::post('/vouchers/redeem', [VoucherController::class, 'redeem']);
});

# CUSTOMER SESSION ROUTES
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/sessions', [CustomerSessionController::class, 'index']);
    Route::delete('/sessions/{id}', [CustomerSessionController::class, 'logoutSession']);
    Route::delete('/sessions', [CustomerSessionController::class, 'logoutAll']);
});

# ORDER ROUTES
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/status/{status}', [OrderController::class, 'filterByStatus'])->name('orders.filter');
    Route::get('/orders/{order_code}', [OrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');
    Route::post('/checkout', [OrderController::class, 'store']);
});
