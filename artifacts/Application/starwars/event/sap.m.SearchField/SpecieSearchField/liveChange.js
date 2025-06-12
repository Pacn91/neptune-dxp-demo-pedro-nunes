const binding = SpeciesList.getBinding("items");
const filter = new sap.ui.model.Filter("name", "Contains", this.getValue());
binding.filter([filter]);