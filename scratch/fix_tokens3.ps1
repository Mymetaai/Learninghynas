$files = Get-ChildItem -Path 'c:\Users\ROHITGUPTA\Downloads\Lang\Web\src' -Recurse -Include '*.tsx','*.ts' | Where-Object { $_.FullName -notmatch 'node_modules' -and $_.FullName -notmatch '\\content\\' -and $_.FullName -notmatch '\\data\\sentenceBuilder' -and $_.FullName -notmatch '\\lib\\sentenceBuilder' }
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw -ErrorAction SilentlyContinue
    if ($null -eq $content) { continue }
    $original = $content
    # Replace remaining bg-pencil/xx with bg-[#777775]/xx
    $content = $content -replace 'bg-pencil/(\d+)', 'bg-[#777775]/$1'
    $content = $content -replace 'bg-pencil(?![/\-\w])', 'bg-[#777775]'
    # Replace hover:bg-pencil/xx
    $content = $content -replace 'hover:bg-pencil/(\d+)', 'hover:bg-[#777775]/$1'
    if ($content -ne $original) {
        Set-Content $f.FullName $content -NoNewline
        Write-Output ("Updated: " + $f.Name)
    }
}
Write-Output "Done!"
