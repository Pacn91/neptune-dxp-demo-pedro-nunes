const button = oEvent.oSource;
const context = button.getBindingContext();
const movie = context.getObject();

const favourite = favouritesList.find(f => f.title === movie.title)

if (favourite) {
    deleteFavourite(favourite)
    return
}

InputTitle.setValue(movie.title)
InputTitle.setEditable(false)
FavouritesDialog.open()