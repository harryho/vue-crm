# Vue CRM

> A reusable Vue.js CRM starter project for real-world business based on Vue 2 PWA template with Vuetify.

The goal of this project is to create a reusable starter project for real-world business. To achieve this target, we need a solution which includes simple authentication process, restful API with token support and simple but elegant UI design.


#### Features

* This project is built from Vue 2 PWA template by default.
* The UI part is built on the top of Vuetify.
* It inlcudes Vuex and Axios to manage authentication. (Dummy token)
* The dashboard uses vue-chartjs to create charts on dashboard.
* The project is built on TypeScript.
* Backend API is readonly dummy service.
* ~~The token and user profile is managed by Vue-Persisteddstate.~~
* ~~To simulate real-world business, this starter project chooses Json-Server as fake Restful API. (You can simple replace it with your own API).~~


### Live Demo

[Demo App](https://vue-app-demo.harryho.org):  The demo is just a proof of concept. It doesn't have back-end API and all features of master branch.

#### Screenshots ( The actual UI will be slightly different because I am lazy to keep up to date :p )

![Screenshot1](screenshots/screenshot-1.jpg)

![Screenshot6](screenshots/screenshot-6.jpg)

![Screenshot6](screenshots/screenshot-4.png)

![Screenshot2](screenshots/screenshot-2.png)

![Screenshot3](screenshots/screenshot-3.png)

<!-- ![Screenshot4](screenshots/screenshot-4.jpg)

![Screenshot5](screenshots/screenshot-5.jpg) -->

## Build Setup

``` bash

# Clone project
git clone https://github.com/harryho/vue2crm.git


# install dependences for Vue 2 CRM
cd vue2crm
npm install --from-lock-file

# or use yarn
npm install -g yarn
yarn

# serve with hot reload at localhost:8080
npm run start


## You will see the following output. You can test API with the URLs via browser.
##[1]
##[1] > vue2crm@1.2.0 start <your_path>\vue2crm
##[1] > node build/dev-server.js
##[1] > Starting dev server...
##[1]  DONE  Compiled successfully in xx:xx:xx
##[1]
##[1] > Listening at http://localhost:8080

# Visit the app at [http://localhost:8080](http://localhost:8080)

```

## Docker 


```bash
## Run / Test release without building new image
npm run build

# Launch nginx image to test latest release
docker pull nginx:alpine
docker run -p 8080:80 -v \
    <your_aboslute_path>/dist:/usr/share/nginx/html nginx:alpine


# Build release image
docker build . -t  vc-prd:2.0

# Launch the development image in the backgroud
docker run --rm -d --publish 8080:80  --name vc2 vc-prd:2.0

# Check the log
docker logs vc2   -f

```


For detailed explanation on how things work, checkout following links

* [vuex](https://vuex.vuejs.org/en/)
* [vuetify](https://vuetifyjs.com/)
* [axios](https://github.com/mzabriskie/axios/)
* [vue-chartjs](https://github.com/apertureless/vue-chartjs)
* [vue-progressbar](https://github.com/hilongjw/vue-progressbar)
* ~~[vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)~~
* [webpack guide](http://vuejs-templates.github.io/webpack/)
* [vue-loader](http://vuejs.github.io/vue-loader).


#### Archived

The master branch has been rewriten with TypeScript.The old version built on ES6 has been moved the branch [vuetify-es6](https://github.com/harryho/vue-crm/tree/vuetify-es6). Anyone needs the ES6 version please check it out.

#### Alternatives

There are two similar projects respectively built on the Angular and React. If you have interests in those technical stacks. You can find and clone those repositories below.

* [Ng-MD-App](https://github.com/harryho/ng-md-app.git).
* [React-Crm](https://github.com/harryho/react-crm.git).
* [Ng4Crm](https://github.com/harryho/ng4crm.git). (This is no longer maintained with latest Angular)


#### Change log

* 2 May 2020 - Merge the branch vuetify-ts to master

    After the merge, the whole project moved to new techncial stack - TypeScript. Also, the VuetifyJs is upgraded to 2.x version. 


*  6 Dec 2018 - Create an archived branch json-server

    This branch was the master which used Json-Server as fake API. Considering the hiccup of setting Json-Server up and maintenance, it will be replaced by fake service ( Readonly fake API). You still can find and clone this branch with the name __json-server__, but it is no longer updated. It is an archived branch.


*  27 May 2018 - Rebase demo branch to master

    New master doesn't rely on Json-Server as fake API. It will only have Readonly fake API. It means any new or updated data will be stored to any physical file. All test data will be rolled back after system restart.


