### DnD World Tracker

DnD World Tracker is a tool for managing your TTRPG Worlds.

## To Install
To install, clone the repository and run npm install from the root directory.
```powershell
git clone https://github.com/rhyslee211/dnd-world-tracker.git

cd dnd-world-tracker

npm install
```

## To Run

To run, run open two powershell windows and run the node function on the WorldInfoServer.js in the first and npm run start in the second.

```powershell
node .\public\worldInfoServer.js
```
```powershell
npm run start
```

Then navigate to http://localhost:3000 and the react application will be open there. I have included a template world.db file for testing for now. But in the future you will be able to import and export databases as well as have all the functions to create the world from scratch.
