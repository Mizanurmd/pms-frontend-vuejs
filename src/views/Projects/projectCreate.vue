<template>
    <div class="form-container">
      <h2>Create Project</h2>
      <form @submit.prevent="createProject">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input type="text" v-model="project.name" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Intro</label>
          <input type="text" v-model="project.intro" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Owner</label>
          <select v-model="project.owner" class="form-control" required>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.username }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Status</label>
          <select v-model="project.status" class="form-control" required>
            <option value="PRE">PRE</option>
            <option value="START">START</option>
            <option value="END">END</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Start Date and Time</label>
          <input type="datetime-local" v-model="project.startDateTime" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">End Date and Time</label>
          <input type="datetime-local" v-model="project.endDateTime" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Members</label>
          <select v-model="selectedMembers" multiple class="form-control">
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.username }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn btn-success">Create</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const project = ref({
    name: '',
    intro: '',
    owner: null, // store user ID
    status: 'PRE',
    startDateTime: '',
    endDateTime: '',
  });
  
  const users = ref([]);
  const selectedMembers = ref([]);
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/v1/users');
      users.value = response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  onMounted(fetchUsers);
  
  const createProject = async () => {
    try {
      const newProject = {
        ...project.value,
        startDateTime: new Date(project.value.startDateTime).toISOString(),
        endDateTime: new Date(project.value.endDateTime).toISOString(),
        members: selectedMembers.value.map(id => ({ id })) // convert selected member IDs to objects
      };
      await axios.post('http://localhost:8081/api/v1/projects/save', newProject);
      router.push('/');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };
  </script>
  
  <style scoped>
  .form-container {
    background-color: #f8f9fa; /* Light gray background color */
    padding: 20px; /* Padding around the form */
    border-radius: 8px; /* Rounded corners */
    max-width: 600px; /* Maximum width for the form */
    margin: 0 auto; /* Center the form horizontally */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    text-align: center; /* Center text inside the form container */
  }
  
  h2 {
    margin-bottom: 20px; /* Space below the heading */
    color: #343a40; /* Dark gray color for the heading */
  }
  
  .form-label {
    font-weight: bold; /* Bold labels */
    color: #495057; /* Slightly darker gray for labels */
    display: block; /* Ensure labels are on their own line */
    margin-bottom: 8px; /* Space between label and input */
  }
  
  .form-control {
    border: 1px solid #ced4da; /* Light border */
    border-radius: 4px; /* Slightly rounded corners */
    padding: 8px 12px; /* Padding inside the input */
    width: 100%; /* Full width inputs and selects */
    max-width: 500px; /* Ensure inputs and selects don't get too wide */
    margin: 0 auto; /* Center inputs and selects horizontally */
  }
  
  .btn-success {
    background-color: #28a745; /* Green background color for the button */
    border-color: #28a745; /* Green border */
    padding: 10px 20px; /* Padding inside the button */
    font-size: 16px; /* Slightly larger text */
    margin-top: 20px; /* Space above the button */
    width: auto; /* Auto width for the button */
    max-width: 200px; /* Maximum width for the button */
  }
  </style>
  