CREATE TABLE `users`
(
    `id`                bigint       NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name`              varchar(255) NOT NULL,
    `loginId`           varchar(255) NOT NULL UNIQUE,
    `encryptedPassword` varchar(255) NOT NULL,
    `createdAt`         datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt`         datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
);

CREATE TABLE `categories`
(
    `id`        bigint       NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId`    bigint       NOT NULL,
    `name`      varchar(255) NOT NULL UNIQUE,
    `createdAt` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    FOREIGN KEY `foreign_key_on_user_id` (`userId`) REFERENCES `users` (`id`),
    UNIQUE KEY `unique_on_userId_and_name` (`userId`, `name`)
);

CREATE TABLE `tasks`
(
    `id`         bigint                           NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `categoryId` bigint                           NOT NULL,
    `title`      varchar(255)                     NOT NULL,
    `content`    varchar(255)                              DEFAULT NULL,
    `status`     enum ('NEW','DOING','COMPLETED') NOT NULL DEFAULT 'NEW',
    `createdAt`  datetime(3)                      NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt`  datetime(3)                      NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    FOREIGN KEY `foreign_key_on_categoryId` (`categoryId`) REFERENCES `categories` (`id`)
);

