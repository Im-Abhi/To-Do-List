# To-Do-List
It's a simple To-Do-List App<br>
You can add tasks and check them when they are completed.<br/>
![msedge_2uD0uNwhHK](https://user-images.githubusercontent.com/86161191/138548830-c51fbae6-9a12-41a0-94d9-153fe90140a0.png)

## Using On Your Local Machine
1. Make sure you have **NodeJs** installed.
2. Clone the repository.
3. Cd into the the local repository
4. Run the command to install the missing dependencies `npm install`
5. Cd into the src folder inside the local repository.
6. Install [mongoDB](https://www.mongodb.com/try/download/community) if you dont have it installed locally.
7. Open up a new terminal and type the command `mongod` to run the mongoDB local server and don't close it.
8. Now Run the command `nodemon index.js` inside the project folder. This command will start the server locally and will restart automatically if you make some changes.
9. Head over to localhost:4000 in your browser to view the app.
10. To create lists with some other name than (Today) in your browser type `localhost:4000/<YourListName>` replace <YourListName> with any name you want to give to your list. This will create a new List and you can access it using the same as mentioned above.

## Technologies Used
EJS, CSS3, JS, Express, NodeJs, MongoDB (Mongoose)
