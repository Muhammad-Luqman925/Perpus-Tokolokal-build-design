<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customer_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');

            $table->string('label')->nullable(); // contoh: House, Office, Apartment
            $table->string('recipient_name')->nullable(); // penerima paket
            $table->string('phone', 20)->nullable(); // nomor penerima (bisa beda dari customer)
            $table->text('address_line')->nullable(); // alamat lengkap
            $table->string('city', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('postal_code', 20)->nullable();
            $table->string('country', 100)->default('Indonesia');
            $table->text('notes')->nullable(); // catatan untuk kurir
            $table->boolean('is_primary')->default(false); // alamat utama

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_addresses');
    }
};
