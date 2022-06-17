-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 23, 2019 at 09:17 AM
-- Server version: 5.7.28-0ubuntu0.16.04.2
-- PHP Version: 7.0.33-0ubuntu0.16.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dery`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(128) NOT NULL,
  `level` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `username`, `password`, `level`) VALUES
(1, 'admin', '$2y$10$OSECT.MydYjNvELwXKnSD.aEO7ap9NpM0Yg4hUuf/2hH6Lb/Y9KFG', 1);

-- --------------------------------------------------------

--
-- Table structure for table `detail_pesanan`
--

CREATE TABLE `detail_pesanan` (
  `id_detail_pesanan` int(11) NOT NULL,
  `id_pesanan` varchar(15) NOT NULL,
  `id_paket` int(11) NOT NULL,
  `harga` int(11) NOT NULL,
  `jumlah` varchar(16) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `detail_pesanan`
--

INSERT INTO `detail_pesanan` (`id_detail_pesanan`, `id_pesanan`, `id_paket`, `harga`, `jumlah`) VALUES
(5, 'ORDER00001', 2, 7000, '8000'),
(6, 'ORDER00001', 3, 2000, '2000'),
(7, 'ORDER00002', 2, 7000, '8000'),
(8, 'ORDER00002', 3, 2000, '2000'),
(9, 'ORDER00002', 4, 7000, '7000'),
(10, 'ORDER00003', 2, 7000, '8000'),
(11, 'ORDER00004', 2, 7000, '21000'),
(12, 'ORDER00005', 2, 7000, '10000'),
(13, 'ORDER00006', 2, 7000, ''),
(14, 'ORDER00007', 2, 7000, '14000'),
(15, 'ORDER00007', 3, 2000, '2000'),
(16, 'ORDER00007', 4, 7000, '7000');

-- --------------------------------------------------------

--
-- Table structure for table `diskon`
--

CREATE TABLE `diskon` (
  `id_diskon` varchar(15) NOT NULL,
  `diskon` int(11) NOT NULL,
  `id_pelanggan` varchar(15) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `no_pesanan` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `diskon`
--

INSERT INTO `diskon` (`id_diskon`, `diskon`, `id_pelanggan`, `status`, `no_pesanan`) VALUES
('SEFA00001', 10, 'COS00003', 1, 'ORDER00005'),
('SEFA00002', 10, 'COS00003', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `kategori_paket`
--

CREATE TABLE `kategori_paket` (
  `id_kategori` int(11) NOT NULL,
  `kategori` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kategori_paket`
--

INSERT INTO `kategori_paket` (`id_kategori`, `kategori`) VALUES
(2, 'Laundry Kiloan'),
(3, 'Laundry Satuan'),
(4, 'laundry gosk'),
(5, 'cuci tanpa gosok');

-- --------------------------------------------------------

--
-- Table structure for table `paket`
--

CREATE TABLE `paket` (
  `id_paket` int(11) NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `paket` varchar(256) NOT NULL,
  `harga_paket` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `paket`
--

INSERT INTO `paket` (`id_paket`, `id_kategori`, `paket`, `harga_paket`) VALUES
(2, 2, 'Cuci Komplit Reguler (max 3 hari) ', '7000'),
(3, 2, 'asasas', '2000'),
(4, 2, 'adasda', '7000');

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id_pelanggan` varchar(15) NOT NULL,
  `nama` varchar(64) NOT NULL,
  `email` varchar(100) NOT NULL,
  `alamat` varchar(256) NOT NULL,
  `telp` varchar(13) NOT NULL,
  `password` varchar(128) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`id_pelanggan`, `nama`, `email`, `alamat`, `telp`, `password`, `created`) VALUES
('COS00001', 'sda', 'root@gmail.com', 'asdadasdasd', '089603786637', '$2y$10$eM7pKPamOcxh00pjdmpYaeMy4ADkDK0cU2kgohuHNAuCldYfYDoHm', '2019-11-15 15:24:08'),
('COS00003', 'adul', 'adul@plus.com', 'adadadad', '19281938193', '$2y$10$KZsNur3tqwN6B3o/PRCj7.hjKRK245sHCKlXj.yz4o8fbHZId/ekO', '2019-11-17 20:28:01'),
('COS00004', 'deri', 'derisudrajat131@gmail.com', 'jl. hk kp kademangan rt 05 rw 01kec setu tangsel', '081932310107', '$2y$10$Gn4Pad/SKQZKWfZqifiOxegxpaY1/Gvj3d.joHrMytynwpyJqDTNS', '2019-11-19 15:03:18'),
('COS00005', 'arif', 'arif01@gmail.com', 'kp buaran, setu, tangsel', '089568000989', '$2y$10$4oZnD6YLJ/HVrAqx7IFhoeEDGpjbt2bYL7ILr0nlgmUbbnDVz7jYy', '2019-11-22 17:43:51');

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE `pesanan` (
  `id_pesanan` varchar(15) NOT NULL,
  `waktu_pesan` datetime NOT NULL,
  `status_pesanan` int(11) NOT NULL DEFAULT '0',
  `total_harga` int(11) NOT NULL,
  `status_lunas` int(11) NOT NULL DEFAULT '0',
  `waktu_selesai` datetime NOT NULL,
  `id_pelanggan` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`id_pesanan`, `waktu_pesan`, `status_pesanan`, `total_harga`, `status_lunas`, `waktu_selesai`, `id_pelanggan`) VALUES
('ORDER00001', '2019-11-18 12:00:29', 2, 10000, 1, '2019-11-20 11:00:43', 'COS00001'),
('ORDER00002', '2019-11-18 11:00:17', 2, 17000, 1, '2019-11-20 12:00:56', 'COS00003'),
('ORDER00003', '2019-11-23 11:00:46', 2, 8000, 1, '2019-11-30 03:39:04', 'COS00003'),
('ORDER00004', '2019-11-22 11:00:23', 2, 21000, 1, '2019-11-23 10:00:36', 'COS00004'),
('ORDER00005', '2019-11-23 12:00:16', 2, 10000, 1, '2019-11-23 23:39:51', 'COS00003'),
('ORDER00006', '2019-11-25 00:25:22', 2, 0, 1, '2019-11-26 00:31:17', 'COS00003'),
('ORDER00007', '2019-11-26 00:44:48', 2, 23000, 1, '2019-11-27 00:47:41', 'COS00005');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `detail_pesanan`
--
ALTER TABLE `detail_pesanan`
  ADD PRIMARY KEY (`id_detail_pesanan`);

--
-- Indexes for table `diskon`
--
ALTER TABLE `diskon`
  ADD PRIMARY KEY (`id_diskon`);

--
-- Indexes for table `kategori_paket`
--
ALTER TABLE `kategori_paket`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `paket`
--
ALTER TABLE `paket`
  ADD PRIMARY KEY (`id_paket`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id_pelanggan`);

--
-- Indexes for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id_pesanan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `detail_pesanan`
--
ALTER TABLE `detail_pesanan`
  MODIFY `id_detail_pesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `kategori_paket`
--
ALTER TABLE `kategori_paket`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `paket`
--
ALTER TABLE `paket`
  MODIFY `id_paket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
