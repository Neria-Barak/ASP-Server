# ASP-Server

This branch corresponds to ex3. To see ex2 go to 'main' branch

How to run the code:
1. Clone this repository
2. Install dependencies - 'npm install'
3. Connect to a MongoDB deployment
4. Modify the config variables if needed
5. Run 'npm run reset' to drop the database
6. Run 'npm run populate' to add default info
7. Run the application - 'npm start'
8. Go to 'http://localhost:8080/' in you browser (change the port based on your configuration variables)

If you are using mac, you may need to change the scripts in 'package.json' to:
"start": "NODE_ENV=local node server.js",
"reset": "NODE_ENV=local node tests/reset.js",
"populate": "NODE_ENV=local node tests/populate.js"

You can see the source code of the client side in our web repository: https://github.com/Neria-Barak/ASP-Web/tree/server-feature
And out android repository: https://github.com/rossaar06/ASP_Android/tree/main_part3

In this excercise Neria Barak handled the server development while Aaron Ross integrated the server into the web app. Whenever one of us had a Git pull request, the other reviewed and confirmed it to maintain code quality and consistency.
