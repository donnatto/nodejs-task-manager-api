const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
})

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error('Email is invalid')
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      console.log('Pass', value)
      if (value.toLowerCase().includes('password')) throw new Error('Password can not contain "password"')
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error('Age must be a positive number')
    }
  }
})

/*const me = new User({
  name: '   Edwin   ',
  email: 'MYEmail@donnatto.com  ',
  password: '   word   '
})

me.save()
  .then(() => console.log(me))
  .catch(err => console.error('Error', err))*/


const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const task = new Task({
  description: '    Feed the dog',
  completed: false
})

task.save()
  .then(() => console.log(task))
  .catch(err => console.error('Error', err))