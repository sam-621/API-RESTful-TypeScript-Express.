CREATE DATABASE ExploreSpace;

USE ExploreSpace;

Create Table Users IF NOT EXIST(
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    followers INT DEFAULT 0
);

ALTER TABLE Users MODIFY password VARCHAR(100) NOT NULL;

ALTER TABLE Users ADD rol VARCHAR(5) NOT NULL DEFAULT 'user';

--followers: UserID who follow
--followed: USERID who is being followed
CREATE TABLE Friends(
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    followers INT NOT NULL, 
    followed INT NOT NULL   
);

--coments: Number of post comments
--likes: Number of post likes
--userID: Who creates the post
CREATE TABLE Posts(
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    description TEXT,
    createdAt TIMESTAMP NOT NULL,
    comments INT DEFAULT 0, 
    likes INT DEFAULT 0,    
    userID INT NOT NULL     
);

--userID: User who gave this like
--postID: Post where this like has been given
CREATE TABLE Likes(
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userID INT NOT NULL, 
    postID INT NOT NULL  
);

--userID: Who create the comment
--postID: The post where the comment has been created
CREATE TABLE Comments(
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    userID INT NOT NULL, 
    postID INT NOT NULL, 
    likes INT DEFAULT 0
);

--userID: Who gave the like
--commentID: Where the like has beem given
CREATE TABLE CommentLikes (
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userID INT NOT NULL,    
    commentID INT NOT NULL  
);