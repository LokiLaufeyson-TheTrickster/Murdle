$file = 'c:\Sagar\Projects\Websites\Games\Murdle\src\engine\narrative.ts'
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# Fix escaped double quotes inside backstory strings (\"s -> 's, \"t -> 't etc.)
$content = $content -replace '\\\"s ', [char]39 + 's '
$content = $content -replace '\\\"t ', [char]39 + 't '
$content = $content -replace '\\\"s been', [char]39 + 's been'
$content = $content -replace '\\\"s head', [char]39 + 's head'
$content = $content -replace '\\\"s real', [char]39 + 's real'
$content = $content -replace '\\\"s stage', [char]39 + 's stage'

# Fix lines that end with ',' instead of ", (the string ending)
# Pattern: backstory: "...text...',  -> backstory: "...text...",
$content = $content -replace '(backstory: ".*?)[' + [char]39 + '](,\s*$)', '$1"$2'

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host "Done fixing"

# Check remaining issues
$lines = [System.IO.File]::ReadAllLines($file, [System.Text.Encoding]::UTF8)
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'backstory:' -and $lines[$i] -match "['],$") {
        Write-Host "Still broken at line $($i+1): $($lines[$i].Substring(0, [Math]::Min(100, $lines[$i].Length)))"
    }
}
Write-Host "Check complete"
