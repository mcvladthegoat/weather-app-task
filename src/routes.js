const Routes = {
  homePage: "/",
  detailsPage: "/details",
  detailsByIdPage: function (id) {
    return `${this.detailsPage}/${id}`;
  },
};

export default Routes;
