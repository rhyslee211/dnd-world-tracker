const sqlite3 = require('sqlite3').verbose();
// server.js
const express = require('express');

const app = express();
const port = 5000;
//const server = getLocalIpAddress();
//const server = "localhost";
const server = "0.0.0.0"

// Open (or create) the SQLite database
const db = new sqlite3.Database('./world.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

app.use(express.json());

app.get('/characters', (req, res) => {
    db.all('SELECT * FROM characters', (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json(rows);
    });
});

app.get('/locations', (req, res) => {
    db.all('SELECT * FROM locations', (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json(rows);
    });
});

app.get('/factions', (req, res) => {
    db.all('SELECT * FROM factions', (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json(rows);
    });
});


app.get('/events', (req, res) => {
    db.all('SELECT * FROM events', (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json(rows);
    });
});


app.get('/monsters', (req, res) => {
    db.all('SELECT * FROM monsters', (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json(rows);
    });
});

app.get('/items', (req, res) => {
    db.all('SELECT * FROM items', (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json(rows);
    });
});


app.post('/characters', (req, res) => {
    const { name, race , role ,  location_id, faction_id } = req.body;
    db.run('INSERT INTO characters (name, race, role, location_id, faction_id) VALUES (?, ?, ?, ?, ?)', [name, race, role, location_id, faction_id], function(err) {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({"id": this.lastID});
    });
});

app.post('/locations', (req, res) => {
    const { name , type , positionx, positiony } = req.body;
    db.run('INSERT INTO locations (name) VALUES (?,?,?,?)', [name,type,positionx,positiony], function(err) {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({"id": this.lastID});
    });
});


app.post('/factions', (req, res) => {
    const { name } = req.body;
    db.run('INSERT INTO factions (name) VALUES (?)', [name], function(err) {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({"id": this.lastID});
    });
});


app.post('/events', (req, res) => {
    const { name } = req.body;
    db.run('INSERT INTO events (name) VALUES (?)', [name], function(err) {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({"id": this.lastID});
    });
});


app.post('/monsters', (req, res) => {
    const { name } = req.body;
    db.run('INSERT INTO monsters (name) VALUES (?)', [name], function(err) {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({"id": this.lastID});
    });
});


app.post('/items', (req, res) => {
    const { name } = req.body;
    db.run('INSERT INTO items (name) VALUES (?)', [name], function(err) {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({"id": this.lastID});
    });
});


app.get('/world-tree-view', async (req, res) => {
    // Assuming you have functions that fetch data from your database
    const locations = await fetchLocations();
    const characters = await fetchCharacters();
    const monsters = await fetchMonsters();
    const events = await fetchEvents();
    const items = await fetchItems();
  
    const treeData = buildTree(locations, characters, monsters,events,items);
    res.json(treeData);
  });
  

async function fetchLocations() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM locations', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

async function fetchCharacters() {
        return new Promise((resolve, reject) => {
          db.all('SELECT * FROM characters', (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
        }

async function fetchMonsters() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM monsters', (err, rows) => {
        if (err) {
            reject(err);
        } else {
            resolve(rows);
        }
        });
    });
}


async function fetchEvents() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM events', (err, rows) => {
        if (err) {
            reject(err);
        } else {
            resolve(rows);
        }
        });
    });
}

async function fetchItems() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM items', (err, rows) => {
        if (err) {
            reject(err);
        } else {
            resolve(rows);
        }
        });
    });
}


function buildTree(locations, characters, monsters, events, items) {
    const locationMap = {};  // A map of location IDs to their corresponding location data
  
    // Step 1: Add locations to the map
    locations.forEach(location => {
      locationMap[location.id] = { ...location, children: [] };
    });
  
    // Step 2: Add characters and monsters to locations
    characters.forEach(person => {
      const location = locationMap[person.location_id];
      if (location) {
        if (!location.people) location.people = [];
        location.people.push(person);

        // Add person to the parent location if it exists
        if (location.parent_id) {
          const parentLocation = locationMap[location.parent_id];
          if (parentLocation) {
            if (!parentLocation.people) parentLocation.people = [];
            parentLocation.people.push(person);
          }
        }
      }
    });
  
    monsters.forEach(monster => {
      const location = locationMap[monster.location_id];
      if (location) {
        if (!location.monsters) location.monsters = [];
        location.monsters.push(monster);

        // Add monster to the parent location if it exists
        if (location.parent_id) {
          const parentLocation = locationMap[location.parent_id];
          if (parentLocation) {
            if (!parentLocation.monsters) parentLocation.monsters = [];
            parentLocation.monsters.push(monster);
          }
        }
      }
    });

    events.forEach(event => {
        const location = locationMap[event.location_id];
        if (location) {
          if (!location.events) location.events = [];
          location.events.push(event);

          // Add event to the parent location if it exists
          if (location.parent_id) {
            const parentLocation = locationMap[location.parent_id];
            if (parentLocation) {
              if (!parentLocation.events) parentLocation.events = [];
              parentLocation.events.push(event);
            }
          }
        }
      });

    items.forEach(item => {
        const location = locationMap[item.location_id];
        if (location) {
          if (!location.items) location.items = [];
          location.items.push(item);

          // Add item to the parent location if it exists
          if (location.parent_id) {
            const parentLocation = locationMap[location.parent_id];
            if (parentLocation) {
              if (!parentLocation.items) parentLocation.items = [];
              parentLocation.items.push(item);
            }
          }
        }
      }
    );

    // Step 3: Build the tree structure
    const tree = [];
    locations.forEach(location => {
      if (location.parent_id) {
        const parentLocation = locationMap[location.parent_id];
        if (parentLocation) {
          parentLocation.children.push(locationMap[location.id]);
        }
      } else {
        tree.push(locationMap[location.id]);
      }
    });

    return tree;
}





app.listen(port, server, () => {
    console.log(`Server running at http://${server}:${port}`);
  });
