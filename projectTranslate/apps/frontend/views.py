from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
import json
import time
from .serializer import UserSerializer


def correct_typo(text):
    """RUN LLM model to correct typos in the given text."""
    pass

# Home view
def home(request):
    return render(request, 'index.html')

# Register log and correct typos
def register_log(request):
    if request.method == 'POST':
        try:
            # Decode the request body and parse JSON
            body_unicode = request.body.decode('utf-8')
            body_data = json.loads(body_unicode)

            # Add a timestamp
            body_data['timestamp'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

            print("Received text before correction:", body_data.get('user_input'))

            # If text field exists, correct typos
            # if 'user_input' in body_data:
            #     body_data['user_input'] = correct_typo(body_data['user_input'])
            #     print("Corrected text:", body_data['user_input'])
            # else:
            #     return JsonResponse({"error": "No text field provided"}, status=400)

            print("After correction:", body_data)
            # Initialize and validate the serializer
            serializer = UserSerializer(data=body_data)
            if serializer.is_valid():
                serializer.save()
                return HttpResponse("Success", status=200)
            else:
                print(serializer.errors)
                return JsonResponse(serializer.errors, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
