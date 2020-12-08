-- Database Manipulation queries using the Travel Blog DB

-------------------------------------TravelEntries---------------------------------------

-- Query to populate the home page with the 5 most recent entries
SELECT * FROM travelEntries
    JOIN locations ON travelEntries.locationID = locations.locationID
    JOIN categories ON travelEntries.categoryID = categories.categoryID
    WHERE entryID >= ((SELECT MAX(entryID) FROM travelEntries)-5)
    ORDER BY entryID DESC

-- Query to populate entry page
SELECT * FROM travelEntries
    JOIN locations ON travelEntries.locationID = locations.locationID
    JOIN categories ON travelEntries.categoryID = categories.categoryID
    ORDER BY entryID ASC

-- Query to populate the results page
SELECT * FROM travelEntries
    JOIN
    (SELECT * FROM travelEntries_locations
    JOIN locations ON travelEntries.lid = locations.locationID
    WHERE locations.name =?)
    ON travelEntries.entryID = travelEntries_location.tid

-- Query to populate the edit TravelEntry page
SELECT *, DATE_FORMAT(DOE, '%Y-%m-%d') AS custom_date FROM travelEntries
    INNER JOIN locations ON travelEntries.locationID = locations.locationID
    INNER JOIN categories ON travelEntries.categoryID = categories.categoryID
    WHERE entryID=?

-- Query to add a new TravelEntry
INSERT INTO travelEntries (userID, DOE, timeOfDay, locationID, categoryID, title, comments, review, groupSize)
    VALUES(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )

-- Query to update a TravelEntry from the edit TravelEntry page
UPDATE travelEntries SET
userID=?,
DOE=?,
timeOfDay=?,
locationID=?,
categoryID=?,
title=?,
comments=?,
review=?,
groupSize=?
WHERE entryID=?

-- Query to delete a TravelEntry from the Entry page
DELETE FROM travelEntries WHERE entryID=?

-------------------------------------Locations-------------------------------------------

-- Query to select all Locations for the Locations page and the Add/Edit TravelEntries Pages
SELECT * FROM locations
    JOIN countries ON locations.countryID = countries.countryID

-- Query to select a specific location on the Edit Locations page
SELECT * FROM locations
    JOIN countries ON locations.countryID = countries.countryID
    WHERE locationID=?

-- Query to create a Location from the Add Location page
INSERT INTO locations (name, countryID, city, streetAddress)
    VALUES(
        ?,
        ?,
        ?,
        ?
    )

-- Query to update a Location from the Edit Location page
UPDATE locations SET
        name=?,
        countryID=?,
        city=?,
        streetAddress=?
        WHERE locationID=?

-- Query to delete a Location from the Location page
DELETE FROM locations WHERE locationID=?

-------------------------------------Countries-------------------------------------------

-- Query to select all Countries for the Country page and the Add/Edit Locations page
SELECT * FROM countries

-- Query to select specific Countries from the Edit Country page
SELECT * FROM countries WHERE countryID=?

-- Query to create Countries from the Add Country page
INSERT INTO countries (countryName)
    VALUES(
        ?
    )

-- Query to update Countries from the Edit Country page
UPDATE countries SET countryName=? WHERE countryID=?

-- Query to delete Countries from the Country page
DELETE FROM countries WHERE countryID=?

-------------------------------------Categories------------------------------------------

-- Query to select all categories for the Categories page and the Add/Edit TravelEntries pages
const selectCategoriesQuery = `SELECT * FROM categories`

-- Query to select a specific category for the Edit Categories page
SELECT * FROM categories WHERE categoryID=?

-- Query to insert Categories from the Add Categories page
INSERT INTO categories (categoryName)
    VALUES(
        ?
    )

-- Query to update Categories from Edit Category page
UPDATE categories SET categoryName=? WHERE categoryID=?

-- Query to delete Categories from Category page
DELETE FROM categories WHERE categoryID=?

-----------------------------------------------------------------------------------------