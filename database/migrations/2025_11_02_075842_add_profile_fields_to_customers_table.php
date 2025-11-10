<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Tambah kolom baru ke tabel customers.
     */
    public function up(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->string('avatar')->nullable()->after('gender');
            $table->date('date_of_birth')->nullable()->after('avatar');
        });
    }

    /**
     * Rollback (hapus kolom jika dibatalkan)
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn(['username', 'avatar', 'date_of_birth']);
        });
    }
};
