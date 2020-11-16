CREATE table IF NOT EXISTS user (
    userID int NOT NULL PRIMARY KEY, 
    firstName VARCHAR(15) NOT NULL,
    lastName VARCHAR(15) NOT NULL,
    dob DATE )
