#!/bin/bash

# Kill processes on ports 3000 and 5000
echo "Checking for processes on ports 3000 and 5000..."

# Function to kill process on a specific port
kill_port() {
    local PORT=$1

    # Find process ID using the port
    PID=$(lsof -ti:$PORT 2>/dev/null)

    if [ -z "$PID" ]; then
        echo "No process found on port $PORT"
    else
        echo "Killing process (PID: $PID) on port $PORT"
        kill -9 $PID 2>/dev/null

        if [ $? -eq 0 ]; then
            echo "Process on port $PORT killed successfully"
        else
            echo "Failed to kill process on port $PORT"
        fi
    fi
}

# Kill processes on both ports
kill_port 3000
kill_port 5000

echo ""
echo "Ports cleaned! You can now start your dev servers."
