#!/bin/bash

# Start the backend server in the background
cd backend
pip install -r requirements.txt
python run.py &

# Go back to the project root
cd ..

# Start the frontend server
npm install
npm run dev
