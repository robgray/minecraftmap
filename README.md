# Minecraft Map
A limitation of Minecraft Bedrock edition (Windows version) is that there are no map generators (like exists for Java Edition).  It would be great to be able to enter your seed and have a map be spat out of your game.  This works to overcome that. How?

Firstly you'll need to turn "show coordinates" on.  The app allows you to enter your coordinates and annotate a POI (Point of Interest) at that position, like a village, a portal, etc.  You can also "zoom to your position" by entering your current location. This will tell you what's in the world around you.  

Have a stack of diamonds you want to offload into an Enchanted Chest?  Mark the location of the chest here and record it has diamonds in it.  Next time you're looking for that precious loot you've worked hard to acquire, go to your map and you'll know where it is.  

You get the idea... Explore and record, like cartography.

## The tech stuff
Underneath the covers it's using:
* ASP.NET Core web api backend.
* React front end, with Microsofts Fluent UI.
* Leaftlet.js for mapping 
