<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Tambahkan kolom tracking dan review ke tabel orders.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // 🔹 Tambahkan kolom JSON untuk tracking dan review
            if (!Schema::hasColumn('orders', 'shipping_tracking')) {
                $table->json('shipping_tracking')->nullable()->after('status');
            }

            if (!Schema::hasColumn('orders', 'review')) {
                $table->json('review')->nullable()->after('shipping_tracking');
            }
        });
    }

    /**
     * Hapus kolom jika rollback.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (Schema::hasColumn('orders', 'shipping_tracking')) {
                $table->dropColumn('shipping_tracking');
            }
            if (Schema::hasColumn('orders', 'review')) {
                $table->dropColumn('review');
            }
        });
    }
};
