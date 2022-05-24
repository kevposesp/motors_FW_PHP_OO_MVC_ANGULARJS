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
-- Table structure for table `img_cars`
--

DROP TABLE IF EXISTS `img_cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `img_cars` (
  `id_car` varchar(12) NOT NULL,
  `url_img` varchar(100) NOT NULL,
  KEY `fk_img_cars_cars1_idx` (`id_car`),
  CONSTRAINT `fk_img_cars_cars1` FOREIGN KEY (`id_car`) REFERENCES `cars` (`id_car`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `img_cars`
--

LOCK TABLES `img_cars` WRITE;
/*!40000 ALTER TABLE `img_cars` DISABLE KEYS */;
INSERT INTO `img_cars` VALUES ('31fcf2b6f4fc','/cars/mustang.jpg'),('31fcf2b6f4fc','/cars/mustang2.jpg'),('31fcf2b6f4fc','/cars/mustang3.jpg'),('31fcf2b6f4fc','/cars/mustang4.jpg'),('31fcf2b6f4fc','/cars/mustang5.jpg'),('31fcf2b6f4fc','/cars/mustang6.jpg'),('ef32b972e855','/cars/rs7.jpg'),('ef32b972e855','/cars/rs72.jpg'),('ef32b972e855','/cars/rs73.jpg'),('ef32b972e855','/cars/rs74.jpg'),('ef32b972e855','/cars/rs75.jpg'),('ef32b972e855','/cars/rs76.jpg'),('aa008bed34b5','/cars/renault.jpg'),('aa008bed34b5','/cars/renault2.jpg'),('aa008bed34b5','/cars/renault3.jpg'),('aa008bed34b5','/cars/renault4.jpg'),('aa008bed34b5','/cars/renault5.jpg'),('aa008bed34b5','/cars/renault6.jpg'),('69dc1226da6e','/cars/tourneo.jpg'),('69dc1226da6e','/cars/tourneo2.jpg'),('69dc1226da6e','/cars/tourneo3.jpg'),('69dc1226da6e','/cars/tourneo4.jpg'),('69dc1226da6e','/cars/tourneo5.jpg'),('69dc1226da6e','/cars/tourneo6.jpg'),('f55224353e74','/cars/polo.jpg'),('f55224353e74','/cars/polo2.jpg'),('f55224353e74','/cars/polo3.jpg'),('f55224353e74','/cars/polo4.jpg'),('f55224353e74','/cars/polo5.jpg'),('f55224353e74','/cars/polo6.jpg'),('0afb62dba3d2','/cars/serieuno.jpg'),('0afb62dba3d2','/cars/serieuno2.jpg'),('0afb62dba3d2','/cars/serieuno3.jpg'),('0afb62dba3d2','/cars/serieuno4.jpg'),('0afb62dba3d2','/cars/serieuno5.jpg'),('0afb62dba3d2','/cars/serieuno6.jpg'),('da337c2b9955','/cars/acinco.jpg'),('da337c2b9955','/cars/acinco2.jpg'),('da337c2b9955','/cars/acinco3.jpg'),('da337c2b9955','/cars/acinco4.jpg'),('da337c2b9955','/cars/acinco5.jpg'),('da337c2b9955','/cars/acinco6.jpg'),('c3d992b8041f','/cars/leon.jpg'),('c3d992b8041f','/cars/leon2.jpg'),('c3d992b8041f','/cars/leon3.jpg'),('c3d992b8041f','/cars/leon4.jpg'),('c3d992b8041f','/cars/leon5.jpg'),('c3d992b8041f','/cars/leon6.jpg'),('873d63137054','/cars/acincodos.jpg'),('873d63137054','/cars/acincodos2.jpg'),('873d63137054','/cars/acincodos3.jpg'),('873d63137054','/cars/acincodos4.jpg'),('873d63137054','/cars/acincodos5.jpg'),('873d63137054','/cars/acincodos6.jpg');
/*!40000 ALTER TABLE `img_cars` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20 10:51:20
