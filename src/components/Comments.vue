<template>
  <div class="row">
    <div class="container" id="showComments">
      <div class="col-sm-5">
        <h4>{{comment.userName}}</h4>
        <h4>{{comment.content}}</h4>
      </div>
      <div class="col-sm-3"></div>
      <div class="col-sm-10">
        <p id="date">{{comment.date}}</p>
      </div>
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
#date{
text-align: right 
}
</style>
