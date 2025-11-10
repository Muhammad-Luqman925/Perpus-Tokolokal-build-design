<?php

namespace App\Services;

class ShippingService
{
    /**
     * Daftar ekspedisi tetap (tanpa database)
     */
    public static function getAll()
    {
        return [
            [
                'name' => 'JNT Express',
                'price' => 30000,
                'estimate' => '2 - 5 hari',
            ],
            [
                'name' => 'SiCepat',
                'price' => 28000,
                'estimate' => '3 - 6 hari',
            ],
            [
                'name' => 'JNE Regular',
                'price' => 32000,
                'estimate' => '4 - 7 hari',
            ],
        ];
    }

    /**
     * Ambil satu ekspedisi berdasarkan nama
     */
    public static function find($name)
    {
        $all = self::getAll();
        foreach ($all as $ship) {
            if (strcasecmp($ship['name'], $name) === 0) {
                return $ship;
            }
        }
        return null;
    }
}
