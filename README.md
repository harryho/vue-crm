# Vue 2 CRM

> A simple Vue.js CRM project based on Vue 2 PWA template with Vuetify. 

* This starter project is built-in with Vue 2 PWA from scratch.
* The whole UI is built on the Vuetify
* It includes Vuex, Axios as well.
* It uses Json-Server as fake Restful API. (You can simple replace it with your own API)

#### Screenshots

![Screenshot1](screenshots/screenshot-1.JPG)

![Screenshot2](screenshots/screenshot-2.JPG)

![Screenshot3](screenshots/screenshot-3.JPG)

![Screenshot5](screenshots/screenshot-7.JPG)

## Build Setup

``` bash

# Clone project
git clone https://github.com/harryho/vue2crm.git


# prepare Json-Server as fake Restful API

## clone json-server to folder server
cd vue2crm
git clone https://github.com/typicode/json-server.git server
cd server
npm install json-server

## replace db.json and routes.json files
copy /Y ..\db\*.json

## start json-server
json-server db.json

## You will following output. You can test the URLs via browser.
##
## \{^_^}/ hi!                        
##                                    
## Loading db.json                    
## Done                               
##                                    
## Resources                          
## http://localhost:3000/token        
## http://localhost:3000/customers    
## http://localhost:3000/orders       
##                                    
## Home                               
## http://localhost:3000              

# install dependences for Vue 2 CRM
cd ..
npm install

# serve with hot reload at localhost:8080
npm run dev

```

For detailed explanation on how things work, checkout following links

* [vuex](https://vuex.vuejs.org/en/)
* [vuetify](https://vuetifyjs.com/)
* [axios](https://github.com/mzabriskie/axios/)
* [webpack guide](http://vuejs-templates.github.io/webpack/) 
* [vue-loader](http://vuejs.github.io/vue-loader).
