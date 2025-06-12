async function getMovies() {
  try {
    MoviesList.setBusy(true)
    const { count, results: movies } = await apiGetMovies();

    const newList = movies.map((movie) => {
      const isFavourite = favouritesList.some(favourite => favourite.title === movie.title)
      return { 
        ...movie, 
        favouritesIcon: isFavourite ? "sap-icon://favorite"  : "sap-icon://add-favorite" 
      }
    });

    TabMovies.setCount(count)
    modelMoviesList.setData(newList);
  } catch (err){
    console.error('Oops! Something went wrong while getting the Movies: ', err)
  }

  MoviesList.setBusy(false)
}

async function getPeople() {
  try {
    const { results } = await apiGetPeople();

    modelPeopleList.setData(results);
  } catch (err){
    console.error('Oops! Something went wrong while getting the People: ', err)
  }
}

async function getSpecies() {
  try {
    const { results } = await apiGetSpecies();

    modelSpeciesList.setData(results);
  } catch (err){
    console.error('Oops! Something went wrong while getting the Species: ', err)
  }
}

async function getVehicles() {
  try {
    const { results } = await apiGetVehicles();
    
    modelVehiclesList.setData(results);
  } catch (err){
    console.error('Oops! Something went wrong while getting the Vehicles: ', err)
  }
}

async function getStarships() {
  try {
    const { results } = await apiGetStarships();
    
    modelStarshipsList.setData(results);
  } catch (err){
    console.error('Oops! Something went wrong while getting the Starships: ', err)
  }
}

async function getPlanets() {
  try {
    const { results } = await apiGetPlanets();

    modelPlanetsList.setData(results);
  } catch (err){
    console.error('Oops! Something went wrong while getting the Planets: ', err)
  }
}

// Favourites
let favouritesList = []
async function getFavourites() {
  try {
    const response = await apiGetFavourites();
    favouritesList = response

    TabFavourites.setCount(response.length)
  } catch (err){
    console.error('Oops! Something went wrong while getting your Favourites: ', err)
  }
}

async function createFavourite(id) {
  try {
    const data = {}
    data.title = InputTitle.getValue()
    data.poster_url = InputPosterURL.getValue()
    data.comment = TextAreaComment.getValue()
    data.rating = RatingIndicator.getValue()

    await apiPostFavourite({ 
      data, 
      parameters: {
        where: id ? JSON.stringify({id: id}) : null
      }
    })

    // Clear values
    InputTitle.setValue("")
    InputPosterURL.setValue("")
    TextAreaComment.setValue("")
    RatingIndicator.setValue(null)

    sap.m.MessageToast.show("Movie added to favourites successfully!")

    // Update favourites list
    getFavourites()

    // Update icon and update model
    modelMoviesList
      .getData()
      .find((elem) => elem.title === data.title).favouritesIcon = "sap-icon://favorite";
    modelMoviesList.refresh();
  } catch (err) {
    console.error('Oops! It wasn\'t possible to add this movie to the favourites: ', err)
  } 
}

async function deleteFavourite(favourite) {
  try {
    await apiDeleteFavourite({
      parameters: {
        where: JSON.stringify({id: favourite.id})
      }
    })

    sap.m.MessageToast.show("Movie removed from the favourites successfully!")

    // Update favourites list
    getFavourites()

    // Update icon and update model
    modelMoviesList
      .getData()
      .find((elem) => elem.title === favourite.title).favouritesIcon = "sap-icon://add-favorite";
    modelMoviesList.refresh();
  } catch (err){
    console.error('Oops! We couldn\'t unfavourite this movie: ', err)
  } 
}


sap.ui.getCore().attachInit(function (startParams) {
  getFavourites();
  getMovies();
  getPeople();
  getSpecies();
  getVehicles();
  getStarships();
  getPlanets();
});


