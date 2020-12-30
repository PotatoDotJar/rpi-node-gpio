FROM node:14-alpine

WORKDIR /usr/src/app

# Install python
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

# Install make & gcc
RUN apk add --update make g++

# Copy package jsons
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Run node
CMD ["node", "ledScroll.js"]