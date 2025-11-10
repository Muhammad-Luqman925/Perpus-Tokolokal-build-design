<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {


        // 🏪 Seller (Toko)
        User::create([
            'name' => 'Luqman Store Owner',
            'email' => 'seller@tokolokal.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'store_name' => 'Tokolokal Official',
            'phone_number' => '081234567890',
            'store_slug' => 'tokolokal-official',
            'store_description' => 'Toko resmi Tokolokal yang menjual berbagai produk lokal unggulan.',
        ]);

    }
}
