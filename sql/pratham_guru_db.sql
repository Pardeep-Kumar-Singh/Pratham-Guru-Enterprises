-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: pratham_guru_db
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alterentry`
--

DROP TABLE IF EXISTS `alterentry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alterentry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dailyAlterId` int NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` double NOT NULL,
  `qty` double NOT NULL,
  `weight` double NOT NULL,
  `amount` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `AlterEntry_dailyAlterId_fkey` (`dailyAlterId`),
  CONSTRAINT `AlterEntry_dailyAlterId_fkey` FOREIGN KEY (`dailyAlterId`) REFERENCES `dailyalter` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alterentry`
--

LOCK TABLES `alterentry` WRITE;
/*!40000 ALTER TABLE `alterentry` DISABLE KEYS */;
INSERT INTO `alterentry` VALUES (1,1,'Wool','Finish Wool Production','kg',600,0.282,0,169.2),(2,1,'Wool','Finish Wool Production','kg',600,0.539,0,323.4),(3,1,'Wool','Finish Wool Production','kg',600,0.534,0,320.4);
/*!40000 ALTER TABLE `alterentry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artisan`
--

DROP TABLE IF EXISTS `artisan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artisan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `area` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Artisan_mobile_key` (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artisan`
--

LOCK TABLES `artisan` WRITE;
/*!40000 ALTER TABLE `artisan` DISABLE KEYS */;
/*!40000 ALTER TABLE `artisan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dailyalter`
--

DROP TABLE IF EXISTS `dailyalter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dailyalter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `totalQty` double NOT NULL DEFAULT '0',
  `totalWeight` double NOT NULL DEFAULT '0',
  `totalAmount` double NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `DailyAlter_date_key` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dailyalter`
--

LOCK TABLES `dailyalter` WRITE;
/*!40000 ALTER TABLE `dailyalter` DISABLE KEYS */;
INSERT INTO `dailyalter` VALUES (1,'2026-01-09',1.355,0,813,'2026-02-05 18:11:55.963');
/*!40000 ALTER TABLE `dailyalter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dailyproduction`
--

DROP TABLE IF EXISTS `dailyproduction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dailyproduction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `totalQty` double NOT NULL DEFAULT '0',
  `totalWeight` double NOT NULL DEFAULT '0',
  `totalAmount` double NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `DailyProduction_date_key` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dailyproduction`
--

LOCK TABLES `dailyproduction` WRITE;
/*!40000 ALTER TABLE `dailyproduction` DISABLE KEYS */;
INSERT INTO `dailyproduction` VALUES (8,'2026-01-02',22.525,1.028,1095,'2026-02-05 15:59:50.427'),(9,'2026-01-03',30.618,1.602,2250.8,'2026-02-05 16:00:13.366'),(10,'2026-01-05',34.71,10.9,3170,'2026-02-05 16:00:30.148'),(11,'2026-01-07',32.626,1.44,1910.6,'2026-02-05 16:00:45.150'),(12,'2026-01-08',71.051,3.042,4790.6,'2026-02-05 16:01:01.874'),(13,'2026-01-10',34.398,1.748,4028.8,'2026-02-05 16:01:24.460'),(14,'2026-01-12',42.047,1.305,4188.2,'2026-02-05 16:01:39.848'),(15,'2026-01-13',37.982,1.625,3064.2,'2026-02-05 16:03:32.810'),(16,'2026-01-15',53.618,2.157,2044.8,'2026-02-05 16:04:09.890'),(17,'2026-01-16',44.38200000000001,1.88,2838.2,'2026-02-05 16:05:02.400'),(18,'2026-01-17',26.596,1.123,2893.6,'2026-02-05 16:08:48.336'),(19,'2026-01-19',0.114,0,68.4,'2026-02-05 16:09:05.156'),(20,'2026-01-20',28.481,1.453,1394.6,'2026-02-05 16:09:58.291'),(21,'2026-01-21',43.666,1.632,2895.6,'2026-02-05 16:10:25.873'),(22,'2026-01-22',3.852,0.124,1191.2,'2026-02-05 16:11:06.853'),(23,'2026-01-24',16.919,0.588,2781.4,'2026-02-05 16:11:50.724'),(24,'2026-01-27',67.816,3.706,6581.6,'2026-02-05 16:12:08.582'),(25,'2026-01-28',4.952999999999999,0.041,1811.8,'2026-02-05 16:12:23.013'),(26,'2026-01-29',91.066,4.262,5199.6,'2026-02-05 16:12:42.210'),(27,'2026-01-30',79.054,1.987,3658.4,'2026-02-05 16:12:58.154'),(28,'2026-01-31',4.154,0.032,1912.4,'2026-02-05 16:13:15.337'),(29,'2026-01-14',8,0.589,570,'2026-02-05 18:58:02.558');
/*!40000 ALTER TABLE `dailyproduction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoiceNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `month` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int NOT NULL,
  `totalProducts` int NOT NULL,
  `totalWeight` double NOT NULL,
  `totalAmount` double NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pending',
  `generatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Invoice_invoiceNumber_key` (`invoiceNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pcs',
  `baseRate` double NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Product_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Normal Bootie','Bootie','pcs',20,'Active','2026-02-04 12:20:55.281'),(2,'Pig Bootie','Bootie','pcs',22,'Active','2026-02-04 12:20:55.295'),(3,'Boots','Bootie','pcs',25,'Active','2026-02-04 12:20:55.300'),(4,'Normal Cap','Cap','pcs',25,'Active','2026-02-04 12:20:55.305'),(5,'Fancy Cap','Cap','pcs',30,'Active','2026-02-04 12:20:55.312'),(6,'Silai Cap','Cap','pcs',35,'Active','2026-02-04 12:20:55.318'),(7,'Giraffe Cap','Cap','pcs',40,'Active','2026-02-04 12:20:55.323'),(8,'CMB-1 Mitten','Mitten','pcs',55,'Active','2026-02-04 12:20:55.328'),(9,'CMB-2 Mitten','Mitten','pcs',65,'Active','2026-02-04 12:20:55.334'),(10,'2PC Dyper Set','Dyper Set','set',55,'Active','2026-02-04 12:20:55.342'),(11,'3PC Dyper Set','Dyper Set','set',70,'Active','2026-02-04 12:20:55.349'),(12,'Helmet','Helmet','pcs',80,'Active','2026-02-04 12:20:55.355'),(13,'Moti Mermaid','Mermaid','pcs',80,'Active','2026-02-04 12:20:55.361'),(14,'Fancy Mermaid','Mermaid','pcs',70,'Active','2026-02-04 12:20:55.368'),(15,'Skirt','Skirt','pcs',80,'Active','2026-02-04 12:20:55.377'),(16,'Muffler','Muffler','pcs',120,'Active','2026-02-04 12:20:55.384'),(17,'Purse','Purse','pcs',25,'Active','2026-02-04 12:20:55.401'),(18,'Patch','Purse','pcs',80,'Active','2026-02-04 12:20:55.407'),(19,'Normal Bra','Bra','pcs',65,'Active','2026-02-04 12:20:55.414'),(20,'Fancy Bra','Bra','pcs',75,'Active','2026-02-04 12:20:55.421'),(21,'Silai Band','Band','pcs',25,'Active','2026-02-04 12:20:55.430'),(22,'Hair Band Boot','Band','pcs',35,'Active','2026-02-04 12:20:55.439'),(23,'Finish Wool Production','Wool','kg',600,'Active','2026-02-05 15:59:20.104');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productionentry`
--

DROP TABLE IF EXISTS `productionentry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productionentry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dailyProductionId` int NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` double NOT NULL,
  `qty` double NOT NULL,
  `weight` double NOT NULL,
  `amount` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ProductionEntry_dailyProductionId_fkey` (`dailyProductionId`),
  CONSTRAINT `ProductionEntry_dailyProductionId_fkey` FOREIGN KEY (`dailyProductionId`) REFERENCES `dailyproduction` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=179 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productionentry`
--

LOCK TABLES `productionentry` WRITE;
/*!40000 ALTER TABLE `productionentry` DISABLE KEYS */;
INSERT INTO `productionentry` VALUES (29,19,'Wool','Finish Wool Production','kg',600,0.114,0,68.4),(41,8,'Wool','Finish Wool Production','kg',600,0.525,0,315),(42,8,'Bootie','Normal Bootie','pcs',20,1,0,20),(43,8,'Cap','Fancy Cap','pcs',30,9,0,270),(44,8,'Band','Hair Band Boot','pcs',35,1,0,35),(45,8,'Mitten','CMB-1 Mitten','pcs',55,1,0,55),(46,8,'Cap','Giraffe Cap','pcs',40,10,0,400),(47,9,'Wool','Finish Wool Production','kg',600,1.618,0,970.8000000000001),(48,9,'Bootie','Normal Bootie','pcs',20,6,0,120),(49,9,'Mitten','CMB-1 Mitten','pcs',55,20,0,1100),(50,9,'Bootie','Normal Bootie','pcs',20,3,0,60),(51,10,'Wool','Finish Wool Production','kg',600,3.71,0,2226),(52,10,'Bootie','Normal Bootie','pcs',20,4,0,80),(53,10,'Bootie','Pig Bootie','pcs',22,12,0,264),(54,10,'Bootie','Boots','pcs',25,10,0,250),(55,10,'Dyper Set','3PC Dyper Set','set',70,5,0,350),(62,12,'Wool','Finish Wool Production','kg',600,4.051,0,2430.6),(63,12,'Bootie','Normal Bootie','pcs',20,8,0,160),(64,12,'Bootie','Boots','pcs',25,19,0,475),(65,12,'Cap','Fancy Cap','pcs',30,4,0,120),(66,12,'Cap','Silai Cap','pcs',35,11,0,385),(67,12,'Cap','Giraffe Cap','pcs',40,13,0,520),(68,12,'Mitten','CMB-1 Mitten','pcs',55,8,0,440),(69,12,'Bra','Normal Bra','pcs',65,4,0,260),(70,13,'Wool','Finish Wool Production','kg',600,5.398,0,3238.8),(71,13,'Bootie','Normal Bootie','pcs',20,5,0,100),(72,13,'Bootie','Pig Bootie','pcs',22,10,0,220),(73,13,'Bootie','Boots','pcs',25,6,0,150),(74,13,'Cap','Giraffe Cap','pcs',40,8,0,320),(82,15,'Wool','Finish Wool Production','kg',600,2.982,0,1789.2),(83,15,'Bootie','Normal Bootie','pcs',20,5,0,100),(84,15,'Bootie','Boots','pcs',25,8,0,200),(85,15,'Cap','Silai Cap','pcs',35,5,0,175),(86,15,'Cap','Giraffe Cap','pcs',40,9,0,360),(87,15,'Mitten','CMB-1 Mitten','pcs',55,8,0,440),(88,29,'Bra','Fancy Bra','pcs',75,5,0,375),(89,29,'Bra','Normal Bra','pcs',65,3,0,195),(90,16,'Wool','Finish Wool Production','kg',600,0.618,0,370.8),(91,16,'Bootie','Pig Bootie','pcs',22,12,0,264),(92,16,'Bootie','Boots','pcs',25,5,0,125),(93,16,'Cap','Silai Cap','pcs',35,31,0,1085),(94,16,'Cap','Giraffe Cap','pcs',40,5,0,200),(95,17,'Wool','Finish Wool Production','kg',600,2.382,0,1429.2),(96,17,'Bootie','Pig Bootie','pcs',22,17,0,374),(97,17,'Cap','Silai Cap','pcs',35,17,0,595),(98,17,'Mitten','CMB-1 Mitten','pcs',55,8,0,440),(99,18,'Wool','Finish Wool Production','kg',600,3.596,0,2157.6),(100,18,'Bootie','Normal Bootie','pcs',20,1,0,20),(101,18,'Bootie','Pig Bootie','pcs',22,8,0,176),(102,18,'Cap','Fancy Cap','pcs',30,7,0,210),(103,18,'Cap','Giraffe Cap','pcs',40,5,0,200),(104,18,'Mitten','CMB-2 Mitten','pcs',65,2,0,130),(112,20,'Wool','Finish Wool Production','kg',600,0.481,0,288.6),(113,20,'Bootie','Normal Bootie','pcs',20,1,0,20),(114,20,'Bootie','Pig Bootie','pcs',22,8,0,176),(115,20,'Bootie','Boots','pcs',25,2,0,50),(116,20,'Cap','Fancy Cap','pcs',30,9,0,270),(117,20,'Dyper Set','3PC Dyper Set','set',70,2,0,140),(118,20,'Bra','Fancy Bra','pcs',75,6,0,450),(119,21,'Wool','Finish Wool Production','kg',600,2.666,0,1599.6),(120,21,'Bootie','Normal Bootie','pcs',20,6,0,120),(121,21,'Bootie','Pig Bootie','pcs',22,23,0,506),(122,21,'Cap','Silai Cap','pcs',35,4,0,140),(123,21,'Cap','Giraffe Cap','pcs',40,2,0,80),(124,21,'Bra','Fancy Bra','pcs',75,6,0,450),(125,22,'Wool','Finish Wool Production','kg',600,1.852,0,1111.2),(126,22,'Cap','Giraffe Cap','pcs',40,2,0,80),(127,23,'Wool','Finish Wool Production','kg',600,3.919,0,2351.4),(128,23,'Bootie','Normal Bootie','pcs',20,2,0,40),(129,23,'Cap','Fancy Cap','pcs',30,5,0,150),(130,23,'Cap','Giraffe Cap','pcs',40,6,0,240),(131,24,'Wool','Finish Wool Production','kg',600,5.816,0,3489.6),(132,24,'Bra','Fancy Bra','pcs',75,13,0,975),(133,24,'Bra','Normal Bra','pcs',65,1,0,65),(134,24,'Bootie','Normal Bootie','pcs',20,5,0,100),(135,24,'Bootie','Pig Bootie','pcs',22,11,0,242),(136,24,'Band','Hair Band Boot','pcs',35,3,0,105),(137,24,'Mitten','CMB-1 Mitten','pcs',55,26,0,1430),(138,24,'Mitten','CMB-2 Mitten','pcs',65,1,0,65),(139,24,'Dyper Set','2PC Dyper Set','set',55,2,0,110),(140,25,'Wool','Finish Wool Production','kg',600,2.953,0,1771.8),(141,25,'Bootie','Normal Bootie','pcs',20,2,0,40),(142,11,'Wool','Finish Wool Production','kg',600,1.626,0,975.5999999999999),(143,11,'Bootie','Normal Bootie','pcs',20,15,0,300),(144,11,'Cap','Fancy Cap','pcs',30,6,0,180),(145,11,'Band','Hair Band Boot','pcs',35,1,0,35),(146,11,'Cap','Giraffe Cap','pcs',40,5,0,200),(147,11,'Dyper Set','2PC Dyper Set','set',55,4,0,220),(148,14,'Wool','Finish Wool Production','kg',600,1.228,0,736.8),(149,14,'Wool','Finish Wool Production','kg',600,3.819,0,2291.4),(150,14,'Bootie','Normal Bootie','pcs',20,16,0,320),(151,14,'Bootie','Pig Bootie','pcs',22,5,0,110),(152,14,'Bootie','Boots','pcs',25,3,0,75),(153,14,'Band','Hair Band Boot','pcs',35,3,0,105),(154,14,'Mitten','CMB-1 Mitten','pcs',55,10,0,550),(164,27,'Wool','Finish Wool Production','kg',600,3.054,0,1832.4),(165,27,'Bootie','Normal Bootie','pcs',20,7,0,140),(166,27,'Bootie','Pig Bootie','pcs',22,13,0,286),(167,27,'Bootie','Boots','pcs',25,56,0,1400),(168,28,'Wool','Finish Wool Production','kg',600,3.154,0,1892.4),(169,28,'Bootie','Normal Bootie','pcs',20,1,0,20),(170,26,'Wool','Finish Wool Production','kg',600,3.066,0,1839.6),(171,26,'Bootie','Normal Bootie','pcs',20,4,0,80),(172,26,'Bootie','Boots','pcs',25,1,0,25),(173,26,'Band','Silai Band','pcs',25,2,0,50),(174,26,'Cap','Silai Cap','pcs',35,60,0,2100),(175,26,'Cap','Giraffe Cap','pcs',40,8,0,320),(176,26,'Mitten','CMB-1 Mitten','pcs',55,9,0,495),(177,26,'Bra','Fancy Bra','pcs',75,3,0,225),(178,26,'Bra','Normal Bra','pcs',65,1,0,65);
/*!40000 ALTER TABLE `productionentry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratehistory`
--

DROP TABLE IF EXISTS `ratehistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratehistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `oldRate` double NOT NULL,
  `newRate` double NOT NULL,
  `remark` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `RateHistory_productId_fkey` (`productId`),
  CONSTRAINT `RateHistory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratehistory`
--

LOCK TABLES `ratehistory` WRITE;
/*!40000 ALTER TABLE `ratehistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `ratehistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `hashed_password` varchar(255) DEFAULT NULL,
  `role` enum('admin','tendor','coordinator','gola_maker','artisan') DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `area` varchar(100) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_users_email` (`email`),
  UNIQUE KEY `ix_users_username` (`username`),
  UNIQUE KEY `users_mobile_key` (`mobile`),
  KEY `ix_users_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (8,'admin','admin.pg@gmail.com','$2b$10$wmiil1J1VdRiQfHGKbAmfuMtZJoWKbNr35PCcE5ZAA2oWEVk0qy8.','admin','2026-02-04 17:50:14.684',NULL,NULL),(9,'sspardeep','sspardeep@gmail.com','$2b$10$4Vxol798GLNxyY4/gxisju7ZHLnfwW62muImxEqyZ1beaoxJDERPG','tendor','2026-02-04 13:18:11.448','Sonipat','7357287394'),(13,'testadmin','admin@pgcrochet.com','$2b$10$I8NaOMd3sy0EK4bD.uk0w.3BHoNS4CPL.nR54n5lQOE/w/YclejY.','admin','2026-02-05 07:22:53.189','Sonipat','9518372873');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variant`
--

DROP TABLE IF EXISTS `variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uom` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `baseRate` double NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Variant_productId_fkey` (`productId`),
  CONSTRAINT `Variant_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variant`
--

LOCK TABLES `variant` WRITE;
/*!40000 ALTER TABLE `variant` DISABLE KEYS */;
/*!40000 ALTER TABLE `variant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wooltransaction`
--

DROP TABLE IF EXISTS `wooltransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wooltransaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batchId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` double NOT NULL,
  `issuedBy` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Admin',
  `issuedTo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remarks` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wooltransaction`
--

LOCK TABLES `wooltransaction` WRITE;
/*!40000 ALTER TABLE `wooltransaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `wooltransaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-09  7:42:49
