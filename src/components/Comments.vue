<template>
  <div class="row" id="main">
    <div id="comments" class="col-xs-12 col-sm-12 col-md-12">
      <div class="row" id="row" v-for="comment in renderComments" :key="comment.id">
        <div class="col-xs-2 col-sm-2 col-md-2">
          <img src="../assets/manuel.jpg" id="profPic" />
          <h4 id="user">{{comment.userName}}</h4>
        </div>

        <div id="cont" class="col-xs-8 col-sm-8 col-md-8">
          <h4 id="msg">{{comment.content}}</h4>
        </div>
        <div class="col-xs-2 col-sm-2 col-md-2">
          <p id="date" class="text-muted">{{comment.date}}</p>
        </div>
      </div>
      <hr />
    </div>
    <!-- <div v-else></div> -->
  </div>
</template>


<script>
export default {
  name: "comments",

  data: () => ({
    routeComments: []
  }),
  /* mounted: function() {
    this.renderComments;
  }, */
  created: function() {
    //load evertyhing on local storage when page is opened

    if (localStorage.getItem("comments")) {
      this.$store.state.comments = JSON.parse(localStorage.getItem("comments"));
    }
  },
  computed: {
    renderComments() {
      //get comments from this route only
      let routeComments = [];
      for (let i = 0; i < this.$store.state.comments.length; i++) {
        if (
          this.$store.state.comments[i].id_route ==
          this.$store.state.currentRoute.id
        ) {
          routeComments.push(this.$store.state.comments[i]);
        }
      }
      return routeComments;
    }
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
  margin-left: calc(20px + 2%) 
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
