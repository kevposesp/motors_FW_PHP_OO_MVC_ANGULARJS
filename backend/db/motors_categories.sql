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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id_category` varchar(12) NOT NULL,
  `name_category` varchar(45) NOT NULL,
  `title_category` varchar(45) NOT NULL,
  `description_category` varchar(255) NOT NULL,
  `img_category` varchar(100) DEFAULT NULL,
  `icon_category` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_category`),
  UNIQUE KEY `id_category_UNIQUE` (`id_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('2669b5225df0','Berlina','Coches berlina','Son turismos de tres volúmenes que cuentan con tres partes totalmente diferenciadas: capó, habitáculo y maletero.','/categories/img/berlina.png','/categories/icons/berlina.svg'),('366d677ae0bc','Familiar','Coches familiares','Son aquellos turismos derivados de compactos, sedanes o berlinas con carrocería de cinco puertas y techo elevado, a fin de ampliar el compartimento de carga.','/categories/img/family.png','/categories/icons/family.svg'),('3af7467ea594','SUV','Coches suv','Nos adentramos en el segmento más popular a día de hoy. Los SUV han pasado de ser modelos poco conocidos al mercado de mayor expansión dentro del territorio europeo.','/categories/img/suv.png','/categories/icons/suv.svg'),('44dd6f8f67aa','Pick Up','Coches pick up','Acabamos este repaso a los diferentes tipos de coches que existen con un formato muy especial. Se calcula que uno de cada cuatro modelos que circulan en el mundo es una pick up.','/categories/img/pick-up.png','/categories/icons/pick-up.svg'),('519b3c1ba4f8','HatchBack','Coches hatchback','Vamos a coger la palabra hatchback con pinzas, porque este término hace referencia, en sentido literal, a aquél automóvil compuesto por dos espacios diferenciados: el de los pasajeros y el del espacio de carga o maletero, al que se accede desde un portón.','/categories/img/hatchback.png','/categories/icons/hatchback.svg'),('61ffb8567a0c','Sedán','Coches sedán','Un sedán es un turismo de tres volúmenes en el que desde el compartimento de carga no se permite el acceso al habitáculo, ya que la tapa del maletero los separa.','/categories/img/sedan.png','/categories/icons/sedan.svg'),('6bdddc945707','Subcompacto','Coches Subcompactos','Este tipo de coches pueden tener tres, cuatro o cinco puertas, dependiendo un poco del diseño de su carrocería. Están diseñados para que puedan viajar cuatro pasajeros cómodamente','/categories/img/subcompacto.png','/categories/icons/subcompacto.svg'),('d37cb1f9db88','Urbano','Coches Urbanos','Se caracterizan por su reducido tamaño y están pensados para circular por la ciudad, ya que gozan de algunas virtudes como la maniobrabilidad, la facilidad para aparcar o los bajos consumos.','/categories/img/city.png','/categories/icons/city.svg'),('e95eb7d7a42c','Deportivo','Coches deportivos','Dentro de este tipo de vehículos encontramos diversos tipos de carrocerías, pero todos ellos se caracterizan por equipar diseños realmente atractivos, motores muy potentes.','/categories/img/sport.png','/categories/icons/sport.svg'),('f96a5090f3bb','Muscle Car','Coches muscle car','típico coche americano de tracción trasera con un poderoso bloque V8 escondido en sus entrañas y altas dosis de potencia.','/categories/img/muscle.png','/categories/icons/muscle.svg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20 10:51:21
