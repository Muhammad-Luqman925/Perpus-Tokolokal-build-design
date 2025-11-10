<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'title',
        'description',
        'type',
        'value',
        'value_type',
        'is_auto',
        'is_public',
        'is_active',
        'valid_from',
        'valid_until',
    ];

    public function customers()
    {
        return $this->belongsToMany(Customer::class, 'customer_vouchers')
            ->withPivot(['is_used', 'redeemed_at'])
            ->withTimestamps();
    }
}
