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
### `npm i --legacy-peer-deps`</br></br>
Install the Firebase CLI globally
### `npm i -g firebase-tools`</br></br>
Log into Firebase using your Google account
### `firebase login`
This command connects your local machine to Firebase and grants you access to your Firebase projects.

Test that the CLI is properly installed and accessing your account by listing your Firebase projects. Run the following command
### `firebase projects:list`

Next, change into the functions subdirectory and install the dependecies required for cloud functions
### `cd functions`
### `npm i`
Change back into the main directory
### `cd ..`</br></br>
Set up the Emulator Suite. This command starts a configuration wizard. 
### `firebase init emulators`
Select the following emulators to download the corresponding emulator binary files. 
* functions
* firestore
* storage

Select default options so that it will preserve the current emulator configuration as per `firebase.json` file.</br></br>
First, run the development server:
### `npm run dev`</br></br>
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Local testing 

Creating a new user 

Navigate to register page 
## Deploy on Firebase