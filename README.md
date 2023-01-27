# Loop Not Luck Portal

## Overview
Customer Portal for customers to register, buy credits, post roles, review and invite candidates

## Setup
All development or bug fixing must be done on a **feature** branch named after the JIRA ticket e.g. PLAT-1983. 

Feature branches must be created off the latest **develop** branch.

Clone the develop branch from the repo [lnl-portal](https://github.com/ranga27/lnl-portal/tree/develop) to a local project directory and create the feature branch e.g. PLAT-1983

```bash
git clone -b develop https://github.com/ranga27/lnl-portal
git checkout -b PLAT-1983
```

To clone within VSCode, follow these [steps](https://docs.microsoft.com/en-us/azure/developer/javascript/how-to/with-visual-studio-code/clone-github-repository?tabs=create-repo-command-palette%2Cinitialize-repo-activity-bar%2Ccreate-branch-command-palette%2Ccommit-changes-command-palette%2Cpush-command-palette)
## Install
Change into the newly created feature branch directory, install dependecies required for the project

```bash
cd lnl-portal
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
firebase use lnl-dev
```
Next, change into the functions directory and install the dependencies required for cloud functions
```bash
cd functions
yarn install
```
Change back into the main directory
```bash
cd..
```

When running this repo initially on a machine, you will need to create a .env.development file and a .env.production file in the root folder and initialize with the environment variables which would be sent to you by a team member. 
```properties
NEXT_PUBLIC_API_KEY=[KEY]
NEXT_PUBLIC_AUTH_DOMAIN=[KEY]
NEXT_PUBLIC_PROJECT_ID=[KEY]
NEXT_PUBLIC_STORAGE_BUCKET=[KEY]
NEXT_PUBLIC_MESSAGING_SENDER_ID=[KEY]
NEXT_PUBLIC_APP_ID=[KEY]
NEXT_PUBLIC_MEASUREMENT_ID=[KEY]
```
Set an environment variable by generating a new one time private key for the service account from the firebase console to authenticate firebase features:
https://firebase.google.com/docs/admin/setup#linux-or-macos


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
Known issue: https://github.com/firebase/firebase-tools/issues/822#issuecomment-406754186

nextjsfunc: The goal is to host the Next.js app on Firebase Cloud Functions with Firebase Hosting rewrite rules so the app is served from the Firebase Hosting URL.
Each individual page bundle is served in a new call to this Cloud Function which performs the initial server render. 

## Google Cloud Build 
### Initial Setup 

This is for creating new builders or optimising existing one. Skip this step if an image exists in the Artifactory Registry

### Create a firebase builder

**Custom Firebase builder**

https://cloud.google.com/build/docs/configuring-builds/use-community-and-custom-builders?hl=en-GB#creating_a_custom_builder

Use Ubuntu 20.04(focal) to create the contanier image since that was the current version on GCB when this doc was written.

Ensure Docker version installed should be same as the one used in GCB. At the time of writing it was 20.10.4. 

For latest version check: https://cloud.google.com/build/docs/interacting-with-dockerhub-images#working_with_docker_client_versions

Follow: https://docs.docker.com/engine/install/ubuntu/

```sh
sudo apt-get install docker-ce=5:20.10.4~3-0~ubuntu-focal docker-ce-cli=5:20.10.4~3-0~ubuntu-focal containerd.io docker-compose-plugin
```

**Community provided Firebase builder**

By default, the firebase tool is not available on the npm image, so we used the custom builder. But sometimes its quick and easy to use the community builder.

You will need to clone the repo from the cloud builder community.

git clone https://github.com/GoogleCloudPlatform/cloud-builders-community
cd cloud-builders-community/firebase
gcloud builds submit --config cloudbuild.yaml .
After the process is completed, you can delete the repo from your computer.


**Upload the Firbase builder**

We will be using Kaniko workers for building. this will enable Kaniko cache in the docker builds.

https://cloud.google.com/build/docs/optimize-builds/kaniko-cache

Uploading the image can be done via local console by installing cloud CLI or via cloud shell

Install Cloud CLI
https://cloud.google.com/sdk/docs/install#deb

and login to goggle cloud
```sh
gcloud auth login
gcloud config set project loop-luck
gcloud builds submit --config build.cloudbuild.yaml .
```

Via cloud shell

access cloud shell from you gcp account
https://shell.cloud.google.com/

and set working project

```sh
gcloud config set project loop-luck
```

checkout the repo and run upload the build
```sh
gh auth login
gh repo clone ranga27/lnl-portal/tree/develop
cd lnl-portal
gcloud builds submit --config build.cloudbuild.yaml .
```

Grant permissions in GCB to perform Cloud Function upload

To inspect/debug the docker image
pull docker image 
run it using /bin/bash

create variable \_PROJECT_NAME in GCB triggers 

## TODO

Dev Dockerfile with emulator

Slack notification for successful build


STRIPE INTEGRATION
### Run stripe-webhook on local

#### Development mode

1. Make sure you have installed stripe CLI on your machine
2. `stripe login`
3. Run for development mode
   `stripe listen --forward-to localhost:3000/api/webhook`
   Basically this is our api endpoint
4. This will give webhook signing secret. Copy that to .env.development/STRIPE_WEBHOOK_SIGNING_SECRET

#### Production mode

Put production endpoint url to stripe-webhook endpoint in Developers > Webhooks section of stripe dashboard, get signing secret & put that to .env.production/STRIPE_WEBHOOK_SIGNING_SECRET
