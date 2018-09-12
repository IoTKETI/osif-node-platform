#!/bin/sh

docker build -f Dockerfile.rpi -t osif/device-platform:rpi .
docker tag osif/device-platform:rpi dev.synctechno.com:5000/osif-device-platform:rpi

docker push dev.synctechno.com:5000/osif-device-platform:rpi
