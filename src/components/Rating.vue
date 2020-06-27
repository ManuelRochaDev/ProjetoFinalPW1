<template>
  <div class="rating">
    
    <div class="info counter">
      <span>Avalie esta rota:</span>
      <br />
      <br />
    </div>
    <ul class="list">
      <li
        @click="rate(star)"
        v-for="star in maxStars"
        :class="{ 'active': star <= stars }"
        :key="star.stars"
        class="star"
      >
        <i :class="star <= stars ? 'fas fa-star' : 'far fa-star'"></i>
      </li>
    </ul>

    <div v-if="hasCounter" class="info counter">
      
      <span class="score-max">{{ maxStars }}</span>
      <span class="divider">/</span>
      <span class="score-rating">{{ stars }} </span>
      

      <!-- <span>Classificação atual: {{ratingCalc}}</span> -->
    </div>
    <span>Classificação atual: {{ratingCalc}} </span>
    <button
      class="botaozito btn my-4 btn-block btn-lg"
      type="submit"
      @click="checkRating()"
    >Enviar classificação</button>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert2";
export default {
  name: "Rating",
  props: ["grade", "maxStars", "hasCounter"],
  data() {
    return {
      stars: this.grade,
      rating: this.$store.state.currentRoute.rating,
      ratingCalc: 0
    };
  },
  mounted: function() {
    this.$store.dispatch("getRatings");
    this.ratingTotal();
  },
  beforeDestroy: function() {
    //por aqui a mandar o rating para a bd
    //this.stars
  },
  methods: {
    rate(star) {
      if (typeof star === "number" && star <= this.maxStars && star >= 0) {
        this.stars = this.stars === star ? star - 1 : star;
        if (this.stars == 0) {
          this.stars = 1;
        }
      }
    },
    checkRating() {
      let firstRating = 0;
      if (Object.keys(this.$store.state.APIRatings).length != 0) {
        for (const rating of this.$store.state.APIRatings) {
          if (rating.id_user == this.$store.state.currentUser[0].id_user) {
            axios
              .put(
                "http://" +
                  this.$store.state.API_ADDRESS +
                  "/rating/" +
                  rating.id_rating,
                {
                  rating_value: this.stars,
                  id_user: this.$store.state.currentUser[0].id_user,
                  headers: {
                    "Content-Type": "application/json"
                  }
                }
              )
              .then(swal.fire("Sucesso", "Rating enviado", "info"))
              .catch(function() {
                swal.fire("Erro", "erro", "warning");
              });
            firstRating = 0;
          } else {
            firstRating = 1;
          }
        }
      } else {
        firstRating = 1;
      }

      if (firstRating != 0) {
        axios
          .post("http://" + this.$store.state.API_ADDRESS + "/rating/", {
            rating_value: this.stars,
            id_user: this.$store.state.currentUser[0].id_user,
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(swal.fire("Sucesso", "Rating enviado", "info"))
          .catch(function() {
            swal.fire("Erro", "erro", "warning");
          });
      }
    },
    ratingTotal() {
      let ratingSum = 0;
      let ratingNum = 0;
      for (const rating of this.$store.state.APIRatings) {
        ratingSum = rating.rating_value + ratingSum;
        ratingNum++;
      }
      this.ratingCalc = (ratingSum / ratingNum).toFixed(1)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.rating {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  color: #b7b7b7;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 33px rgba(19, 18, 18, 0.09);
  .list {
    padding: 0;
    margin: 0 20px 0 0;
    &:hover {
      .star {
        color: #ffe100;
      }
    }
    .star {
      display: inline-block;
      font-size: 2.5rem;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        ~ .star:not(.active) {
          color: inherit;
        }
      }
      &:first-child {
        margin-left: 0;
      }
      &.active {
        color: #ffe100;
      }
    }
  }
  .info {
    margin: 0 auto;
    justify-content: center;
    margin-top: 15px;
    font-size: 30px;
    text-align: center;
    display: table;
    .divider {
      margin: 0 5px;
      font-size: 30px;
    }
    .score-max {
      margin-right: 0px;
      font-size: 30px;
      vertical-align: sub;
    }
    .score-rating {
      margin-right: 0px;
    }
  }
}

.botaozito {
  font-size: 14px;
  background-color: #221d23;
  color: #ffffff;
}
</style>