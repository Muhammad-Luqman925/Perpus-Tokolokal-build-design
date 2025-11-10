<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerPaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'payment_channel_id',
        'account_number',
        'account_name',
        'is_primary',
    ];

    // 🔹 Relasi ke Customer
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    // 🔹 Relasi ke PaymentChannel
    public function channel()
    {
        return $this->belongsTo(PaymentChannel::class, 'payment_channel_id');
    }
}
