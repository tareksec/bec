Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\bird\Documents\jobaway pack\Jobaway\app\icon.png"
$backupPath = "c:\Users\bird\Documents\jobaway pack\Jobaway\app\icon_original.png"
Copy-Item $sourcePath $backupPath -Force

$img = [System.Drawing.Image]::FromFile($sourcePath)

$newWidth = $img.Width
$newHeight = $img.Height

# We increase the canvas size by 40% to make the logo look smaller
$paddedWidth = [Math]::Round($newWidth * 1.4)
$paddedHeight = [Math]::Round($newHeight * 1.4)

$bmp = New-Object System.Drawing.Bitmap($paddedWidth, $paddedHeight)
$bmp.MakeTransparent()

$graphics = [System.Drawing.Graphics]::FromImage($bmp)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

$x = [Math]::Round(($paddedWidth - $newWidth) / 2)
$y = [Math]::Round(($paddedHeight - $newHeight) / 2)

$graphics.DrawImage($img, $x, $y, $newWidth, $newHeight)

$img.Dispose()
$graphics.Dispose()

$bmp.Save($sourcePath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Host "Image successfully padded and scaled down!"
