## NODEJS BOOK STORE

### About this project

The aim of this project was to practice my skills in working with RESTful APIs and ORMs. It is based on another repository of mine [link github](https://github.com/minhtri06/express-rest-api-security-practice)

#### General functionalities

-   Authentication and authorization with 3 roles (admin, sale manager, user) using JWT
-   Refreshing tokens
-   Blacklisting suspicious tokens
-   Request validation
-   Update profile
-   Change avatar

#### Role specific functionalities

Admin:

-   Manage users
-   Manage books
-   Manage invoices

Sale manager:

-   Manages invoices

User:

-   Buys books

### Testing

For testing the apis, you can access the api documentation [here](https://documenter.getpostman.com/view/24479002/2s93m34Psu). Or you can run in postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/24479002-18b6774b-37d2-4a6b-9d72-260c08e90bba?action=collection%2Ffork&collection-url=entityId%3D24479002-18b6774b-37d2-4a6b-9d72-260c08e90bba%26entityType%3Dcollection%26workspaceId%3D0b819cc4-d8fd-4e66-87e0-42eb692c58f2)

### Technologies

-   NodeJS: Environment (I used NodeJS v18.12.1 when building this project)
-   ExpressJS: The core of the server (v4.18.2)
-   Sequelize: Interact with SQL Server (v6.28.0)
-   Joi: Validation
-   Passport: Verify authentication and authorization
-   Helmet: Set security HTTP headers
-   Multer: For image uploading
