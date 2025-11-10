<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Voucher;
use Illuminate\Support\Str;

class VoucherSeeder extends Seeder
{
    public function run(): void
    {
        Voucher::insert([
            [
                'code' => 'WELCOME10',
                'title' => 'First Purchase Discount',
                'description' => 'Get 10% off on your first purchase!',
                'type' => 'welcome',
                'value' => 10,
                'value_type' => 'percent',
                'is_auto' => true,
                'is_public' => true,
                'is_active' => true,
                'valid_until' => now()->addMonths(6),
            ],
            [
                'code' => 'EXTRA15',
                'title' => 'Extra 15% Discount',
                'description' => 'Enjoy an additional 15% discount for this month!',
                'type' => 'discount',
                'value' => 15,
                'value_type' => 'percent',
                'is_auto' => true,
                'is_public' => true,
                'is_active' => true,
                'valid_until' => now()->addMonth(),
            ],
            [
                'code' => 'SECRET50',
                'title' => 'Secret 50% Voucher',
                'description' => 'Hidden voucher! Redeem manually with the code.',
                'type' => 'code_only',
                'value' => 50,
                'value_type' => 'percent',
                'is_auto' => false,
                'is_public' => false,
                'is_active' => true,
                'valid_until' => now()->addMonths(2),
            ],
        ]);
    }
}
