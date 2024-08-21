<template>
  <div class="container">
    <h2 class="my-4">Project List</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Intro</th>
          <th>Owner</th>
          <th>Status</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Members</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>{{ project.intro }}</td>
          <td>{{ project.owner.username }}</td> <!-- Assuming owner has a username field -->
          <td>{{ project.status }}</td>
          <td>{{ formatDate(project.startDateTime) }}</td>
          <td>{{ formatDate(project.endDateTime) }}</td>
          <td>{{ project.members.map(member => member.username).join(', ') }}</td> <!-- Displaying member usernames -->
          <td>
            <RouterLink :to="{ name: 'ProjectEdit', params: { id: project.id } }" class="btn btn-primary btn-sm">Edit</RouterLink>
            <button @click="deleteProject(project.id)" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Reactive variables
const projects = ref([]);

// Fetch projects from API
const fetchProjects = async () => {
  try {
    const response = await axios.get('http://localhost:8081/api/v1/projects/all');
    projects.value = response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

// Delete a project
const deleteProject = async (id) => {
  try {
    await axios.delete(`http://localhost:8081/api/v1/projects/${id}`);
    fetchProjects(); // Refresh the project list
  } catch (error) {
    console.error('Error deleting project:', error);
  }
};

// Format date for display
const formatDate = (dateTime) => {
  if (!dateTime) return '';
  return new Date(dateTime).toLocaleString();
};

// On component mount, fetch projects
onMounted(fetchProjects);
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #343a40;
}

.table {
  margin-top: 20px;
}

.table th, .table td {
  text-align: center;
}

.btn {
  margin: 0 5px;
}
</style>
