from django.shortcuts import render,HttpResponse
from django.http import HttpResponseNotFound, HttpResponseRedirect
from django.urls import reverse

posts = [
    {
        'id': 1,
        'title': 'My first post',
        'content': 'This is the content of my first post',
        'author': 'John Doe',
        'created_at': '2023-10-01',
    },
    {
        'id': 2,
        'title': 'My second post',
        'content': 'This is the content of my second post',
        'author': 'Jane Doe',
        'created_at': '2023-10-02',
    },
    {
        'id': 3,
        'title': 'My third post',
        'content': 'This is the content of my third post',
        'author': 'John Smith',
        'created_at': '2023-10-03',
    }
]
# Create your views here.
def home(request):
    html = ""
    for post in posts:
        html += f'''
        <div>
        <a href="/posts/{post['id']}/">
            <h2>{post['id']} - {post['title']}</h2>
            <p>Author: {post['author']}</p>
            <p>Created at: {post['created_at']}</p>
            <p>{post['content']}</p>
        </div>
        '''
    return render(request,'posts/home.html',{'posts':posts})

def post(request, id):
    valid_id = False
    for post in posts:
        if post['id'] == id:
            post_dict = post
            valid_id = True
            break
    if valid_id == True:
        return render(request,'posts/post.html',{'post_dict':post_dict})
    else:
        return HttpResponseNotFound('Post not found 😢')
    
def google(request,id):
    return HttpResponseRedirect(f'/post/{id}/')

