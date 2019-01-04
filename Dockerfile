FROM node:10.15.0 AS build

COPY . /home/app

WORKDIR /home/app

RUN yarn && yarn build:prod 

FROM nginx:1.15.8

COPY --from=build /home/app/dist/epokedex /usr/share/nginx/html
COPY ./proxy/default.conf /etc/nginx/conf.d/default.conf

#CMD /bin/bash -c "envsubst < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
