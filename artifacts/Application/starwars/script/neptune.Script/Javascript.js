async function getMovies() {
  try {
    MoviesList.setBusy(true)
    const { count, results } = await apiGetMovies();

    TabMovies.setCount(count)
    modelMoviesList.setData(results);
  } catch (err){
    console.error('Oops! Something went wrong while getting the Movies: ', err)
  }

  MoviesList.setBusy(false)
}

async function getPeople(page) {
  try {
    const { count, results } = await apiGetPeople({
      parameters: {
        page: page || 1,
      },
    });

    TabPeople.setCount(count)
    modelPeopleList.setData(page ? [...modelPeopleList.getData(), ...results] : results);
  } catch (err){
    console.error('Oops! Something went wrong while getting the People: ', err)
  }
}

async function getSpecies() {
  try {
    const { count, results } = await apiGetSpecies();
    
    TabSpecies.setCount(count)
    modelSpeciesList.setData(results);
  } catch (err){
    console.error('Oops! Something went wrong while getting the Species: ', err)
  }
}

async function getVehicles() {
  try {
    const { count, results } = await apiGetVehicles();
    
    TabVehicles.setCount(count)
    modelVehiclesList.setData(results);
  } catch (err){
    console.error('Oops! Something went wrong while getting the Vehicles: ', err)
  }
}

async function getStarships() {
  try {
    const { count, results } = await apiGetStarships();
    
    TabStarships.setCount(count)
    modelStarshipsList.setData(results);
  } catch (err){
    console.error('Oops! Something went wrong while getting the Starships: ', err)
  }
}

async function getPlanets() {
  try {
    const { count, results } = await apiGetPlanets();
    
    TabPlanets.setCount(count)
    modelPlanetsList.setData(results);
  } catch (err){
    console.error('Oops! Something went wrong while getting the Planets: ', err)
  }
}

let favouritesList = []
// Favourites
async function getFavourites() {
  try {
    const response = await apiGetFavourites();
    favouritesList = response
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
    getFavourites()
  } catch (err) {
    console.error('Oops! It wasn\'t possible to add this movie to the favourites: ', err)
  } 
}

async function deleteFavourite(id) {
  try {
    await apiDeleteFavourite({
      parameters: {
        where: JSON.stringify({id: id})
      }
    })

    sap.m.MessageToast.show("Movie removed from the favourites successfully!")
    getFavourites()
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


