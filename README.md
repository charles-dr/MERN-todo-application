# Todo Application

This is a MERN stack application to create & manage to-do list.

## How to run the application on local

### server

### front-end


## Data Model

### Task

```json
{
  "id": "[String]",
  "title": "[String]",
  "status": "[Boolean]",
  "created_at": "[Date | Timestamp]"
}
```

### Sub-task

```json
{
  "id": "[String]",
  "title": "[String]",
  "status": "[Boolean]",
  "created_at": "[Date | Timestamp]",
}
```

## API Endpoints

### [GET] /tasks - get a list of the todo's

- response
```json
{
  "id": "[String]",
  "title": "[String]",
  "status": "[Boolean]",
  "created_at": "[Timestamp]",
  "subtasks": "[Array<Subtask>]"
}
```

### [POST] /tasks - create a task

- request body

```json
{ "title": "[String]" }
```

- response

returns a task.

### [PUT] /tasks/:id/status - update the status of a task by id.

- Request Body
```json
{
  "status": "[Boolean]"
}
```

- Response
returns the updated task.

### [POST] /subtasks - create a subtask in a task.

- Request Body
```json
{
  "title": "[String]",
  "todo_id": "[String]"
}
```

- Response
returns the new subtask.

### [PUT] /subtask/:id/status - update the status of a subtask by id.

- Request Body

```json
{
  "status": "[Boolean]"
}
```

- Response
returns the updated subtask.





