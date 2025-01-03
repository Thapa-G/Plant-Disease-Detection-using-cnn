from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.test import TestCase

class RegisterAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('register-user')  # Use the name of the URL pattern

    def test_valid_registration(self):
        payload = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "securepassword123"
        }
        response = self.client.post(self.register_url, payload, format='json')
        
        # Print the response data for debugging
        print(response.data)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'User created successfully')

        # Output success message after passing the test
        print("Test passed:  registered successfully!")
