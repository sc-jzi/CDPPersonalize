[CmdletBinding(DefaultParameterSetName = "no-arguments")]
Param (
	[Parameter(Mandatory = $true,
        HelpMessage = "The path to the Sitecore Personalize GraphQL script stored in .txt file.",
        ParameterSetName = "env-init")]
    [string]$file,
	
	[Parameter(Mandatory = $true,
        HelpMessage = "Sets the path to the output file.",
        ParameterSetName = "env-init")]
    [string]$outputFile
)

[String[]] $content = Get-Content "$($file)"
[String[]]$newContent = Get-Content "$($file)" | Where { $_ -notmatch "^\s*#|^\s*$" } | Select-Object -Skip 1 | Select-Object -SkipLast 1 

$pattern = '\$\w+'
$variables = [regex]::Matches($newContent -join "`n", $pattern) | ForEach-Object { $_.Value }

foreach ($variable in $variables) {
    $replacement = '"${' + $variable.TrimStart('$') + '}"'
    $newContent = $newContent -replace [regex]::Escape($variable), $replacement
}

Set-Content -Value "{ `"query`": `"query { $(($newContent -replace '\s{2,}', ' ') -replace '"', '\"') }`"}"  -Path $outputFile


Write-Host "{ `"query`": `"query { $(($newContent -replace '\s{2,}', ' ') -replace '"', '\"') }`"}" 
Write-Host "`nDone."
