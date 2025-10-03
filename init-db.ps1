Write-Host 'Go to Vercel Dashboard and get your DATABASE_URL:' -ForegroundColor Yellow
Write-Host '1. Visit: https://vercel.com/omdeshpande09012005s-projects/textshare/settings/environment-variables'
Write-Host '2. Click the eye icon next to DATABASE_URL'
Write-Host '3. Copy the connection string'
Write-Host ''
$neonUrl = Read-Host 'Paste your Neon DATABASE_URL here'
if ($neonUrl) {
    $env:DATABASE_URL = $neonUrl
    npx prisma db push
}
