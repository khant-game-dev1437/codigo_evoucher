-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: evoucher_codigo
-- ------------------------------------------------------
-- Server version	5.7.33-log

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
-- Table structure for table `evoucher`
--

DROP TABLE IF EXISTS `evoucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evoucher` (
  `title` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `expiry_date` datetime NOT NULL,
  `image` longtext,
  `payment_method` varchar(20) NOT NULL,
  `chosen_payment` varchar(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `buytype` varchar(20) NOT NULL,
  `phone_no` varchar(45) NOT NULL,
  `voucher_status` varchar(45) NOT NULL,
  `promo_code` varchar(45) NOT NULL,
  `use_status` varchar(10) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evoucher`
--

LOCK TABLES `evoucher` WRITE;
/*!40000 ALTER TABLE `evoucher` DISABLE KEYS */;
INSERT INTO `evoucher` VALUES ('1a589413-a1a2-4973-bd26-95b3565bd3ba','Codigo','2023-12-31 00:00:00',NULL,'Visa','Visa',10,'OnlyForMe','9782111040','Active','WoivnLIzg','not_used',19640),('f5179c36-b780-42a9-98df-a100bef166dd','Codigo','2023-12-31 00:00:00',NULL,'Visa','Visa',10,'OnlyForMe','9782111040','Active','qWMTHfV2e','not_used',20000),('c80fba22-d1aa-4e9e-9aff-faaaad3068c2','Codigo','2023-12-31 00:00:00',NULL,'Visa','Visa',10,'OnlyForMe','9782111040','Active','NhGXaiJ0P','not_used',20000),('89136a85-ebe2-45e7-b4c3-35f4da76a8fe','Codigo','2023-12-31 00:00:00',NULL,'Visa','Visa',10,'OnlyForMe','9782111040','Active','E-Sg1r6UY','not_used',20000),('add27d0b-69b2-4c9c-bf2e-e58dd760c3d4','Codigo','2023-12-31 00:00:00',NULL,'Visa','Visa',10,'OnlyForMe','9782111040','Active','XC2iTHwj0','not_used',20000),('6367e94c-2d62-4629-98e6-2e5f621e08ef','Codigo','2023-12-31 00:00:00',NULL,'Visa','Visa',10,'OnlyForMe','9782111040','Active','OAke-E8W7','not_used',20000),('e6dd773a-e8c7-46a2-9685-9a8e8619e247','Codigo','2023-12-31 00:00:00',NULL,'Visa','Visa',10,'OnlyForMe','9782111040','Active','7bhxcBeUu','not_used',20000);
/*!40000 ALTER TABLE `evoucher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-29  4:11:14
