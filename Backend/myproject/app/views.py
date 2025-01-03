from django.shortcuts import render

#Create your views here.
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import ImageUpload
from .serializers import ImageUploadSerializer,RegisterUserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie

from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.conf import settings
import os
import torch
from .predict import predict_image, DiseaseCNN  # Assuming prediction logic in a separate file

# Load the model once globally
device = torch.device('cpu')
model = DiseaseCNN()
model.load_state_dict(torch.load(
    r"C:/Users/AASHIK/Desktop/project model handeling/1/augumented_3000_dictionary.pth",
    map_location=device
))
model.to(device)

# @api_view(['POST'])
# def ImageUploadView(request):
#     user = request.user
#     serializer = ImageUploadSerializer(data=request.data)
#     if serializer.is_valid():
#         instance = serializer.save(user=request.user)
#         image_path = os.path.join(settings.MEDIA_ROOT, instance.image.name)
        
#         # Run prediction
#         predicted_label = predict_image(model, image_path)
#         instance.predicted_label = predicted_label
#         instance.save()
        
#         response_data = serializer.data
#         response_data['predicted_label'] = predicted_label
        
#         return Response(response_data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





@api_view(['POST'])
def ImageUploadView(request):
    user = request.user
    serializer = ImageUploadSerializer(data=request.data)
    if serializer.is_valid():
        instance = serializer.save(user=request.user)
        image_path = os.path.join(settings.MEDIA_ROOT, instance.image.name)
        
        # Run prediction
        predicted_label, confidence = predict_image(model, image_path)
        instance.predicted_label = predicted_label
        instance.confidence = confidence  # Assuming you added a confidence field
        instance.save()
        
        response_data = serializer.data
        response_data['predicted_label'] = predicted_label
        response_data['confidence'] = confidence
        
        return Response(response_data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# @api_view(['POST'])
# def ImageUploadView(request):
#     user = request.user
#     serializer = ImageUploadSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save(user=request.user)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def UserRegister(request):
      
      serializer=RegisterUserSerializer(data=request.data)
      if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def UserLogin(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        session_id = request.session.session_key
        print(session_id)
        return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)



    
@api_view(['POST'])
def custom_logout_view(request):
    
    logout(request)
    return Response({'message': 'User logged out successfully'}, status=status.HTTP_200_OK)

@api_view(['GET'])
@ensure_csrf_cookie
def csrf_token_view(request):
    #csrf_token = get_token(request)
    csrf_token = request.COOKIES.get('csrftoken')  
    # print(csrf_token)
    return JsonResponse({'csrfToken': csrf_token})



def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({"message": "Logout successful."}, status=200)
    return JsonResponse({"error": "Invalid request method."}, status=400)



@api_view(['GET'])
def get_session_id(request):
    if request.method == 'GET':
        # Check if the user is authenticated
        if request.user.is_authenticated:
            # Get the session key
            session_key = request.session.session_key
            return JsonResponse({"sessionid": session_key}, status=200)
        else:
            return JsonResponse({"error": "User is not authenticated."}, status=401)

    return JsonResponse({"error": "Invalid request method."}, status=400)






@api_view(['GET'])
def UserImagesView(request):
        user_images = ImageUpload.objects.filter(user=request.user)
        serializer = ImageUploadSerializer(user_images, many=True)
        return Response(serializer.data)