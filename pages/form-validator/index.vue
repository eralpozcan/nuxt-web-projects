<script setup>
useSeoMeta({
  title: 'Form Validator',
})
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap'
    }
  ]
})

const successColor = '#2ecc71'
const errorColor = '#e74c3c'

const form = ref(null)
const username = ref(null)
const email = ref(null)
const password = ref(null)
const password2 = ref(null)
const small = ref(null)
const smallError = ref({
  username: '',
  email: '',
  password: '',
  password2: ''
})

function showError(input, message) {
  const formControl = input.value.parentElement
  formControl.className = 'form-control error'
  smallError.value[input.value.id] = message
}

function showSuccess(input) {
  const formControl = input.value.parentElement
  formControl.className = 'form-control success'
}

function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`)
    } else {
      showSuccess(input)
    }
  })
}

function checkLength(input, min, max) {

  if (input.value.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    )
  } else if (input.value.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    )
  } else {
    showSuccess(input)
  }
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.value.trim())) {
    showSuccess(input)
  } else {
    showError(input, `Email is not valid`)
  }
}
function checkPasswordsMatch(input1, input2) {
  if (input1.value.value !== input2.value.value) {
    showError(input2, `Passwords do not match`)
  }
}
function getFieldName(input) {
  return input.value.id.charAt(0).toUpperCase() + input.value.id.slice(1)
}

useEventListener(document, 'submit', (e) => {
  e.preventDefault()
  checkRequired([username, email, password, password2])
  checkLength(username, 3, 15)
  checkLength(password, 6, 25)
  checkEmail(email)
  checkPasswordsMatch(password, password2)
});
</script>

<template>
  <div class="form-validator">
    <div class="container">
      <form ref="form" class="form">
        <h2>Register With Us</h2>
        <div class="form-control">
          <label for="username">Username</label>
          <input type="text" id="username" ref="username" placeholder="Enter username" />
          <small ref="small">{{ smallError.username }}</small>
        </div>
        <div class="form-control">
          <label for="email">Email</label>
          <input type="text" id="email" ref="email" placeholder="Enter email" />
          <small ref="small">{{smallError.email}}</small>
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" ref="password" placeholder="Enter password" autocomplete="off" />
          <small ref="small">{{smallError.password}}</small>
        </div>
        <div class="form-control">
          <label for="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            ref="password2"
            placeholder="Enter password again"
            autocomplete="off"
          />
          <small ref="small">{{smallError.password2}}</small>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* aka body element */
.form-validator {
  background-color: #f9fafb;
  font-family: 'Open Sans', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
}


.container {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
}

h2 {
  text-align: center;
  margin: 0 0 20px;
}

.form {
  padding: 30px 40px;
}

.form-control {
  margin-bottom: 10px;
  padding-bottom: 20px;
  position: relative;
}

.form-control label {
  color: #777;
  display: block;
  margin-bottom: 5px;
}

.form-control input {
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 14px;
}

.form-control input:focus {
  outline: 0;
  border-color: #777;
}

.form-control.success input {
  border-color: v-bind(successColor);
}

.form-control.error input {
  border-color: v-bind(errorColor);
}

.form-control small {
  color: v-bind(errorColor);
  position: absolute;
  bottom: 0;
  left: 0;
  visibility: hidden;
}

.form-control.error small {
  visibility: visible;
}

.form button {
  cursor: pointer;
  background-color: #3498db;
  border: 2px solid #3498db;
  border-radius: 4px;
  color: #fff;
  display: block;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
  width: 100%;
}
</style>