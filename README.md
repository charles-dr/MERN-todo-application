# Todo Application

This is a MERN stack application to create & manage to-do list.


## Summary of tech stacks
### front-end

- React.js

### back-end

- Node.js, Express.js

### Database

- Mongodb, mongoose


## How to run the application on local

### server

```bash
cd server  # enter the folder
yarn install # install dependencies
yarn dev # start development server
```

### front-end

```bash
cd front-end # enter the folder
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
