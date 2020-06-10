<template>
  <div id="myComment">
    <div class="container">
      <div class="row" id="commentRow">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <img id="avatar" src="../assets/manuel.jpg" />
          <textarea
            placeholder=" Faça um comentário"
            rows="5"
            v-model="newComment.content"
            id="textarea"
          ></textarea>
        </div>
        <div class="col-md-12 col-xs-12">
          <input
            id="submit"
            type="submit"
            value="Submit"
            class="btn btn-lg"
            @click.prevent="addComment() "
          />
        </div>
      </div>
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
    //buscar data
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
      if (this.$store.getters.getLastCommentId == null) {
        return 0;
      } else {
        return this.$store.getters.getLastCommentId;
      }
    },

    addComment() {
      if (this.newComment.content != "") {
        this.$store.commit("ADD_COMMENT", {
          id: Number(this.getLastCommentId()) + 1,
          content: this.newComment.content,
          currentUser: Number(this.getLastId()) + 1,
          userName:
            this.$store.state.currentUser.name +
            " " +
            this.$store.state.currentUser.lastName,
          date: this.formattedDate,
          id_route: this.$store.state.currentRoute.id
        });
      }
    }
  }
};
</script>


<style scoped>
#myComment {
  margin: 0 auto;
  font-size: 16px;
  width: 90%;
}

#textarea {
  margin: 0 auto;
  position: relative;
  width: 70%;
  margin: auto;
  margin-left: 5%;
  margin-bottom: 10px;
  opacity: 60%;
  border: 1px solid rgb(83, 83, 83);
  border-radius: 10px;
}

#submit {
  margin: 0 auto;
  position: relative;
  background-color: rgb(207, 207, 207);
  color: black;
  right: 0;
  width: 70%;
  height: 50px;
  margin-top: 20px;
  margin-left: 20%;
  font-size: 14px;
  font-family: "Catamaran", sans-serif;
}

#submit:hover {
  background-color: rgba(134, 26, 98, 0.8);
  color: white;
}

.embed-submit-field {
  position: relative;
}

#avatar {
  margin-left: 5%;
  background-color: black;
  width: 6%;
  height: auto;
  margin-right: 4%;
}

.row {
  margin: auto;
  position: relative;
}

@media only screen and (max-width: 776px) {
  #avatar {
    width: 40px;
    margin-right: 2%;
  }
}

@media only screen and (max-width: 576px) {
  #submit {
    margin: 0 auto;
    width: 90%;
    height: 50px;
    margin-top: 20px;
    font-size: 14px;
    font-family: "Catamaran", sans-serif;
  }

  #textarea {
    margin: 0 auto;
    position: relative;
    width: 90%;
    margin: auto;
    margin-bottom: 10px;
    opacity: 60%;
    border: 1px solid rgb(83, 83, 83);
    border-radius: 10px;
  }

  #avatar {
    margin: 0 auto;
    width: 80px;
    margin-bottom: 10px;
  }
}
</style>