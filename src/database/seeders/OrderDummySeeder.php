<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderShipping;
use Illuminate\Support\Str;
use Carbon\Carbon;

class OrderDummySeeder extends Seeder
{
    public function run(): void
    {
        // 🔹 1. Seller dari tabel users
        $seller = User::factory()->create([
            'name' => 'Xiaomi Official Store',
            'email' => 'xiaomi@store.com',
            'role' => 'seller',
            'store_name' => 'Xiaomi Official Store',
            'store_slug' => 'xiaomi-official',
        ]);

        // 🔹 2. Customer dari tabel customers
        $customer = Customer::factory()->create([
            'name' => 'Marukooo',
            'email' => 'maruko@example.com',
            'phone_number' => '081234567890',
            'gender' => 'male',
        ]);

        // 🔹 3. Produk milik seller
        $product = Product::create([
            'user_id' => $seller->id,
            'name' => 'Official Xiaomi Compact Hair Dryer H101',
            'description' => 'Ringkas dan bisa dilipat, produk original Xiaomi.',
            'price' => 249000,
            'stock' => 20,
            'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
        ]);

        // 🔹 4. Buat Order
        $order = Order::create([
            'order_code' => strtoupper(Str::random(8)),
            'customer_id' => $customer->id,
            'seller_id' => $seller->id,
            'subtotal' => 249000,
            'shipping_cost' => 15000,
            'discount' => 0,
            'grand_total' => 264000,
            'courier_name' => 'J&T Express',
            'courier_service' => 'EZ (Reguler)',
            'shipping_estimate' => '2–3 Hari',
            'status' => 'processing',
            'payment_status' => 'paid',
            'paid_at' => Carbon::now(),
        ]);

        // 🔹 5. Order Items
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'seller_id' => $seller->id,
            'product_name' => $product->name,
            'variant' => 'White',
            'price' => 249000,
            'quantity' => 1,
            'subtotal' => 249000,
            'note' => 'Tolong bungkus dengan bubble wrap ya!',
        ]);

        // 🔹 6. Tracking pengiriman
        OrderShipping::create([
            'order_id' => $order->id,
            'courier_name' => 'J&T Express',
            'courier_service' => 'EZ',
            'tracking_number' => 'JNT874593022ID',
            'progress_status' => 'in_transit',
            'estimated_delivery' => '22 September 2025, 10:00 - 18:00',
            'last_update' => Carbon::now()->subDay(),
        ]);

        $this->command->info('✅ Dummy order berhasil dibuat (seller dari User, customer dari Customer).');
    }
}
