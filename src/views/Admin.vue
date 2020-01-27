<template>
  <div>
      <div class="row">
        <div class="col-lg-12">
          <h1>Admin page</h1>
          <br />
          <br />
          <CreateRoute></CreateRoute>
        </div>
    </div>
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