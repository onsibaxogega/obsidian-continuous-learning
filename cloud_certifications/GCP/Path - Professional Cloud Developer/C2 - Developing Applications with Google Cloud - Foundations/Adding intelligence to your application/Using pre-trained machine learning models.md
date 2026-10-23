
# Pre-Trained ML APIs


## 1. Core Concept

- **Definition:** Google Cloud offers `pre-trained machine learning models` exposed as simple REST APIs — you can add intelligence to your application with just a few lines of code and `no ML knowledge required`
- you invoke the REST API with a JSON request and receive a JSON response containing the results
- think of these as `ML-as-a-Service` — Google has already trained the models, you just call the endpoint


---


## 2. Available Pre-Trained APIs

| API                       | What It Does                                                                                                                                                                         |
| :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vision AI**             | complex image detection — labels, OCR, landmark/logo/face detection, explicit content detection, emotional expression analysis                                                       |
| **Speech-to-Text**        | converts audio to text; supports `110 languages and variants`; use cases include dictation, voice commands, audio file transcription                                                 |
| **Text-to-Speech**        | converts text to audio                                                                                                                                                               |
| **Translation AI**        | translates an arbitrary string into any supported language; `highly responsive` — suitable for fast, dynamic translation in websites and apps                                        |
| **Natural Language AI**   | extracts entities from text (documents, articles, blog posts); understands `sentiment` (e.g., product sentiment on social media) and `intent` (e.g., parsing customer conversations) |
| **Video Intelligence AI** | searches video files to extract and label entities at the `shot, frame, or video level`; annotates videos stored in Cloud Storage; identifies key entities and when they occur       |
| **Document AI**           | transforms `unstructured data from documents` into structured data — easier to understand, analyze, and consume                                                                      |


---


## 3. Custom Model Training

- **AutoML (Gemini platform):** enables users with `limited ML expertise` to train high-quality models specific to their business needs — train on images, tabular data, or videos `without writing any code`
- **custom frameworks:** use your own data to build and train custom ML models using frameworks like `TensorFlow` and `PyTorch`

- `NOTE:` AutoML and custom training are for when the pre-trained APIs don't cover your specific use case — the pre-trained APIs should be your first choice for common tasks


---


## 4. Vision API Examples

- **labels/categorization:** categorize objects under labels
- **OCR:** optical character recognition on images
- **landmark detection:** correctly distinguishes between similar landmarks, e.g., identifies the `Sphinx in Las Vegas` vs the Sphinx in Egypt based on visual context
- **face analysis:** analyzes faces and returns information about `emotions and headwear` — e.g., accurately returns emotional expressions on faces in a wedding picture
- **logo detection:** identifies logos within images
- **explicit content detection:** flags inappropriate content

### REST API Usage Pattern

```python
# example: invoking the Vision API via REST
# send a JSON request with the image URI, receive a JSON response with image attributes

import requests

# the image is stored in Cloud Storage
request_body = {
    "requests": [
        {
            "image": {
                "source": {
                    "imageUri": "gs://acme-prod-123-images/sample.jpg"
                }
            },
            "features": [
                {"type": "LABEL_DETECTION"},
                {"type": "FACE_DETECTION"},
                {"type": "LANDMARK_DETECTION"}
            ]
        }
    ]
}

# invoke the REST API — response contains attributes describing the image
response = requests.post(
    "https://vision.googleapis.com/v1/images:annotate",
    json=request_body,
    headers={"Authorization": "Bearer <access_token>"}
)

# response is JSON with labels, face emotions, landmarks, etc.
annotations = response.json()
```

- `NOTE:` in practice, use the `google-cloud-vision` Python client library instead of raw REST calls — it handles authentication via ADC automatically


---


## 5. Real-World Example: Conference Room Occupancy Detection

Google's own conference room systems use ML for occupancy detection:

- the VC camera performs `motion detection` every 30 seconds
- the system sends a `Pub/Sub notification` indicating whether motion was detected or not
- it also sends a Pub/Sub notification when a `call starts or ends`
- if motion is detected between `6 and 8 minutes after the meeting start time`, the room counts as occupied
- otherwise, the room is marked as empty and available for someone else to reserve

- `NOTE:` this is a good example of combining simple ML (motion detection) with event-driven architecture (Pub/Sub) to solve a practical problem


---


## 6. Tips & Tricks

- when prototyping, start with the pre-trained APIs and only move to AutoML or custom training if the pre-trained models don't meet your accuracy requirements
- the Vision API and Document AI both work directly with `Cloud Storage URIs` — no need to download files to your application before processing
- for the PCD exam, remember the distinction: pre-trained APIs = `no training needed`, AutoML = `custom training without code`, TensorFlow/PyTorch = `custom training with code`
