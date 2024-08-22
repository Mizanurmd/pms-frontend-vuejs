<template>
  <v-row justify="center" align="center" class="login-container">
    <v-col cols="12" sm="8" md="6" lg="4">
      <v-card class="login-card" outlined>
        <v-card-title class="text-h5 text-center">Login</v-card-title>
        <v-card-text>
          <v-text-field v-model="username" label="Username" placeholder="Enter your username" required></v-text-field>

          <v-text-field v-model="password" label="Password" placeholder="Enter your password" type="password"
            required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="submit" block>Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');

const submit = async () => {
  const user = { username: username.value, password: password.value };
  try {
    const response = await axios.post('http://localhost:8082/api/v1/login', user);
    alert('Login successful!');
    // Save tokens in local storage
    const token = localStorage.setItem('accessToken', response.data.accessToken);
     localStorage.setItem('refreshToken', response.data.refreshToken);
    console.log("Token:", token); // Verify the token format
    // Handle the response, e.g., save tokens, redirect, etc.
    console.log(response.data);
    router.push({ name: 'home' });
  } catch (error) {
    alert('Login failed!');
    console.error(error);
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  /* Full viewport height */
}

.login-card {
  max-width: 400px;
  /* Set the card width */
  margin: 0 auto;
  /* Center the card horizontally */
  padding: 20px;
  background-color: #ffffff;
  /* White background color for the card */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Subtle shadow for better visibility */
}

.v-card-title {
  margin-bottom: 20px;
  /* Space between title and content */
}

.v-card-text .v-text-field {
  margin-bottom: 16px;
  /* Space between text fields */
}

.v-btn {
  width: 100%;
  /* Make button span the full width of the card */
}
</style>
