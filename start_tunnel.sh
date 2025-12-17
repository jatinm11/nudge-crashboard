#!/bin/bash

# Check if cloudflared is installed
if ! command -v cloudflared &> /dev/null; then
    echo "Error: cloudflared is not installed."
    echo "Please install it using: brew install cloudflared"
    exit 1
fi

# Check if the local server is running
if ! lsof -i :3001 &> /dev/null; then
    echo "Warning: Your local symbolication server (port 3001) does not seem to be running."
    echo "Please start it with: node server.js"
    echo "Continuing anyway..."
fi

echo "Starting Cloudflare Tunnel for http://localhost:3001..."
echo "Copy the URL ending in .trycloudflare.com below and paste it into the Dashboard's 'Server URL' field."
echo "----------------------------------------------------------------"

# Start the tunnel
cloudflared tunnel --url http://localhost:3001
