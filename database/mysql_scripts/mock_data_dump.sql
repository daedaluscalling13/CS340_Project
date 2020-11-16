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




