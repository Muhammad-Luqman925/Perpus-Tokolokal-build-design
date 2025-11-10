-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 09, 2025 at 06:16 AM
-- Server version: 8.0.30
-- PHP Version: 8.3.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tokolokal`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint UNSIGNED NOT NULL,
  `customer_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `variant` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `is_selected` tinyint(1) NOT NULL DEFAULT '0',
  `note` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `customer_id`, `product_id`, `variant`, `quantity`, `is_selected`, `note`, `created_at`, `updated_at`) VALUES
(6, 1, 2, 'Small', 3, 0, NULL, '2025-11-01 21:57:50', '2025-11-03 21:28:20');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `phone_number`, `gender`, `avatar`, `date_of_birth`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Muhammad Luqman', 'Luqman@gmail.com', '081258459491', 'Male', 'avatars/kjFFR8ZG54zO2vojaHUp0fSYidaJstiQCk0Ap8ai.png', '2005-02-19', '$2y$12$xydsZdcLiKVhq85Zd5osDuq/YL17d6hcjIlrPEvNna9c/HBp1jizS', NULL, '2025-10-31 04:37:09', '2025-11-02 00:34:40'),
(4, 'Marukooo', 'maruko@example.com', '081234567890', 'male', 'https://ui-avatars.com/api/?name=Giuseppe', '1994-12-18', '$2y$12$nd8B2/LJrdg7IRLJy3sYYuj4hTj1ppkiSZnXl10G7MCVuVxP/DXpK', NULL, '2025-11-05 05:27:32', '2025-11-05 05:27:32');

-- --------------------------------------------------------

--
-- Table structure for table `customer_addresses`
--

CREATE TABLE `customer_addresses` (
  `id` bigint UNSIGNED NOT NULL,
  `customer_id` bigint UNSIGNED NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recipient_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line` text COLLATE utf8mb4_unicode_ci,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Indonesia',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `is_primary` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer_addresses`
--

INSERT INTO `customer_addresses` (`id`, `customer_id`, `label`, `recipient_name`, `phone`, `address_line`, `city`, `state`, `postal_code`, `country`, `notes`, `is_primary`, `created_at`, `updated_at`) VALUES
(1, 1, 'Home', 'Muhammad Luqman', '081258459491', 'JL RUMBIA GANG 1 NO 5a SAMARINDA', 'Kota Samarinda', 'Kalimantan Timur', '75116', 'Indonesia', NULL, 0, '2025-11-02 02:00:49', '2025-11-02 06:59:33'),
(2, 1, 'Home', 'Muhammad Luqman', '081258459491', 'JL RUMBIA GANG 1 NO 5a SAMARINDA', 'Kota Samarinda', 'Kalimantan Timur', '75116', 'Indonesia', NULL, 0, '2025-11-02 02:00:51', '2025-11-02 06:59:33'),
(3, 1, 'Home', 'Muhammad Luqman', '081258459491', 'JL RUMBIA GANG 1 NO 5a SAMARINDA', 'Kota Samarinda', 'Kalimantan Timur', '75116', 'Indonesia', NULL, 1, '2025-11-02 02:00:53', '2025-11-02 06:59:33');

-- --------------------------------------------------------

--
-- Table structure for table `customer_payment_methods`
--

CREATE TABLE `customer_payment_methods` (
  `id` bigint UNSIGNED NOT NULL,
  `customer_id` bigint UNSIGNED NOT NULL,
  `payment_channel_id` bigint UNSIGNED NOT NULL,
  `account_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_primary` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer_payment_methods`
--

INSERT INTO `customer_payment_methods` (`id`, `customer_id`, `payment_channel_id`, `account_number`, `account_name`, `is_primary`, `created_at`, `updated_at`) VALUES
(1, 1, 10, '081258459491', 'Muhammad Luqman', 0, '2025-11-02 03:06:00', '2025-11-02 03:06:00'),
(2, 1, 1, '97901391', 'Muhammad Luqman', 0, '2025-11-02 07:00:55', '2025-11-02 07:00:55'),
(3, 1, 2, '40076967', 'Muhammad Luqman', 0, '2025-11-02 07:01:17', '2025-11-02 07:01:17'),
(4, 1, 3, '94661240', 'Muhammad Luqman', 0, '2025-11-02 07:01:33', '2025-11-02 07:01:33'),
(5, 1, 4, '51154934', 'Muhammad Luqman', 0, '2025-11-02 07:01:50', '2025-11-02 07:01:50'),
(6, 1, 5, '58770333', 'Muhammad Luqman', 0, '2025-11-02 07:02:10', '2025-11-02 07:02:10'),
(7, 1, 6, '62995658', 'Muhammad Luqman', 0, '2025-11-02 07:02:26', '2025-11-02 07:02:26'),
(9, 1, 7, '25081357', 'Muhammad Luqman', 0, '2025-11-02 07:02:54', '2025-11-02 07:02:54'),
(10, 1, 8, '24886601', 'Muhammad Luqman', 0, '2025-11-02 07:03:23', '2025-11-02 07:03:23'),
(11, 1, 9, '51029798', 'Muhammad Luqman', 0, '2025-11-02 07:03:49', '2025-11-02 07:03:49'),
(12, 1, 11, '081258459491', 'Muhammad Luqman', 0, '2025-11-02 07:04:11', '2025-11-02 07:04:11'),
(13, 1, 12, '0812589491', 'Muhammad Luqman', 0, '2025-11-02 07:04:36', '2025-11-02 07:04:36');

-- --------------------------------------------------------

--
-- Table structure for table `customer_sessions`
--

CREATE TABLE `customer_sessions` (
  `id` bigint UNSIGNED NOT NULL,
  `customer_id` bigint UNSIGNED NOT NULL,
  `ip_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `platform` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_current` tinyint(1) NOT NULL DEFAULT '0',
  `last_active_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer_sessions`
--

INSERT INTO `customer_sessions` (`id`, `customer_id`, `ip_address`, `user_agent`, `device`, `platform`, `is_current`, `last_active_at`, `created_at`, `updated_at`) VALUES
(1, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-02 06:40:14', '2025-11-02 06:40:14', '2025-11-02 06:40:14'),
(2, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-02 06:56:18', '2025-11-02 06:56:18', '2025-11-02 06:56:18'),
(3, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-02 07:31:50', '2025-11-02 07:31:50', '2025-11-02 07:31:50'),
(4, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-02 08:13:26', '2025-11-02 08:13:26', '2025-11-02 08:13:26'),
(5, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-02 08:43:12', '2025-11-02 08:43:12', '2025-11-02 08:43:12'),
(6, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-02 09:06:06', '2025-11-02 09:06:06', '2025-11-02 09:06:06'),
(7, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-02 20:11:46', '2025-11-02 20:11:46', '2025-11-02 20:11:46'),
(8, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-02 20:39:54', '2025-11-02 20:39:54', '2025-11-02 20:39:54'),
(9, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-02 21:17:03', '2025-11-02 21:17:03', '2025-11-02 21:17:03'),
(10, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-03 21:19:31', '2025-11-03 21:19:31', '2025-11-03 21:19:31'),
(11, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-03 21:21:24', '2025-11-03 21:21:24', '2025-11-03 21:21:24'),
(12, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-03 21:27:03', '2025-11-03 21:27:03', '2025-11-03 21:27:03'),
(13, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-05 03:56:25', '2025-11-05 03:56:25', '2025-11-05 03:56:25'),
(14, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-05 04:09:14', '2025-11-05 04:09:14', '2025-11-05 04:09:14'),
(15, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-05 04:10:27', '2025-11-05 04:10:27', '2025-11-05 04:10:27'),
(16, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-05 04:17:37', '2025-11-05 04:17:37', '2025-11-05 04:17:37'),
(17, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-05 07:52:58', '2025-11-05 07:52:58', '2025-11-05 07:52:58'),
(18, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0', 'WebKit', 'Windows 10.0', 1, '2025-11-05 08:20:44', '2025-11-05 08:20:44', '2025-11-05 08:20:44');

-- --------------------------------------------------------

--
-- Table structure for table `customer_vouchers`
--

CREATE TABLE `customer_vouchers` (
  `id` bigint UNSIGNED NOT NULL,
  `customer_id` bigint UNSIGNED NOT NULL,
  `voucher_id` bigint UNSIGNED NOT NULL,
  `is_used` tinyint(1) NOT NULL DEFAULT '0',
  `redeemed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer_vouchers`
--

INSERT INTO `customer_vouchers` (`id`, `customer_id`, `voucher_id`, `is_used`, `redeemed_at`, `created_at`, `updated_at`) VALUES
(4, 1, 1, 0, '2025-11-05 04:33:30', '2025-11-05 04:33:30', '2025-11-05 04:33:30'),
(5, 1, 2, 0, '2025-11-05 04:33:30', '2025-11-05 04:33:30', '2025-11-05 04:33:30');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_10_29_062853_create_product_table', 1),
(5, '2025_10_29_093357_create_customers_table', 1),
(6, '2025_10_30_143647_create_personal_access_tokens_table', 1),
(7, '2025_10_30_164946_add_gender_to_customers_table', 1),
(8, '2025_10_30_164947_create_cart_items_table', 1),
(9, '2025_11_02_052916_add_variant_to_cart_items_table', 2),
(10, '2025_11_02_075842_add_profile_fields_to_customers_table', 3),
(11, '2025_11_02_091707_create_customer_addresses_table', 4),
(12, '2025_11_02_103404_create_payment_channels_table', 5),
(13, '2025_11_02_130339_create_vouchers_table', 6),
(14, '2025_11_02_130353_create_customer_vouchers_table', 6),
(15, '2025_11_02_142421_create_customer_sessions_table', 7),
(16, '2025_11_05_123954_create_orders_table', 8),
(17, '2025_11_05_124010_create_order_items_table', 8),
(18, '2025_11_05_124021_create_order_shippings_table', 8),
(19, '2025_11_05_124038_create_order_reviews_table', 8),
(20, '2025_11_05_160016_add_tracking_and_review_to_orders_table', 9);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint UNSIGNED NOT NULL,
  `order_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint UNSIGNED NOT NULL,
  `seller_id` bigint UNSIGNED DEFAULT NULL,
  `address_id` bigint UNSIGNED DEFAULT NULL,
  `payment_method_id` bigint UNSIGNED DEFAULT NULL,
  `voucher_id` bigint UNSIGNED DEFAULT NULL,
  `subtotal` decimal(12,2) NOT NULL DEFAULT '0.00',
  `shipping_cost` decimal(12,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `grand_total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `courier_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `courier_service` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_estimate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','processing','shipped','delivered','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `shipping_tracking` json DEFAULT NULL,
  `review` json DEFAULT NULL,
  `payment_status` enum('unpaid','paid','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unpaid',
  `paid_at` timestamp NULL DEFAULT NULL,
  `cancelled_reason` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_code`, `customer_id`, `seller_id`, `address_id`, `payment_method_id`, `voucher_id`, `subtotal`, `shipping_cost`, `discount`, `grand_total`, `courier_name`, `courier_service`, `shipping_estimate`, `status`, `shipping_tracking`, `review`, `payment_status`, `paid_at`, `cancelled_reason`, `created_at`, `updated_at`) VALUES
(2, 'QX711LXN', 4, 14, NULL, NULL, NULL, '249000.00', '15000.00', '0.00', '264000.00', 'J&T Express', 'EZ (Reguler)', '2–3 Hari', 'processing', NULL, NULL, 'paid', '2025-11-05 05:27:32', NULL, '2025-11-05 05:27:32', '2025-11-05 05:27:32');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED DEFAULT NULL,
  `seller_id` bigint UNSIGNED DEFAULT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `variant` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(12,2) NOT NULL,
  `quantity` int NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `seller_id`, `product_name`, `variant`, `price`, `quantity`, `subtotal`, `note`, `created_at`, `updated_at`) VALUES
(1, 2, 17, 14, 'Official Xiaomi Compact Hair Dryer H101', 'White', '249000.00', 1, '249000.00', 'Tolong bungkus dengan bubble wrap ya!', '2025-11-05 05:27:32', '2025-11-05 05:27:32');

-- --------------------------------------------------------

--
-- Table structure for table `order_reviews`
--

CREATE TABLE `order_reviews` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `order_item_id` bigint UNSIGNED DEFAULT NULL,
  `customer_id` bigint UNSIGNED NOT NULL,
  `rating` tinyint NOT NULL DEFAULT '0',
  `comment` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_shippings`
--

CREATE TABLE `order_shippings` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `courier_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `courier_service` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tracking_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `progress_status` enum('confirmed','prepared','in_transit','out_for_delivery','delivered') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'confirmed',
  `estimated_delivery` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_update` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_shippings`
--

INSERT INTO `order_shippings` (`id`, `order_id`, `courier_name`, `courier_service`, `tracking_number`, `progress_status`, `estimated_delivery`, `last_update`, `created_at`, `updated_at`) VALUES
(1, 2, 'J&T Express', 'EZ', 'JNT874593022ID', 'in_transit', '22 September 2025, 10:00 - 18:00', '2025-11-04 05:27:32', '2025-11-05 05:27:32', '2025-11-05 05:27:32');

-- --------------------------------------------------------

--
-- Table structure for table `payment_channels`
--

CREATE TABLE `payment_channels` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('bank','ewallet') COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_channels`
--

INSERT INTO `payment_channels` (`id`, `name`, `type`, `logo`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'BCA Virtual Account', 'bank', 'https://upload.wikimedia.org/wikipedia/commons/3/36/Bank_Central_Asia_logo.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(2, 'Mandiri Virtual Account', 'bank', 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Bank_Mandiri_logo_2016.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(3, 'BRI Virtual Account', 'bank', 'https://upload.wikimedia.org/wikipedia/commons/6/68/Bank_Rakyat_Indonesia_logo.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(4, 'BNI Virtual Account', 'bank', 'https://upload.wikimedia.org/wikipedia/commons/6/66/BankNegaraIndonesia46-logo.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(5, 'CIMB Niaga Virtual Account', 'bank', 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Logo_CIMB_Niaga.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(6, 'Permata Bank Virtual Account', 'bank', 'https://upload.wikimedia.org/wikipedia/commons/0/0c/PermataBank_logo.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(7, 'Bank Syariah Indonesia (BSI)', 'bank', 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Bank_Syariah_Indonesia_logo.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(8, 'Danamon Virtual Account', 'bank', 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Bank_Danamon_logo.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(9, 'OCBC NISP Virtual Account', 'bank', 'https://upload.wikimedia.org/wikipedia/commons/3/38/Bank_OCBC_NISP_logo.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(10, 'GoPay', 'ewallet', 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Gopay_logo.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(11, 'OVO', 'ewallet', 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_OVO_purple.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(12, 'DANA', 'ewallet', 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Dana_logo.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(13, 'ShopeePay', 'ewallet', 'https://upload.wikimedia.org/wikipedia/commons/8/83/ShopeePay_logo.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(14, 'LinkAja', 'ewallet', 'https://upload.wikimedia.org/wikipedia/commons/0/0c/LinkAja_logo.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(15, 'Jenius Pay', 'ewallet', 'https://upload.wikimedia.org/wikipedia/commons/2/26/Jenius_logo.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(16, 'BluePay', 'ewallet', 'https://upload.wikimedia.org/wikipedia/commons/0/0f/BluePay_logo.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(17, 'Sakuku', 'ewallet', 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Sakuku_logo.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(18, 'Alfamart Payment', 'ewallet', 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Alfamart_logo.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01'),
(19, 'Indomaret Payment', 'ewallet', 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Indomaret_logo.svg', 1, '2025-11-02 02:38:01', '2025-11-02 02:38:01');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\Customer', 1, 'customer_token', '703aa7759917fc8e1ce2119c7b406ad48696fd44467dd5fe4cf3662f1c09030a', '[\"*\"]', NULL, NULL, '2025-10-31 04:37:09', '2025-10-31 04:37:09'),
(2, 'App\\Models\\Customer', 1, 'customer-token', '0a0696d20fc7e6df5b53cf5abc7493efd43e398942af739ef5f9590127e07193', '[\"*\"]', NULL, NULL, '2025-10-31 04:37:15', '2025-10-31 04:37:15'),
(3, 'App\\Models\\Customer', 1, 'customer-token', '043ef1647e69dbc8125940c717a0430c2b417d4785b57e3e29bd5f59061f3e1f', '[\"*\"]', NULL, NULL, '2025-10-31 04:49:26', '2025-10-31 04:49:26'),
(4, 'App\\Models\\Customer', 1, 'customer-token', '52a52d84f4b5f3909bc063c3ae05348b6249181ac467d4f65aa2cb2ecf129fa9', '[\"*\"]', NULL, NULL, '2025-10-31 04:56:35', '2025-10-31 04:56:35'),
(5, 'App\\Models\\Customer', 1, 'customer-token', '8220b13e627e2e7d75dba38c2d3dd947e77ef422263be226deab8ce2b2019ed9', '[\"*\"]', NULL, NULL, '2025-10-31 05:09:51', '2025-10-31 05:09:51'),
(6, 'App\\Models\\Customer', 1, 'customer-token', 'fb5502870740fb3c6506feda07e4b765b3973f2d7ddf775eedf478d7a94d592d', '[\"*\"]', NULL, NULL, '2025-10-31 05:15:43', '2025-10-31 05:15:43'),
(7, 'App\\Models\\Customer', 1, 'customer-token', '3f100563d0eeea84ee422d088f9d1998feb83c7075e77ff0ff5b8b7751f62748', '[\"*\"]', NULL, NULL, '2025-10-31 05:22:06', '2025-10-31 05:22:06'),
(8, 'App\\Models\\Customer', 1, 'customer-token', '0de5bfec173a04c12f0bf144b7463491383d2be6515aa6d6a680b7a74bd28c09', '[\"*\"]', NULL, NULL, '2025-10-31 06:12:57', '2025-10-31 06:12:57'),
(9, 'App\\Models\\Customer', 1, 'customer-token', 'c763f283860b31538baf7b92d1c23e19a23987202d75eb94b9c5466495caf25b', '[\"*\"]', NULL, NULL, '2025-10-31 06:26:33', '2025-10-31 06:26:33'),
(10, 'App\\Models\\Customer', 1, 'customer-token', '259b93ddd7762c52b84b361abd9fdb3f764ea50bd608e5be6595ba7e42d6a5b3', '[\"*\"]', NULL, NULL, '2025-10-31 06:27:17', '2025-10-31 06:27:17'),
(11, 'App\\Models\\Customer', 1, 'customer-token', '0158b910679f34420c0b0840c93fe23849fc3fb3d1dc3717f68d8c419fa4927e', '[\"*\"]', NULL, NULL, '2025-10-31 06:38:20', '2025-10-31 06:38:20'),
(12, 'App\\Models\\Customer', 1, 'customer-token', '0763cbd55140873195be3e5d8f26e2523dbb5d36c06d1b815731d1e5e5ab7644', '[\"*\"]', NULL, NULL, '2025-10-31 06:39:52', '2025-10-31 06:39:52'),
(13, 'App\\Models\\Customer', 1, 'customer-token', 'af7a9def798360c4c7218e54ccd3c0c959c271b0d25729f8c30aa09d795b5cb2', '[\"*\"]', NULL, NULL, '2025-10-31 06:42:22', '2025-10-31 06:42:22'),
(14, 'App\\Models\\Customer', 1, 'customer-token', 'e00e70e9c83a0b401164c270b4d7d62e5090d64d153421133f07885cedbe63c3', '[\"*\"]', NULL, NULL, '2025-10-31 06:43:40', '2025-10-31 06:43:40'),
(15, 'App\\Models\\Customer', 1, 'customer-token', '0012510e7121ac5c46d9cdcb72aaa8048287aa4483a610547b754d32ef1d471f', '[\"*\"]', NULL, NULL, '2025-10-31 07:17:12', '2025-10-31 07:17:12'),
(16, 'App\\Models\\Customer', 1, 'customer-token', '42d02835b0e081a5214463a022b4e8743dba4399b639e75e1a113e03e0409403', '[\"*\"]', NULL, NULL, '2025-10-31 07:58:56', '2025-10-31 07:58:56'),
(17, 'App\\Models\\Customer', 1, 'customer-token', 'e3b61247b8fd12ecbfb2a8d7cb691d5b835bfcdfeb814e8d0b898a9ea24de44a', '[\"*\"]', NULL, NULL, '2025-11-01 15:18:41', '2025-11-01 15:18:41'),
(18, 'App\\Models\\Customer', 1, 'customer-token', '9c22594f3f9ddba08393d582294c9d762131944f44263c005ba45cd86a099a29', '[\"*\"]', NULL, NULL, '2025-11-01 15:47:34', '2025-11-01 15:47:34'),
(19, 'App\\Models\\Customer', 1, 'customer-token', '520e7ee8b1325f356f5e04e6b0a248e954e1342c828377a0333add5e6a0260ab', '[\"*\"]', NULL, NULL, '2025-11-01 15:50:51', '2025-11-01 15:50:51'),
(20, 'App\\Models\\Customer', 1, 'customer-token', 'ecda14164262dbbe95647ca77ba0ccd88b6b38c92c11b52336fad4057bfb525f', '[\"*\"]', NULL, NULL, '2025-11-01 16:03:53', '2025-11-01 16:03:53'),
(21, 'App\\Models\\Customer', 1, 'customer-token', '83fff571e85542a4415e27cc0be2d20e51aa6918054e5b2c0f106659e988b084', '[\"*\"]', NULL, NULL, '2025-11-01 16:19:57', '2025-11-01 16:19:57'),
(22, 'App\\Models\\Customer', 1, 'customer-token', '576c3e0296a8309b99ede2fb2477d79e9779dd9edebe30fc0b0cded1192c9661', '[\"*\"]', NULL, NULL, '2025-11-01 16:26:19', '2025-11-01 16:26:19'),
(23, 'App\\Models\\Customer', 1, 'customer-token', '53848df166205c7ae5c9ada5430902f81ee2dc93bc7e99a9ea8c89b12b8caae5', '[\"*\"]', NULL, NULL, '2025-11-01 16:28:59', '2025-11-01 16:28:59'),
(24, 'App\\Models\\Customer', 1, 'customer-token', '62dfa6ae8eddb699ef0fa93617c5b68c4246954fdfb26a00cee516c185f3cde6', '[\"*\"]', NULL, NULL, '2025-11-01 17:14:08', '2025-11-01 17:14:08'),
(25, 'App\\Models\\Customer', 1, 'customer-token', '785fcaa8ce91d912a9e3fab6cffb19fcf5f32ab22c70a5cbdd4a22880beca3d9', '[\"*\"]', NULL, NULL, '2025-11-01 17:17:19', '2025-11-01 17:17:19'),
(26, 'App\\Models\\Customer', 1, 'customer-token', '2f1e70d0a667b582bc4bc73022154a33b8a9eda1e0e5059b9c00c8a4655165b3', '[\"*\"]', NULL, NULL, '2025-11-01 17:18:33', '2025-11-01 17:18:33'),
(27, 'App\\Models\\Customer', 1, 'customer-token', '41a52cb1bbacc02f9d9b7f55b9c2e20a434015a47a14184aa33976f94aaa9186', '[\"*\"]', '2025-11-01 21:18:18', NULL, '2025-11-01 21:13:47', '2025-11-01 21:18:18'),
(28, 'App\\Models\\Customer', 1, 'customer-token', '6043a33e337c9c2ff0f957a280004969a98b97d7d2d6c50f6b6b120872ccd902', '[\"*\"]', NULL, NULL, '2025-11-01 21:21:59', '2025-11-01 21:21:59'),
(29, 'App\\Models\\Customer', 1, 'customer-token', 'd616a387e9ddf7839c5c91b844a2b92874d5e596999baa04bf2f0b071265583e', '[\"*\"]', '2025-11-01 21:33:37', NULL, '2025-11-01 21:23:05', '2025-11-01 21:33:37'),
(30, 'App\\Models\\Customer', 1, 'customer-token', '36dac6a098eed74f5839216adef116c6f352a6b8ab75c12ee3a82b808378c30c', '[\"*\"]', '2025-11-01 21:34:50', NULL, '2025-11-01 21:34:26', '2025-11-01 21:34:50'),
(31, 'App\\Models\\Customer', 1, 'customer-token', '0b8181537678e191733a383c7aca8579e141ccc552b9325f06c64e76306ece82', '[\"*\"]', '2025-11-01 22:34:47', NULL, '2025-11-01 21:37:50', '2025-11-01 22:34:47'),
(32, 'App\\Models\\Customer', 1, 'customer-token', 'f33dec2fbd4fd3f4401c3456c73c29cf39e222b690d51a220260b9c9f8ea1fe9', '[\"*\"]', '2025-11-01 21:43:39', NULL, '2025-11-01 21:42:50', '2025-11-01 21:43:39'),
(33, 'App\\Models\\Customer', 1, 'customer-token', '817b941680ecfd1202c7d7237dc0d97572d7fe95e8189ca65959463fb2bed0c6', '[\"*\"]', '2025-11-01 21:57:55', NULL, '2025-11-01 21:46:37', '2025-11-01 21:57:55'),
(34, 'App\\Models\\Customer', 1, 'customer-token', '4528542e21eacbc135dee6f9f0308fb3b589468ff8a4a59667aea16ee7e642f5', '[\"*\"]', '2025-11-01 22:38:39', NULL, '2025-11-01 22:35:17', '2025-11-01 22:38:39'),
(35, 'App\\Models\\Customer', 1, 'customer-token', '6b69335976f65c60d6b2cdfd3bf35bfb53e1ab261823e2a1fe22b57187b406e7', '[\"*\"]', '2025-11-01 22:42:28', NULL, '2025-11-01 22:39:09', '2025-11-01 22:42:28'),
(36, 'App\\Models\\Customer', 1, 'customer-token', 'a3465e028b980f452028a96c492ca6d5cdaa0cd41dc2686db558710a8822635a', '[\"*\"]', '2025-11-01 22:54:21', NULL, '2025-11-01 22:42:53', '2025-11-01 22:54:21'),
(37, 'App\\Models\\Customer', 1, 'customer-token', '6d2cb032b4cbcfa35f0e8c067b58ec8663bc86ff515c48c5f24a527e83cc0dec', '[\"*\"]', '2025-11-01 23:30:12', NULL, '2025-11-01 23:00:56', '2025-11-01 23:30:12'),
(38, 'App\\Models\\Customer', 1, 'customer-token', '116f3a689650fdecb13268e686fca3752c152c300dcbc29fa7674e0275336289', '[\"*\"]', '2025-11-02 05:45:48', NULL, '2025-11-02 00:02:51', '2025-11-02 05:45:48'),
(39, 'App\\Models\\Customer', 1, 'customer-token', '30b92e7d926cc5a467385e2d89131ba767cb25e95877385004feb8aee9388ba9', '[\"*\"]', '2025-11-02 00:20:55', NULL, '2025-11-02 00:12:20', '2025-11-02 00:20:55'),
(40, 'App\\Models\\Customer', 1, 'customer-token', '0ac0aa1d122d59e444a4f6f9e36bd913d1f17c86cfec53218217c32d4a59be89', '[\"*\"]', '2025-11-02 00:47:36', NULL, '2025-11-02 00:33:27', '2025-11-02 00:47:36'),
(41, 'App\\Models\\Customer', 1, 'customer-token', 'f765a451e62ca172fad348a3e82f7944ac575b557a8b9fddd86fe0ebc03013a9', '[\"*\"]', '2025-11-02 01:07:09', NULL, '2025-11-02 00:52:05', '2025-11-02 01:07:09'),
(42, 'App\\Models\\Customer', 1, 'customer-token', '3847772e394bb71760dc736f3da4444ede714c1c1d97c79cb2b568738814794f', '[\"*\"]', '2025-11-02 01:47:00', NULL, '2025-11-02 01:44:47', '2025-11-02 01:47:00'),
(43, 'App\\Models\\Customer', 1, 'customer-token', '39227b6a3be8105f127b4a92eb232a30b6250da4e7a124c49d7f6a1f505285e3', '[\"*\"]', '2025-11-02 02:24:19', NULL, '2025-11-02 01:48:09', '2025-11-02 02:24:19'),
(44, 'App\\Models\\Customer', 1, 'customer-token', '6490e994d9c113a345c387492d795733b4759b574e895ebdea1c6f571d3808b7', '[\"*\"]', '2025-11-02 02:55:19', NULL, '2025-11-02 02:54:46', '2025-11-02 02:55:19'),
(45, 'App\\Models\\Customer', 1, 'customer-token', '1654daea9294f122e88d5c1a8c63a0b5f09cf0cf6507271e21a0bcf194344a15', '[\"*\"]', '2025-11-02 03:37:19', NULL, '2025-11-02 03:00:05', '2025-11-02 03:37:19'),
(46, 'App\\Models\\Customer', 1, 'customer-token', 'a7c3168c9dce4a96e59e86add1d7ddfbf61d0f4659c30a16797b8cbe5c9b1633', '[\"*\"]', '2025-11-02 04:48:18', NULL, '2025-11-02 03:57:57', '2025-11-02 04:48:18'),
(47, 'App\\Models\\Customer', 1, 'customer-token', 'e1d1dd95adba322382c265bf20a31499e736c5237c1a24cf9c86e44f76f15f26', '[\"*\"]', '2025-11-02 21:03:55', NULL, '2025-11-02 05:41:30', '2025-11-02 21:03:55'),
(48, 'App\\Models\\Customer', 1, 'customer-token', 'fd1453bb5311f1e77178d4394b06a2ada691a69fbb98226d122a79a60d62c8ae', '[\"*\"]', '2025-11-02 06:04:16', NULL, '2025-11-02 05:59:23', '2025-11-02 06:04:16'),
(49, 'App\\Models\\Customer', 1, 'customer-token', 'bacbeefa60aedae0487b04669640ff67bfd6ae2c85c52240ebbaa36d472b7ac4', '[\"*\"]', '2025-11-02 06:19:22', NULL, '2025-11-02 06:05:34', '2025-11-02 06:19:22'),
(50, 'App\\Models\\Customer', 1, 'customer-token', 'c13c46e11962b612b8515daebe37c7cc74f943d8c83858a4701870a4aad0f182', '[\"*\"]', '2025-11-02 06:54:04', NULL, '2025-11-02 06:40:14', '2025-11-02 06:54:04'),
(51, 'App\\Models\\Customer', 1, 'customer-token', '6698c0d46cd130ba13e6d7d76fd052db7e2d50e0cbb076dff6396e1449f36fbe', '[\"*\"]', '2025-11-02 07:05:50', NULL, '2025-11-02 06:56:18', '2025-11-02 07:05:50'),
(52, 'App\\Models\\Customer', 1, 'customer-token', 'fcf2f2fe29bd2991f4b1198b8389d7359363c506b4ebc93963c14410ac8c3c7a', '[\"*\"]', '2025-11-02 07:32:45', NULL, '2025-11-02 07:31:50', '2025-11-02 07:32:45'),
(53, 'App\\Models\\Customer', 1, 'customer-token', '57cc1f7e07c924a3df2c360f3f3cffdce82fca286746b6dadfe325e93b6133be', '[\"*\"]', '2025-11-02 08:22:18', NULL, '2025-11-02 08:13:26', '2025-11-02 08:22:18'),
(54, 'App\\Models\\Customer', 1, 'customer-token', 'f0b73a1ca13ad2cb15947b0e868cead15a894b99025ec7b518223918f015752c', '[\"*\"]', '2025-11-02 09:05:12', NULL, '2025-11-02 08:43:12', '2025-11-02 09:05:12'),
(55, 'App\\Models\\Customer', 1, 'customer-token', '48331609219acb883abf742d62bc9fcd82479ef399cbf9618bb91daee0b6c4ee', '[\"*\"]', '2025-11-02 09:23:55', NULL, '2025-11-02 09:06:05', '2025-11-02 09:23:55'),
(56, 'App\\Models\\Customer', 1, 'customer-token', 'c08d746ecd2d370d4f312e7ac0934b0fc2c75073bdf7d3ce12d18ca4daf2de5f', '[\"*\"]', '2025-11-02 20:32:03', NULL, '2025-11-02 20:11:46', '2025-11-02 20:32:03'),
(57, 'App\\Models\\Customer', 1, 'customer-token', '84372326cbc0cca344a5884b89b788bcdd569f93a0a23b526c4c48b589ecad1f', '[\"*\"]', '2025-11-02 21:08:22', NULL, '2025-11-02 20:39:54', '2025-11-02 21:08:22'),
(58, 'App\\Models\\Customer', 1, 'customer-token', 'f388ea9708c46914c8e1725e33996c9a06705603de59566f348dd2914b70f04d', '[\"*\"]', '2025-11-02 22:33:13', NULL, '2025-11-02 21:17:03', '2025-11-02 22:33:13'),
(59, 'App\\Models\\Customer', 1, 'customer-token', 'eca763f60f0fc4b6888f79320d69313358650d8411a0d3126f7bb06b21edc097', '[\"*\"]', '2025-11-03 21:21:08', NULL, '2025-11-03 21:19:31', '2025-11-03 21:21:08'),
(60, 'App\\Models\\Customer', 1, 'customer-token', 'bf5fb2a742854fd847f369dd1e925c871fdd3b2503f7d59c23c0d6b67da2ee38', '[\"*\"]', '2025-11-03 21:26:28', NULL, '2025-11-03 21:21:24', '2025-11-03 21:26:28'),
(61, 'App\\Models\\Customer', 1, 'customer-token', 'f60021fef78e2af7e22e165e1cf9ed4f6ce60b731be7d7f38b29d13586178a31', '[\"*\"]', '2025-11-03 21:30:11', NULL, '2025-11-03 21:27:01', '2025-11-03 21:30:11'),
(62, 'App\\Models\\Customer', 1, 'customer-token', '8516c6268fa7318528c7ed0990b90387325896d5dd92060646c2e12d93af7907', '[\"*\"]', '2025-11-05 04:07:32', NULL, '2025-11-05 03:56:24', '2025-11-05 04:07:32'),
(63, 'App\\Models\\Customer', 1, 'customer-token', '3363ad78f97c44ced8243a60e51078f3535bd51474ef818f140fdd2aa5ac90ec', '[\"*\"]', '2025-11-05 04:09:30', NULL, '2025-11-05 04:09:14', '2025-11-05 04:09:30'),
(64, 'App\\Models\\Customer', 1, 'customer-token', '10f3e3f1a66e0acce05fad647f2c57a8822c37dfc8f24fef274172f84119757f', '[\"*\"]', '2025-11-05 04:10:43', NULL, '2025-11-05 04:10:27', '2025-11-05 04:10:43'),
(65, 'App\\Models\\Customer', 1, 'customer-token', 'e018a5d95bf8251b15533dc89f2c19fea415e1101bc054183da83ff08359b766', '[\"*\"]', '2025-11-05 07:52:48', NULL, '2025-11-05 04:17:37', '2025-11-05 07:52:48'),
(66, 'App\\Models\\Customer', 1, 'customer-token', 'ca6bb9f109e128043a06562c281d3af5e77de99035d8ee36570a23973fb78580', '[\"*\"]', '2025-11-05 07:53:29', NULL, '2025-11-05 07:52:58', '2025-11-05 07:53:29'),
(67, 'App\\Models\\Customer', 1, 'customer-token', '0bef8697a582356227b9ccbe88d54048e442e29dedeac2fb9fd83f6e046646ce', '[\"*\"]', '2025-11-05 08:21:14', NULL, '2025-11-05 08:20:44', '2025-11-05 08:21:14');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` int DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `variants` json DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `rating` float NOT NULL DEFAULT '0',
  `is_flash_sale` tinyint(1) NOT NULL DEFAULT '0',
  `flash_sale_price` int DEFAULT NULL,
  `flash_sale_start` timestamp NULL DEFAULT NULL,
  `flash_sale_end` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `user_id`, `name`, `slug`, `description`, `price`, `stock`, `image`, `variants`, `is_active`, `is_featured`, `rating`, `is_flash_sale`, `flash_sale_price`, `flash_sale_start`, `flash_sale_end`, `created_at`, `updated_at`) VALUES
(1, 4, 'Product 1 by Seller 1', 'product-1-by-seller-1-69069fa7114f9', 'Perspiciatis itaque blanditiis nesciunt dolorum magni expedita consequatur dolores fugiat tempora perferendis vitae ut voluptas rerum dolor ut et sed non.', 191471, 60, 'https://images.unsplash.com/photo-1511288598561-891adf3821d0?auto=format&fit=crop&w=700&q=80', '[\"Small\", \"Medium\", \"Large\"]', 1, 0, 4.4, 0, NULL, NULL, NULL, '2025-11-01 16:02:49', '2025-11-01 16:02:49'),
(2, 4, 'Product 2 by Seller 1', 'product-2-by-seller-1-69069fa935e85', 'Sit corporis vel consequatur ex voluptas enim consequatur dolorem optio provident quis ratione incidunt dignissimos et tenetur et omnis assumenda omnis.', 289075, 45, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80', '[\"Small\", \"Medium\", \"Large\"]', 1, 0, 5, 1, 135356, '2025-11-01 14:02:49', '2025-11-29 16:02:49', '2025-11-01 16:02:49', '2025-11-01 16:02:49'),
(3, 4, 'Product 3 by Seller 1', 'product-3-by-seller-1-69069fa936ab2', 'Et optio magni veritatis culpa eum et voluptas nemo blanditiis et voluptatem officiis ea sed consequuntur distinctio.', 170148, 31, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80', '[\"Small\", \"Medium\", \"Large\"]', 1, 1, 4.2, 0, NULL, NULL, NULL, '2025-11-01 16:02:49', '2025-11-01 16:02:49'),
(4, 4, 'Product 4 by Seller 1', 'product-4-by-seller-1-69069fa93733c', 'Fugit assumenda et molestiae qui quas et odio a non pariatur rem adipisci ex ad non est doloribus.', 271049, 97, 'https://images.unsplash.com/photo-1519741497674-611481632552?auto=format&fit=crop&w=700&q=80', '[\"Small\", \"Medium\", \"Large\"]', 1, 0, 4.5, 1, 210433, '2025-11-01 13:02:49', '2025-11-29 16:02:49', '2025-11-01 16:02:49', '2025-11-01 16:02:49'),
(5, 4, 'Product 5 by Seller 1', 'product-5-by-seller-1-69069fa937c01', 'Vero id aut reprehenderit id atque eos odio est recusandae sit qui maxime ut eveniet reprehenderit quia eos voluptates rerum ad voluptatem necessitatibus eaque.', 465686, 56, 'https://images.unsplash.com/photo-1526958977630-bc61b30a2000?auto=format&fit=crop&w=700&q=80', '[\"Small\", \"Medium\", \"Large\"]', 1, 0, 4.8, 0, NULL, NULL, NULL, '2025-11-01 16:02:49', '2025-11-01 16:02:49'),
(6, 5, 'Product 1 by Seller 2', 'product-1-by-seller-2-69069fa93845c', 'Ab consequatur laboriosam doloremque eligendi modi in aut sit rem numquam deleniti vel et sint assumenda dignissimos et placeat numquam.', 227331, 26, 'https://images.unsplash.com/photo-1526958977630-bc61b30a2000?auto=format&fit=crop&w=700&q=80', '[\"Small\", \"Medium\", \"Large\"]', 1, 0, 4.6, 0, NULL, NULL, NULL, '2025-11-01 16:02:49', '2025-11-01 16:02:49'),
(7, 5, 'Product 2 by Seller 2', 'product-2-by-seller-2-69069fa938a6c', 'Quidem eaque nulla iusto vel rerum quibusdam sequi eveniet sunt tenetur molestias similique voluptatum enim sunt in corporis officia suscipit omnis reprehenderit provident.', 177676, 12, 'https://images.unsplash.com/photo-1526958977630-bc61b30a2000?auto=format&fit=crop&w=700&q=80', '[\"Small\", \"Medium\", \"Large\"]', 1, 0, 4.5, 1, 152847, '2025-11-01 15:02:49', '2025-11-29 16:02:49', '2025-11-01 16:02:49', '2025-11-01 16:02:49'),
(8, 5, 'Product 3 by Seller 2', 'product-3-by-seller-2-69069fa938f92', 'Delectus molestiae delectus aspernatur quia quas est ab enim voluptas soluta ut nemo omnis impedit voluptatum velit dolor numquam mollitia ex rerum quasi nulla rem neque et.', 436535, 10, 'https://images.unsplash.com/photo-1511288598561-891adf3821d0?auto=format&fit=crop&w=700&q=80', '[\"Small\", \"Medium\", \"Large\"]', 1, 1, 4.2, 0, NULL, NULL, NULL, '2025-11-01 16:02:49', '2025-11-01 16:02:49'),
(9, 5, 'Product 4 by Seller 2', 'product-4-by-seller-2-69069fa9394f3', 'Fugit reiciendis aliquid odit quia repellendus reprehenderit aut atque maxime voluptatem et ut voluptatem nihil eaque facilis qui incidunt laudantium non et voluptatum perspiciatis iusto nisi sed qui saepe.', 178199, 23, 'https://images.unsplash.com/photo-1615485290832-9936b197d7e2?auto=format&fit=crop&w=700&q=80', '[\"Small\", \"Medium\", \"Large\"]', 1, 0, 4.2, 1, 188462, '2025-11-01 14:02:49', '2025-11-29 16:02:49', '2025-11-01 16:02:49', '2025-11-01 16:02:49'),
(10, 5, 'Product 5 by Seller 2', 'product-5-by-seller-2-69069fa93998b', 'Distinctio quia laboriosam aliquam eius non temporibus dolore autem modi mollitia rem quibusdam sint optio nobis necessitatibus non sunt fugiat rem dolores voluptatem corporis inventore.', 284668, 74, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80', '[\"Small\", \"Medium\", \"Large\"]', 1, 0, 4, 0, NULL, NULL, NULL, '2025-11-01 16:02:49', '2025-11-01 16:02:49'),
(11, 6, 'Product 1 by Seller 3', 'product-1-by-seller-3-69069fa939dd4', 'Qui nemo harum quaerat quisquam et animi soluta perferendis deserunt aut architecto doloribus odio velit laboriosam et eius aut nostrum vitae occaecati autem.', 297338, 97, 'https://images.unsplash.com/photo-1526958977630-bc61b30a2000?auto=format&fit=crop&w=700&q=80', '[\"Small\", \"Medium\", \"Large\"]', 1, 0, 4.9, 0, NULL, NULL, NULL, '2025-11-01 16:02:49', '2025-11-01 16:02:49'),
(12, 6, 'Product 2 by Seller 3', 'product-2-by-seller-3-69069fa93a370', 'Sit doloribus omnis et non ipsa ad enim voluptatem quo vero mollitia eum assumenda aut odit odit dolorum tempore.', 367539, 97, 'https://images.unsplash.com/photo-1511288598561-891adf3821d0?auto=format&fit=crop&w=700&q=80', '[\"Small\", \"Medium\", \"Large\"]', 1, 0, 4.6, 1, 213624, '2025-11-01 15:02:49', '2025-11-29 16:02:49', '2025-11-01 16:02:49', '2025-11-01 16:02:49'),
(13, 6, 'Product 3 by Seller 3', 'product-3-by-seller-3-69069fa93a8af', 'Ipsa nihil quaerat ut similique qui ut rerum et dolore assumenda impedit rerum ut reiciendis at deleniti voluptatum maiores dicta qui dicta inventore pariatur cupiditate modi asperiores incidunt.', 264102, 19, 'https://images.unsplash.com/photo-1511288598561-891adf3821d0?auto=format&fit=crop&w=700&q=80', '[\"Small\", \"Medium\", \"Large\"]', 1, 1, 4, 0, NULL, NULL, NULL, '2025-11-01 16:02:49', '2025-11-01 16:02:49'),
(14, 6, 'Product 4 by Seller 3', 'product-4-by-seller-3-69069fa93af67', 'Amet et inventore ut ut quam vel minus earum sunt qui error accusamus omnis cumque rem quae enim.', 350099, 51, 'https://images.unsplash.com/photo-1519741497674-611481632552?auto=format&fit=crop&w=700&q=80', '[\"Small\", \"Medium\", \"Large\"]', 1, 0, 4, 1, 143264, '2025-11-01 15:02:49', '2025-11-29 16:02:49', '2025-11-01 16:02:49', '2025-11-01 16:02:49'),
(15, 6, 'Product 5 by Seller 3', 'product-5-by-seller-3-69069fa93b4b9', 'Consequuntur explicabo dignissimos rem dolores rerum voluptatem quae ipsam dolor sequi est rerum libero rerum.', 252083, 87, 'https://images.unsplash.com/photo-1511288598561-891adf3821d0?auto=format&fit=crop&w=700&q=80', '[\"Small\", \"Medium\", \"Large\"]', 1, 0, 4.7, 0, NULL, NULL, NULL, '2025-11-01 16:02:49', '2025-11-01 16:02:49'),
(17, 14, 'Official Xiaomi Compact Hair Dryer H101', 'official-xiaomi-compact-hair-dryer-h101-690b50c4dcb27', 'Ringkas dan bisa dilipat, produk original Xiaomi.', 249000, 20, 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80', NULL, 1, 0, 0, 0, NULL, NULL, NULL, '2025-11-05 05:27:32', '2025-11-05 05:27:32');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('user','seller','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `store_slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_description` text COLLATE utf8mb4_unicode_ci,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `store_name`, `phone_number`, `role`, `store_slug`, `store_logo`, `store_description`, `remember_token`, `created_at`, `updated_at`) VALUES
(4, 'Seller 1', 'seller1@example.com', NULL, '$2y$12$b9MgRP06QaFFFwocgATWpu16LXdLNR4DQyhCjnEQ6nf0nWv3HT5VO', 'Toko Seller 1', NULL, 'seller', NULL, NULL, NULL, NULL, '2025-11-01 16:02:47', '2025-11-01 16:02:47'),
(5, 'Seller 2', 'seller2@example.com', NULL, '$2y$12$.MXEb6M5tpBbZSx03qH6AuGJDeuUE6XipbVrYIaY7PCdV7nIPirpC', 'Toko Seller 2', NULL, 'seller', NULL, NULL, NULL, NULL, '2025-11-01 16:02:47', '2025-11-01 16:02:47'),
(6, 'Seller 3', 'seller3@example.com', NULL, '$2y$12$YyMAj2K5Utp3Qg1FXBp9wu4Z6J26EpMiGI.pxNPO.CpT4oZc2lyuu', 'Toko Seller 3', NULL, 'seller', NULL, NULL, NULL, NULL, '2025-11-01 16:02:47', '2025-11-01 16:02:47'),
(14, 'Xiaomi Official Store', 'xiaomi@store.com', '2025-11-05 05:27:32', '$2y$12$8UyJRxFBouB4zehXFYl7CeOkcYiATv9TcCjftBcnMhSdRdUOI0/gO', 'Xiaomi Official Store', NULL, 'seller', 'xiaomi-official', NULL, NULL, 'AbZADx7lh0', '2025-11-05 05:27:32', '2025-11-05 05:27:32');

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` bigint UNSIGNED NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `type` enum('welcome','discount','special','code_only') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'discount',
  `value` decimal(8,2) NOT NULL DEFAULT '0.00',
  `value_type` enum('percent','amount') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'percent',
  `is_auto` tinyint(1) NOT NULL DEFAULT '1',
  `is_public` tinyint(1) NOT NULL DEFAULT '1',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `valid_from` date DEFAULT NULL,
  `valid_until` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`id`, `code`, `title`, `description`, `type`, `value`, `value_type`, `is_auto`, `is_public`, `is_active`, `valid_from`, `valid_until`, `created_at`, `updated_at`) VALUES
(1, 'WELCOME10', 'First Purchase Discount', 'Get 10% off on your first purchase!', 'welcome', '10.00', 'percent', 1, 1, 1, NULL, '2026-05-02', NULL, NULL),
(2, 'EXTRA15', 'Extra 15% Discount', 'Enjoy an additional 15% discount for this month!', 'discount', '15.00', 'percent', 1, 1, 1, NULL, '2025-12-02', NULL, NULL),
(3, 'SECRET50', 'Secret 50% Voucher', 'Hidden voucher! Redeem manually with the code.', 'code_only', '50.00', 'percent', 0, 0, 1, NULL, '2026-01-02', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_items_customer_id_foreign` (`customer_id`),
  ADD KEY `cart_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_email_unique` (`email`);

--
-- Indexes for table `customer_addresses`
--
ALTER TABLE `customer_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_addresses_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `customer_payment_methods`
--
ALTER TABLE `customer_payment_methods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_payment_methods_customer_id_foreign` (`customer_id`),
  ADD KEY `customer_payment_methods_payment_channel_id_foreign` (`payment_channel_id`);

--
-- Indexes for table `customer_sessions`
--
ALTER TABLE `customer_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_sessions_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `customer_vouchers`
--
ALTER TABLE `customer_vouchers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_vouchers_customer_id_foreign` (`customer_id`),
  ADD KEY `customer_vouchers_voucher_id_foreign` (`voucher_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_order_code_unique` (`order_code`),
  ADD KEY `orders_customer_id_foreign` (`customer_id`),
  ADD KEY `orders_seller_id_foreign` (`seller_id`),
  ADD KEY `orders_address_id_foreign` (`address_id`),
  ADD KEY `orders_payment_method_id_foreign` (`payment_method_id`),
  ADD KEY `orders_voucher_id_foreign` (`voucher_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`),
  ADD KEY `order_items_seller_id_foreign` (`seller_id`);

--
-- Indexes for table `order_reviews`
--
ALTER TABLE `order_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_reviews_order_id_foreign` (`order_id`),
  ADD KEY `order_reviews_order_item_id_foreign` (`order_item_id`),
  ADD KEY `order_reviews_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `order_shippings`
--
ALTER TABLE `order_shippings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_shippings_order_id_foreign` (`order_id`);

--
-- Indexes for table `payment_channels`
--
ALTER TABLE `payment_channels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`),
  ADD KEY `products_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vouchers_code_unique` (`code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customer_addresses`
--
ALTER TABLE `customer_addresses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `customer_payment_methods`
--
ALTER TABLE `customer_payment_methods`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `customer_sessions`
--
ALTER TABLE `customer_sessions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `customer_vouchers`
--
ALTER TABLE `customer_vouchers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_reviews`
--
ALTER TABLE `order_reviews`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_shippings`
--
ALTER TABLE `order_shippings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payment_channels`
--
ALTER TABLE `payment_channels`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `customer_addresses`
--
ALTER TABLE `customer_addresses`
  ADD CONSTRAINT `customer_addresses_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `customer_payment_methods`
--
ALTER TABLE `customer_payment_methods`
  ADD CONSTRAINT `customer_payment_methods_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `customer_payment_methods_payment_channel_id_foreign` FOREIGN KEY (`payment_channel_id`) REFERENCES `payment_channels` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `customer_sessions`
--
ALTER TABLE `customer_sessions`
  ADD CONSTRAINT `customer_sessions_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `customer_vouchers`
--
ALTER TABLE `customer_vouchers`
  ADD CONSTRAINT `customer_vouchers_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `customer_vouchers_voucher_id_foreign` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `customer_addresses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_payment_method_id_foreign` FOREIGN KEY (`payment_method_id`) REFERENCES `customer_payment_methods` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_seller_id_foreign` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_voucher_id_foreign` FOREIGN KEY (`voucher_id`) REFERENCES `customer_vouchers` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `order_items_seller_id_foreign` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `order_reviews`
--
ALTER TABLE `order_reviews`
  ADD CONSTRAINT `order_reviews_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_reviews_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_reviews_order_item_id_foreign` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `order_shippings`
--
ALTER TABLE `order_shippings`
  ADD CONSTRAINT `order_shippings_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
