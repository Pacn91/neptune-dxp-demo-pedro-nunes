const binding = StarshipsList.getBinding("items");
const filter = new sap.ui.model.Filter("name", "Contains", this.getValue())
binding.filter([filter]);