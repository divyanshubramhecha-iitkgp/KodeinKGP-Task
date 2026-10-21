$content = Get-Content -Path 'index.html' -Raw
$match = [regex]::Match($content, 'const allPhotoData = \[(.+?)\];', [System.Text.RegularExpressions.RegexOptions]::Singleline)
if ($match.Success) {
    Write-Host "Matched! Array length: $($match.Groups[1].Value.Length)"
} else {
    Write-Host "No match found"
}
