#!/bin/bash

# Create dist directory if it doesn't exist
mkdir -p dist/icons

# Copy manifest and popup
cp public/manifest.json dist/
cp public/popup.html dist/

# Copy all icons
cp public/icons/* dist/icons/

echo "Static files copied successfully!"