<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentChannel extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'type', 'logo', 'is_active'];

    public function customerMethods()
{
    return $this->hasMany(CustomerPaymentMethod::class, 'payment_channel_id');
}

}
