from django.urls import path

from . import views
urlpatterns = [
     path('upload/', views.ImageUploadView, name='image-upload'),
     path('register/',views.UserRegister,name='register-user'),
     path('login/',views.UserLogin,name='login-user'),
     path('logout/',views.logout_view, name='logout'),
     path('cssrf/', views.csrf_token_view, name='csrf_token'),
     path('session-id/',views.get_session_id, name='get_session_id'),
     path('mylist/', views.UserImagesView, name='user-images'),
     path('get-images/',views.get_processing_images, name='gget_processing_images'),
     path('get_matr/',views.get_metrics,name="get_metrices"),
     
]