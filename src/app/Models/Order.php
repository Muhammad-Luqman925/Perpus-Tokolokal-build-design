<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\CustomerPaymentMethod;
use App\Models\CustomerAddress; // 👈 1. TAMBAHKAN 'USE' INI
use App\Models\Customer;
use App\Models\User;
use App\Models\OrderItem;
use App\Models\OrderShipping; // (Saya tambahkan dari relasi 'shipping' kamu)
use App\Models\OrderReview; // (Saya tambahkan dari relasi 'reviews' kamu)
use Illuminate\Database\Eloquent\Factories\HasFactory; // 👈 2. TAMBAHKAN 'USE' INI (Penting)

class Order extends Model
{
    use HasFactory; // 👈 3. TAMBAHKAN 'USE' INI (Penting)

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
    
    public function paymentMethod()
    {
        return $this->belongsTo(CustomerPaymentMethod::class, 'payment_method_id');
    }

    /**
     * 🌟 4. TAMBAHKAN RELASI YANG HILANG INI 🌟
     * (Ini yang bikin 'Alamat Pengiriman' kamu kosong)
     */
    public function address()
    {
        return $this->belongsTo(CustomerAddress::class, 'address_id');
    }
}