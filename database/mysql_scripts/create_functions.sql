-- create travelEntry function
CREATE FUNCTION addTravelEntry(
    userID INT,
    timeOfDay TIME, 
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
     userID, CURRENT_TIME(), locationID, category, title, comments, review, groupSize
    ),
    ( -- second row: values for the columns in the list above
     Column1_Value, Column2_Value, Column3_Value
    )
    -- add more rows here
    GO