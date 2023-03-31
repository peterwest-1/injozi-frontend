echo What should the version be?
read VERSION

docker build -t peterwest86/injozi-frontend:$VERSION .
docker push peterwest86/injozi-frontend:$VERSION