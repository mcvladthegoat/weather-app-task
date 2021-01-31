export default {
  homePage: "/",
  detailsPage: "/details",
  detailsByIdPage: (id) => `${this.detailsPage}/${id}`,
};
