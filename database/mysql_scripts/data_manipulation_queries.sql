-- Database Manipulation queries using the Travel Blog DB

-- select the 5 most recent travel entries to display on the home page
SELECT * FROM travelEntries
INNER JOIN locations ON travelEntries.locationID = locations.locationID
INNER JOIN categories ON travelEntries.categoryID = categories.categoryID
WHERE entryID>=((SELECT MAX(entryID) FROM travelEntries)-5)

-- select TravelEntries based on a searchable location
SELECT * FROM travelEntries
JOIN
(SELECT * FROM travelEntries_locations
JOIN locations ON travelEntries.lid = locations.locationID
WHERE locations.name = `${searchable_location_name}`)
ON travelEntries.entryID = travelEntries_location.tid

-- get all Location IDs and Names to populate the Location dropdown on the Add/Edit TravelEntry page
SELECT locationID, name FROM locations

-- get all countries to populate the Country dropdown on the Add/Edit Location page
SELECT countryID, countryName FROM countries

-- get all countries to populate the Catorgy dropdown on the Add/Edit TravelEntry page
SELECT categoryID, categoryName FROM categories

-- get all the information of a TravelEntry based on it's id to populate the fields in the Edit TravelEntry page
SELECT * FROM travelEntries
INNER JOIN locations ON travelEntries.locationID = locations.locationID
INNER JOIN categories ON travelEntries.categoryID = categories.categoryID
WHERE entryID=`${entryID_to_be_specified}`

-- get all the information of a Location based on it's id to populate the fields in the Edit Location page
SELECT * FROM locations
INNER JOIN countries ON locations.countryID = countries.countryID
WHERE locationID=`${locaitonID_to_be_specified}`

-- get all the information of a country based on it's id to populate the fields in the Edit Country page
SELECT * FROM countries WHERE countryID=`${countryID_to_be_specified}`

-- get all the information of a category based on it's id to populate the fields in the Edit Category page
SELECT * FROM categories WHERE categoryID=`${categoryID_to_be_specified}`



--TODO: Add Inserts here



-- update a TravelEntry based on submission of the Edit TravelEntry form 
UPDATE TravelEntry SET
dateOfEntry = `${date_to_be_specified}`,
timeOfDate = `${time_to_be_specified}`,
location = `${locationID_to_be_specified}`,
category = `${categoryID_to_be_specified}`,
title = `${title_to_be_specified}`
comments = `${comments_to_be_specified}`,
review= `${review_to_be_specified}`,
groupSize = `${groupSize_to_be_specified}`
WHERE id= `${entryID_to_be_specified}`

-- update a Location based on submission of the Edit Location form 
UPDATE locations SET
name = `${name_to_be_specified}`,
country = `${countryID_to_be_specified}`,
city = `${city_to_be_specified}`,
streetAddress= `${streetAddress_to_be_specified}`
WHERE id= `${locationID_to_be_specified}`

-- update a Country based on submission of the Edit Country form 
UPDATE countries SET
countryName = `${name_to_be_specified}`,
WHERE id= `${countryID_to_be_specified}`

-- update a Category based on submission of the Edit Category form 
UPDATE countries SET
categoryName = `${name_to_be_specified}`,
WHERE id= `${categoryID_to_be_specified}`

-- delete a TravelEntry
DELETE FROM travelEntries WHERE id= `${entryID_to_be_specified}`

-- dis-associate a TravelEntry from a Location (M-to-M relationship deletion)
DELETE FROM travelEntries_locations WHERE tid = `${entryID_to_be_specified}` AND lid = `${locationID_to_be_specified}`
