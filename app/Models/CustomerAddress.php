<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
class CustomerAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'label',
        'recipient_name',
        'phone',
        'address_line',
        'city',
        'state',
        'postal_code',
        'country',
        'notes',
        'is_primary',
    ];

    /**
     * Relasi ke customer
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Getter bantu (misalnya untuk label tampil di UI)
     */
    public function getDisplayLabelAttribute()
    {
        return $this->label ?: 'Address #' . $this->id;
    }
    protected function fullAddressString(): Attribute
    {
        return Attribute::make(
            get: fn () => "{$this->address_line}, {$this->city}, {$this->state}, {$this->country}, {$this->postal_code}",
        );
    }
}
