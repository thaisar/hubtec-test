const axios = require('axios')
const mongoose = require('mongoose')
const Task = require('../../models/Task')

var token = ""

beforeEach(async () => {
  mongoose.connect('mongodb+srv://dev:dev@taskmanager-lwt3i.mongodb.net/taskManager?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  const userData = {
    email: "thais@test.com",
    password: "12345678"
  }

  const response = await axios.post("http://localhost:3333/auth", userData)
  token = response.data.token

  expect(response.data.name).toBe("thais araujo")
  expect(response.data).toHaveProperty("token")

})

describe('Create Task', () => {
  it('should create task to do ', async () => {
    const taskData = {
      title: "teste",
      description: "descrição de teste",
      date: "2019-12-27T00:00:00.000Z",
      status: "toDo"
    }

    const response = await axios.post("http://localhost:3333/tasks", taskData, { headers: { token } })

    expect(response.data.title).toBe(taskData.title)
    expect(response.data.description).toBe(taskData.description)
    expect(response.data.date).toBe(taskData.date)
  })
  it('should create task doing ', async () => {
    const taskData = {
      title: "teste",
      description: "descrição de teste",
      date: "2019-12-27T00:00:00.000Z",
      status: "doing"
    }

    const response = await axios.post("http://localhost:3333/tasks", taskData, { headers: { token } })

    expect(response.data.title).toBe(taskData.title)
    expect(response.data.description).toBe(taskData.description)
    expect(response.data.date).toBe(taskData.date)
  })
  it('should create task done ', async () => {
    const taskData = {
      title: "teste",
      description: "descrição de teste",
      date: "2019-12-27T00:00:00.000Z",
      status: "done"
    }

    const response = await axios.post("http://localhost:3333/tasks", taskData, { headers: { token } })

    expect(response.data.title).toBe(taskData.title)
    expect(response.data.description).toBe(taskData.description)
    expect(response.data.date).toBe(taskData.date)
  })
  it('should create task late ', async () => {
    const taskData = {
      title: "teste",
      description: "descrição de teste",
      date: "2019-12-27T00:00:00.000Z",
      status: "late"
    }

    const response = await axios.post("http://localhost:3333/tasks", taskData, { headers: { token } })

    expect(response.data.title).toBe(taskData.title)
    expect(response.data.description).toBe(taskData.description)
    expect(response.data.date).toBe(taskData.date)
  })
})

describe('Edit Task', () => {
  var taskId = ""
  beforeEach(async () => {
    const taskData = {
      title: "teste",
      description: "descrição de teste",
      date: "2019-12-27T00:00:00.000Z",
      status: "toDo"
    }

    const response = await axios.post("http://localhost:3333/tasks", taskData, { headers: { token } })
    id = response.data._id
  })

  it('should edit task to do to doing  ', async () => {
    const taskDataEdited = {
      title: "testeEdited",
      description: "descrição de teste editado",
      date: "2019-12-27T00:00:00.000Z",
      status: "doing"
    }

    const response = await axios.put(`http://localhost:3333/tasks/${taskId}`, taskDataEdited, { headers: { token } })

    expect(response.data.title).toBe(taskDataEdited.title)
    expect(response.data.description).toBe(taskDataEdited.description)
    expect(response.data.date).toBe(taskDataEdited.date)
  })
})

describe('get All Tasks', () => {
  it('should edit task to do to doing  ', async () => {
    const response = await axios.get(`http://localhost:3333/tasks`,{ headers: { token } })

    expect(response.data).toBe()
  })
})

describe('delete task', () => {
  var taskId = ""
  beforeEach(async () => {
    const taskData = {
      title: "teste",
      description: "descrição de teste",
      date: "2019-12-27T00:00:00.000Z",
      status: "toDo"
    }

    const response = await axios.post("http://localhost:3333/tasks", taskData, { headers: { token } })
    id = response.data._id
  })
  it('should edit task to do to doing  ', async () => {
    const response = await axios.delete(`http://localhost:3333/tasks/${taskId}`,{ headers: { token } })
    console.log(response)
    // expect(response.data).toBe()
  })
})