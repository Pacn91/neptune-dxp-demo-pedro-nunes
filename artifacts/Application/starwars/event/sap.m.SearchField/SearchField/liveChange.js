const binding = MoviesList.getBinding("items");
const filter = new sap.ui.model.Filter({
  filters: [
    new sap.ui.model.Filter("title", "Contains", this.getValue()),
    new sap.ui.model.Filter("director", "Contains", this.getValue()),
    new sap.ui.model.Filter("producer", "Contains", this.getValue()),
  ],
  and: false,
});
binding.filter([filter]);