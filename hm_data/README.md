# hm_data
华美数据平台

step0. download python3 and pip3. maybe you should run this:
sudo apt install python3 python3-pip libmysqlclient-dev

step1. download django. as follows:
sudo pip3 install django djangorestframework mysqlclient django-cors-headers

step2. initialized django's database. as follows:
python3 manage.py migrate

you can start this server as follows:
./start.sh

btw. if there is some wrongs with "port is used". close your other server which on port 8887 or change your django server port.

cx_Oracle pymssql
