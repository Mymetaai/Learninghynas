$files = Get-ChildItem -Path 'c:\Users\ROHITGUPTA\Downloads\Lang\Web\src' -Recurse -Include '*.tsx','*.ts' | Where-Object { $_.FullName -notmatch 'node_modules' -and $_.FullName -notmatch 'Confetti' }
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw -ErrorAction SilentlyContinue
    if ($null -eq $content) { continue }
    $original = $content
    # Replace teal-deep with sage green (#7D927D) — it's used for success/check states
    $content = $content -replace 'text-teal-deep', 'text-[#7D927D]'
    $content = $content -replace 'bg-teal-deep/(\d+)', 'bg-[#7D927D]/$1'
    $content = $content -replace 'bg-teal-deep', 'bg-[#7D927D]'
    $content = $content -replace 'border-teal-deep/(\d+)', 'border-[#7D927D]/$1'
    $content = $content -replace 'border-teal-deep', 'border-[#7D927D]'
    $content = $content -replace 'to-teal-deep/(\d+)', 'to-[#7D927D]/$1'
    $content = $content -replace 'to-teal-deep', 'to-[#6B826B]'
    $content = $content -replace 'from-teal-deep', 'from-[#7D927D]'
    $content = $content -replace 'hover:bg-teal-deep/(\d+)', 'hover:bg-[#7D927D]/$1'
    $content = $content -replace 'hover:bg-teal-deep', 'hover:bg-[#6B826B]'
    # Also replace any remaining terracotta patterns
    $content = $content -replace 'text-terracotta/(\d+)', 'text-[#C4796B]/$1'
    $content = $content -replace 'hover:text-terracotta/(\d+)', 'hover:text-[#C4796B]/$1'
    $content = $content -replace 'hover:text-terracotta', 'hover:text-[#C4796B]'
    if ($content -ne $original) {
        Set-Content $f.FullName $content -NoNewline
        Write-Output ("Updated: " + $f.Name)
    }
}
Write-Output "Done!"
