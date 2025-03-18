-- MySQL dump 10.13  Distrib 9.2.0, for Linux (aarch64)
--
-- Host: localhost    Database: chatdb
-- ------------------------------------------------------
-- Server version	9.2.0
--
-- Table structure for table `courses`
--

--
-- Table structure for table `student_courses`
--

DROP TABLE IF EXISTS `student_courses`;
DROP TABLE IF EXISTS `courses`;
DROP TABLE IF EXISTS `students`;
DROP TABLE IF EXISTS `instructors`;

CREATE TABLE `instructors` (
  `instructor_id` int NOT NULL AUTO_INCREMENT,
  `instructor_name` varchar(50) NOT NULL,
  `contact_information` varchar(100) DEFAULT NULL,
  `office_address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`instructor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `instructors` WRITE;
/*!40000 ALTER TABLE `instructors` DISABLE KEYS */;
INSERT INTO `instructors` (instructor_id, instructor_name, contact_information, office_address) VALUES
(1, 'John Doe', 'john.doe@example.com', '123 Main St, Room 101'),
(2, 'Jane Smith', 'jane.smith@example.com', '456 Elm St, Room 202'),
(3, 'Alice Johnson', 'alice.johnson@example.com', '789 Oak St, Room 303'),
(4, 'Bob Brown', 'bob.brown@example.com', '321 Pine St, Room 404'),
(5, 'Carol White', 'carol.white@example.com', '654 Maple St, Room 505'),
(6, 'David Green', 'david.green@example.com', '987 Cedar St, Room 606'),
(7, 'Eve Black', 'eve.black@example.com', '159 Birch St, Room 707'),
(8, 'Frank Blue', 'frank.blue@example.com', '753 Walnut St, Room 808'),
(9, 'Grace Yellow', 'grace.yellow@example.com', '852 Cherry St, Room 909'),
(10, 'Hank Red', 'hank.red@example.com', '951 Spruce St, Room 1001'),
(11, 'Ivy Brown', 'ivy.brown@example.com', '123 Cedar St, Room 1101'),
(12, 'Jack White', 'jack.white@example.com', '456 Pine St, Room 1202'),
(13, 'Kathy Green', 'kathy.green@example.com', '789 Maple St, Room 1303'),
(14, 'Leo Black', 'leo.black@example.com', '321 Oak St, Room 1404'),
(15, 'Mona Blue', 'mona.blue@example.com', '654 Birch St, Room 1505'),
(16, 'Nina Yellow', 'nina.yellow@example.com', '987 Walnut St, Room 1606'),
(17, 'Oscar Red', 'oscar.red@example.com', '159 Cherry St, Room 1707'),
(18, 'Paul Brown', 'paul.brown@example.com', '753 Spruce St, Room 1808'),
(19, 'Quincy White', 'quincy.white@example.com', '852 Cedar St, Room 1909'),
(20, 'Rita Green', 'rita.green@example.com', '951 Pine St, Room 2001');
/*!40000 ALTER TABLE `instructors` ENABLE KEYS */;
UNLOCK TABLES;


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `course_id` int NOT NULL,
  `course_name` varchar(40) NOT NULL,
  `course_description` text,
  `course_code` varchar(24) DEFAULT NULL,
  `course_credits` decimal(2,1) DEFAULT NULL,
  `course_start_date` date DEFAULT NULL,
  `course_end_date` date DEFAULT NULL,
  `course_department` varchar(17) DEFAULT NULL,
  `course_location` varchar(50) DEFAULT NULL,
  `course_instructor_id` int DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  FOREIGN KEY (`course_instructor_id`) REFERENCES `instructors` (`instructor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (1, 'Dance', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 2.3, 12, '2025-01-30 16:31:40', '2026-05-13 21:02:10', 'Philosophy', 'Room B');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (2, 'Public Health', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 5.8, 17, '2025-01-20 02:57:54', '2026-11-10 21:50:01', 'Education', 'Room I');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (3, 'Economics', 'In congue. Etiam justo. Etiam pretium iaculis justo.', 8.6, 9, '2025-03-15 01:32:31', '2025-09-16 22:49:29', 'English', 'Room F');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (4, 'Religious Studies', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 8.0, 6, '2026-03-07 11:02:51', '2025-12-01 21:33:46', 'Mathematics', 'Room D');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (5, 'Mathematics', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 0.2, 20, '2026-10-28 20:55:05', '2025-09-06 01:40:27', 'Mathematics', 'Room G');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (6, 'Computer Science', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 2.2, 19, '2026-09-15 12:30:53', '2026-06-02 23:49:17', 'Music', 'Room B');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (7, 'Criminal Justice', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 1.2, 20, '2025-02-17 06:35:09', '2026-03-07 11:00:46', 'Mathematics', 'Room D');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (8, 'Social Work', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 1.3, 14, '2026-02-11 15:31:36', '2026-12-01 14:26:15', 'Psychology', 'Room J');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (9, 'Geography', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 6.0, 1, '2026-10-14 14:52:44', '2026-04-03 06:42:06', 'Engineering', 'Room F');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (10, 'Physics', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 8.7, 16, '2025-04-28 13:06:17', '2026-05-14 21:50:41', 'History', 'Room F');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (11, 'Religious Studies', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 4.5, 12, '2025-02-18 05:24:35', '2025-08-29 23:24:21', 'Philosophy', 'Room J');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (12, 'Biology', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 7.3, 17, '2026-07-18 05:56:23', '2025-07-14 17:31:36', 'Psychology', 'Room J');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (13, 'Geology', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 4.9, 7, '2026-06-29 20:54:59', '2026-08-24 05:41:10', 'Music', 'Room C');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (14, 'Accounting', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 9.8, 19, '2025-07-19 04:48:30', '2026-06-15 23:39:19', 'Anthropology', 'Room G');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (15, 'Economics', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 0.2, 12, '2025-12-01 13:30:22', '2027-01-05 06:17:03', 'Philosophy', 'Room C');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (16, 'Environmental Studies', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 4.7, 13, '2026-09-19 07:36:59', '2026-04-22 22:13:56', 'Education', 'Room A');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (17, 'Social Work', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 8.1, 6, '2025-03-28 17:48:08', '2027-05-10 01:06:34', 'Languages', 'Room F');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (18, 'Accounting', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 3.6, 1, '2025-06-23 23:05:47', '2026-11-22 10:19:55', 'Psychology', 'Room I');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (19, 'Foreign Languages', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 8.2, 6, '2026-02-12 06:42:36', '2026-01-09 11:45:52', 'Mathematics', 'Room H');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (20, 'Environmental Studies', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 1.9, 12, '2026-08-29 18:38:15', '2025-12-08 11:22:53', 'Chemistry', 'Room E');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (21, 'History', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 5.1, 13, '2025-06-04 11:17:03', '2026-08-10 07:28:55', 'Mathematics', 'Room C');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (22, 'Public Health', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 6.3, 12, '2025-06-25 13:59:07', '2025-11-28 14:49:07', 'Anthropology', 'Room F');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (23, 'Dance', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 3.8, 13, '2025-09-09 07:37:00', '2026-11-10 06:03:27', 'Engineering', 'Room G');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (24, 'Business', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 6.7, 3, '2025-04-01 00:02:56', '2025-08-14 16:37:08', 'Languages', 'Room E');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (25, 'Computer Science', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 8.2, 18, '2025-06-25 19:17:26', '2027-01-26 17:52:56', 'Political Science', 'Room H');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (26, 'Public Health', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 2.6, 2, '2025-12-13 04:35:29', '2025-06-19 17:34:43', 'Biology', 'Room E');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (27, 'Art', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 1.4, 2, '2026-06-24 01:39:05', '2025-08-29 12:07:49', 'Engineering', 'Room J');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (28, 'Statistics', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 3.7, 14, '2026-09-11 11:34:04', '2026-01-31 20:12:15', 'Business', 'Room C');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (29, 'Religious Studies', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 7.8, 7, '2025-01-31 14:40:52', '2027-04-09 21:56:15', 'Philosophy', 'Room A');
insert into `courses` (course_id, course_name, course_description, course_credits, course_instructor_id, course_start_date, course_end_date, course_department, course_location) values (30, 'Kinesiology', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 4.8, 5, '2026-09-07 19:40:23', '2026-02-19 00:09:41', 'Music', 'Room J');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `students`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `student_id` int NOT NULL,
  `enrollment_date` date DEFAULT NULL,
  `graduation_date` date DEFAULT NULL,
  `gpa` decimal(3,2) DEFAULT NULL,
  `advisor` varchar(50) DEFAULT NULL,
  `major` varchar(23) DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` (student_id, enrollment_date, graduation_date, gpa, advisor, major) VALUES
(1, '2023-08-15 19:15:36', '2025-01-23 10:38:13', 1.1, 'Preston Breinl', 'Engineering'),
(2, '2024-06-08 20:48:24', '2026-12-08 10:56:45', 1.11, 'Amargo Henrichsen', 'History'),
(3, '2023-08-28 21:28:10', '2025-08-01 17:01:34', 1.21, 'Julius Kimpton', 'Art History'),
(4, '2024-11-23 22:36:43', '2027-06-19 03:15:19', 0.72, 'Lauree Gertz', 'Mathematics'),
(5, '2023-03-30 07:20:34', '2026-01-06 07:46:18', 1.82, 'Cob Meldon', 'Biology'),
(6, '2022-12-17 14:00:03', '2025-10-26 09:03:02', 0.07, 'Mira Rape', 'History'),
(7, '2022-04-08 17:19:58', '2025-12-11 14:01:45', 1.77, 'Drucy Skill', 'History'),
(8, '2022-10-24 05:19:45', '2025-07-23 21:28:48', 2.9, 'Hendrick Dendle', 'History'),
(9, '2023-06-27 08:20:20', '2025-03-23 07:42:24', 3.54, 'Moss Goodlife', 'Business Administration'),
(10, '2023-07-29 12:22:14', '2026-10-22 18:56:42', 0.58, 'Muhammad Flecknoe', 'English Literature');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_courses` (
  `student_id` int NOT NULL,
  `course_id` int NOT NULL,
  PRIMARY KEY (`student_id`,`course_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `student_courses_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `student_courses_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

ALTER TABLE `student_courses`
ADD COLUMN `grade` INT DEFAULT NULL;

ALTER TABLE `student_courses`
ADD COLUMN `feedback` TEXT DEFAULT NULL;

--
-- Dumping data for table `student_courses`
--

LOCK TABLES `student_courses` WRITE;
/*!40000 ALTER TABLE `student_courses` DISABLE KEYS */;
INSERT INTO `student_courses` (student_id, course_id, grade, feedback) VALUES
(10, 1, 8, 'Great improvement over the semester.'),
(7, 2, 7, 'Needs to participate more in class discussions.'),
(4, 4, 6, 'Struggles with the material but shows effort.'),
(3, 5, 9, 'Excellent performance and understanding of the subject.'),
(8, 6, 5, 'Needs to improve time management skills.'),
(5, 8, 7, 'Good work, but can do better with more practice.'),
(2, 10, 8, 'Shows a lot of potential.'),
(5, 11, 6, 'Needs to focus more on assignments.'),
(6, 11, 9, 'Outstanding performance throughout the course.'),
(2, 13, 7, 'Consistent performance, keep it up.'),
(10, 13, 8, 'Very good understanding of the concepts.'),
(3, 15, 6, 'Needs to work on problem-solving skills.'),
(7, 15, 9, 'Excellent participation and engagement.'),
(1, 16, 7, 'Good effort, but needs to improve in some areas.'),
(1, 17, 8, 'Shows great interest in the subject.'),
(10, 17, 6, 'Needs to improve attendance.'),
(1, 20, 9, 'Exceptional work and dedication.'),
(9, 20, 7, 'Good performance, but can do better.'),
(2, 21, 8, 'Shows a lot of promise.'),
(4, 21, 6, 'Needs to improve understanding of the material.'),
(8, 21, 9, 'Excellent work, keep it up.'),
(1, 23, 7, 'Good effort, but needs to participate more.'),
(5, 23, 8, 'Very good understanding of the subject.'),
(7, 26, 6, 'Needs to work on time management.'),
(8, 26, 9, 'Outstanding performance.'),
(1, 27, 7, 'Consistent effort, keep it up.'),
(2, 28, 8, 'Shows great potential.'),
(1, 29, 6, 'Needs to focus more on assignments.'),
(4, 30, 9, 'Excellent understanding of the material.'),
(6, 30, 7, 'Good work, but can improve.');
/*!40000 ALTER TABLE `student_courses` ENABLE KEYS */;
UNLOCK TABLES;
