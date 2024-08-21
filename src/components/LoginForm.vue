<template>
  <v-card>
    <v-card-text>
      <v-text-field
        v-model="username"
        label="Username"
        placeholder="Enter your username"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        required
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="submit">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '../api/auth';

const username = ref('');
const password = ref('');

const submit = async () => {
  const user = { username: username.value, password: password.value };
  try {
    const response = await login(user);
    alert('Login successful!');
    // Handle the response, e.g., save tokens
  } catch (error) {
    alert('Login failed!');
    console.error(error);
  }
};
</script>
