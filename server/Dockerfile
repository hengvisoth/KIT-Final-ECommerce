FROM node:16
# Create app directory

WORKDIR /app/user-management
# if no specify it will run in the root of docker image directory so we have to use WORKDIR 

COPY . .

# Run at build time
RUN npm install 

EXPOSE 4000

CMD [ "node","app.js" ]
