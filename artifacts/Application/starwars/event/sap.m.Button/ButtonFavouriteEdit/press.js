const context = oEvent.oSource.getBindingContext();
const favourite = context.getObject();

modelFavouriteSimpleForm.setData(favourite)
FavouritesDialog.open()