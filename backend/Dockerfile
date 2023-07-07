# from base image node
FROM node:18-buster-slim

WORKDIR /app

# copy other files as well
COPY . .

RUN rm -rf /app/node_modules

# needed to install canvas
RUN apt-get update
RUN apt-get install -y build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    python3 \
    wget \
    make \
    gcc \ 
    libc6-dev

RUN npm install

# needed to avoid gyp error
RUN npm rebuild @tensorflow/tfjs-node --build-from-source

#expose the port
EXPOSE 8000

# command to run when intantiate an image
CMD ["npm","start"]