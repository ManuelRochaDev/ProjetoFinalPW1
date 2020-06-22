<template>
  <div v-if="totalPages() > 0" class="pagination-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <span
            v-if="showNextLink()"
            class="pagination-btn"
            v-on:click="updatePage(currentPage + 1)"
          >&gt;</span>
          <span id="pages">{{currentPage + 1}} of {{ totalPages() }}</span>
          <span
            v-if="showPreviousLink()"
            class="pagination-btn"
            v-on:click="updatePage(currentPage - 1)"
          >&lt;</span>
          ´
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Este componente foi criado com a ajuda deste tutorial --> https://www.youtube.com/watch?v=CTo_UHuVQX4&t=1320s
export default {
  name: "pagination",
  props: ["appRoutes", "currentPage", "pageSize"],
  methods: {
    updatePage(pageNumber) {
      this.$emit("page:update", pageNumber);
    },
    totalPages() {
      return Math.ceil(this.$store.state.appRoutes.length / this.pageSize);
    },
    showPreviousLink() {
      return this.currentPage == 0 ? false : true;
    },
    showNextLink() {
      return this.currentPage == this.totalPages() - 1 ? false : true;
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

.pagination-wrapper {
  margin-top: 10px;
}

</style>