FROM node:15.4 as build

WORKDIR /neon-react

COPY package*.json /neon-react/
RUN npm install
COPY . /neon-react/
RUN npm run build

FROM nginx

COPY ./nginx/nginx.conf etc/nginx/nginx.conf
COPY --from=build /neon-react/build /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
