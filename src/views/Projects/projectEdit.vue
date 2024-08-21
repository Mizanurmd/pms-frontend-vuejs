<template>
    <div>
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
          <label class="form-label">Status</label>
          <select v-model="project.status" class="form-control" required>
            <option>PRE</option>
            <option>START</option>
            <option>END</option>
          </select>
        </div>
        <button type="submit" class="btn btn-success">Update</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  const project = ref({
    name: '',
    intro: '',
    status: 'PRE',
  });
  
  const fetchProject = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/v1/projects/${route.params.id}`);
      project.value = response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };
  
  const updateProject = async () => {
    try {
      await axios.put(`http://localhost:8081/api/v1/projects/update/${route.params.id}`, project.value);
      router.push('/');
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };
  
  onMounted(fetchProject);
  </script>
  