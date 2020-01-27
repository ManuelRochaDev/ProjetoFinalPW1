<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: "about",
  props: {
    msg: String
  },
  methods: {
    
  },
  created: function(){
    //Get path
    this.$store.state.currentPath = window.location.pathname
    
  }
};
</script>