## Nama Project : TokoLokal

TokoLokal adalah website e-commerce yang dibangun menggunakan React (frontend) dan Laravel (backend).
Proyek ini dirancang untuk mempermudah proses jual-beli produk lokal dengan tampilan yang modern.

---

## Tim Pengembang

| Nama | Peran | Jobdesk |
|------|--------|----------|
| Muhammad Arifin Dafa | Frontend Developer | Mengembangkan antarmuka pengguna menggunakan React, integrasi API, dan implementasi komponen dinamis dengan Tailwind. |
| Muhammad Luqman | Backend Developer | Membangun REST API dengan Laravel, mengelola database dan autentikasi, serta integrasi dengan Filament untuk dashboard admin. |
| Allya Putri Ditya | UI/UX Designer | Mendesain tampilan website di Figma, membuat wireframe, user flow, serta memastikan konsistensi visual dan kemudahan navigasi. |
| Muhammad Arsy Al-Fahd | UI/UX Designer | Mengembangkan sistem warna, layout responsif, dan elemen interaktif berbasis user research untuk pengalaman pengguna yang optimal. |

---

## Fitur Utama

- Autentikasi Pengguna
  - Pengguna dapat mendaftar, login, dan mengelola sesi secara aman (Laravel Sanctum).

- Manajemen Produk
  - Admin/Seller dapat CRUD produk: nama, harga, deskripsi, kategori, stok, dan gambar.

- Keranjang Belanja (Cart)
  - Tambah produk ke keranjang, lihat item tersimpan, dan total harga.

- Checkout & Transaksi
  - Pilih beberapa produk sekaligus, pilih metode pembayaran, dan tinjau total pesanan.

- Dashboard Admin (Filament)
  - Sistem administrasi berbasis Filament untuk pengelolaan data produk.

---

## Tech Stack

| Bagian | Teknologi |
|--------|-----------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Laravel 11, Filament, MySQL |
| Autentikasi | Laravel Sanctum |

---

## Instalasi & Setup

### 1. Clone Repository
```bash
git clone https://github.com/username/TokoLokal.git
cd TokoLokal
```

### 2. Setup Backend (Laravel)
```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

### 3. Setup Frontend (Vite)
```bash
npm install
npm run dev
```

Pastikan backend berjalan di `http://127.0.0.1:8000` dan frontend di `http://localhost:5173`.

---

## Struktur Direktori

```
.
├── app/
│   ├── Filament/
│   │   └── Resources/
│   │       ├── ProductResource.php
│   │       ├── ProductResource/
│   │       │   └── Pages/
│   │       │       ├── CreateProduct.php
│   │       │       ├── EditProduct.php
│   │       │       └── ListProducts.php
│   │       └── Pages/
│   │           └── Auth/
│   │               └── Login.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── CartController.php
│   │   │   │   ├── CheckoutController.php
│   │   │   │   ├── CustomerAddressController.php
│   │   │   │   ├── CustomerAuthController.php
│   │   │   │   ├── CustomerPaymentMethodController.php
│   │   │   │   ├── CustomerProfileController.php
│   │   │   │   ├── CustomerSessionController.php
│   │   │   │   ├── OrderController.php
│   │   │   │   ├── ProductController.php
│   │   │   │   ├── SellerRegistrationController.php
│   │   │   │   └── VoucherController.php
│   │   │   └── Controller.php
│   ├── Models/
│   │   ├── CartItem.php
│   │   ├── Customer.php
│   │   ├── CustomerAddress.php
│   │   ├── CustomerPaymentMethod.php
│   │   ├── CustomerSession.php
│   │   ├── Order.php
│   │   ├── OrderItem.php
│   │   ├── OrderReview.php
│   │   ├── OrderShipping.php
│   │   ├── PaymentChannel.php
│   │   ├── Product.php
│   │   ├── User.php
│   │   └── Voucher.php
│   ├── Providers/
│   │   └── AppServiceProvider.php
│   └── Services/
│       └── ShippingService.php
├── bootstrap/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── OrderDummySeeder.php
│       ├── PaymentChannelSeeder.php
│       ├── ProductSeeder.php
│       ├── UserSeeder.php
│       └── VoucherSeeder.php
├── public/
│   └── img/
│       ├── Login.png
│       └── logo.png
├── resources/
│   └── js/
│       ├── assets/
│       ├── components/
│       │   ├── feedback/
│       │   │   ├── TdesignNotificationFilled.jsx
│       │   │   └── TypcnFlash.jsx
│       │   ├── icons/
│       │   │   ├── HeroiconsUserGroupSolid.jsx
│       │   │   ├── HumbleiconsShare.jsx
│       │   │   ├── IconamoonHeart.jsx
│       │   │   ├── IonSearch.jsx
│       │   │   ├── MajesticonsCommentLine.jsx
│       │   │   └── ...
│       │   ├── layout/
│       │   │   ├── Footer.jsx
│       │   │   └── Header.jsx
│       │   ├── navigation/
│       │   │   └── Navbar.jsx
│       │   └── ui/
│       │       ├── ButtonProperty1Default.jsx
│       │       └── ButtonProperty1Disabled.jsx
│       ├── core/
│       │   ├── api/
│       │   │   ├── axios.js
│       │   │   ├── auth.api.js
│       │   │   ├── cart.api.js
│       │   │   ├── checkout.api.js
│       │   │   ├── customerAddress.api.js
│       │   │   ├── customerOrder.api.js
│       │   │   ├── customerPassword.api.js
│       │   │   ├── customerPayment.api.js
│       │   │   ├── customerProfile.api.js
│       │   │   ├── customerSession.api.js
│       │   │   ├── customerVoucher.api.js
│       │   │   ├── OrderAPI.js
│       │   │   ├── product.api.js
│       │   │   └── sellerAuth.api.js
│       │   ├── constants/
│       │   ├── hooks/
│       │   └── store/
│       ├── features/
│       │   ├── auth/
│       │   │   └── pages/
│       │   │       ├── ForgotPassword.jsx
│       │   │       ├── ForgotPasswordReset.jsx
│       │   │       ├── Login.jsx
│       │   │       ├── Register.jsx
│       │   │       └── SellerLogin.jsx
│       │   ├── cart/
│       │   │   └── pages/
│       │   │       ├── Cart.jsx
│       │   │       └── Checkout.jsx
│       │   ├── community/
│       │   │   └── pages/
│       │   │       ├── Chat.jsx
│       │   │       ├── CommentSection.jsx
│       │   │       ├── Community.jsx
│       │   │       ├── CommunityDetail.jsx
│       │   │       └── CommunityNotifications.jsx
│       │   ├── home/
│       │   │   └── pages/
│       │   │       └── Landing.jsx
│       │   ├── order/
│       │   │   └── pages/
│       │   ├── product/
│       │   │   └── pages/
│       │   │       ├── Category.jsx
│       │   │       ├── Dashboard.jsx
│       │   │       ├── ProductPreview.jsx
│       │   │       └── coba.jsx
│       │   ├── profile/
│       │   │   └── pages/
│       │   │       ├── AccountAddress.jsx
│       │   │       ├── AccountBankCards.jsx
│       │   │       ├── AccountChangePassword.jsx
│       │   │       ├── AccountPasswordReset.jsx
│       │   │       ├── AccountProfile.jsx
│       │   │       ├── Notifications.jsx
│       │   │       ├── Orders.jsx
│       │   │       ├── Privacy.jsx
│       │   │       └── Vouchers.jsx
│       │   └── support/
│       │       └── pages/
│       │           └── Contact.jsx
│       ├── layouts/
│       │   └── MainLayout.jsx
│       └── routes/
│           ├── ExternalRedirect.jsx
│           └── index.jsx
├── routes/
│   ├── api.php
│   ├── console.php
│   └── web.php
├── storage/
├── tests/
├── artisan
├── composer.json
├── package.json
├── phpunit.xml
├── vite.config.js
├── jsconfig.json
└── README.md
```

---

## Preview Desain (Figma)
https://www.figma.com/design/jhlqeUwaSG1pG9v88wX2uY/Lomba-iTech?node-id=0-1&t=4PEJuWBTtiO4bymq-1

## Dokumentasi

