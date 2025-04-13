from django.shortcuts import render
from django.http import HttpResponse

def hello_world(request):
    return render(request, 'hello-world.html', {})

def healthz_view(request):
    return HttpResponse("OK", content_type="text/plain")