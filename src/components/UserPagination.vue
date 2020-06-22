<template>
  <div v-if="totalUserPages() > 0" class="pagination-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <span
            v-if="showPreviousUserLink()"
            class="pagination-btn"
            v-on:click="updateUserPage(currentUserPage - 1)"
          >&gt;</span>
          <span>{{currentUserPage + 1}} of {{ totalUserPages() }}</span>
          <span
            v-if="showNextUserLink()"
            class="pagination-btn"
            v-on:click="updateUserPage(currentUserPage + 1)"
          >&lt;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Este componente foi criado com a ajuda deste tutorial --> https://www.youtube.com/watch?v=CTo_UHuVQX4&t=1320s
export default {
  name: "userPagination",
  props: ["users", "currentUserPage", "pageUserSize"],
  methods: {
    updateUserPage(pageNumber2) {
      this.$emit("page:update", pageNumber2);
    },
    totalUserPages() {
      return Math.ceil(this.$store.state.users.length / this.pageUserSize);
    },
    showPreviousUserLink() {
      return this.currentUserPage == 0 ? false : true;
    },
    showNextUserLink() {
      return this.currentUserPage == this.totalUserPages() - 1 ? false : true;
    }
  }
};
</script>

<style scoped type="text/css">
.pagination-btn {
  cursor: pointer;
  justify-content: end;
  color: rgb(134, 26, 98);
}

.pagination-wrapper{
    margin-top: 10px;
}
</style>