
<p align="center">
    Getting started (mac)
</p>

<p align="center">
    How to run tribe-app locally on your computer (mac)
</p>

## Prerequisites:

This documentation assumes you are on a mac computer and running the latest OS

## Install the following on your computer locally:

1. MySQL server
2. NodeJS along with npm
3. Java 19
4. Maven

## Go to github:

Fork the following and clone them to your computer locally:

1. https://github.com/savvato-software/tribe-app-backend
2. https://github.com/savvato-software/tribe-app-frontend
3. https://github.com/savvato-software/savvato-javascript-services

## On your local computer:

From your command line, type:

    mysql.server start

You should get the following response from the terminal:

    Starting MySQL
    .... SUCCESS!

Next type:

    sudo mysql -u root

You should get the following response from the terminal:

    Welcome to the MySQL monitor. Commands end with ; or \g.
    Your MySQL connection id is 8
    Server version: 8.0.30 Homebrew
    Copyright (c) 2000, 2022, Oracle and/or its affiliates.
    Oracle is a registered trademark of Oracle Corporation and/or its affiliates. Other names may be trademarks of their respective owners.
    Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.    
            
Next type:

    mysql

You will get the mysql prompt and then type:

    show databases

You should get the following response from the terminal:

    +--------------------+
    | Database |
    +--------------------+
    | information_schema |
    | mysql |
    | performance_schema |
    | sys |
    +--------------------+
    4 rows in set (0.04 sec)
                            
If you see tribeapp_db listed above, it is okay, it just means tribeapp has been previously set up, and you will need to drop the existing database. [Then show the command]:

    DROP DATABASE tribeapp_db;

    CREATE DATABASE tribeapp_db;

    CREATE USER 'tribeapp_db_user'@'localhost' IDENTIFIED BY 'supersecure';

    GRANT ALL PRIVILEGES on tribeapp_db.* TO 'tribeapp_db_user'@'localhost';

Open a new terminal window and navigate to the tribe-app-backend folder and type:

    mvn spring-boot:run

Open a new terminal window and navigate to the tribe-app-frontend folder and type:

    ionic serve
                     
Make sure you shut down your MySQL server on your local machine:

    mysql.server stop