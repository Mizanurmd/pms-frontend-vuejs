<template>
  <v-app> 
    <div class="d-flex">
      <!-- Sidebar -->
      <nav class="navbar navbar-expand-lg flex-column" style="width: 200px; height: 100vh; background-color: black;">
        <div class="container-fluid flex-column">
          <RouterLink class="navbar-brand text-white" to="/">Logout</RouterLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav flex-column mb-2 mb-lg-0 align-items-center mt-3">
              <li class="nav-item mb-2">
                <RouterLink class="nav-link active text-white" to="/signup">Register</RouterLink>
              </li>
              <li class="nav-item mb-2">
                <RouterLink class="nav-link active text-white" to="/">PMS</RouterLink>
              </li>
              <li class="nav-item mb-2">
                <RouterLink class="nav-link text-white" to="/about">About</RouterLink>
              </li>
              <li class="nav-item mb-2">
                <RouterLink class="nav-link text-white" to="/project">Project</RouterLink>
              </li>
              <li class="nav-item mb-2">
              <RouterLink class="nav-link" to="/create">Create Project</RouterLink>
            </li>
             <li class="nav-item mb-2">
              <RouterLink class="nav-link" to="/projects">Update Project</RouterLink>
            </li>
              <li class="nav-item mb-2">
                <RouterLink class="nav-link text-white" to="/userDetails">User</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Main Content Area -->
      <div class="flex-grow-1 p-3">
        <h1 class="text-center">Project Management System By CNS</h1>
        <RouterLink class="nav-link text-white" to="/project">Project</RouterLink>
      </div>
    </div>
  </v-app> 
</template>

<style scoped>
/* Ensure text color remains white within the sidebar */
.navbar-nav .nav-link {
  color: white;
}

.navbar-brand {
  color: white;
}

/* Center list items and add top margin */
.navbar-nav {
  margin-top: 20px; /* Add margin-top to the list */
}

.navbar-nav .nav-item {
  margin-bottom: 10px; /* Optional: Space between items */
}

.navbar-nav {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center list items horizontally */
}
</style>
