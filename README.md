# Vue 2 CRM

> A reusable Vue.js CRM starter project for real-world business based on Vue 2 PWA template with Vuetify. 

The goal of this project is to create a reusable starter project for real-world business. To achieve this target, we need a solution which includes simple authentication process, restful API with token support and simple but elegant UI design. 


#### Features

* This project is built with Vue 2 PWA template by default.
* The UI part is built on the top of Vuetify (v0.12.7).
* It inlcudes Vuex and Axios to manage authentication. (Dummy token)
* The token and user profile is managed by Vue-Persisteddstate.
* The dashboard uses vue-chartjs to create charts on dashboard.
* The starter project has integrated progress bar.  
* To simulate real-world business, this starter project chooses Json-Server as fake Restful API. (You can simple replace it with your own API).
* CRUD functions for Customer, Order and Product



#### Screenshots

![Screenshot1](screenshots/screenshot-1.jpg)

![Screenshot2](screenshots/screenshot-2.jpg)

![Screenshot3](screenshots/screenshot-3.jpg)

![Screenshot4](screenshots/screenshot-4.jpg)

![Screenshot5](screenshots/screenshot-5.jpg)

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
json-server -p 5354 db.json

## You will see the following output. You can test the URLs via browser.
##
## \{^_^}/ hi!                        
##                                    
## Loading db.json                    
## Done                               
##                                    
## Resources                          
## http://localhost:5354/token
## http://localhost:5354/customers
## http://localhost:5354/orders 
## http://localhost:5354/products
## http://localhost:5354/categories        
##                                    
## Home                               
## http://localhost:5354              

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
* [vue-chartjs](https://github.com/apertureless/vue-chartjs)
* [vue-progressbar](https://github.com/hilongjw/vue-progressbar)
* [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)
* [webpack guide](http://vuejs-templates.github.io/webpack/) 
* [vue-loader](http://vuejs.github.io/vue-loader).




#### Alternatives

There are two similar projects respectively built on the Angular and React. If you have interests in those technical stacks. You can find and clone those repositories below.

* [Ng4Crm](https://github.com/harryho/ng4crm.git).
* [React-Crm](https://github.com/harryho/react-crm.git).