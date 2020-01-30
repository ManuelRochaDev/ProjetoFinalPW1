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
    newComment: [{

    }],
    comments: [],
    currentDate: new Date(),
    formattedDate: ""
  }),

  created: function() {
    //gets the date, month and year and insert them in a variable
    let date = this.currentDate.getDate();
    let month = this.currentDate.getMonth() + 1;
    let year = this.currentDate.getFullYear();
    this.formattedDate = date + "/" + month + "/" + year;
  },

  methods: {
    getLastId() {
      return this.$store.getters.lastId;
    },

    getLastCommentId() {
      return this.$store.getters.getLastCommentId;
    },

    addComment() {
      if (this.newComment.content != "") {
        this.$store.commit("ADD_COMMENT", {
          id: Number(this.getLastCommentId()) + 1,
          content: this.newComment.content,
          currentUser: Number(this.getLastId()) + 1,
          userName: this.$store.getters.lastName,
          date: this.formattedDate
          //img:
          //avatar: this.avatar
        });
      }
    }
  }
};
</script>


<style scoped>
</style>