from rest_framework import serializers
from .models import ImageUpload
from django.contrib.auth.models import User

# class ImageUploadSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ImageUpload
#         fields = ['image']
    
class ImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageUpload
        fields = ['image', 'predicted_label','confidence']
        read_only_fields = ['predicted_label','confidence'] 


class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

