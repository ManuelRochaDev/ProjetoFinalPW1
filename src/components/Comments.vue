<template>
  <div class="row">
    <div class="container" id="showComments">
      <h4>{{comment.userName}}</h4>
      <h4>{{comment.content}}</h4>
      <p id="date">{{comment.date}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
};
</script>

<style scoped>
/*#date{

}*/
</style>
