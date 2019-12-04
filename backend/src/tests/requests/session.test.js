const axios = require('axios')
const mongoose = require('mongoose')
const User = require('../../models/User')

beforeEach(async () => {
  mongoose.connect('mongodb+srv://dev:dev@taskmanager-lwt3i.mongodb.net/taskManager?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
})

describe('Sign Up', () => {
  it('should create a user', async () => {
    const userData = {
      name: "test",
      email: "test@test.com",
      password: "12345678",
      passwordConfirmation: "12345678"
    }

    const response = await axios.post("http://localhost:3333/register", userData)
    await User.deleteOne({ _id: response.data._id })
    expect(response.data.email).toBe(userData.email)
    expect(response.data.name).toBe(userData.name)
  })
})

describe('Sign In', () => {
  it('should authenticate a user', async () => {
    const userData = {
      email: "thais@test.com",
      password: "12345678"
    }

    const response = await axios.post("http://localhost:3333/auth", userData)

    expect(response.data.name).toBe("thais araujo")
    expect(response.data).toHaveProperty("token")
  })
  it("should don't authenticate a user", async () => {
    try {
      const userData = {
        email: "inexistente@inexistente.com",
        password: "12345678"
      }

      const response = await axios.post("http://localhost:3333/auth", userData)
    } catch (error) {
      expect(error.response.status).toBe(401)
    }
  })
})