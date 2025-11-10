<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderReview extends Model
{
    protected $fillable = [
        'order_id','order_item_id','customer_id','rating','comment'
    ];

    public function order() {
        return $this->belongsTo(Order::class);
    }

    public function customer() {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function item() {
        return $this->belongsTo(OrderItem::class);
    }
}

