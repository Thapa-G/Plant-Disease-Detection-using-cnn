from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User

class UserLoginTestCase(TestCase):
    def setUp(self):
        """
        Set up the testing environment. Create a user for testing login.
        """
        self.client = APIClient()
        self.username = "testuser"
        self.password = "testpassword123"
        self.user = User.objects.create_user(username=self.username, password=self.password)
        self.login_url = "/app/login/"  # Replace with the actual endpoint for the login view.

    def test_login_successful(self):
        """
        Test successful login with valid credentials.
        """
        response = self.client.post(self.login_url, {
            "username": self.username,
            "password": self.password
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("message", response.data)
        self.assertEqual(response.data["message"], "Login successful")
        self.assertTrue(self.client.cookies.get('sessionid'))