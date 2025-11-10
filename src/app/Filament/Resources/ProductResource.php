<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\DateTimePicker;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-cube';
    protected static ?string $navigationLabel = 'Produk Saya';
    protected static ?string $pluralLabel = 'Produk Saya';

    // 🔹 Menampilkan jumlah produk milik user di sidebar
    public static function getNavigationBadge(): ?string
    {
        if (Auth::user()->role === 'admin') {
            return Product::count();
        }

        return Product::where('user_id', Auth::id())->count();
    }

    public static function form(Form $form): Form
{
    return $form->schema([
        Forms\Components\Grid::make(1) // 🔹 Pastikan hanya 1 kolom per baris
            ->schema([
                TextInput::make('name')
                    ->label('Nama Produk')
                    ->required()
                    ->afterStateUpdated(fn($state, callable $set) => 
                        $set('slug', \Illuminate\Support\Str::slug($state))
                    ),

                Textarea::make('description')
                    ->label('Deskripsi Produk')
                    ->rows(3),

                TextInput::make('price')
                    ->label('Harga Produk')
                    ->numeric()
                    ->prefix('Rp')
                    ->required(),

                TextInput::make('stock')
                    ->label('Jumlah Stok')
                    ->numeric()
                    ->required(),
                    
                Forms\Components\Repeater::make('variants')
                    ->label('Varian Produk (opsional)')
                    ->schema([
                        TextInput::make('nama_varian')
                            ->label('Nama Varian (misal: Warna, Ukuran)')
                            ->required(),
                        TextInput::make('nilai_varian')
                            ->label('Nilai Varian (misal: Merah, XL)')
                            ->required(),
                    ])
                    ->columns(2)
                    ->collapsible()
                    ->addActionLabel('Tambah Varian')
                    ->nullable(),

                FileUpload::make('image')
                    ->label('Foto Produk')
                    ->image()
                    ->directory('products')
                    ->columnSpanFull(), // biar full lebar

                Toggle::make('is_flash_sale')
                    ->label('Aktifkan Flash Sale?')
                    ->reactive(),

                // 🔥 Bagian Flash Sale hanya muncul kalau toggle aktif
                TextInput::make('flash_sale_price')
                    ->label('Harga Flash Sale')
                    ->prefix('Rp')
                    ->numeric()
                    ->visible(fn ($get) => $get('is_flash_sale')),

                DateTimePicker::make('flash_sale_start')
                    ->label('Mulai Flash Sale')
                    ->visible(fn ($get) => $get('is_flash_sale')),

                DateTimePicker::make('flash_sale_end')
                    ->label('Berakhir Flash Sale')
                    ->visible(fn ($get) => $get('is_flash_sale')),

                // slug hidden agar otomatis tapi tidak tampil
                Forms\Components\Hidden::make('slug'),
            ]),
    ]);
}

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->label('Nama'),
                TextColumn::make('price')->label('Harga')->money('IDR'),
                TextColumn::make('stock')->label('Stok'),
                TextColumn::make('is_flash_sale')
                    ->label('Flash Sale?')
                    ->badge()
                    ->formatStateUsing(fn($state) => $state ? 'Aktif' : '-')
                    ->color(fn($state) => $state ? 'success' : 'gray'),
            ])
            ->actions([
                EditAction::make()->label('Edit'),
                DeleteAction::make()->label('Hapus'),
            ]);
    }

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery();

        if (Auth::user()->role !== 'admin') {
            $query->where('user_id', Auth::id());
        }

        return $query;
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
