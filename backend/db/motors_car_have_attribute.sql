-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: motors
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `car_have_attribute`
--

DROP TABLE IF EXISTS `car_have_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_have_attribute` (
  `attribute_cha` varchar(12) NOT NULL,
  `car_cha` varchar(12) NOT NULL,
  KEY `fk_car_have_attribute_attributes1_idx` (`attribute_cha`),
  KEY `fk_car_have_attribute_cars1_idx` (`car_cha`),
  CONSTRAINT `fk_car_have_attribute_attributes1` FOREIGN KEY (`attribute_cha`) REFERENCES `attributes` (`id_attribute`),
  CONSTRAINT `fk_car_have_attribute_cars1` FOREIGN KEY (`car_cha`) REFERENCES `cars` (`id_car`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_have_attribute`
--

LOCK TABLES `car_have_attribute` WRITE;
/*!40000 ALTER TABLE `car_have_attribute` DISABLE KEYS */;
INSERT INTO `car_have_attribute` VALUES ('0d4a1374ac8c','31fcf2b6f4fc'),('15bfdaa74445','ef32b972e855'),('dffc6662ecde','ef32b972e855'),('0d4a1374ac8c','aa008bed34b5'),('0d4a1374ac8c','69dc1226da6e'),('15bfdaa74445','0afb62dba3d2'),('15bfdaa74445','da337c2b9955'),('15bfdaa74445','c3d992b8041f'),('dffc6662ecde','c3d992b8041f'),('15bfdaa74445','873d63137054');
/*!40000 ALTER TABLE `car_have_attribute` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20 10:51:22
