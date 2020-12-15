###### Build #####
FROM node:12-slim AS node
LABEL author="Harry Ho"
WORKDIR /
COPY . .
RUN npm install
RUN npm run build -- --prod


###### Build the Delivery #####
FROM nginx:alpine
LABEL author="Harry Ho"
WORKDIR /var/cache/nginx
COPY --from=node /dist /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf


# ########################
# # docker build . -t  vc-prd:2.0
# # docker run --publish 8080:80  --name vc2 vc-prd:2.0


