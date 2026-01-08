-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2026 at 04:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spkgudang_saw`
--

-- --------------------------------------------------------

--
-- Table structure for table `cabang`
--

CREATE TABLE `cabang` (
  `id` int(11) NOT NULL,
  `kode_cabang` varchar(10) NOT NULL,
  `nama_cabang` varchar(50) NOT NULL,
  `alamat` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cabang`
--

INSERT INTO `cabang` (`id`, `kode_cabang`, `nama_cabang`, `alamat`) VALUES
(1, 'CB01', 'Gudang Bogor', 'Jalan Perum. Panorama Kemang I Kampung Kandang, RT.03/RW.01, Tegal, Kec. Kemang, Kabupaten Bogor, Jawa Barat 16320'),
(2, 'CB02', 'Gudang Cikarang', 'Jl. Ruko Perum Taman Aster, Jl. Ramin V Blok G3, No. 18, RT.12/RW.09, Kecamatan, Kec. Cikarang Bar., Kabupaten Bekasi, Jawa Barat 17530'),
(3, 'CB03', 'Gudang Bandung', 'Perum Bumi Rancaekek Kencana, Blok 13 No. 61, Jln. Dahlia, Rancaekek Wetan, Kec. Rancaekek, Kabupaten Bandung, Jawa Barat 40394'),
(4, 'CB04', 'Gudang Yogyakarta', 'Gg. Kenari II, UH. V1. 873. B. Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Jawa Tengah 55162'),
(5, 'CB05', 'Gudang Surabaya', 'Jl. Delta Sari Indah, Blok AA No.49, Koreksari, Kureksari, Kec.Waru, Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61256'),
(6, 'CB06', 'Gudang Bali', 'Jl.Glogor Indah, Gg. III No.07, Pemogan, Denpasar Selatan, Kota Denpasar, Bali 80221'),
(7, 'CB07', 'Gudang Pekanbaru', 'Jl. Todak No.113 Tangkerang Barat, Kec. Marpoyan Damai, Kota. Pekanbaru, Prov. Riau 28124'),
(8, 'CB08', 'Gudang Medan', 'Jl. Brigjend Katamso, A U R, Kec. Medan Maimun, Kota Medan, Sumatera Utara');

-- --------------------------------------------------------

--
-- Table structure for table `hasil_saw`
--

CREATE TABLE `hasil_saw` (
  `id` int(11) NOT NULL,
  `cabang_id` int(11) NOT NULL,
  `nama_cabang` varchar(255) NOT NULL,
  `nilai` decimal(10,4) NOT NULL,
  `ranking` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hasil_saw`
--

INSERT INTO `hasil_saw` (`id`, `cabang_id`, `nama_cabang`, `nilai`, `ranking`) VALUES
(1, 3, 'Gudang Bandung', 0.9700, 1),
(2, 7, 'Gudang Pekanbaru', 0.9339, 2),
(3, 6, 'Gudang Bali', 0.9052, 3),
(4, 1, 'Gudang Bogor', 0.8732, 4),
(5, 8, 'Gudang Medan', 0.8146, 5),
(6, 2, 'Gudang Cikarang', 0.7935, 6),
(7, 5, 'Gudang Surabaya', 0.7426, 7),
(8, 4, 'Gudang Yogyakarta', 0.6478, 8);

-- --------------------------------------------------------

--
-- Table structure for table `kriteria`
--

CREATE TABLE `kriteria` (
  `id` int(11) NOT NULL,
  `kode_kriteria` varchar(10) NOT NULL,
  `nama_kriteria` varchar(50) NOT NULL,
  `tipe` enum('benefit','cost') NOT NULL,
  `bobot` decimal(5,2) NOT NULL,
  `cara_penilaian` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kriteria`
--

INSERT INTO `kriteria` (`id`, `kode_kriteria`, `nama_kriteria`, `tipe`, `bobot`, `cara_penilaian`) VALUES
(1, 'C1', 'Penjualan', 'benefit', 0.35, 'Semakin tinggi total penjualan cabang, semakin baik nilainya.'),
(2, 'C2', 'Jumlah Produk Terjual', 'benefit', 0.25, 'Cabang dengan jumlah produk terjual lebih banyak akan mendapat nilai lebih tinggi.'),
(3, 'C3', 'Produk Terlaris', 'benefit', 0.25, 'Semakin sering sebuah produk menjadi produk terlaris di cabang, semakin tinggi nilainya.'),
(4, 'C4', 'Jarak Gudang', 'cost', 0.15, 'Semakin dekat jarak cabang ke gudang, semakin baik nilainya (biaya distribusi lebih rendah).');

-- --------------------------------------------------------

--
-- Table structure for table `penilaian`
--

CREATE TABLE `penilaian` (
  `id` int(11) NOT NULL,
  `cabang_id` int(11) NOT NULL,
  `kriteria_id` int(11) NOT NULL,
  `nilai` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penilaian`
--

INSERT INTO `penilaian` (`id`, `cabang_id`, `kriteria_id`, `nilai`, `created_at`) VALUES
(33, 1, 1, 85.00, '2026-01-02 19:42:37'),
(34, 1, 2, 80.00, '2026-01-02 19:42:37'),
(35, 1, 3, 90.00, '2026-01-02 19:42:37'),
(36, 1, 4, 7.00, '2026-01-02 19:42:37'),
(37, 2, 1, 78.00, '2026-01-02 19:42:37'),
(38, 2, 2, 75.00, '2026-01-02 19:42:37'),
(39, 2, 3, 85.00, '2026-01-02 19:42:37'),
(40, 2, 4, 10.00, '2026-01-02 19:42:37'),
(41, 3, 1, 92.00, '2026-01-02 19:42:37'),
(42, 3, 2, 88.00, '2026-01-02 19:42:37'),
(43, 3, 3, 95.00, '2026-01-02 19:42:37'),
(44, 3, 4, 5.00, '2026-01-02 19:42:37'),
(45, 4, 1, 66.00, '2026-01-02 19:42:37'),
(46, 4, 2, 70.00, '2026-01-02 19:42:37'),
(47, 4, 3, 60.00, '2026-01-02 19:42:37'),
(48, 4, 4, 15.00, '2026-01-02 19:42:37'),
(49, 5, 1, 74.00, '2026-01-02 19:42:37'),
(50, 5, 2, 78.00, '2026-01-02 19:42:37'),
(51, 5, 3, 72.00, '2026-01-02 19:42:37'),
(52, 5, 4, 12.00, '2026-01-02 19:42:37'),
(53, 6, 1, 88.00, '2026-01-02 19:42:37'),
(54, 6, 2, 85.00, '2026-01-02 19:42:37'),
(55, 6, 3, 87.00, '2026-01-02 19:42:37'),
(56, 6, 4, 6.00, '2026-01-02 19:42:37'),
(57, 7, 1, 85.00, '2026-01-02 19:42:37'),
(58, 7, 2, 88.00, '2026-01-02 19:42:37'),
(59, 7, 3, 80.00, '2026-01-02 19:42:37'),
(60, 7, 4, 4.00, '2026-01-02 19:42:37'),
(61, 8, 1, 81.00, '2026-01-02 19:42:37'),
(62, 8, 2, 77.00, '2026-01-02 19:42:37'),
(63, 8, 3, 84.00, '2026-01-02 19:42:37'),
(64, 8, 4, 9.00, '2026-01-02 19:42:37');

-- --------------------------------------------------------

--
-- Table structure for table `penjualan`
--

CREATE TABLE `penjualan` (
  `id` int(11) NOT NULL,
  `cabang_id` int(11) NOT NULL,
  `produk` varchar(50) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penjualan`
--

INSERT INTO `penjualan` (`id`, `cabang_id`, `produk`, `jumlah`, `created_at`) VALUES
(1, 1, 'Swiss Standart 2cm', 100, '2025-12-29 01:26:17'),
(2, 2, 'Swiss standart 2cm', 35, '2025-12-29 01:32:38'),
(3, 6, 'Swiss Premium 2,5cm', 1000, '2025-12-29 01:33:58'),
(4, 3, 'Swiss Premium 3cm', 120, '2025-12-29 01:34:19'),
(5, 5, 'Swiss Platinum 3cm', 100, '2025-12-29 01:34:41'),
(6, 7, 'Jepang Deluxe 3cm', 15, '2025-12-29 01:35:02'),
(7, 7, 'Swiss Platinum 4cm', 55, '2025-12-29 01:35:23'),
(8, 8, 'Swiss Premium 4cm', 127, '2025-12-29 01:35:44'),
(9, 6, 'Swiss Premium 3cm', 125, '2025-12-29 01:36:17'),
(10, 4, 'Swiss Standart 2cm', 45, '2025-12-29 01:36:40'),
(11, 3, 'Golf Platinum 1,5cm', 240, '2025-12-29 05:44:39'),
(12, 2, 'Swiss Standart 2cm', 120, '2025-12-29 06:07:40'),
(15, 5, 'Swiss Platinum 3cm', 2000, '2026-01-02 12:14:32');

-- --------------------------------------------------------

--
-- Stand-in structure for view `ranking_saw`
-- (See below for the actual view)
--
CREATE TABLE `ranking_saw` (
`cabang_id` int(11)
,`nama_cabang` varchar(50)
,`skor` decimal(43,8)
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', '1234');

-- --------------------------------------------------------

--
-- Structure for view `ranking_saw`
--
DROP TABLE IF EXISTS `ranking_saw`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `ranking_saw`  AS SELECT `p`.`cabang_id` AS `cabang_id`, `c`.`nama_cabang` AS `nama_cabang`, sum(case when `k`.`tipe` = 'benefit' then `p`.`nilai` / (select max(`penilaian`.`nilai`) from `penilaian` where `penilaian`.`kriteria_id` = `p`.`kriteria_id`) * `k`.`bobot` when `k`.`tipe` = 'cost' then (select min(`penilaian`.`nilai`) from `penilaian` where `penilaian`.`kriteria_id` = `p`.`kriteria_id`) / `p`.`nilai` * `k`.`bobot` end) AS `skor` FROM ((`penilaian` `p` join `cabang` `c` on(`p`.`cabang_id` = `c`.`id`)) join `kriteria` `k` on(`p`.`kriteria_id` = `k`.`id`)) GROUP BY `p`.`cabang_id` ORDER BY sum(case when `k`.`tipe` = 'benefit' then `p`.`nilai` / (select max(`penilaian`.`nilai`) from `penilaian` where `penilaian`.`kriteria_id` = `p`.`kriteria_id`) * `k`.`bobot` when `k`.`tipe` = 'cost' then (select min(`penilaian`.`nilai`) from `penilaian` where `penilaian`.`kriteria_id` = `p`.`kriteria_id`) / `p`.`nilai` * `k`.`bobot` end) DESC ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cabang`
--
ALTER TABLE `cabang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hasil_saw`
--
ALTER TABLE `hasil_saw`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cabang_id` (`cabang_id`);

--
-- Indexes for table `kriteria`
--
ALTER TABLE `kriteria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cabang` (`cabang_id`),
  ADD KEY `fk_kriteria` (`kriteria_id`);

--
-- Indexes for table `penjualan`
--
ALTER TABLE `penjualan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cabang_id` (`cabang_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cabang`
--
ALTER TABLE `cabang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `hasil_saw`
--
ALTER TABLE `hasil_saw`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `kriteria`
--
ALTER TABLE `kriteria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `penilaian`
--
ALTER TABLE `penilaian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `penjualan`
--
ALTER TABLE `penjualan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hasil_saw`
--
ALTER TABLE `hasil_saw`
  ADD CONSTRAINT `hasil_saw_ibfk_1` FOREIGN KEY (`cabang_id`) REFERENCES `cabang` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `hasil_saw_ibfk_2` FOREIGN KEY (`cabang_id`) REFERENCES `cabang` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD CONSTRAINT `fk_cabang` FOREIGN KEY (`cabang_id`) REFERENCES `cabang` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_kriteria` FOREIGN KEY (`kriteria_id`) REFERENCES `kriteria` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `penilaian_ibfk_1` FOREIGN KEY (`cabang_id`) REFERENCES `cabang` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `penilaian_ibfk_2` FOREIGN KEY (`kriteria_id`) REFERENCES `kriteria` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `penjualan`
--
ALTER TABLE `penjualan`
  ADD CONSTRAINT `penjualan_ibfk_1` FOREIGN KEY (`cabang_id`) REFERENCES `cabang` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
