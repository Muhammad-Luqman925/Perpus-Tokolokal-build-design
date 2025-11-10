<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_code')->unique();
            $table->foreignId('customer_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('seller_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('address_id')->nullable()->constrained('customer_addresses')->nullOnDelete();
            $table->foreignId('payment_method_id')->nullable()->constrained('customer_payment_methods')->nullOnDelete();
            $table->foreignId('voucher_id')->nullable()->constrained('customer_vouchers')->nullOnDelete();

            $table->decimal('subtotal', 12, 2)->default(0);
            $table->decimal('shipping_cost', 12, 2)->default(0);
            $table->decimal('discount', 12, 2)->default(0);
            $table->decimal('grand_total', 12, 2)->default(0);

            $table->string('courier_name')->nullable(); // contoh: J&T Express
            $table->string('courier_service')->nullable(); // contoh: EZ (Reguler)
            $table->string('shipping_estimate')->nullable(); // contoh: 2–3 hari

            $table->enum('status', [
                'pending',
                'processing',
                'shipped',
                'delivered',
                'cancelled'
            ])->default('pending');

            $table->enum('payment_status', [
                'unpaid',
                'paid',
                'failed'
            ])->default('unpaid');

            $table->timestamp('paid_at')->nullable();
            $table->text('cancelled_reason')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
