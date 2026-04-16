# Independência — Script de Instalação e Execução
# Execute este arquivo como Administrador ou via PowerShell

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  Independência — Simulador Arquitetônico" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

# Verificar Node.js
$nodeVersion = node --version 2>$null
if (-not $nodeVersion) {
    Write-Host "ERRO: Node.js não encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Instale o Node.js LTS em: https://nodejs.org/en/download" -ForegroundColor Cyan
    Write-Host "Após instalar, reinicie o PowerShell e execute este script novamente." -ForegroundColor Cyan
    exit 1
}

Write-Host "✓ Node.js $nodeVersion detectado" -ForegroundColor Green

# Instalar dependências
Write-Host ""
Write-Host "Instalando dependências..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro ao instalar dependências!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✓ Dependências instaladas!" -ForegroundColor Green
Write-Host ""
Write-Host "Iniciando servidor de desenvolvimento..." -ForegroundColor Cyan
Write-Host "Acesse: http://localhost:5173" -ForegroundColor Yellow
Write-Host ""

npm run dev
