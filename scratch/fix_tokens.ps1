$files = Get-ChildItem -Path 'c:\Users\ROHITGUPTA\Downloads\Lang\Web\src' -Recurse -Include '*.tsx','*.ts' | Where-Object { $_.FullName -notmatch 'node_modules' }
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw -ErrorAction SilentlyContinue
    if ($null -eq $content) { continue }
    $original = $content
    # Replace text-pencil -> text-[#777775] (text-secondary)
    $content = $content -replace 'text-pencil/(\d+)', 'text-[#777775]/$1'
    $content = $content -replace 'text-pencil(?![/\-\w])', 'text-[#777775]'
    # Replace border-pencil -> border-[#7D927D]/20 (structural borders)
    $content = $content -replace 'border-pencil/(\d+)', 'border-[#7D927D]/$1'
    $content = $content -replace 'border-pencil(?![/\-\w])', 'border-[#7D927D]/20'
    # Replace bg-paper -> bg-white (elevated)
    $content = $content -replace 'bg-paper/\[([^\]]+)\]', 'bg-white/[$1]'
    $content = $content -replace 'bg-paper/(\d+)', 'bg-white/$1'
    $content = $content -replace 'bg-paper(?![/\-\w])', 'bg-white'
    # Replace text-ink -> text-[#2F353B] (text-primary)
    $content = $content -replace 'text-ink(?![/\-\w])', 'text-[#2F353B]'
    # Replace bg-ink -> bg-[#2F353B]
    $content = $content -replace 'bg-ink(?![/\-\w])', 'bg-[#2F353B]'
    # Replace text-marigold -> text-[#7D927D] (accent-action)
    $content = $content -replace 'text-marigold(?![/\-\w])', 'text-[#7D927D]'
    # Replace bg-marigold -> bg-[#7D927D] (accent-action)
    $content = $content -replace 'bg-marigold/\[([^\]]+)\]', 'bg-[#7D927D]/[$1]'
    $content = $content -replace 'bg-marigold/(\d+)', 'bg-[#7D927D]/$1'
    $content = $content -replace 'bg-marigold(?![/\-\w])', 'bg-[#7D927D]'
    # Replace border-marigold -> border-[#7D927D]
    $content = $content -replace 'border-marigold/(\d+)', 'border-[#7D927D]/$1'
    $content = $content -replace 'border-marigold(?![/\-\w])', 'border-[#7D927D]'
    # Replace terracotta -> accent-action (#7D927D)
    $content = $content -replace 'text-terracotta(?![/\-\w])', 'text-[#7D927D]'
    $content = $content -replace 'bg-terracotta/(\d+)', 'bg-[#7D927D]/$1'
    $content = $content -replace 'bg-terracotta(?![/\-\w])', 'bg-[#7D927D]'
    $content = $content -replace 'border-terracotta/(\d+)', 'border-[#7D927D]/$1'
    $content = $content -replace 'border-terracotta(?![/\-\w])', 'border-[#7D927D]'
    $content = $content -replace 'from-terracotta/(\d+)', 'from-[#7D927D]/$1'
    $content = $content -replace 'from-terracotta(?![/\-\w])', 'from-[#7D927D]'
    $content = $content -replace 'to-terracotta(?![/\-\w])', 'to-[#7D927D]'
    $content = $content -replace 'via-ink(?![/\-\w])', 'via-[#F9F7F2]'
    $content = $content -replace 'from-teal-deep/(\d+)', 'from-[#7D927D]/$1'
    $content = $content -replace 'from-teal-deep(?![/\-\w])', 'from-[#7D927D]'
    $content = $content -replace 'to-teal-deep(?![/\-\w])', 'to-[#6B826B]'
    $content = $content -replace 'focus:border-terracotta', 'focus:border-[#7D927D]'
    $content = $content -replace 'hover:text-marigold', 'hover:text-[#7D927D]'
    $content = $content -replace 'hover:border-terracotta/(\d+)', 'hover:border-[#7D927D]/$1'
    # Replace glass-surface with Serene Lexicon card equivalent
    $content = $content -replace 'glass-surface', 'bg-white/90 backdrop-blur-sm'
    # Replace ambient-blob--marigold
    $content = $content -replace 'ambient-blob--marigold', 'ambient-blob--sage'
    if ($content -ne $original) {
        Set-Content $f.FullName $content -NoNewline
        Write-Output ("Updated: " + $f.Name)
    }
}
Write-Output "Done!"
