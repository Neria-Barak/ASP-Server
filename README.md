# ASP-Server

To understand how to run this repository, please refer to the detailed explanation provided in the wiki folder.

If you are using mac, you may need to change the scripts in 'package.json' to:

"start": "NODE_ENV=local node server.js",

"reset": "NODE_ENV=local node tests/reset.js",

"populate": "NODE_ENV=local node tests/populate.js"

You can see the source code of the client side in our web repository: https://github.com/Neria-Barak/ASP-Web/tree/server-feature
