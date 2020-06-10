<template>
  <div>
      <div class="row">
        <div class="col-lg-12" id="h1">
          <h1 id ="admin" class="display-3">Admin page</h1>
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


<style scoped>
#admin{
  margin:auto;
  margin-top:40px;
  margin-bottom:20px;
  text-align:center;
  }
</style>