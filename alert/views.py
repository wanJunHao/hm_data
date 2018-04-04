from django.shortcuts import render

# Create your views here.


def index(request):
    '''
    '''
    return render(request, 'alert/index.html', {"test": "my_index"})
