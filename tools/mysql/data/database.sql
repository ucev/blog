create database if not exists blog_node character set utf8mb4 collate utf8mb4_unicode_ci;
alter database blog_node character set utf8mb4 collate utf8mb4_unicode_ci;
use blog_node;
drop table if exists articles;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `descp` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` int(11) NOT NULL,
  `label` char(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` enum('on','off') COLLATE utf8mb4_unicode_ci DEFAULT 'off',
  `top` tinyint(4) DEFAULT '0',
  `addtime` int(11) NOT NULL,
  `modtime` int(11) NOT NULL DEFAULT '0',
  `pageview` int(11) DEFAULT '0',
  `suborder` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  UNIQUE KEY `title_2` (`title`),
  UNIQUE KEY `title_3` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
drop table if exists categories;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL,
  `parent` int(11) NOT NULL,
  `addtime` int(11) NOT NULL,
  `descp` char(50) NOT NULL,
  `articlecnt` int(11) DEFAULT '0',
  `preface` int(11) DEFAULT '0',
  `mainorder` int(11) DEFAULT '0' COMMENT '在列表中的顺序',
  `suborder` int(11) DEFAULT '0' COMMENT '在列表树中的顺序',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
drop table if exists labels;
CREATE TABLE `labels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(10) NOT NULL,
  `articles` int(11) DEFAULT '0',
  `hotmark` int(11) DEFAULT '0',
  `addtime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
drop table if exists photogroups;
CREATE TABLE `photogroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(10) NOT NULL,
  `count` int(11) DEFAULT '0',
  `addtime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
drop table if exists photos;
CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `photogroup` int(11) NOT NULL DEFAULT '1',
  `label` varchar(100) DEFAULT NULL,
  `addtime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
drop table if exists uservisit;
CREATE TABLE `uservisit` (
  `usercookie` char(32) NOT NULL,
  `ip` char(32) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
drop table if exists visithistory;
CREATE TABLE `visithistory` (
  `date` int(11) NOT NULL,
  `pv` int(11) DEFAULT '0',
  `uv` int(11) DEFAULT '0',
  `ip` int(11) DEFAULT '0',
  PRIMARY KEY (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
