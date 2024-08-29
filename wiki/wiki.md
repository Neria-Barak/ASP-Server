The TCP server we built in C++ can only run on Linux, whereas the Node.js server is compatible with Windows, macOS, and Linux.

**Setup Instructions:**

1. **Modify Scripts for macOS/Linux:** If you are using macOS or Linux, you must first modify the start, reset, and populate scripts in the package.json file to suit your environment.

2. **Install Dependencies:** After cloning this repository, install the necessary dependencies by running npm install in the terminal.

3. **Connect to MongoDB:** Ensure you are connected to a MongoDB deployment.

4. **Update Environment Variables:** If needed, update the environment variables and adjust the port number at line 16 of TcpServer/server.cpp.

5. **Compile and Run the C++ Server**: Navigate to the TcpServer folder and run make, followed by ./server to compile and run the C++ server.
![compiling and running cpp](./screenshots/compiling%20and%20running%20cpp.png "compiling and running cpp")
6. **Database Setup**:

+ Run npm run reset to drop the existing database.
+ Run npm run populate to initialize the database with default information.
+ Finally, run npm start to activate the Node.js server.
![reset,populate,start](./screenshots/reset,populate,start.png "reset,populate,start")

**Web App Usage:**

1. **Access the Web App**: Open your browser and go to http://localhost:8080/ (adjust the port number based on your configuration). You should see the main page.
![main page](./screenshots/main%20page.png "main page")
2. **Sign In**: Click the 'Sign In' button at the top right corner and enter your username and password.
![sign in](./screenshots/sign%20in.png "sign in")
3. **Sign Out**: Click on your profile picture at the top right corner to sign out. You can also edit or delete users from this menu.
![sign out](./screenshots/sign%20out.png "sign out")
4. **Sign Up**: To create a new account, click the 'Sign In' button again and select 'Create Account'.
![sign up](./screenshots/sign%20up.png "sign up")
5. **Add a Video**: Click on the 'Add Video' button in the left menu to upload a new video.
![add video](./screenshots/add%20video.png "add video")
After adding a video, it should appear on the main page.
![you can see the new video](./screenshots/you%20can%20see%20the%20new%20video.png "you can see the new video")
![you can watch your video](./screenshots/you%20can%20watch%20your%20video.png "you can watch your video")
6. **Edit a Video**: To edit a video, click the 'Edit' button below it. For example, you can change the video title. You can also delete your videos from this page.
![you can edit your video](./screenshots/you%20can%20edit%20your%20video.png "you can edit your video")
![you can see the new title](./screenshots/you%20can%20see%20the%20new%20title.png "you can see the new title")