#!/bin/bash
# Decrypt the private key
openssl aes-256-cbc -K $encrypted_ea8e3056d329_key -iv $encrypted_ea8e3056d329_iv -in .travis/id_rsa.enc -out ~/.ssh/id_rsa -d
# Set the permission of the key
chmod 600 ~/.ssh/id_rsa
# Start SSH agent
eval $(ssh-agent)
# Add the private key to the system
ssh-add ~/.ssh/id_rsa
# Copy SSH config
cp .travis/ssh_config ~/.ssh/config
# Set Git config
git config --global user.name "WE Bot"
git config --global user.email "ivanwei_slack@outlook.com"
# Clone the repository
git clone -b gh-pages git@github.com:IvanWei/blog.git .deploy_git
# Deploy to GitHub
hexo deploy
