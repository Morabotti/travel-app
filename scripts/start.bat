@echo off

SET DEPLOYMENT_ENVIRONMENT=development
SET JOOQ_URL=jdbc:mysql://127.0.0.1:3306/travelapp
SET JOOQ_USER=test
SET JOOQ_PASSWORD=test
SET JOOQ_DIALECT=MARIADB

java -jar "../target/travelapp-0.1.0.jar"
@pause