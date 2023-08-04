# Leaflet Visualization Challenge - Visualizing United States Geological Survey (USGS) Earthquake Data

## Background

The United States Geological Survey (USGS) is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, the task was to develop a way to visualize USGS data that will allow USGS to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

### Before opening the starterCode folder

1. I created a new repository in GitHub for this project called `leaflet-challenge`. 
2. Inside the new repository I cloned the new repository to my computer.
3. Inside my local Git repository, I created a folder titled Leaflet-Part-1. I then added the files from the StarterCode folder that was within the Module 15 Challenge zip file.  The folder included the following:
   - a folder titled "image" with several *.png files used for reference,
   - a folder titled "static" that included a subfolder titled "js" with a starter javascript code file titled "logic.js", and a subfolder titled "css" with a starter style file titled "style.css", 
   - an index.html file
5. I copied the starter code that was provided by our class instructor, to help us get started with the assignment, to the logic.js file.

## Steps for Building the Earthquake Map Visualization

1. The USGS provides earthquake data, that is updated every 5 minutes, in a number of different formats.  Visited the USGS GeoJSON Feed at https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php page and chose a dataset to visualize.
   
2. Selected the dataset "All Earthquakes from the past 7 days" via a JSON representation of that data.  Used the URL of this JSON to pull in the data for the visualization.
    
3. Imported and visualized the data by doing the following:
    - Using Leaflet, created a map that plotted all the earthquakes from the dataset based on their longitude and latitude.
      The data markers reflected the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes appeared larger,       and earthquakes with greater depth appeared darker in color.
    - Included popups that provided additional information about the earthquake when its associated marker was clicked.
    - Created a legend that provided context for the map data.
    - Updated the style.css file with legend related styling code.
    - Saved an image of the map as a .png file titled "Leaflet_Part1_Earthquake_Visualization_Map.png".
      
## References

1. Dataset created by (https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).
2. homeworkOutline15.js, javascript starter code provided by our bootcamp instructor.

