#!/bin/bash
python3 /code/hm_data/manage.py makemigrations
python3 /code/hm_data/manage.py migrate
python3 /code/hm_data/manage.py runserver 0:8887
