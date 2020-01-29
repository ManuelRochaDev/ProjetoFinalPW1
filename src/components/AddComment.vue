<template>
  <div id="myComment">
    <div class="comments">
      <h2>Comentários</h2>
    </div>
    <br />
    <br />
    <textarea rows="6" cols="100" v-model="newComment.content"></textarea>
    <br />
    <br />
    <input type="submit" value="Submit" @click.prevent="addComment()" />
  </div>
</template>

<script>
export default {
  name: "addComment",

  data: () => ({
    newComment: [{}],
    comments: [],
    today: new Date(),
    date: ""
  }),

  methods: {
    getLastId() {
      return this.$store.getters.lastId;
    },

    getLastCommentId() {
      return this.$store.getters.getLastCommentId;
    },

    setDate() {
       this.today = new Date();
        this.date =
        this.today.getFullYear() +
        "/" +
        (this.today.getMonth() + 1) +
        "/" +
        this.today.getDate();
    },

    addComment() {
      if (this.newComment.content != "") {
        this.$store.commit("ADD_COMMENT", {
          id: Number(this.getLastCommentId()) + 1,
          content: this.newComment.content,
          currentUser: Number(this.getLastId()) + 1,
          userName: this.$store.getters.lastName,
          date: this.setDate()
          //avatar: this.avatar
        });
      }
    }
  }
};
</script>


<style scoped>
</style>