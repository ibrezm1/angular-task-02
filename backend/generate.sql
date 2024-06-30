-- test.demo_tasks definition

CREATE TABLE `demo_tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) 

INSERT INTO test.demo_tasks
(id, title, description, status)
VALUES(1, 'dsfsdf', 'sdfsdf', 'pending');
INSERT INTO test.demo_tasks
(id, title, description, status)
VALUES(4, 'dsfsdf', 'sdfsdf1', 'pending');
INSERT INTO test.demo_tasks
(id, title, description, status)
VALUES(5, 'dsfsdf', 'sdfsdf1', 'pending');
INSERT INTO test.demo_tasks
(id, title, description, status)
VALUES(6, 'sdfsdf', 'sdfsdf', 'pending');
INSERT INTO test.demo_tasks
(id, title, description, status)
VALUES(11, 'sdfsdf', 'sdfsdf', 'pending');
INSERT INTO test.demo_tasks
(id, title, description, status)
VALUES(19, 'sdf', 'sdfs', 'pending');