## Airtribe-Backend Assignment
[!Problem statement] (https://airtribe.notion.site/Internship-Assignment-Backend-521e1797124c4b198cb58d724fc9ab15)
This is an api based application for courses and lead generation in Airtribe and provides 6 actions.

## Deployment

1. Clone this project.
2. Env configurations - in the root dir of the project, create a file ".env" and populate the credentials. Sample env file :
```bash
MYSQLDB_USER=username
MYSQLDB_PASSWORD=password
MYSQLDB_DATABASE=airtribe
MYSQLDB_LOCAL_PORT=3307
MYSQLDB_DOCKER_PORT=3306

NODE_LOCAL_PORT=6868
NODE_DOCKER_PORT=8080
```

3. To run the project, go to root directory and run the command
```bash
docker-compose up
```
## DB stucture
Course table : <br>![course](./course.png)

Leads table : <br>![leads](./leads.png)


## APIs
[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/21758850-1d2871f1-6e65-4416-990e-22168cbba2a3?action=collection%2Ffork&collection-url=entityId%3D21758850-1d2871f1-6e65-4416-990e-22168cbba2a3%26entityType%3Dcollection%26workspaceId%3Dfafedc3c-fa6d-4364-8323-0abc06001c4b)

1. Create course
2. Create lead
3. Update Course

### Have added basic RBAC (role based access control) mechanism for the folloeing actions. Only an instructor who possesses the Authorization header in the HTTP request will be valid to execute the following.
4. Add comment to lead
5. Update lead status
6. Get lead info

### The HTTP header authorization holds these values
* user - admin
* pwd - instructor

### An improvement upon this can be token based auth, like JWT which uses hashing.

## Tech Stack
* Docker
* Nodejs
* Express.js framework
* MySQL