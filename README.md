# EntertainmentShows

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

# Prequisites
1. Nodejs 14.15.3
2. Angular-cli (npm install -g @angular/cli)

# Setting up
1. Pull the repository
2. Check availibility of node and angular cli in the system 
3. npm i
4. ng serve --open

# API endpoint used
1. http://api.tvmaze.com/search/shows?q=
2. http://api.tvmaze.com/shows
3. http://api.tvmaze.com/shows/<>

# Some decisions
1. The requirement is to categorically display TV shows. But the API at tvmaze does not provide any such endpoint. Hence, filtering and restructuring of JSON is done at client side
2. Show More link has been added in case number of shows returned per category is more than 4. This link navigates to a new route with list of all shows within chosen category
3. Bootstrap has been used with angular-material to leverage bootstrap's reponsive behaviour for styling along with rich angular material components



