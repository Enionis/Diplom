#!/usr/bin/env pwsh

Write-Host "Zapusk Mystik Web" -ForegroundColor Cyan
Write-Host ""

# Path to bun
$BunPath = "$env:USERPROFILE\.bun\bin\bun.exe"

# Check bun installation
if (-not (Test-Path $BunPath)) {
    Write-Host "Bun ne nayden. Ustanovite ego:" -ForegroundColor Red
    Write-Host "powershell -c `"irm bun.sh/install.ps1 | iex`"" -ForegroundColor Yellow
    exit 1
}

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "Bun: $(& $BunPath --version)" -ForegroundColor Green
    Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js ne nayden. Ustanovite Node.js 18 ili vyshe" -ForegroundColor Red
    Write-Host "Skachayte s https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Ustanovka zavisimostey clienta..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Oshibka ustanovki zavisimostey clienta" -ForegroundColor Red
        exit 1
    }
}

# Check if server node_modules exists
if (-not (Test-Path "server/node_modules")) {
    Write-Host "Ustanovka zavisimostey servera..." -ForegroundColor Yellow
    Push-Location server
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Oshibka ustanovki zavisimostey servera" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    Pop-Location
}

Write-Host ""
Write-Host "Vyberte, chto zapustit:" -ForegroundColor Yellow
Write-Host "  1) Server (port 3001)"
Write-Host "  2) Client (port 5173)"
Write-Host "  3) Oba (server v fone, client v tekuschem terminale)"
Write-Host ""

$choice = Read-Host "Vash vybor (1-3)"

switch ($choice) {
    "1" {
        Write-Host "Zapusk servera..." -ForegroundColor Green
        Set-Location server
        & $BunPath --watch index.js
    }
    "2" {
        Write-Host "Zapusk clienta..." -ForegroundColor Green
        npm run dev
    }
    "3" {
        Write-Host "Zapusk servera v fonovom rezhime..." -ForegroundColor Green
        
        # Start server in background
        $serverJob = Start-Job -ScriptBlock {
            param($bunPath, $serverPath)
            Set-Location $serverPath
            & $bunPath --watch index.js
        } -ArgumentList $BunPath, (Join-Path $PSScriptRoot "server")
        
        Write-Host "Server zapuschen (Job ID: $($serverJob.Id))" -ForegroundColor Green
        Write-Host "Dlya prosmotra logov: Receive-Job $($serverJob.Id)" -ForegroundColor Cyan
        
        Start-Sleep -Seconds 2
        Write-Host ""
        Write-Host "Zapusk clienta..." -ForegroundColor Green
        
        # Start client
        try {
            npm run dev
        } finally {
            # Stop server when client exits
            Write-Host ""
            Write-Host "Ostanovka servera..." -ForegroundColor Yellow
            Stop-Job $serverJob
            Remove-Job $serverJob
            Write-Host "Server ostanovlen" -ForegroundColor Green
        }
    }
    default {
        Write-Host "Nevernyy vybor" -ForegroundColor Red
        exit 1
    }
}
