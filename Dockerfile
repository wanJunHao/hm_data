# Version : 1.0.1
FROM hm_ubuntu:1.02.1
MAINTAINER JunHao <jhw_1324@163.com>

ADD . /code
WORKDIR /code

EXPOSE 8887

ENTRYPOINT ["./django.sh"]
