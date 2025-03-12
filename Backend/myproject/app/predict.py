# import torch
# import numpy as np
# from PIL import Image
# from torchvision import transforms
# import torch.nn as nn
# import torch.nn.functional as F

# class DiseaseCNN(nn.Module):
#     def __init__(self):
#         super(DiseaseCNN, self).__init__()
#         self.model = nn.Sequential(
#             nn.Conv2d(1, 32, kernel_size=2, stride=1, padding=1),
#             nn.BatchNorm2d(32),
#             nn.ReLU(),
#             nn.MaxPool2d(kernel_size=2, stride=2),
#             nn.Conv2d(32, 64, kernel_size=2, stride=1, padding=1),
#             nn.BatchNorm2d(64),
#             nn.ReLU(),
#             nn.MaxPool2d(kernel_size=2, stride=2),
#             nn.Conv2d(64, 128, kernel_size=2, stride=1, padding=1),
#             nn.BatchNorm2d(128),
#             nn.ReLU(),
#             nn.MaxPool2d(kernel_size=2, stride=2),
#             nn.Flatten(),
#             nn.Linear(128 * 16 * 16, 512),
#             nn.Dropout(0.1),
#             nn.ReLU(),
#             nn.Linear(512, 11)
#         )
    
#     def forward(self, x):
#         return self.model(x)

# label_dict = {
#     0: "Bacterial spot",
#     1: "Early blight",
#     2: "Late blight",
#     3: "Leaf Mold",
#     4: "Septoria leaf spot",
#     5: "Spider Mites",
#     6: "Target Spot",
#     7: "Tomato Yellow Leaf Curl Virus",
#     8: "Tomato mosaic virus",
#     9: "No Disease",
#     10: "Powdery mildew",
# }

# def preprocess_image(image_path, image_size=(128, 128)):
#     image = Image.open(image_path).convert('L')  # Grayscale
#     image = image.resize(image_size)
#     image = np.array(image, dtype=np.float32) / 255.0
#     image = torch.tensor(image).unsqueeze(0).unsqueeze(0)
#     return image.to(torch.device('cpu'))

# def predict_image(model, image_path, image_size=(128, 128)):
#     processed_image = preprocess_image(image_path, image_size)
#     model.eval()
#     with torch.no_grad():
#         output = model(processed_image)
#         probabilities = F.softmax(output, dim=1)
#         confidence, predicted_class = torch.max(probabilities, 1)
#     predicted_label = label_dict[predicted_class.item()]
#     return predicted_label, confidence.item()

import torch
import numpy as np
from PIL import Image
import torch.nn as nn
import torch.nn.functional as F
import os

save_dir = os.path.join('media', 'image_outputs')  # Save in Django's media folder
os.makedirs(save_dir, exist_ok=True)


class DiseaseCNN(nn.Module):
    def __init__(self):
        super(DiseaseCNN, self).__init__()
        self.model = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=2, stride=1, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Conv2d(32, 64, kernel_size=2, stride=1, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Conv2d(64, 128, kernel_size=2, stride=1, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Flatten(),
            nn.Linear(128 * 16 * 16, 512),
            nn.Dropout(0.1),
            nn.ReLU(),
            nn.Linear(512, 11)
        )
    
    def forward(self, x):
        # Extract outputs after each convolutional layer
        x = self.model[0](x)  # Conv1
        self.save_combined_conv_output(x, 'conv1_output.png')  # Save after first conv layer
        
        x = self.model[1](x)  # BatchNorm1
        self.save_combined_batchnorm_output(x, 'batchnorm1_output.png')  # Save after first batchnorm layer
        x = self.model[2](x)  # ReLU1
        x = self.model[3](x)  # MaxPool1
        
        x = self.model[4](x)  # Conv2
        self.save_combined_conv_output(x, 'conv2_output.png')  # Save after second conv layer
        
        x = self.model[5](x)  # BatchNorm2
        self.save_combined_batchnorm_output(x, 'batchnorm2_output.png')  # Save after second batchnorm layer
        x = self.model[6](x)  # ReLU2
        x = self.model[7](x)  # MaxPool2
        
        x = self.model[8](x)  # Conv3
        self.save_combined_conv_output(x, 'conv3_output.png')  # Save after third conv layer
        
        x = self.model[9](x)  # BatchNorm3
        self.save_combined_batchnorm_output(x, 'batchnorm3_output.png')  # Save after third batchnorm layer
        x = self.model[10](x)  # ReLU3
        x = self.model[11](x)  # MaxPool3
        
        x = self.model[12](x)  # Flatten
        x = self.model[13](x)  # Linear1
        x = self.model[14](x)  # Dropout
        x = self.model[15](x)  # ReLU4
        x = self.model[16](x)  # Linear2
        
        return x

    def save_combined_conv_output(self, conv_output, filename):
        # Convert tensor to numpy
        conv_output = conv_output.squeeze().cpu().detach().numpy()

        # Normalize the feature map to the range [0, 1]
        conv_output = (conv_output - conv_output.min()) / (conv_output.max() - conv_output.min())

        # Scale the feature map to the range [0, 255]
        conv_output = np.uint8(conv_output * 255)

        # Create the directory if it doesn't exist
        os.makedirs(save_dir, exist_ok=True)

        # Convert the feature map to a PIL image and save it
        img = Image.fromarray(conv_output[0], mode='L')
        img.save(os.path.join(save_dir, filename))
    def save_combined_batchnorm_output(self, batchnorm_output, filename):
        # Convert tensor to numpy
        batchnorm_output = batchnorm_output.squeeze().cpu().detach().numpy()

        # Normalize the feature map to the range [0, 1]
        batchnorm_output = (batchnorm_output - batchnorm_output.min()) / (batchnorm_output.max() - batchnorm_output.min())

        # Scale the feature map to the range [0, 255]
        batchnorm_output = np.uint8(batchnorm_output * 255)

        # Create the directory if it doesn't exist
        os.makedirs(save_dir, exist_ok=True)

        # Convert the feature map to a PIL image and save it
        img = Image.fromarray(batchnorm_output[0], mode='L')
        img.save(os.path.join(save_dir, filename))


label_dict = {
    0: "Bacterial spot",
    1: "Early blight",
    2: "Late blight",
    3: "Leaf Mold",
    4: "Septoria leaf spot",
    5: "Spider Mites",
    6: "Target Spot",
    7: "Tomato Yellow Leaf Curl Virus",
    8: "Tomato mosaic virus",
    9: "No Disease",
    10: "Powdery mildew",
}

def preprocess_image(image_path, image_size=(128, 128)):
    image = Image.open(image_path).convert('L')  # Grayscale
    image = image.resize(image_size)
    image.save(os.path.join(save_dir, 'preprocessed_image.png'))
    image = np.array(image, dtype=np.float32) / 255.0
    image = torch.tensor(image).unsqueeze(0).unsqueeze(0)
    return image.to(torch.device('cpu'))

def predict_image(model, image_path, image_size=(128, 128)):
    processed_image = preprocess_image(image_path, image_size)
    
    model.eval()
    with torch.no_grad():
        output = model(processed_image)
        probabilities = F.softmax(output, dim=1)
        confidence, predicted_class = torch.max(probabilities, 1)
    predicted_label = label_dict[predicted_class.item()]
    return predicted_label, confidence.item()

# Example usage:
# model = DiseaseCNN()
# label, confidence = predict_image(model, 'path_to_image.jpg')
# print(f"Predicted label: {label} with confidence: {confidence}")

