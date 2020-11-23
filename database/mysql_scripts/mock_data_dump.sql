-- CREATE TABLES --

CREATE table IF NOT EXISTS categories (
    categoryID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    categoryName VAR_CHAR(64) NOT NULL )

CREATE table IF NOT EXISTS countries(
    countryID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    countryName VAR_CHAR(64) NOT NULL )

CREATE TABLE IF NOT EXISTS travelEntries_locations (
    eid INT NOT NULL,
    lid INT NOT NULL, 
    PRIMARY KEY (eid, lid), 
    FOREIGN KEY(eid) REFERENCES travelEntries(entryID)
    FOREIGN KEY(lid) REFERENCES locations(locationID)
)

CREATE table IF NOT EXISTS locations(
    locationID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    name VAR_CHAR(64) NOT NULL,
    countryID INT NULL,
    city VAR_CHAR(64) NOT NULL,
    streetAddress VAR_CHAR(64) NOT NULL 

    FOREIGN KEY(countryID) REFERENCES countries(countryID)
    )


CREATE table IF NOT EXISTS travelEntries(
    entryID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    userID INT NOT NULL FOREIGN KEY,
    DOE DATE NOT NULL,
    timeOfDay TIME NOT NULL,
    location INT NOT NULL FOREIGN KEY,
    category INT NOT NULL FOREIGN KEY,
    title VAR_CHAR(15) NOT NULL,
    comments VAR_CHAR(65535) NOT NULL,
    review VAR_CHAR(65535) NOT NULL,
    groupSize INT NOT NULL )

CREATE table IF NOT EXISTS user (
    userID int NOT NULL PRIMARY KEY, 
    firstName VARCHAR(15) NOT NULL,
    lastName VARCHAR(15) NOT NULL,
    dob DATE )


---- SAMPLE DATA -----

-- create a new user
INSERT INTO users (userID, firstName, lastName, dob) VALUES (
    1,
    'John',
    'Smith',
    '1994/01/01'
)
-- create a new country

INSERT INTO countries (countryName) VALUES (
    'United States of America'
)
-- create a new location
INSERT INTO locations (name, country, city, streetAddress) VALUES (
    'DC Burger Joint',
    1,
    'Washington DC',
    '1234 Test Address'

-- create a new category

INSERT INTO categories (categoryName) VALUES (
    'Restaurant'
)
-- create a new travel entry
INSERT INTO locations (userID, DOE, timeOfDay, locationID, category, title, comments, review, groupSize ) VALUES (
    1,
    CURRENT_DATE(),
    '12:00:00',
    1,
    1,
    'DC Burgers do not disappoint!',
    'Tidy little hole in the wall; fantastic personality, and charming staff!',
    '5/5; would recommend.',
    1
)




