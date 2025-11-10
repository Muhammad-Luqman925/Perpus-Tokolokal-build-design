<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PaymentChannel;


class PaymentChannelSeeder extends Seeder
{
    public function run(): void
    {
        $channels = [
            // ======================
            // 💳 BANKS (Virtual Account)
            // ======================
            [
                'name' => 'BCA Virtual Account',
                'type' => 'bank',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/3/36/Bank_Central_Asia_logo.svg',
            ],
            [
                'name' => 'Mandiri Virtual Account',
                'type' => 'bank',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Bank_Mandiri_logo_2016.svg',
            ],
            [
                'name' => 'BRI Virtual Account',
                'type' => 'bank',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/6/68/Bank_Rakyat_Indonesia_logo.svg',
            ],
            [
                'name' => 'BNI Virtual Account',
                'type' => 'bank',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/6/66/BankNegaraIndonesia46-logo.svg',
            ],
            [
                'name' => 'CIMB Niaga Virtual Account',
                'type' => 'bank',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Logo_CIMB_Niaga.svg',
            ],
            [
                'name' => 'Permata Bank Virtual Account',
                'type' => 'bank',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/0/0c/PermataBank_logo.svg',
            ],
            [
                'name' => 'Bank Syariah Indonesia (BSI)',
                'type' => 'bank',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Bank_Syariah_Indonesia_logo.svg',
            ],
            [
                'name' => 'Danamon Virtual Account',
                'type' => 'bank',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Bank_Danamon_logo.svg',
            ],
            [
                'name' => 'OCBC NISP Virtual Account',
                'type' => 'bank',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/3/38/Bank_OCBC_NISP_logo.svg',
            ],

            // ======================
            // 📱 E-WALLETS
            // ======================
            [
                'name' => 'GoPay',
                'type' => 'ewallet',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Gopay_logo.svg',
            ],
            [
                'name' => 'OVO',
                'type' => 'ewallet',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_OVO_purple.svg',
            ],
            [
                'name' => 'DANA',
                'type' => 'ewallet',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Dana_logo.svg',
            ],
            [
                'name' => 'ShopeePay',
                'type' => 'ewallet',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/8/83/ShopeePay_logo.svg',
            ],
            [
                'name' => 'LinkAja',
                'type' => 'ewallet',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/0/0c/LinkAja_logo.svg',
            ],
            [
                'name' => 'Jenius Pay',
                'type' => 'ewallet',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/2/26/Jenius_logo.svg',
            ],
            [
                'name' => 'BluePay',
                'type' => 'ewallet',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/0/0f/BluePay_logo.svg',
            ],
            [
                'name' => 'Sakuku',
                'type' => 'ewallet',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Sakuku_logo.svg',
            ],
            [
                'name' => 'Alfamart Payment',
                'type' => 'ewallet',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Alfamart_logo.svg',
            ],
            [
                'name' => 'Indomaret Payment',
                'type' => 'ewallet',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Indomaret_logo.svg',
            ],
        ];

        foreach ($channels as $channel) {
            PaymentChannel::create($channel);
        }
    }
}
