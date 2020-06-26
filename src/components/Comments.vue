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

        <div id="cont" class="col-xs-8 col-sm-8 col-md-8">
          <h4 id="msg">{{comment.text}}</h4>
        </div>
        <div class="col-xs-2 col-sm-2 col-md-2">
          <p id="date" class="text-muted">{{comment.commentDate}}</p>
        </div>
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
    userName: ""
  }),
  mounted: function() {},
  created: function() {
    this.$store.dispatch("getComments");

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
    },

    methods: {
      removeComment(id_comment) {
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
  }
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
  background-color: white;
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
