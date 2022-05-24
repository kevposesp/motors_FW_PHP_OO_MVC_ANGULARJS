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
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `id_car` varchar(12) CHARACTER SET utf8 NOT NULL,
  `model_car` varchar(12) CHARACTER SET utf8 NOT NULL,
  `cv_car` int NOT NULL,
  `manufacturingdate_car` varchar(10) CHARACTER SET utf8 NOT NULL,
  `km_car` int NOT NULL,
  `fuel_type_car` varchar(12) CHARACTER SET utf8 NOT NULL,
  `overview_car` varchar(255) CHARACTER SET utf8 NOT NULL,
  `numberofcylinders_car` int NOT NULL,
  `doors_car` int NOT NULL,
  `color_ext_car` varchar(45) CHARACTER SET utf8 NOT NULL,
  `color_int_car` varchar(45) CHARACTER SET utf8 NOT NULL,
  `price_car` varchar(45) CHARACTER SET utf8 NOT NULL,
  `drive_car` varchar(45) CHARACTER SET utf8 NOT NULL,
  `framenumber_car` varchar(17) CHARACTER SET utf8 NOT NULL,
  `category_car` varchar(12) CHARACTER SET utf8 NOT NULL,
  `lng` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `lat` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `city_car` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `count` int DEFAULT '0',
  PRIMARY KEY (`id_car`),
  UNIQUE KEY `id_car_UNIQUE` (`id_car`),
  KEY `fk_cars_categories1_idx` (`category_car`),
  KEY `fk_cars_models1_idx` (`model_car`),
  KEY `fk_cars_type_fuels1_idx` (`fuel_type_car`),
  CONSTRAINT `fk_cars_categories1` FOREIGN KEY (`category_car`) REFERENCES `categories` (`id_category`),
  CONSTRAINT `fk_cars_models1` FOREIGN KEY (`model_car`) REFERENCES `models` (`id_model`),
  CONSTRAINT `fk_cars_type_fuels1` FOREIGN KEY (`fuel_type_car`) REFERENCES `type_fuel` (`id_type_fuel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES ('0afb62dba3d2','d9eb3efbfd57',140,'08/07/2020',20000,'d7d515e14978','Est corporis sit, accusamus consequuntur reprehenderit .',8,5,'#171717','#0f3852','28.000','4x4','FIbghT1qEGnu08yah','61ffb8567a0c','-0.5497333695655748','38.91420214396847','Olleria',36),('31fcf2b6f4fc','8568575ecc05',330,'02/16/2022',100,'d7d515e14978','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum efficitur nunc nec mattis. Sed vitae aliquam lectus, nec vestibulum velit. Etiam tempus et ante nec venenatis.',8,5,'#000000','#000000','140000','4x4','p0W1Jgqymxko6LR7A','f96a5090f3bb','-0.6068264392088937','38.82541851446487','Ontinyent',1),('69dc1226da6e','84ec62886ed7',75,'03/03/2007',220000,'d7d515e14978','Lorem ipsum dolor sit amet, consectetur adipiscing elit.',4,5,'#000000','#000000','3500','4x4','p0W1Jgqymxko6LR7A','366d677ae0bc','-0.5203645389318979','38.839720247492004','Albaida',5),('873d63137054','f1b7007b2c68',177,'03/03/2015',58000,'d7d515e14978','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada iaculis tortor vitae rutrum.',8,5,'#000000','#000000','22.900','4x4','wImBuRJXDAohEWV2S','61ffb8567a0c','-0.5149904954966311','38.86785949415472','Bufali',81),('aa008bed34b5','530bc8e029ea',90,'02/17/2022',10000,'9f3583a4320e','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent rhoncus elit eget vulputate auctor. Vestibulum vitae facilisis felis, vel laoreet libero. Curabitur ultrices felis ut tempus varius.',6,5,'#000000','#000000','20000','4x4','UdjU8AFFyLsVXg3fc','d37cb1f9db88','-0.5501326616555664','38.822875475891536','Agullent',11),('c3d992b8041f','6025022ee462',150,'09/11/2021',19000,'d7d515e14978','Beatae sunt, aut fugiat officia id tempora earum quam v.',8,5,'#363636','#000000','22.900','4x4','2vGfsRbfpN3HvPVQN','d37cb1f9db88','-0.5012038166097309','38.85370567444743','Palomar',2),('da337c2b9955','f1b7007b2c68',177,'08/01/2014',112000,'d7d515e14978','Modi voluptatem. Blanditiis aliquam quidem in ea sed eu.',8,5,'#000000','#000000','15.990','4x4','Z4fN0zxW7dOWw4eSe','61ffb8567a0c','-0.47526960031129556','38.860214987483026','Bélgida',1),('ef32b972e855','aaa03ec6e9ea',320,'02/16/2022',120,'d7d515e14978','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum efficitur nunc nec mattis. Sed vitae aliquam lectus, nec vestibulum velit. Etiam tempus et ante nec venenatis.',8,5,'#000000','#000000','220000','4x4','vjn0ii8WavLNKiiWW','e95eb7d7a42c','-0.5865846076642458','38.87945961630203','Aielo',1),('f55224353e74','59be77ae1cef',180,'05/11/2011',97072,'d7d515e14978','Sed ut inventore nisi anim saepe quis minima est atque .',6,5,'#d5cd5d','#223cb0','13.900','4x4','cIbCwux8PGLQ7X7JH','d37cb1f9db88','-0.7851449048104783','38.78281891433759','Fontanars',1);
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
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
