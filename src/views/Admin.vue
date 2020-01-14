<template>
  <div>
    <h1>Admin page</h1>
    <AdminForm></AdminForm>
  </div>
</template>


<script>
import AdminForm from "../components/AdminForm.vue";
export default {
  name: "admin",
  components: {
    AdminForm
  },
  
};
</script>