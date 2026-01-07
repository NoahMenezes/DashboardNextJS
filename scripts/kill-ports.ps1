# Kill processes on ports 3000 and 5000
Write-Host "Checking for processes on ports 3000 and 5000..." -ForegroundColor Cyan

# Function to kill process on a specific port
function Kill-ProcessOnPort {
    param (
        [int]$Port
    )

    try {
        $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue

        if ($connections) {
            foreach ($conn in $connections) {
                $processId = $conn.OwningProcess
                $process = Get-Process -Id $processId -ErrorAction SilentlyContinue

                if ($process) {
                    Write-Host "Killing process $($process.ProcessName) (PID: $processId) on port $Port" -ForegroundColor Yellow
                    Stop-Process -Id $processId -Force
                    Write-Host "Process on port $Port killed successfully" -ForegroundColor Green
                }
            }
        } else {
            Write-Host "No process found on port $Port" -ForegroundColor Gray
        }
    } catch {
        Write-Host "Error checking port ${Port}: $_" -ForegroundColor Red
    }
}

# Kill processes on both ports
Kill-ProcessOnPort -Port 3000
Kill-ProcessOnPort -Port 5000

Write-Host "`nPorts cleaned! You can now start your dev servers." -ForegroundColor Green
