# ASP-Server

How to run the code:
1. clone this repository
2. install dependencies - 'npm install'
3. run to your mongodb
4. modify the config variables if needed
5. run 'npm run reset' to drop the database
6. run 'npm run populate' to add default info
7. run the application - 'npm start'

If you are using mac, you may need to change the scripts in 'package.json' to:
"start": "NODE_ENV=local node server.js",
"reset": "NODE_ENV=local node tests/reset.js",
"populate": "NODE_ENV=local node tests/populate.js"

You can see the source code of the client side in out web repository: https://github.com/Neria-Barak/ASP-Web/tree/server-feature

In this excercise Neria Barak handled the server development while Aaron Ross integrated the server into the web app. Whenever one of us had a Git pull request, the other reviewed and confirmed it to maintain code quality and consistency.
