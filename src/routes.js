export default {
  homePage: "/",
  detailsPage: "/details",
  detailsByIdPage: function (id) {
    return `${this.detailsPage}/${id}`;
  },
};
