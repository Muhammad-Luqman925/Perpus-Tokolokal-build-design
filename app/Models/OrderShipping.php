<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderShipping extends Model
{
    protected $fillable = [
        'order_id','courier_name','courier_service','tracking_number',
        'progress_status','estimated_delivery','last_update'
    ];

    public function order() {
        return $this->belongsTo(Order::class);
    }
}
