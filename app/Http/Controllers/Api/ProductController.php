<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * 🔹 Ambil semua produk aktif
     */
    public function index()
    {
        $products = Product::where('is_active', true)
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Daftar produk berhasil diambil',
            'data' => $products,
        ], 200);
    }

    /**
     * 🔹 Ambil detail produk tertentu
     */
    public function show($id)
    {
        $product = Product::with('user')->find($id);

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Produk tidak ditemukan',
                'data' => null,
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Detail produk berhasil diambil',
            'data' => $product,
        ], 200);
    }

    /**
     * 🔹 Ambil produk yang sedang dalam Flash Sale (aktif pada waktu sekarang)
     */
    public function flashSale()
    {
        $now = now();

        $products = Product::where('is_active', true)
            ->where('is_flash_sale', true)
            ->where('flash_sale_start', '<=', $now)
            ->where('flash_sale_end', '>=', $now)
            ->orderByDesc('flash_sale_start')
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Daftar produk flash sale berhasil diambil',
            'data' => $products,
        ], 200);
    }

    /**
     * 🔹 Ambil produk unggulan (featured)
     */
    public function featured()
    {
        $products = Product::where('is_active', true)
            ->where('is_featured', true)
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Daftar produk unggulan berhasil diambil',
            'data' => $products,
        ], 200);
    }

    /**
     * 🔹 Ambil produk berdasarkan seller (user)
     */
    public function bySeller($sellerId)
    {
        $products = Product::where('user_id', $sellerId)
            ->where('is_active', true)
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Daftar produk berdasarkan seller berhasil diambil',
            'data' => $products,
        ], 200);
    }
}
