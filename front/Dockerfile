# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies using npm (lockfile)
COPY package.json ./
COPY package-lock.json ./
# Use npm ci for reproducible installs and to respect package-lock.json
RUN npm ci --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]