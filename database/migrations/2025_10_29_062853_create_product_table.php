<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            // 🔹 Relasi ke user (seller)
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');

            // 🧩 Data utama produk
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->decimal('price', 12, 2)->default(0);
            $table->integer('stock')->default(0);
            $table->string('image')->nullable();
            $table->json('variants')->nullable(); // contoh: ["Maroon", "White", "Soft Pink"]

            // 🔸 Status produk
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->float('rating', 2, 1)->default(0);

            // ⚡ Fitur Flash Sale (opsional)
            $table->boolean('is_flash_sale')->default(false);
            $table->decimal('flash_sale_price', 12, 2)->nullable();
            $table->timestamp('flash_sale_start')->nullable();
            $table->timestamp('flash_sale_end')->nullable();

            // 🕓 Timestamps
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
