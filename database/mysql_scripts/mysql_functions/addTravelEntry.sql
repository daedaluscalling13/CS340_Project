DELIMITER $$

-- create travelEntry function
CREATE FUNCTION addTravelEntry(
    userID INT,
    dateOfEvent DATE,
    timeOfEvent TIME,
    locationID INT, 
    categoryID INT, 
    title VAR_CHAR(15), 
    comments VAR_CHAR(65535), 
    review VAR_CHAR(65535), 
    groupSize INT
)
RETURNS entryID
BEGIN
    -- Insert rows into table 'Travel Entries'
    INSERT INTO travelEntries
    ( -- columns to insert data into
     userID, DOE, timeOfDay, locationID, category, title, comments, review, groupSize 
    )
    VALUES
    ( -- first row: values for the columns in the list above
     userID, dateOfEven, timeOfEvent, locationID, category, title, comments, review, groupSize
    );
    END $$

    DELIMITER ;