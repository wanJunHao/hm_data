# Version : 1.0.1
FROM hm_ubuntu:latest
MAINTAINER JunHao <jhw_1324@163.com>

ENV          LANG C.UTF-8

COPY         . /code/

RUN          mkdir /logs

WORKDIR      /code

EXPOSE       8887

ENTRYPOINT   ["./django.sh"]
