### big-corp

#### Task

https://drive.google.com/drive/folders/1Qt2RubPw5lg8rzkDc_1nBxlgnJirWaLy

### How to run this project

#### Run it with docker
Requirements:
* docker
* docker-compose

Instructions:
* Clone this repo
* Go to the repo root
* Copy the .env.example file to .env (you can modify port settings, but default params will work)
* Run ``` make up ``` if you use Linux (if not you can run ``` docker-compose up -d```).

#### Run it without docker
Requirements:
* Node 12

Instructions:
* Clone this repo
* Go to the repo root
* Copy the .env.example file to .env (configure your database & port settings)
* Run ```npm i``` to install dependencies.

#### Endpoints

###### List of employees: ```GET``` http://{{URL}}/api/employees?limit=X&offset=X

Payload:

```
{
	...
}
```

###### Employee detail: ```GET``` http://{{URL}}/api/employees/{{ID}}

Response
```
{
   ....
}
```

###### List of departments: ```GET``` http://{{URL}}/api/departments?limit=X&offset=X

Payload:

```
{
	...
}
```

###### Department detail: ```GET``` http://{{URL}}/api/departments/{{ID}}

Response
```
{
   ....
}
```

###### List of offices: ```GET``` http://{{URL}}/api/offices?limit=X&offset=X

Payload:

```
{
	...
}
```

###### Office detail: ```GET``` http://{{URL}}/api/offices/{{ID}}

Response
```
{
   ....
}
```

#### Test
To run test:

* if you use Docker ```make node``` (or ```docker exec -it big_corp_node_nusspaumer_container bash```) and ```npm test```
* if you don't use Docker ```npm test```