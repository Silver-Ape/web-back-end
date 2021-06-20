## Getting Started

First you need to have docker install locally

You can check out [guide to install docker](https://docs.docker.com/get-docker/)

To run application for development:

```bash
# To build an image
docker build -t sliver-ape/back-end .

# Start development server
docker run -it -p 5000:5000  -v ${pwd}:/app sliver-ape/back-end 
```