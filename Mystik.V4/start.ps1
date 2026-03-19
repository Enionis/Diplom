# Fixed startup script with correct dashes
Write-Host "Starting mobile app..." -ForegroundColor Green

# Create environment if not exists
if (-not (Test-Path ".\dipl")) {
    Write-Host "Creating Node.js environment..." -ForegroundColor Yellow
    nodeenv --npm=20.19.4 dipl
}

# Activate environment
Write-Host "Activating environment..." -ForegroundColor Yellow
& ".\dipl\Scripts\activate.ps1"

# Install dependencies if needed
if (-not (Test-Path ".\node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
}

# Start app with correct dashes
Write-Host "Starting app with correct parameters..." -ForegroundColor Green
Write-Host "Command: bun start --web --tunnel" -ForegroundColor Cyan

bun start --web --tunnel