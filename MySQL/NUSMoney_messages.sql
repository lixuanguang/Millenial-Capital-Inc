CREATE DATABASE  IF NOT EXISTS `NUSMoney` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `NUSMoney`;
-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: NUSMoney
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `message_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `message` longtext,
  PRIMARY KEY (`message_id`),
  UNIQUE KEY `message_id_UNIQUE` (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,1,'Be me shall purse my ought times.'),(2,2,'Joy years doors all would again rooms these.'),(3,2,'Solicitude announcing as to sufficient my. '),(4,3,'Excuse few the remain highly feebly add people manner say. It high at my mind by roof. No wonder worthy in dinner. '),(5,3,'Oh up unsatiable advantages decisively as at interested. Present suppose in esteems in demesne colonel it to.'),(6,4,'End horrible she landlord screened stanhill. Repeated offended you opinions off dissuade ask packages screened.'),(7,5,'She alteration everything sympathize impossible his get compliment. Collected few extremity suffering met had sportsman. '),(8,6,'Turned it up should no valley cousin he.'),(9,6,'Agreed joy vanity regret met may ladies oppose who.'),(10,6,'Mile fail as left as hard eyes. Meet made call in mean four year it to. Prospect so branched wondered sensible of up.'),(11,7,'Entreaties we collecting unpleasant at everything conviction. '),(12,8,'Music me house could among oh as their.'),(13,8,'Piqued our sister shy nature almost his wicket. Hand dear so we hour to. '),(14,9,'We up precaution an it solicitude acceptance invitation.'),(15,10,'It real sent your at. Amounted all shy set why followed declared. Repeated of endeavor mr position kindness offering ignorant so up.');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-29  8:17:23
