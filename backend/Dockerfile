# from base image node
FROM node:18

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update || : && apt-get install python3.10 -y
# copying all the files from your file system to container file system
COPY package.json .

# install all dependencies
RUN npm install

# copy oter files as well
COPY ./ .

#expose the port
EXPOSE 8000

# command to run when intantiate an image
CMD ["npm","start"]