<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // untuk redeem code
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('type', ['welcome', 'discount', 'special', 'code_only'])->default('discount');
            $table->decimal('value', 8, 2)->default(0); // nilai diskon
            $table->enum('value_type', ['percent', 'amount'])->default('percent');
            $table->boolean('is_auto')->default(true); // apakah dibuat sistem otomatis
            $table->boolean('is_public')->default(true); // tampil otomatis di list voucher
            $table->boolean('is_active')->default(true);
            $table->date('valid_from')->nullable();
            $table->date('valid_until')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
