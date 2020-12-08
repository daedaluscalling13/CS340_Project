-- CREATE TABLES --
CREATE table IF NOT EXISTS categories (
    categoryID INT AUTO_INCREMENT UNIQUE NOT NULL,
    categoryName VARCHAR(64) NOT NULL,
	PRIMARY KEY(categoryID)
);

CREATE table IF NOT EXISTS countries(
    countryID INT AUTO_INCREMENT UNIQUE NOT NULL,
    countryName VARCHAR(64) NOT NULL,
	PRIMARY KEY(countryID)
);

CREATE table IF NOT EXISTS travelEntries_locations (
    eid INT NOT NULL DEFAULT '0',
    lid INT NOT NULL DEFAULT '0', 
    PRIMARY KEY (eid, lid), 
    CONSTRAINT travelEntries_locations_fk1 FOREIGN KEY(eid) REFERENCES travelEntries(entryID),
    CONSTRAINT travelEntries_locations_fk2 FOREIGN KEY(lid) REFERENCES locations(locationID)
);

CREATE table IF NOT EXISTS locations(
    locationID INT AUTO_INCREMENT UNIQUE NOT NULL,
    name VARCHAR(64) NOT NULL,
    countryID INT NULL,
    city VARCHAR(64) NOT NULL,
    streetAddress VARCHAR(64) NOT NULL, 
	PRIMARY KEY(locationID),
    FOREIGN KEY(countryID) REFERENCES countries(countryID)
);


CREATE table IF NOT EXISTS travelEntries(
    entryID INT AUTO_INCREMENT UNIQUE NOT NULL,
    userID INT NOT NULL,
    DOE DATE NOT NULL,
    timeOfDay TIME NOT NULL,
    locationID INT NOT NULL,
    categoryID INT,
    title VARCHAR(15) NOT NULL,
    comments VARCHAR(65535) NOT NULL,
    review VARCHAR(65535) NOT NULL,
    groupSize INT NOT NULL,
    PRIMARY KEY(entryID),
    FOREIGN KEY(userID) REFERENCES users(userID),
    FOREIGN KEY(locationID) REFERENCES locations(locationID),
    FOREIGN KEY(categoryID) REFERENCES categories(categoryID) ON DELETE SET NULL
);

CREATE table IF NOT EXISTS users (
    userID INT AUTO_INCREMENT UNIQUE NOT NULL, 
    firstName VARCHAR(15) NOT NULL,
    lastName VARCHAR(15) NOT NULL,
    dob DATE,
	PRIMARY KEY(userID)
);


---- SAMPLE DATA -----

-- create a new user
INSERT INTO users (userID, firstName, lastName, dob) VALUES (
    1,
    'John',
    'Smith',
    '1994/01/01'
);

-- create a new country
INSERT INTO countries (countryName) VALUES (
    'United States of America'
);

-- create a new location
INSERT INTO locations (name, countryID, city, streetAddress) VALUES (
    'DC Burger Joint',
    1,
    'Washington DC',
    '1234 Test Address'
);

-- create a new category
INSERT INTO categories (categoryName) VALUES (
    'Restaurant'
);
    
-- create a new travel entry
INSERT INTO locations (userID, DOE, timeOfDay, locationID, categoryID, title, comments, review, groupSize ) VALUES (
    1,
    CURRENT_DATE(),
    '12:00:00',
    1,
    1,
    'DC Burgers do not disappoint!',
    'Tidy little hole in the wall; fantastic personality, and charming staff!',
    '5/5; would recommend.',
    1
);