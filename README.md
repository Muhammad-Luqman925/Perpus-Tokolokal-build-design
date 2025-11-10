## Nama Project : TokoLokal

TokoLokal adalah website e-commerce yang dibangun menggunakan **React** (frontend) dan **Laravel** (backend).  
Proyek ini dirancang untuk mempermudah proses jual-beli produk lokal dengan tampilan yang modern.

---

## Fitur Utama

- **Autentikasi Pengguna**

Fitur yang memungkinkan pengguna untuk mendaftar, masuk (login), dan mengelola sesi akun secara aman menggunakan Laravel Sanctum.
  
- **Manajemen Produk**

Fitur bagi Admin/Seller untuk mengelola daftar produk, termasuk menambah, mengubah, menghapus, dan menampilkan produk. Informasi yang dikelola mencakup nama, harga, deskripsi, kategori, stok, serta unggahan gambar produk.
  
- **Keranjang Belanja (Cart)**

Pengguna dapat menambahkan produk ke keranjang, melihat daftar item yang tersimpan, serta mengetahui total harga keseluruhan. Dari halaman keranjang, pengguna dapat melanjutkan proses ke tahap pembelian (checkout).

- **Checkout & Transaksi**

Pengguna dapat memilih satu atau beberapa produk untuk dibeli sekaligus, memilih metode pembayaran, serta melihat rincian total harga dari pesanan yang akan diproses.

- **Dashboard Admin (Filament)**

Menyediakan sistem administrasi berbasis Filament yang memungkinkan Admin/Seller melakukan pengelolaan data secara penuh melalui operasi CRUD terhadap produk yang mereka miliki.
  
---

## Tech Stack

| Bagian | Teknologi |
|--------|------------|
| **Frontend** | React, Vite, Tailwind CSS |
| **Backend** | Laravel 11, Filament, MySQL |
| **Autentikasi** | Laravel Sanctum |

---

## ⚙️ Instalasi & Setup

### 1. Clone Repository
```bash
git clone https://github.com/username/TokoLokal.git
cd TokoLokal
```

### 2. Setup Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

### 3. Setup Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

Pastikan backend sudah berjalan di `http://127.0.0.1:8000`  
dan frontend di `http://localhost:5173`

---

## Struktur Direktori

```
.
├─ app/
│  ├─ Filament/
│  │  └─ Pages/Auth/Login.php
│  ├─ Http/
│  │  └─ Controllers/Api/
│  │     ├─ ProductController.php
│  │     ├─ CartController.php
│  │     ├─ CheckoutController.php
│  │     ├─ CustomerProfileController.php
│  │     ├─ CustomerAddressController.php
│  │     ├─ CustomerPaymentMethodController.php
│  │     ├─ CustomerSessionController.php
│  │     ├─ VoucherController.php
│  │     ├─ OrderController.php
│  │     └─ SellerRegistrationController.php
│  ├─ Models/
│  │  ├─ Product.php
│  │  └─ User.php
│  └─ Providers/
│     └─ Filament/AdminPanelProvider.php
├─ bootstrap/
├─ config/
├─ database/
│  ├─ migrations/
│  └─ seeders/
│     ├─ DatabaseSeeder.php
│     ├─ UserSeeder.php
│     ├─ ProductSeeder.php
│     ├─ PaymentChannelSeeder.php
│     ├─ VoucherSeeder.php
│     └─ OrderDummySeeder.php
├─ public/
│  └─ storage -> ../storage/app/public
├─ resources/
│  ├─ js/
│  │  ├─ core/api/
│  │  │  ├─ axios.js
│  │  │  ├─ product.api.js
│  │  │  ├─ cart.api.js
│  │  │  ├─ checkout.api.js
│  │  │  ├─ customerProfile.api.js
│  │  │  ├─ customerAddress.api.js
│  │  │  ├─ customerPayment.api.js
│  │  │  ├─ customerSession.api.js
│  │  │  ├─ customerVoucher.api.js
│  │  │  ├─ customerPassword.api.js
│  │  │  └─ sellerAuth.api.js
│  │  ├─ features/
│  │  │  ├─ auth/pages/
│  │  │  │  ├─ Login.jsx
│  │  │  │  ├─ Register.jsx
│  │  │  │  ├─ ForgotPassword.jsx
│  │  │  │  ├─ ForgotPasswordReset.jsx
│  │  │  │  └─ SellerLogin.jsx
│  │  │  ├─ cart/pages/
│  │  │  │  ├─ Cart.jsx
│  │  │  │  └─ Checkout.jsx
│  │  │  └─ profile/pages/
│  │  │     ├─ AccountProfile.jsx
│  │  │     └─ Vouchers.jsx
│  │  ├─ components/
│  │  │  ├─ navigation/Navbar.jsx
│  │  │  └─ ui/ButtonProperty1Default.jsx
│  │  └─ routes/index.jsx
│  └─ assets/
├─ routes/
│  ├─ api.php
│  └─ web.php
├─ storage/
├─ vendor/
├─ artisan
├─ composer.json
├─ package.json
├─ vite.config.js
├─ phpunit.xml
├─ jsconfig.json
└─ README.md
```

---

## Tim Pengembang

| Nama | Peran | Jobdesk |
|------|--------|----------|
| **Muhammad Arifin Dafa** | Frontend Developer | Mengembangkan antarmuka pengguna menggunakan React, integrasi API, dan implementasi komponen dinamis dengan Tailwind. |
| **Muhammad Luqman** | Backend Developer | Membangun REST API dengan Laravel, mengelola database dan autentikasi, serta integrasi dengan Filament untuk dashboard admin. |
| **Allya Putri Ditya** | UI/UX Designer | Mendesain tampilan website di Figma, membuat wireframe, user flow, serta memastikan konsistensi visual dan kemudahan navigasi. |
| **Muhammad Arsy Al-Fahd** | UI/UX Designer | Mengembangkan sistem warna, layout responsif, dan elemen interaktif berbasis user research untuk pengalaman pengguna yang optimal. |

---

## Preview Desain (Figma)
https://www.figma.com/design/jhlqeUwaSG1pG9v88wX2uY/Lomba-iTech?node-id=0-1&t=4PEJuWBTtiO4bymq-1
