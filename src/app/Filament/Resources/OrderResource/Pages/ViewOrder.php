<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\Grid;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\Fieldset;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\RepeatableEntry;

class ViewOrder extends ViewRecord
{
    protected static string $resource = OrderResource::class;

    protected static ?string $title = 'Detail Pesanan';

    /**
     * Ini adalah inti dari halaman View.
     * 🌟 PERBAIKAN: Ganti 'protected' jadi 'public'
     */
    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                // Kita bagi jadi 2 kolom
                Grid::make(3)->schema([
                    // Kolom Kiri (Detail Order & Customer)
                    Section::make('Detail Pesanan')
                        ->schema([
                            TextEntry::make('order_code')
                                ->label('Order ID'),
                            TextEntry::make('status')
                                ->label('Status Pesanan')
                                ->badge()
                                ->color(fn (string $state): string => match ($state) {
                                    'pending' => 'warning',
                                    'processing' => 'info',
                                    'shipped' => 'primary',
                                    'delivered' => 'success',
                                    'cancelled' => 'danger',
                                    default => 'gray',
                                }),
                            TextEntry::make('created_at')
                                ->label('Tanggal Dibuat')
                                ->dateTime(),
                            TextEntry::make('customer.name') // 👈 Ambil dari relasi
                                ->label('Nama Customer'),
                            TextEntry::make('customer.email') // 👈 Ambil dari relasi
                                ->label('Email Customer'),
                        ])->columns(2),
                    
                    // Kolom Kanan (Detail Pengiriman & Pembayaran)
                    Section::make('Pengiriman & Pembayaran')
                        ->schema([
                            Fieldset::make('Alamat Pengiriman')
                                ->relationship('address') // 👈 Asumsi relasi 'address()' ada di Model Order
                                ->schema([
                                    TextEntry::make('recipient_name')
                                        ->label('Penerima'),
                                    TextEntry::make('phone_number')
                                        ->label('No. Telepon'),
                                    TextEntry::make('full_address_string') // 👈 Kita akan buat accessor ini
                                        ->label('Alamat Lengkap')
                                        ->columnSpanFull(),
                                ]),
                            Fieldset::make('Info Pengiriman')
                                ->schema([
                                    TextEntry::make('courier_name')
                                        ->label('Kurir'),
                                    TextEntry::make('courier_service')
                                        ->label('Layanan'),
                                    TextEntry::make('shipping_cost')
                                        ->label('Ongkos Kirim')
                                        ->money('IDR'),
                                ]),
                            Fieldset::make('Info Pembayaran')
                                ->relationship('paymentMethod') // 👈 Asumsi relasi 'paymentMethod()' ada
                                ->schema([
                                    TextEntry::make('channel.name')
                                        ->label('Metode Bayar'),
                                    TextEntry::make('account_number')
                                        ->label('No. Akun/VA'),
                                ]),
                        ]),
                ]),

                // Bagian Bawah (Full Width) untuk Item
                Section::make('Item Pesanan')
                    ->schema([
                        // Ini akan me-render tabel dari item-item
                        RepeatableEntry::make('items')
                            ->label('')
                            ->schema([
                                TextEntry::make('product_name')
                                    ->label('Nama Produk'),
                                TextEntry::make('quantity')
                                    ->label('Qty'),
                                TextEntry::make('price')
                                    ->label('Harga Satuan')
                                    ->money('IDR'),
                                TextEntry::make('total')
                                    ->label('Subtotal')
                                    ->money('IDR'),
                                TextEntry::make('note')
                                    ->label('Catatan')
                                    ->placeholder('Tidak ada catatan')
                                    ->columnSpanFull(),
                            ])
                            ->columns(4)
                            ->grid(2),
                    ]),
            ]);
    }
}