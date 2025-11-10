<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            // Default Laravel columns
            $table->string('name'); // bisa dipakai utk Owner Full Name
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            // 🔹 Tambahan untuk Seller / Store
            $table->string('store_name')->nullable();
            $table->string('phone_number')->nullable();
            $table->enum('role', ['user', 'seller', 'admin'])->default('user');

            // Optional store info
            $table->string('store_slug')->nullable();
            $table->string('store_logo')->nullable();
            $table->text('store_description')->nullable();

            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
