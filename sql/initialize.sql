CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `name` varchar(255) NOT NULL,
    `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
);

CREATE TABLE `accounts` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `userId` int(11) NOT NULL UNIQUE ,
    `loginId` varchar(255) NOT NULL UNIQUE ,
    `encryptedPassword` varchar(255) NOT NULL,
    `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    FOREIGN KEY `foreign_key_on_user_id` (`userId`) REFERENCES `users` (`id`)
);

CREATE TABLE `categories` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` int(11) NOT NULL,
    `name` varchar(255) NOT NULL UNIQUE ,
    `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE KEY `unique_on_userId_and_name` (`userId`, `name`)
);

CREATE TABLE `tasks` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `categoryId` int(11) NOT NULL,
    `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `content` varchar(255) DEFAULT NULL,
    `status` enum('NEW','DOING','COMPLETED') NOT NULL DEFAULT 'NEW',
    `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    FOREIGN KEY `foreign_key_on_categoryId` (`categoryId`) REFERENCES `categories` (`id`)
);


