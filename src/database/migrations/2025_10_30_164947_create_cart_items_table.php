<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();

            // 🔹 Relasi ke user (pembeli)
            $table->foreignId('Customer_id')
                ->constrained()
                ->onDelete('cascade');

            // 🔹 Relasi ke produk
            $table->foreignId('product_id')
                ->constrained()
                ->onDelete('cascade');

            // 🔹 Jumlah barang yang dipilih
            $table->integer('quantity')->default(1);

            // 🔹 Status apakah barang dicentang untuk checkout
            $table->boolean('is_selected')->default(false);

            // 🔹 Catatan opsional (misal warna, varian, dll)
            $table->text('note')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
