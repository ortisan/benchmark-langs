FROM public.ecr.aws/lambda/nodejs:latest
COPY index.js package*.json ./
RUN npm install
CMD [ "index.handler" ]