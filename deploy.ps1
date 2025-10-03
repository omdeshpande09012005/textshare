# 🚀 QUICK DEPLOYMENT SCRIPT

# Run this entire script to deploy TextShare in 5 minutes!

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  TextShare Deployment Helper" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Step 1: Check Git
Write-Host "[1/6] Checking Git status..." -ForegroundColor Yellow
git status

# Step 2: Add all files
Write-Host "`n[2/6] Adding all files to Git..." -ForegroundColor Yellow
git add .

# Step 3: Commit
Write-Host "`n[3/6] Committing changes..." -ForegroundColor Yellow
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Ready for deployment - TextShare v1.0"
}
git commit -m $commitMessage

# Step 4: Check remote
Write-Host "`n[4/6] Checking Git remote..." -ForegroundColor Yellow
$remote = git remote -v
if ($remote) {
    Write-Host "Git remote found!" -ForegroundColor Green
    git remote -v
} else {
    Write-Host "No Git remote found. Adding remote..." -ForegroundColor Yellow
    $repoUrl = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/username/textshare.git)"
    git remote add origin $repoUrl
}

# Step 5: Push to GitHub
Write-Host "`n[5/6] Pushing to GitHub..." -ForegroundColor Yellow
$branch = git branch --show-current
git push -u origin $branch

# Step 6: Final instructions
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  ✅ CODE PUSHED TO GITHUB!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://vercel.com/signup" -ForegroundColor White
Write-Host "2. Sign in with GitHub" -ForegroundColor White
Write-Host "3. Click 'Import Project'" -ForegroundColor White
Write-Host "4. Select your 'textshare' repository" -ForegroundColor White
Write-Host "5. Add these environment variables:" -ForegroundColor White
Write-Host "   - DATABASE_URL (from Neon.tech)" -ForegroundColor Cyan
Write-Host "   - RESEND_API_KEY (get from Resend.com dashboard)" -ForegroundColor Cyan
Write-Host "   - ADMIN_EMAIL (your email address)" -ForegroundColor Cyan
Write-Host "6. Click 'Deploy'" -ForegroundColor White
Write-Host "`n7. After deployment, run:" -ForegroundColor Yellow
Write-Host "   npx prisma db push" -ForegroundColor Cyan
Write-Host "`nFor detailed guide, see: DEPLOY_NOW.md`n" -ForegroundColor Green

# Open browser
$openBrowser = Read-Host "Open Vercel in browser? (y/n)"
if ($openBrowser -eq "y") {
    Start-Process "https://vercel.com/new"
}

Write-Host "`n🎉 Ready to deploy! Good luck!`n" -ForegroundColor Green
