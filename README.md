Description

The SE Project Express is a back-end project focused on creating a server for the WTWR application. The project aims to provide a deeper understanding of working with databases, setting up security, and deploying web applications on a remote machine. The server includes an API with user authorization.

Domain Location: https://obbiesproject.ohbah.com

Features and usage: 
1. Clone the repository: .zsh
   git clone https://github.com/ObbieOnOblivion/se_project_express.git
   cd se_project_express

2. Install Dependancies: .zsh 
   npm install

3. MongoDB

4. launch server:
   npm run dev or npm run start


API Endpoints

Users:
GET /users: Retrieve all users.
GET /users/
: Retrieve a user by ID.
POST /users: Create a new user.


Clothing Items:
GET /items: Retrieve all clothing items.
POST /items: Create a new clothing item.
DELETE /items: Delete a clothing item.
PUT /items/
/likes: Add a like to a clothing item.
DELETE /items/
/likes: Remove a like from a clothing item.


*** Helpful Reminders ***

-- to restart pm2 use command { pm2 restart all }
-- to restart nginx use command { sudo systemctl restart nginx && sudo nginx -t }
-- to reload pm2 use { pm2 reload app }