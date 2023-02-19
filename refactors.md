


# NOTE:

because we have our services running in containers we need to restructure the
repo.

previously, it made sense to have the frontend server separated from the backend
because both ran in one container on the host. the backend still had access to
frontend build folder. 

this is no longer the case with a microservice architecture. we'll need a
messaging/task service to connect with and relay data between containers. we'll
have the app, which holds the express server and react folder; redis, which
caches streaming data from: td-sockets, which connects to td streaming api;
rabbitmq, which brokers data between the app and redis. not yet sure if we'll need
celery.

we need to change the start command in app service to build react.

along with that we need to change the npm scripts to accomdate the new structure








# site improvement ideas


* Golang backend

* 
