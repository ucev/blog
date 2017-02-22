CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(20) NOT NULL,
  `content` text NOT NULL,
  `descp` varchar(500) DEFAULT NULL,
  `category` int(11) NOT NULL,
  `label` char(100) DEFAULT NULL,
  `state` enum('on','off') DEFAULT 'off',
  `top` tinyint(4) DEFAULT '0',
  `addtime` int(11) NOT NULL,
  `modtime` int(11) NOT NULL DEFAULT '0',
  `pageview` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL,
  `parent` int(11) NOT NULL,
  `addtime` int(11) NOT NULL,
  `descp` char(50) NOT NULL,
  `articlecnt` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
CREATE TABLE `labels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(10) NOT NULL,
  `articles` int(11) DEFAULT '0',
  `hotmark` int(11) DEFAULT '0',
  `addtime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
CREATE TABLE `photogroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(10) NOT NULL,
  `count` int(11) DEFAULT '0',
  `addtime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `photogroup` int(11) NOT NULL DEFAULT '1',
  `label` varchar(100) DEFAULT NULL,
  `addtime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
