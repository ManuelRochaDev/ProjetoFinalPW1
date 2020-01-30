<template>
  <div class="row">
    <div class="container" id="showComments">
      <div id="comments" class="col-sm-5">
        <img v-if="comment.id !== 0" src="../assets/avatar.png" width="50" height="50" />
        <h4>{{comment.userName}}</h4>
        <h4>{{comment.content}}</h4>
      </div>
      <div class="col-sm-3"></div>
      <div class="col-sm-10">
        <p id="date" class="text-muted">{{comment.date}}</p>
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
  }
};
</script>

<style scoped>
#date {
  text-align: right;
}
#comments {
  padding-right: 100%;
  vertical-align: middle;
}
</style>
