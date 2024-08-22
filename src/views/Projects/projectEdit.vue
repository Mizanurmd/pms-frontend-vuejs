<template>
  <div class="form-container">
    <h2>Edit Project</h2>
    <form @submit.prevent="updateProject">
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
      <button type="submit" class="btn btn-success">Update</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const project = ref({
  id:'',
  name: '',
  intro: '',
  owner: null, // store user ID
  status: 'PRE',
  startDateTime: '',
  endDateTime: '',
  members: [],
});

const users = ref([]);
const selectedMembers = ref([]);

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8082/api/v1/users/all');
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const fetchProject = async () => {
  try {
    const { id } = route.params; // Get project ID from route params
    const response = await axios.get(`http://localhost:8082/api/v1/projects/${id}`);
    const projectData = response.data;
    project.value = {
      projectData,
      startDateTime: projectData.startDateTime.slice(0, 16),
      endDateTime: projectData.endDateTime.slice(0, 16),
     
    };
    selectedMembers.value = projectData.members.map(member => member.id);
  } catch (error) {
    console.error('Error fetching project:', error);
  }
};

onMounted(() => {
  fetchUsers();
  fetchProject();
});

const updateProject = async () => {
  try {
    const updatedProject = {
      ...project.value,
      startDateTime: new Date(project.value.startDateTime).toISOString(),
      endDateTime: new Date(project.value.endDateTime).toISOString(),
      members: selectedMembers.value.map(id => ({ id })), // convert selected member IDs to objects
    };
    const { id } = route.params;
    await axios.put(`http://localhost:8082/api/v1/projects/update/${id}`, updatedProject);
   router.push({ name: 'ProjectEdit', params: { id: '1' } });
  } catch (error) {
    console.error('Error updating project:', error);
  }
};
</script>

<style scoped>
.form-container {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #343a40;
}

.form-label {
  font-weight: bold;
  color: #495057;
  display: block;
  margin-bottom: 8px;
}

.form-control {
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 8px 12px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
  width: auto;
  max-width: 200px;
}
</style>
