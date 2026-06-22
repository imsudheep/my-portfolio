# Download all assets from thebenkim.com
$baseUrl = "https://www.thebenkim.com/media"
$outDir = "d:\Work\Clone Website\public\media"

# Create output directory
New-Item -ItemType Directory -Path $outDir -Force | Out-Null

$files = @(
    "ben.png",
    "msu.jpg",
    "hotel.png",
    "first-code.jpg",
    "commercial.jpg",
    "dilemaa-launch.jpg",
    "travel.png",
    "pitch-win.jpg",
    "nostalgia.png",
    "nostalgia-mkt.jpg",
    "modeling.jpg",
    "sae.jpg",
    "drivers.jpg",
    "dilemaa.png",
    "nostalgia_app.png",
    "sae.png",
    "business.png",
    "student.png",
    "fitness.png",
    "korea.png",
    "life.png",
    "kart-analyzer.png",
    "teaser.mp4",
    "devious.mp4"
)

foreach ($file in $files) {
    $url = "$baseUrl/$file"
    $out = "$outDir\$file"
    Write-Host "Downloading $file..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing
        Write-Host "  OK"
    } catch {
        Write-Host "  FAILED: $_"
    }
}

Write-Host "`nDone! All assets downloaded to $outDir"
