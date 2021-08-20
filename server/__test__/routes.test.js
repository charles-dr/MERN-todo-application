const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const converters = require('../converters');


var testTaskId = null;
var testSubtaskId = null;
var createdTaskId = null;
var createdSubtaskId = null;

const createTestTask = async () => {
  const title = 'Test Task ' + Date.now().toString();
  const jsonapi = converters.task.serializer.serialize({ title });
  const response = await request(app)
    .post('/tasks')
    .set('Content-Type', 'application/vnd.api+json')
    .set('Accept', 'application/vnd.api+json')
    .send(jsonapi);
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('data');
  expect(response.body.data).toHaveProperty('id');
  // remember the temporary task ID.
  testTaskId = response.body.data.id;
}

const createTestSubtask = async () => {
  const payload = {
    task: { id: testTaskId, type: 'tasks' },
    title: 'Temp Subtask ' + Date.now().toString()
  };
  const jsonapi = converters.subtask.serializer.serialize(payload);
  // create a subtask;
  const response = await request(app)
    .post('/subtasks')
    .set('Content-Type', 'application/vnd.api+json')
    .set('Accept', 'application/vnd.api+json')
    .send(jsonapi);
  // status code should be 201.
  expect(response.statusCode).toBe(201);

  const newSubtask = await converters.subtask.deserializer.deserialize(response.body);
  // check the parent ID.
  expect(newSubtask).toHaveProperty('task');
  expect(newSubtask.task).toBe(testTaskId);
  // remember the subtask ID.
  expect(newSubtask).toHaveProperty('id');
  testSubtaskId = newSubtask.id;
}

beforeAll(async () => {
  //--- create a temp task.
  await createTestTask();
  //--- create a subtask for [Patch] /subtasks/:id
  await createTestSubtask();
});

beforeEach(async () => {});

afterEach(async () => {});

afterAll(async () => {
  // deleted the subtask from 'POST /subtasks'.
  if (createdSubtaskId) {
    const response = await request(app).delete(`/subtasks/${createdSubtaskId}`);
    expect(response.statusCode).toBe(204);
  }
  // deleted the temp subtask for 'PATCH /subtasks/:id'.
  if (testSubtaskId) {
    const response = await request(app).delete(`/subtasks/${testSubtaskId}`);
    expect(response.statusCode).toBe(204);
  }
  // remove the temp task.
  if (testTaskId) {
    const response = await request(app).delete(`/tasks/${testTaskId}`);
    expect(response.statusCode).toBe(204);
  }
  // delete the task created for 'POST /tasks'.
  if (createdTaskId) {
    const response = await request(app).delete(`/tasks/${createdTaskId}`);
    expect(response.statusCode).toBe(204);
  }
  mongoose.connection.close();
});

describe('GET /', () => {
  test('It should respond with 404 Not Found', async () => {
    const response = await request(app).get('/');
    expect(response.body).toEqual({
      errors: [{
        status: 404,
        detail: 'Not Found',
      }],
    });
    expect(response.statusCode).toBe(404);
  });
});

describe("GET /tasks", () => {
  test("It should be respond with status code 200.", async () => {
    const response = await request(app).get('/tasks');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('links');
  });
});

describe("POST /tasks", () => {
  test("It should create a pending task.", async () => {
    const title = 'Test Task ' + Date.now().toString();
    const jsonapi = converters.task.serializer.serialize({ title });
    const response = await request(app)
      .post('/tasks')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send(jsonapi);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('links');
    expect(response.body.data).toHaveProperty('id');
    // remember the temporary task ID. It will be deleted later.
    createdTaskId = response.body.data.id;
    expect(response.body.data.type).toBe('tasks');
    expect(response.body.data.attributes).toHaveProperty('title');
    expect(response.body.data.attributes).toHaveProperty('status');
    expect(response.body.data.attributes.status).toBe(false); // default status should be false.
    expect(response.body.data).toHaveProperty('relationships');
    expect(response.body.data.relationships).toHaveProperty('subtasks');
  });
});

describe("PATCH /tasks/:id", () => {
  test("It should toggle the status of the last task.", async () => {
    // get all task.
    const allTasksRaw = await request(app).get('/tasks');
    const allTasks = await converters.task.deserializer.deserialize(allTasksRaw.body);
    if (allTasks.length === 0) return;
    const targetTask = allTasks[allTasks.length - 1];

    const updatePayload = { id: targetTask.id, status: !targetTask.status };
    const jsonapi = converters.task.serializer.serialize(updatePayload);
    const updatedRaw = await request(app)
      .patch(`/tasks/${targetTask.id}`)
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send(jsonapi);
    // status code should be 200.
    expect(updatedRaw.statusCode).toBe(200);
    const updatedTask = await converters.task.deserializer.deserialize(updatedRaw.body);
    // status should be updated.
    expect(updatedTask.status).toBe(!targetTask.status);
  });
});

describe("POST /subtasks", () => {
  test("It should create a new subtask under the last task.", async () => {
    const payload = {
      task: { id: testTaskId, type: 'tasks' },
      title: 'Temp Subtask ' + Date.now().toString()
    };
    const jsonapi = converters.subtask.serializer.serialize(payload);
    // create a subtask;
    const response = await request(app)
      .post('/subtasks')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send(jsonapi);
    // status code should be 201.
    expect(response.statusCode).toBe(201);

    const newSubtask = await converters.subtask.deserializer.deserialize(response.body);
    // check the parent ID.
    expect(newSubtask).toHaveProperty('task');
    expect(newSubtask.task).toBe(testTaskId);
    // initial status should be false.
    expect(newSubtask).toHaveProperty('status');
    expect(newSubtask.status).toBe(false);
    // remember the subtask ID.
    expect(newSubtask).toHaveProperty('id');
    createdSubtaskId = newSubtask.id;
  });
});

describe("PATCH /subtasks/:id", () => {
  test('It should toggle the status of a subtask', async () => {
    const resp1 = await request(app).get(`/subtasks/${testSubtaskId}`);
    const subtask = await converters.subtask.deserializer.deserialize(resp1.body);
    const updatePayload = { id: testSubtaskId, status: !subtask.status };
    const jsonapi = converters.subtask.serializer.serialize(updatePayload);
    const resp2 = await request(app)
      .patch(`/subtasks/${testSubtaskId}`)
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send(jsonapi);
    // request should be successful.
    expect(resp2.statusCode).toBe(200);
    const newSubtask = await converters.subtask.deserializer.deserialize(resp2.body);
    // origin and new subtasks should have different status.
    expect(newSubtask.status).toBe(!subtask.status);
  });
});

