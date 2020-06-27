<template>
  <div class="row" id="main">
    <div id="comments" class="col-xs-12 col-sm-12 col-md-12">
      <div class="row" id="row" v-for="comment in renderComments" :key="comment.id_comment">
        <div class="col-xs-2 col-sm-2 col-md-2">
          <template v-if="comment.avatar == ''">
            <img src="../assets/avatar.png" id="profPic" />
          </template>
          <template v-else>
            <img :src="comment.avatar" id="profPic" />
          </template>
          <h4 id="user">{{comment.userName}}</h4>
        </div>

        <div id="cont" class="col-xs-7 col-sm-7 col-md-7">
          <h4 id="msg">{{comment.text}}</h4>
        </div>
        <div class="col-xs-2 col-sm-2 col-md-2">
          <p id="date" class="text-muted">{{comment.commentDate}}</p>
        </div>
        <template v-if="curUserId == comment.id_user || curUserType == 0">
          <div class="col-xs-1 col-sm-1 col-md-1">
            <button
              type="button"
              @click="removeComment(comment.id_comment)"
              class="btn btn-danger btn-lg"
            >
              <span class="glyphicon glyphicon-remove"></span>
            </button>
          </div>
        </template>
      </div>
      <hr />
    </div>
  </div>
</template>


<script>
import axios from "axios";
import swal from "sweetalert2";
export default {
  name: "comments",

  data: () => ({
    routeComments: [],
    commentsUsers: [],
    userName: "",
    curUserId: 0,
    curUserType: 1
  }),
  mounted: function() {
    this.curUserId = this.$store.state.currentUser[0].id_user;
  },
  created: function() {
    this.$store.dispatch("getComments");
    this.curUserId = this.$store.state.currentUser[0].id_user;
    this.curUserType = this.$store.state.currentUser[0].userType;
    if (this.$store.state.APIComments != []) {
      this.renderComments;

      this.getUserName;
    }
  },
  computed: {
    renderComments() {
      //get comments from this route only
      this.$store.dispatch("getUsers");
      let routeComments = [];
      let userName = "";
      let avatar = "";
      for (const comment of this.$store.state.APIComments) {
        for (const user of this.$store.state.APIUsers) {
          if (user.id_user == comment.id_user) {
            userName = user.name + " " + user.lastName;
            avatar = user.avatar;
          }
        }

        if (comment.id_route == this.$store.state.currentRoute[0].id_route) {
          routeComments.push({
            id_route: comment.id_route,
            commentDate: comment.commentDate,
            text: comment.text,
            id_user: comment.id_user,
            userName: userName,
            id_comment: comment.id_comment,
            rating: comment.rating,
            avatar: avatar
          });
        }
      }
      return routeComments;
    }
  },
  methods: {
    removeComment(id_comment) {
      alert(id_comment);
      swal
        .fire({
          title: "Tem a certeza que pretende remover o comentário?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim"
        })
        .then(result => {
          if (result.value) {
            axios
              .delete(
                "http://" +
                  this.$store.state.API_ADDRESS +
                  "/comments/" +
                  id_comment,
                {
                  headers: {
                    "Content-Type": "application/json"
                  }
                }
              )
              .then(swal.fire("Sucesso", "Comentário removido", "info"))
              .catch(function(error) {
                swal.fire("Erro", error, "warning");
              });
          }
        });

      /* this.$store.commit("REMOVE_USER", {
          id: userId
        }); */
    }
  }

  /* getUserName() {
      let commentsUsers = [];
      for (const comment of this.renderComments) {
        commentsUsers.push(comment.id_user);
      }
      return commentsUsers;
    } */
};
</script>


<style scoped>
h4 {
  font-family: "Catamaran", sans-serif;
  font-size: 16px;
}

#comments {
  margin: 0 auto;
  width: 80%;
}

#date {
  margin: 0 auto;
  text-align: left;
  margin-top: 5%;
  font-size: 12px;
}

.row {
  margin: 0 auto;
  vertical-align: middle;
  padding-top: 10px;
  text-align: center;
  font-size: 16px;
}

#row {
  margin: 0 auto;
  color: black;
}

#msg {
  text-align: left;
  margin-top: 10px;
  margin-left: calc(20px + 2%);
}

img {
  width: 40px !important;
  height: 40px;
  background-color: black;
}

#user {
  color: rgb(216, 152, 68);
  margin-top: 10px;
  font-weight: bold;
}

#profPic {
  width: 50%;
  height: auto;
}

.glyphicon {
  margin: 0 auto !important;
  margin-top: 30px;
}

button.btn-danger {
  padding: 8px 12px 12px 12px !important;
  background-color: black;
  color: white;
  border: black;
}

@media only screen and (max-width: 576px) {
  img {
    width: 40px !important;
    height: auto;
    margin-right: 5%;
  }

  #msg {
    margin: 0 auto;
    text-align: center;
    margin-top: 10px;
  }

  #row {
    margin: 0 auto;
    color: black;
  }

  #date {
    margin: 0 auto;
    text-align: center;
    margin-top: 5%;
    font-size: 12px;
  }

  #profPic {
    width: 100%;
    height: auto;
    margin-right: 0px;
  }
}
</style>
