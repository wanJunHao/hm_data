docker rmi  `docker images | awk '$1=="<none>" || NR==0 {printf "%-1s ",$3}'`

 docker-compose stop;
 docker-compose rm -f;
