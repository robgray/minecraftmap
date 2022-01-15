FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["MinecraftMapper/MinecraftMapper.csproj", "./"]
RUN dotnet restore "MinecraftMapper.csproj"
COPY . . 
WORKDIR "/src/MinecraftMapper/."
RUN dotnet build "MinecraftMapper.csproj" -c Release -o /app/build

FROM build as publish
RUN dotnet publish "MinecraftMapper.csproj" -c Release -o /app/publish

FROM base as final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MinecraftMapper.dll"]

