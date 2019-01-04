FROM node:10.15.0 AS build

COPY . /home/app

WORKDIR /home/app

RUN npm i -g @angular/cli && npm i && ng build --prod 

FROM nginx:1.5.8

COPY --from=build /home/app/dist/epokedex /usr/share/nginx/html
COPY ./proxy/default.conf /etc/nginx/conf.d/default.conf

#CMD /bin/bash -c "envsubst < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
CMD /bin/bash -c "exec nginx -g 'daemon off;'"
