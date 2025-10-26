[CmdletBinding()]
param (
    [Parameter(mandatory=$true)]
    [ValidateSet("ui","api")]
    [string] $proj,
    
    [Parameter(mandatory=$true)]
    [string] $version
)

$projName = "api"
if ($proj -eq "ui")
{
    $projName = "front"
}

Write-Host "Building docker image for Pickme $proj Version $version..."
docker build . -f Dockerfile -t robgray/minecraft-mapper-${proj}:${version} -t robgray/minecraft-mapper-${proj}:latest

Write-Host "Updating docker hub with latest images ($verion and latest tags)..."
docker image push robgray/minecraft-mapper-${proj}:$version
docker image push robgray/minecraft-mapper-${proj}:latest 

Write-Host "Update done"
