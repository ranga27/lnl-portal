# Loop Not Luck Portal

## Overview
MVP: For Customers

RC1: For Admins

RC2: For Candidates

## Clone
The repo [lnl-portal](https://github.com/ranga27/lnl-portal) to a local project directory

To clone within VSCode, follow these [steps](https://docs.microsoft.com/en-us/azure/developer/javascript/how-to/with-visual-studio-code/clone-github-repository?tabs=create-repo-command-palette%2Cinitialize-repo-activity-bar%2Ccreate-branch-command-palette%2Ccommit-changes-command-palette%2Cpush-command-palette)
## Install
In the cloned local project directory, install dependecies required for the project
```bash
yarn install
```
Install the Firebase CLI globally
```bash
npm i -g firebase-tools
```
Log into Firebase using your Google account
```bash
firebase login
```

This command connects your local machine to Firebase and grants you access to your Firebase projects.

Test that the CLI is properly installed and accessing your account by listing your Firebase projects. Run the following command
```bash
firebase projects:list
```
Next, change into the functions directory and install the dependecies required for cloud functions
```bash
cd functions
yarn install
```
Change back into the main directory
```bash
cd..
```

To run the app locally for testing:
```bash
npm run serve
# or
yarn serve
```
Open the hosting emulator URL with your browser to see the result.

## Deploy the app to the cloud with Firebase
```bash
npm run deploy
# or
yarn deploy
```
This depolys the hosting, next build & cloud functions

