CREATE table IF NOT EXISTS locations(
    locationID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    name VAR_CHAR(64) NOT NULL,
    countryID INT NULL,
    city VAR_CHAR(64) NOT NULL,
    streetAddress VAR_CHAR(64) NOT NULL 

    FOREIGN KEY(countryID) REFERENCES countries(countryID)
    )

