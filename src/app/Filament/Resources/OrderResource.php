<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Actions\Action;
use Filament\Notifications\Notification;

// 🌟🌟🌟 INI DIA PERBAIKANNYA 🌟🌟🌟
use Illuminate\Support\Facades\Auth; // 👈 Untuk benerin auth()->user()
use Filament\Tables\Tabs\Tab;         // 👈 Untuk benerin getTabs()
use App\Filament\Resources\OrderResource\Pages\ViewOrder;
// 🌟🌟🌟 BATAS PERBAIKAN 🌟🌟🌟


class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    protected static ?string $navigationLabel = 'Pesanan Masuk';

    /**
     * 🌟 LANGKAH 1: SELLER HANYA BISA LIHAT ORDERNYA SENDIRI
     */
    public static function getEloquentQuery(): Builder
    {
        // 🌟 PERBAIKAN: Ganti auth() jadi Auth::user() biar IDE ngga bingung
        $sellerId = Auth::user()->id; 
        
        return parent::getEloquentQuery()
            ->where('seller_id', $sellerId) 
            ->orderBy('created_at', 'desc');
    }

    /**
     * Kita buat read-only
     */
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // (Kosongkan)
            ]);
    }

    /**
     * 🌟 LANGKAH 2: TAMPILKAN TABEL & TOMBOL AKSI
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('order_code')
                    ->label('Order ID')
                    ->searchable(),
                Tables\Columns\TextColumn::make('customer.name') 
                    ->label('Customer')
                    ->searchable(),
                Tables\Columns\TextColumn::make('grand_total')
                    ->money('IDR')
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'processing' => 'info',
                        'shipped' => 'primary',
                        'delivered' => 'success',
                        'cancelled' => 'danger',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Tanggal Order')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                // 🌟🌟🌟 TOMBOL KONFIRMASI 🌟🌟🌟
                Action::make('Confirm')
                    ->label('Konfirmasi Pesanan')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading('Konfirmasi Pesanan')
                    ->modalDescription('Anda yakin ingin mengkonfirmasi pesanan ini dan memprosesnya?')
                    ->action(function (Order $record) {
                        if ($record->status === 'pending') {
                            $record->status = 'processing';
                            $record->save();
                            
                            Notification::make()
                                ->title('Pesanan Dikonfirmasi')
                                ->body('Pesanan ' . $record->order_code . ' telah dipindahkan ke "Processing".')
                                ->success()
                                ->send();
                        }
                    })
                    ->visible(fn (Order $record): bool => $record->status === 'pending'),

                Tables\Actions\ViewAction::make()
                    ->label('Lihat Detail'),
            ])
            ->bulkActions([
                //
            ]);
    }

    /**
     * 🌟 LANGKAH 3: TAMBAHKAN TAB FILTER (Sudah Benar)
     */
    public static function getTabs(): array
    {
        return [
            'Semua' => Tab::make(), // 👈 Sekarang 'Tab' tidak akan error
            'Pending' => Tab::make()
                ->label('Pending (Butuh Konfirmasi)')
                ->query(fn (Builder $query) => $query->where('status', 'pending')),
            'Processing' => Tab::make()
                ->label('Sedang Diproses')
                ->query(fn (Builder $query) => $query->where('status', 'processing')),
            'Shipped' => Tab::make()
                ->label('Dikirim')
                ->query(fn (Builder $query) => $query->where('status', 'shipped')),
            'Delivered' => Tab::make()
                ->label('Selesai')
                ->query(fn (Builder $query) => $query->where('status', 'delivered')),
        ];
    }
    
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            // 'create' => Pages\CreateOrder::route('/create'),
            // 'edit' => Pages\EditOrder::route('/{record}/edit'),
            
            // 👈 'ViewOrder' sekarang tidak akan error
            'view' => ViewOrder::route('/{record}'),
        ];
    }    
}