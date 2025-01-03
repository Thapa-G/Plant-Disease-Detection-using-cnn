import torch
import numpy as np
from PIL import Image
from torchvision import transforms
import torch.nn as nn
import torch.nn.functional as F

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
        return self.model(x)

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
