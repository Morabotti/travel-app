# Travelling application

## About:
This is a school project in couse: relational databases and API's. This application is travelling app, where admin can control database. Database contais three things: customers, travels and orders. This project contains following things:
- Java based server made with [Snoozy](https://github.com/jubicoy/snoozy)
  - [JOOQ](https://github.com/jOOQ/jOOQ) based DAO's
  - [Easyvalue](https://github.com/jubicoy/easyvalue) based models
- Web-based user interface made with React [React](https://github.com/facebook/react)
  - Typescript
  - Material UI
  - Advanced use of hooks api

## Requirements to run:
- Maven
- Java (tested on JDK 13)
- Database (tested on MariaDB, MySQL)
- Npm (optional if you dont want front-end)

## How to run:
If you don't want or need front-end, you can delete `/front` directory. This will skip installing/building front-end.
- set ENV variables (see below)
- mvn install package
- build & run

## Environment variables:
In order to build/run this project, you need a active database connection for code generation. You can configure these connections by adding environment parameters:

```
SET DEPLOYMENT_ENVIRONMENT=development
JOOQ_URL=jdbc:mysql://localhost:3306/travelapp
JOOQ_USER=test
JOOQ_PASSWORD=test
JOOQ_DIALECT=MARIADB
```

Make sure that you have empty database defined by `JOOQ_URL` (in this case: `travelapp`) in your database. If you use docker to host database, its pre-configured.

If you want to use **MySQL** instead **MariaDB**, you can change `JOOQ_DIALECT` from `MARIADB` to `MYSQL`.

For other databases, check [JOOQ SQL DIALECTS](https://www.jooq.org/javadoc/latest/org.jooq/org/jooq/SQLDialect.html) for more information.

## ER Diagram:
TODO

