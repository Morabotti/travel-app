SHELL := /bin/bash

ENV_PARAMS := \
	DEPLOYMENT_ENVIRONMENT=development \
	JOOQ_URL=jdbc:mysql://localhost:3306/travelapp \
	JOOQ_USER=test \
	JOOQ_PASSWORD=test \
	JOOQ_DIALECT=MARIADB

LOCAL_DB_NAME = travel-app-db

jooq-classes:
	mvn generate-sources -Pjooq-class-generation

start-local-db:
	docker run -d --name $(LOCAL_DB_NAME) -e MYSQL_USER=test \
	-e MYSQL_PASSWORD=test -e MYSQL_DATABASE=travelapp \
	-e MYSQL_ROOT_PASSWORD=test --net=host mariadb:10.4.8 mysqld --skip-name-resolve

stop-local-db:
	-docker stop $(LOCAL_DB_NAME)
	-docker rm $(LOCAL_DB_NAME)
