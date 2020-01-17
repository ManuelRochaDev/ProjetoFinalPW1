<template>
  <div>
    <h1>Admin page</h1>
    <CreateRoute></CreateRoute>
  </div>
</template>

<script>
import CreateRoute from "@/components/CreateRoute.vue";
export default {
  name: "admin",
  components: {
    CreateRoute
  }
};
</script>