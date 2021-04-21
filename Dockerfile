FROM node:13.12.0-alpine as build

# Make api url env var

WORKDIR /cultr_front

ENV PATH /cultr_front/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx

RUN rm -rf /var/www/html/cultr/
COPY --from=build /cultr_front/build/ /var/www/html/cultr/
COPY ./nginx/proxy_params /etc/nginx/proxy_params
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp
EXPOSE 443/tcp
