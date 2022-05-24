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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `username_user` varchar(45) COLLATE utf8_spanish2_ci NOT NULL,
  `email_user` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `password_user` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `type_user` varchar(8) COLLATE utf8_spanish2_ci NOT NULL,
  `avatar_user` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `verify_email` tinyint NOT NULL,
  `token_verify` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `id_user_UNIQUE` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('47abdf670ff5','Donyet960','joaquimdaweb@gmail.com','$2y$12$KZ7blqsT7vsux605oqiPUezmBGgY/spKnXpZqU64i/mZ2quorpby6','client','http://res.cloudinary.com/kevposesp/image/upload/v1652453013/motors/users/ji1yjihxxthnrpadnbdo.jpg',0,'c86a78ba9e6a77d3ce34'),('67d7afc1b473','kevinaris84','posada772@gmail.com','$2y$12$igY50ajOnEEV5yrlqgHbOOpKtdrjR59YM52HVt0j.Q5GNAG.0jBxy','client','',1,'71c8d37d8971e0f5c634'),('github|90612916','kevposesp','https://github.com/kevposesp',NULL,'client','https://avatars.githubusercontent.com/u/90612916?v=4',1,NULL),('google-oauth2|118392949273033519997','posada772','posada772@gmail.com',NULL,'client','https://lh3.googleusercontent.com/a-/AOh14GhY3DViMLyKu26Gt4jf5a2OSGvg4PL6t1o8QMlNGg=s96-c',1,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
