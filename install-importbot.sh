#!/bin/bash

echo "Welcome to ImportBot Installer"

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Please install Node.js and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm is not installed. Please install npm and try again."
    exit 1
fi

# Ask for installation directory
read -p "Enter the directory where you want to install ImportBot (default: current directory): " install_dir
install_dir=${install_dir:-$(pwd)}

# Create directory if it doesn't exist
mkdir -p "$install_dir"
cd "$install_dir"

# Clone the repository
echo "Cloning ImportBot repository..."
git clone https://github.com/sheikh-developer/ImportBot.git || { echo "Failed to clone repository."; exit 1; }
cd importbot

# Install dependencies
echo "Installing dependencies..."
npm install || { echo "Failed to install dependencies."; exit 1; }

# Ask for GitHub token
read -p "Enter your GitHub token: " github_token
echo "Storing the GitHub token in .env.local is not recommended for production environments."
echo "Consider using environment variables or a more secure method."
echo "GITHUB_TOKEN=$github_token" > .env.local

# Ask for port number
read -p "Enter the port number you want to use (default: 3000): " port
port=${port:-3000}
echo "PORT=$port" >> .env.local

# Build the project
echo "Building the project..."
npm run build || { echo "Failed to build the project."; exit 1; }

# Ask if user wants to use screen for hosting
read -p "Do you want to use screen for hosting? (y/n): " use_screen
if [[ $use_screen == "y" || $use_screen == "Y" ]]
then
    # Check if screen is installed
    if ! command -v screen &> /dev/null
    then
        echo "Screen is not installed. Installing screen..."
        if command -v apt-get &> /dev/null
        then
            sudo apt-get update
            sudo apt-get install screen -y
        elif command -v yum &> /dev/null
        then
            sudo yum install screen -y
        else
            echo "Unable to install screen automatically. Please install screen manually and run the script again."
            exit 1
        fi
    fi

    # Create a screen session and start the server
    echo "Starting ImportBot in a screen session..."
    screen -dmS importbot bash -c "cd $install_dir/importbot && npm start"
    echo "ImportBot is now running in a screen session named 'importbot'"
    echo "To attach to the session, use: screen -r importbot"
else
    # Start the server normally
    echo "Starting ImportBot..."
    npm start
fi

echo "ImportBot installation complete!"
echo "You can access ImportBot at http://localhost:$port"

