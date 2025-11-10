<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order_shippings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();

            $table->string('courier_name')->nullable(); // J&T Express
            $table->string('courier_service')->nullable(); // EZ / Reguler
            $table->string('tracking_number')->nullable();

            $table->enum('progress_status', [
                'confirmed',
                'prepared',
                'in_transit',
                'out_for_delivery',
                'delivered'
            ])->default('confirmed');

            $table->string('estimated_delivery')->nullable();
            $table->timestamp('last_update')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_shippings');
    }
};
