<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'price',
        'stock',
        'image',
        'variants',
        'is_active',
        'is_featured',
        'rating',
        'is_flash_sale',
        'flash_sale_price',
        'flash_sale_start',
        'flash_sale_end',
    ];

    protected $casts = [
        'variants' => 'array',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'is_flash_sale' => 'boolean',
        'flash_sale_start' => 'datetime',
        'flash_sale_end' => 'datetime',
    ];

    // 🔹 Format harga normal
    public function getFormattedPriceAttribute(): string
    {
        return 'Rp ' . number_format($this->price, 0, ',', '.');
    }

    // 🔹 Format harga flash sale jika aktif
    public function getEffectivePriceAttribute(): string
    {
        if ($this->is_flash_sale && $this->flash_sale_price) {
            return 'Rp ' . number_format($this->flash_sale_price, 0, ',', '.');
        }
        return $this->formatted_price;
    }

    // 🔹 Slug otomatis saat create
    protected static function booted(): void
    {
        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name) . '-' . uniqid();
            }
        });
    }

    // 🔹 Relasi ke seller (user)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // 🔹 Scope produk aktif
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // 🔹 Scope produk unggulan
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true)
            ->where('is_active', true);
    }

    // 🔹 Scope flash sale aktif
    public function scopeActiveFlashSale($query)
    {
        return $query->where('is_active', true)
            ->where('is_flash_sale', true)
            ->where(function ($q) {
                $q->whereNull('flash_sale_start')
                  ->orWhere('flash_sale_start', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('flash_sale_end')
                  ->orWhere('flash_sale_end', '>=', now());
            });
    }
}
