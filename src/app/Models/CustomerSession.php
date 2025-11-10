<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerSession extends Model
{
    protected $fillable = [
        'customer_id', 'ip_address', 'user_agent',
        'device', 'platform', 'is_current', 'last_active_at'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
