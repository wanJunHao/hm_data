from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import HttpResponse

# Create your views here.


@api_view(['POST', "GET"])
def index(request):
    '''
    '''
    if request.method == "POST":
        return render(request, 'alert/index.html', {"test": "my_index"})
    elif request.method == "GET":
        return HttpResponse("Hello World!")
