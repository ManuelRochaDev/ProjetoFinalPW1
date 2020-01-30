<template>
  <div id="myComment">
    <div class="comments">
      <h2 class="display-4">Comentários</h2>
    </div>
      <div>
        <br />
        <br />
        <textarea rows="5" v-model="newComment.content" id="textarea"></textarea>
        <br />
        <br />
        <input
          type="submit"
          value="Submit"
          class="btn btn-primary btn-lg"
          @click.prevent="addComment() "
        />
      </div>
  </div>
</template>

<script>
export default {
  name: "addComment",

  data: () => ({
    newComment: [{}],
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
          userName: this.$store.getters.name,
          date: this.formattedDate,
        });
      }
    }
  }
};
</script>


<style scoped>
#textarea{
width: 82%;
margin-bottom: 10px;
}
</style>