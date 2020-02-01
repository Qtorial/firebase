<div align="center">
  <img src="https://user-images.githubusercontent.com/58778841/73591971-6bf62500-4538-11ea-95fe-c2f17613d0d5.png" width="320px">
</div>


# firebase for Qtorial

## How to set up your firebase project for Qtorial.

#### Prerequisite
Create a firebase project where you enabled
  - firestore
  - storage
  - functions
    
Also, we recommend you create a new project as we don't want to mess up your existing project.

---
Clone this repository
```
$ git clone https://github.com/Qtorial/firebase.git
```
Create and start a container
```
$ docker-compose up -d
```
Get into the container
```
$ docker-compose exec q-torial ash
```
Run the firebase cli command below and follow the prompt to log in.
```
$ firebase login --no-localhost
```
Once you logged in, run the command below at the project root: `/app`.
```
$ firebase init
```
When asked which feature to set up, make sure Firestore, Functions and Storage selected.  
When asked which firebase project to use, select the firebase project you created before you start this tutorial.  
When asked whether to overwrite any kind of files we already prepared, **please do not overwrite them**, so that you can deploy everything with no fuss.  
When asked which language to use for Cloud Functions, answer Typescript.
When asked whether you want to install dependencies with npm, answer no as we use yarn for managing dependencies.

The following is an example of running the command above. 
```
/app # firebase init

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  /app

Before we get started, keep in mind:

  * You are currently outside your home directory
  * You are initializing in an existing Firebase project directory

? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices. Firestore: Deploy rules and create indexes for Firesto
re, Functions: Configure and deploy Cloud Functions, Storage: Deploy Cloud Storage security rules

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add, 
but for now we'll just set up a default project.

? Please select an option: Use an existing project
i  Using project test-f4e4e (test)

=== Firestore Setup

Firestore Security Rules allow you to define how and when to allow
requests. You can keep these rules in your project directory
and publish them with firebase deploy.

? What file should be used for Firestore Rules? firestore.rules
? File firestore.rules already exists. Do you want to overwrite it with the Firestore Rules from the Firebase Console? No

Firestore indexes allow you to perform complex queries while
maintaining performance that scales with the size of the result
set. You can keep index definitions in your project directory
and publish them with firebase deploy.

? What file should be used for Firestore indexes? firestore.indexes.json
? File firestore.indexes.json already exists. Do you want to overwrite it with the Firestore Indexes from the Firebase Console? No

=== Functions Setup

A functions directory will be created in your project with a Node.js
package pre-configured. Functions can be deployed with firebase deploy.

? What language would you like to use to write Cloud Functions? TypeScript
? Do you want to use TSLint to catch probable bugs and enforce style? Yes
? File functions/package.json already exists. Overwrite? No
i  Skipping write of functions/package.json
? File functions/tslint.json already exists. Overwrite? No
i  Skipping write of functions/tslint.json
? File functions/tsconfig.json already exists. Overwrite? No
i  Skipping write of functions/tsconfig.json
? File functions/src/index.ts already exists. Overwrite? No
i  Skipping write of functions/src/index.ts
✔  Wrote functions/.gitignore
? Do you want to install dependencies with npm now? No

=== Storage Setup

Firebase Storage Security Rules allow you to define how and when to allow
uploads and downloads. You can keep these rules in your project directory
and publish them with firebase deploy.

? What file should be used for Storage Rules? storage.rules

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!

```
After the initialization, run the command below to deploy everything you need to use Qtorial. 
```
$ yarn deploy
```
