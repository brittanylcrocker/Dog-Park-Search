# Happy Tails

Find dog parks near you by entering a location into the provided auto complete search bar to filter a list of 20 dog-friendly parks near the entered location. Locations appear as clickable markers on the map. Click on the markers to display details about the park, park name, address and rating. Click Zoom out to reset zoom to your original search results.
Secondary feature: Notes from dogs around the world, users from around the world can share a photo, text

## Technologies used

##### Client:
React
Jquery
Javascript
Bootstrap

##### Server:
[Git Hub Repo](https://github.com/brittanylcrocker/Dog-Park-Server)
Node
Express
Axios


Deployed using Surge and Heroku.

### Google Maps Api

For the search feature I used the Google Maps Api, in conjunction with the [google-maps-react](https://www.npmjs.com/package/google-maps-react) npm package. The Google Maps API directly manipulates the DOM however, as React uses a virtual DOM, the use of a package is recommended. The most challenging part of working with this api and my project as a whole was stylising the map, as it is a feature from the api, it doesn't behave like a normal React component. Due to this, in the future when working with the Google Maps API I would favour using another framework or vanilla Javascript

### Next Steps:

Current location feature, so the area is set to a users current location.
Accessibility, improving the LightHouse Score which is currently 86 to 95+. 
