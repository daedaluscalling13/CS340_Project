CREATE TABLE IF NOT EXISTS travelEntries_locations (
    eid INT NOT NULL,
    lid INT NOT NULL, 
    PRIMARY KEY (eid, lid), 
    FOREIGN KEY(eid) REFERENCES travelEntries(entryID)
    FOREIGN KEY(lid) REFERENCES locations(locationID)

)