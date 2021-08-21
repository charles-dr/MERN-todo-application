# Todo Application

This is a MERN stack application to create & manage to-do list.


## Summary of tech stacks

### Node version
- used 16.5.0

### front-end

- React.js

### back-end

- Node.js, Express.js

### Database

- Mongodb, mongoose


## How to run the application on local

### Database
Please confirm you have Mongodb insatlled.

Database name in example env is 'todo'.

And you can import the example collections(in format of JSON) in 'database' folder.

### server

```bash
cd server  # enter the folder
cp .env.example .env
yarn install # install dependencies
yarn dev # start development server
```

### front-end

```bash
cd front-end # enter the folder
cp .env.example .env
yarn install # install dependencies
yarn start # run the app in development mode.
```

## Data Model

### Task

```json
{
  "id": "[String]",
  "title": "[String]",
  "status": "[Boolean]",
  "subtasks": "[Array<ID>]",
  "created_at": "[Date | Timestamp]"
}
```

### Sub-task

```json
{
  "id": "[String]",
  "title": "[String]",
  "status": "[Boolean]",
  "task": "[ID]",
  "created_at": "[Date | Timestamp]",
}
```

## API List

Here is the link of Postman collection. <br/>

https://www.getpostman.com/collections/8c7bc7d2726f08b904dd
