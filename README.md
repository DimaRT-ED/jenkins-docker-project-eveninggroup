# jenkins-docker-project-eveninggroup

# MySql - DataBase
1. The image is "mysql:8.0" and running on port 3306 (The root password = "password").
2. The DataBase is store in "./db" (volume).
3. The default host name = "database".
   If you want to change the host name you need to change the file in the code the path is : "./node-code/.env"
   And change the : "SQL_HOST=TheHostNameYouWant" .

 # NodeJS - Application
 1. The image is "node:18.5.0" and running on port 3044.
 2. The application is working with the MySql database. 
 3. The code is in "./node-code"
 4. To run the code you need to be inside the "./node-code" and run the following command : "npm start" .
