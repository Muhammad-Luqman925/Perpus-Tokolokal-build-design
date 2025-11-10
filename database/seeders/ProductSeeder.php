<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

class ProductSeeder extends Seeder
{
    public function run(): void
    {   
           Schema::disableForeignKeyConstraints();

        Product::truncate();
        User::where('role', 'seller')->delete();

        Schema::enableForeignKeyConstraints();
        // 🔹 Buat 3 seller manual tanpa factory
        $sellers = collect([
            [
                'name' => 'Seller 1',
                'email' => 'seller1@example.com',
                'password' => Hash::make('password'),
                'role' => 'seller',
                'store_name' => 'Toko Seller 1',
            ],
            [
                'name' => 'Seller 2',
                'email' => 'seller2@example.com',
                'password' => Hash::make('password'),
                'role' => 'seller',
                'store_name' => 'Toko Seller 2',
            ],
            [
                'name' => 'Seller 3',
                'email' => 'seller3@example.com',
                'password' => Hash::make('password'),
                'role' => 'seller',
                'store_name' => 'Toko Seller 3',
            ],
        ])->map(fn($data) => User::create($data));

        // 🔹 Gambar sample
        $sampleImages = [
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1511288598561-891adf3821d0?auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1519741497674-611481632552?auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1615485290832-9936b197d7e2?auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1526958977630-bc61b30a2000?auto=format&fit=crop&w=700&q=80',
        ];

        // 🔹 Loop setiap seller dan buat produk dummy
       foreach ($sellers as $seller) {
            for ($i = 1; $i <= 5; $i++) {
                $isFlashSale = $i % 2 === 0;  // tiap produk genap jadi flash sale
                $isFeatured = $i % 3 === 0;   // tiap kelipatan 3 jadi featured

                $flashStart = $isFlashSale ? now()->subHours(rand(1, 3)) : null;
                $flashEnd = $isFlashSale ? now()->addDays(rand(1, 2)) : null;

                Product::create([
                    'user_id' => $seller->id,
                    'name' => "Product $i by {$seller->name}",
                    'slug' => Str::slug("product-$i-by-{$seller->name}-" . uniqid()),
                    'description' => fake()->sentence(20),
                    'price' => fake()->numberBetween(150000, 500000),
                    'stock' => fake()->numberBetween(5, 100),
                    'image' => $sampleImages[array_rand($sampleImages)],
                    'variants' => ['Small', 'Medium', 'Large'],
                    'is_active' => true,
                    'is_featured' => $isFeatured,
                    'rating' => fake()->randomFloat(1, 4, 5),
                    'is_flash_sale' => $isFlashSale,
                    'flash_sale_price' => $isFlashSale ? fake()->numberBetween(100000, 250000) : null,
                    'flash_sale_start' => $flashStart,
                    'flash_sale_end' => $flashEnd,
                ]);
            }
        }


        $this->command->info('✅ Dummy sellers & products (with flash sale + featured) seeded successfully!');
    }
}
