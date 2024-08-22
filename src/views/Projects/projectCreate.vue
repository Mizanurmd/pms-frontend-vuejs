<template>
  <div class="form-container">
    <h2>Create Project</h2>
    <form @submit.prevent="createProject">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input
          type="text"
          v-model="project.name"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Intro</label>
        <input
          type="text"
          v-model="project.intro"
          class="form-control"
          required
        />
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
        <input
          type="datetime-local"
          v-model="project.startDateTime"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">End Date and Time</label>
        <input
          type="datetime-local"
          v-model="project.endDateTime"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Members</label>
        <div class="form-check-group">
          <div v-for="user in users" :key="user.id" class="form-check">
            <input
              type="checkbox"
              :id="'user-' + user.id"
              :value="user.id"
              v-model="selectedMembers"
              class="form-check-input"
              @change="limitSelection"
            />
            <label :for="'user-' + user.id" class="form-check-label">
              {{ user.username }}
            </label>
          </div>
        </div>
        <p v-if="selectedMembers.length > 4" class="text-danger">
          You can select up to 4 members only.
        </p>
      </div>
      <button type="submit" class="btn btn-success">Create</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const project = ref({
  id: "",
  name: "",
  intro: "",
  owner: null,
  status: "PRE",
  startDateTime: "",
  endDateTime: "",
  members: "",
});

const users = ref([]);
const selectedMembers = ref([]);

const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:8082/api/v1/users/all");
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

onMounted(fetchUsers);

const limitSelection = () => {
  if (selectedMembers.value.length > 4) {
    selectedMembers.value.splice(4); // Keep only the first 4 selected members
    alert("You can select up to 4 members only.");
  }
};

const createProject = async () => {
  try {
    const newProject = {
      ...project.value,
      startDateTime: new Date(project.value.startDateTime).toISOString(),
      endDateTime: new Date(project.value.endDateTime).toISOString(),
      members: selectedMembers.value.map((id) => ({ id })),
    };

    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (!accessToken) {
      throw new Error("No access token found. Please log in again.");
    }

    await axios.post("http://localhost:8082/api/v1/projects/save", newProject, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    router.push("/home");
  } catch (error) {
    console.error("Error creating project:", error.response ? error.response.data : error.message);
    // Optionally, display a user-friendly error message
    alert("Error creating project: " + (error.response ? error.response.data.message : error.message));
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

.form-check-group {
  display: flex;
  flex-wrap: wrap; /* Allows wrapping to the next line if needed */
  gap: 15px; /* Space between checkboxes */
  max-width: 100%; /* Ensure it fits within the container */
  justify-content: center; /* Center align checkboxes */
}

.form-check-inline {
  display: flex;
  align-items: center;
}

.form-check-input {
  margin-right: 8px; /* Space between checkbox and label */
}

.text-danger {
  color: #dc3545; /* Red color for warning text */
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
