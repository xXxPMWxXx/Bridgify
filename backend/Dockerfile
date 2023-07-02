# from base image node
FROM node:18-buster-slim


RUN mkdir -p /usr/app
WORKDIR /usr/app


# # copying all the files from your file system to container file system
COPY package.json ./

# install all dependencies
# For alpine
# RUN apk add --no-cache \
#     python3==3.10.12 \
#     g++ \
#     build-base \
#     cairo-dev \
#     jpeg-dev \
#     pango-dev \
#     musl-dev \
#     giflib-dev \
#     pixman-dev \
#     pangomm-dev \
#     libjpeg-turbo-dev \
#     freetype-dev 
# For install canvas
RUN apt-get update
RUN apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev python3


# RUN npm install


# # copy oter files as well
COPY . .

#expose the port
EXPOSE 8000

# command to run when intantiate an image
CMD ["npm","start"]