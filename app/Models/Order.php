<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'order_code','customer_id','seller_id','address_id','payment_method_id',
        'voucher_id','subtotal','shipping_cost','discount','grand_total',
        'courier_name','courier_service','shipping_estimate','status','payment_status',
        'paid_at','cancelled_reason', 'shipping_tracking','review'
    ];
    protected $casts = [
    'shipping_tracking' => 'array',
    'review' => 'array',
];

    public function items() {
        return $this->hasMany(OrderItem::class);
    }

    public function shipping() {
        return $this->hasOne(OrderShipping::class);
    }

    public function reviews() {
        return $this->hasMany(OrderReview::class);
    }

    public function customer() {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function seller() {
        return $this->belongsTo(User::class, 'seller_id');
    }
}
