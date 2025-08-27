#!/bin/bash

# Install frontend dependencies
npm install

# Build the frontend
npm run build

# Install backend dependencies
cd backend
pip install -r requirements.txt

# Go back to project root
cd ..
