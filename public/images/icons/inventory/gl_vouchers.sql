-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 22, 2025 at 11:05 AM
-- Server version: 8.0.42-0ubuntu0.22.04.1
-- PHP Version: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql_clubapi_com_main`
--

-- --------------------------------------------------------

--
-- Table structure for table `gl_vouchers`
--

CREATE TABLE `gl_vouchers` (
  `id` bigint UNSIGNED NOT NULL,
  `company_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branch_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `voucher_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `voucher_serial` int NOT NULL,
  `voucher_date` datetime NOT NULL,
  `debit_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `credit_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `description` text COLLATE utf8mb4_unicode_ci,
  `document` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bank_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bank_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payee_bank` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cheque_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cheque_date` datetime DEFAULT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `entry_date` datetime NOT NULL,
  `entry_time` int NOT NULL,
  `payment_mode` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paid_status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paid_by` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paid_date` datetime DEFAULT NULL,
  `checked_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `checked_at` datetime DEFAULT NULL,
  `authorized_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `authorized_at` datetime DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `type` text COLLATE utf8mb4_unicode_ci,
  `is_parent` text COLLATE utf8mb4_unicode_ci,
  `program_id` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `program_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employee_id` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplier_id` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `previous_customer_id` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fixed_asset` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shop_id` int UNSIGNED DEFAULT NULL,
  `invoice_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voucher_type` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gl_vouchers`
--
ALTER TABLE `gl_vouchers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gl_vouchers_voucher_number_index` (`voucher_number`),
  ADD KEY `gl_vouchers_account_code_index` (`account_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gl_vouchers`
--
ALTER TABLE `gl_vouchers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
