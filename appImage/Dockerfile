FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app

# Install app dependencies
COPY app/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /usr/src/app/
RUN cp -a /tmp/package.json /usr/src/app/

# Bundle app source
COPY app /usr/src/app

WORKDIR /usr/src/app

EXPOSE 8080

CMD ["npm", "run", "start"]
