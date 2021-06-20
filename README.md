## Getting Started

First you need to have docker install locally

You can check out [guide to install docker](https://docs.docker.com/get-docker/)


To run application for development:

```bash
# Start development server, it will restart the server when there are new changes
docker-compose up --build
```

Connect to development databse:

First create ``` .env ``` at root level and inside ``` .env ``` :
```bash
RDS_PORT=<port>
DATABASE=<database name>
PASSWORD=<password>
USER=<username>
HOST=<host address>

```


To run application for production:

```bash
# To build an image
docker build -t sliver-ape/back-end .

# Start server
docker run -it -p 5000:5000  -v ${pwd}:/app sliver-ape/back-end 
```