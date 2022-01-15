# Minecraft Mapper
A limitation of Minecraft Bedrock edition (Windows version) is that there are no map generators (like exists for Java Edition). 
It would be great to be able to enter your seed and have a map be spat out of your game.  This works to overcome that. How?

Firstly you'll need to turn "show coordinates" on.  The app allows you to enter your coordinates and annotate a POI (Point of Interest) at that position, 
like a village, a portal, etc.  You can also "zoom to your position" by entering your current location. This will tell you what's in the world around you.  

Have a stack of diamonds you want to offload into an Enchanted Chest?  Mark the location of the chest here and record it has diamonds in it. 
Next time you're looking for that precious loot you've worked hard to acquire, go to your map and you'll know where it is.  

You get the idea... Explore and record, like cartography.

## The tech stuff
Underneath the covers it's using:
* ASP.NET Core web api backend.
* React front end, with Microsofts Fluent UI.
* Leaftlet.js for mapping 

## Client API
NSwag is used to generate a typescript api client used by the React front end.  Whenever the MinecraftMapper api project is build it creates a swagger.json 
file used to generate. There are two key additions to the Api csproj file.  

```
<Target Name="BeforeNSwag" BeforeTargets="NSwag">
    <Exec Command="dotnet tool restore" />
    <Exec Command="dotnet swagger tofile --output ./swagger.json $(OutputPath)$(AssemblyName).dll v1 " />
</Target>
<Target Name="NSwag" AfterTargets="Build">
    <Exec WorkingDirectory="$(ProjectDir)" EnvironmentVariables="ASPNETCORE_ENVIRONMENT=Development" Command="$(MyNSwag) run nswag.json" />
</Target>
```
The above two build steps:
1. Generate the swagger.json file from the assembly and, 
2. Create a typescript api client in the react project

This way the client is always kept in sync with the API.
