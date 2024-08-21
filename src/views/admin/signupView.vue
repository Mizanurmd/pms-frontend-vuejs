<template>
  <v-row justify="center" class="mt-5">
    <v-col
      cols="8"
      sm="8"
      md="6"
      lg="4"
    >
      <v-card class="registration-card" outlined>
        <v-card-title class="text-h5">Register</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="username"
            label="Username"
            placeholder="Enter your username"
            required
            dense
            class="mb-4"
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="Email"
            placeholder="Enter your email"
            required
            dense
            class="mb-4"
          ></v-text-field>

          <v-autocomplete
            v-model="role"
            :items="roles"
            label="Role"
            placeholder="Select your role"
            required
            dense
            class="mb-4"
          ></v-autocomplete>

          <v-text-field
            v-model="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            required
            dense
            class="mb-4"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="submit" block>Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const email = ref('');
const role = ref('');
const password = ref('');

const roles = ['ADMIN', 'USER'];

const submit = async () => {
  const user = {
    username: username.value,
    email: email.value,
    role: role.value,
    password: password.value,
  };
  
  try {
    const response = await axios.post('http://localhost:8081/api/v1/register', user);
    alert('Registration successful!');
    console.log(response.data); // Handle the response as needed
  } catch (error) {
    alert('Registration failed!');
    console.error(error);
  }
};
</script>

<style scoped>
.registration-card {
  max-width: 100%; /* Set the card to be half the width of its container */
  margin: 0 auto; /* Center the card horizontally */
  padding: 20px;
  background-color: hwb(240 93% 3% / 0.954);
}

.v-card-title {
  text-align: center;
  margin-bottom: 20px;
}

.v-card-text .v-text-field {
  margin-bottom: 16px;
}

.v-btn {
  width: 100%;
}
</style>
