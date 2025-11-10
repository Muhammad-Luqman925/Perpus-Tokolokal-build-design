<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class Customer extends Authenticatable
{
   use HasApiTokens, Notifiable, HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'gender',
        'password',
        'avatar',
        'date_of_birth',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Relasi ke Cart
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
    // Relasi ke Alamat Customer
   public function addresses()
{
    return $this->hasMany(CustomerAddress::class);
}

public function vouchers()
{
    return $this->belongsToMany(Voucher::class, 'customer_vouchers')
        ->withPivot(['is_used', 'redeemed_at'])
        ->withTimestamps();
}

}

