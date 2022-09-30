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

Add following environment variables:

GOOGLE_APPLICATION_CREDENTIALS=<credential.json>

To run the app locally for testing:
```bash
npm run dev
# or
yarn dev
```
It runs 2 services: next.js client/server at http://localhost:3000 and firebase emulator at http://localhost:4000
Access both in separate browser tabs to test the flow

## Deploy the app to the cloud with Firebase
```bash
npm run deploy
# or
yarn deploy
```
This depolys the hosting, next build & cloud functions

## Google Cloud Build 
Initial Setup 

This is for creating new builders or optimising existing one. Skip this step if an image exists in the Artifactory Registry

Create a firebase builder

Custom Firebase builder
https://cloud.google.com/build/docs/configuring-builds/use-community-and-custom-builders?hl=en-GB#creating_a_custom_builder

Use Ubuntu 20.04(focal) to create the comtanier image.
Ensure Docker version installed should be same as the one used in GCB. At the time of writing it was 20.10.4. For latest check: https://cloud.google.com/build/docs/interacting-with-dockerhub-images#working_with_docker_client_versions

Follow: https://docs.docker.com/engine/install/ubuntu/

```sh
sudo apt-get install docker-ce=5:20.10.4~3-0~ubuntu-focal docker-ce-cli=5:20.10.4~3-0~ubuntu-focal containerd.io docker-compose-plugin
```

Community provided Firebase builder
By default, the firebase tool is not available on the npm image, so we used the custom builder. But sometimes its to use community builder.

You will need to clone the repo from the cloud builder community.

git clone https://github.com/GoogleCloudPlatform/cloud-builders-community
cd cloud-builders-community/firebase
gcloud builds submit --config cloudbuild.yaml .
After the process is completed, you can delete the repo from your computer.


Upload the Firbase builder 

We will be using Kaniko workers for building. this will enable Kaniko cache in the docker builds.

https://cloud.google.com/build/docs/optimize-builds/kaniko-cache

install and login to googgle cloud 
https://cloud.google.com/sdk/docs/install#deb

```sh
gcloud auth login
gcloud config set project loop-luck
gcloud builds submit --config build.cloudbuild.yaml .
```

## TODO

Dev Dockerfile with emulator
Slack notification for successful build


