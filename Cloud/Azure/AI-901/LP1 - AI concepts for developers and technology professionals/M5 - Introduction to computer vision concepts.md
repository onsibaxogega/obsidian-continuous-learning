
# U1 - Introduction

- **Computer vision** is one of the core areas of artificial intelligence (AI), and focuses on creating solutions that enable AI applications to process visual information.
- Consider these scenarios:
	- An autonomous vehicle needs to detect and respond to traffic and pedestrians.
	- A store uses smart checkouts with cameras to determine the products in a customer's basket.
	- A doorbell camera is used to detect people at your front door.

## Learning objectives

- After completing this module, you will be able to:
	- [ ] Identify different types of computer vision tasks
	- [ ] Describe how filters are used in image analysis
	- [ ] Describe the main features of a convolutional neural network (CNN)
	- [ ] Describe the main features of a vision transformer (ViT)
	- [ ] Describe how generative AI can be used to create images

---





# U2: Computer vision tasks and techniques

## Overview

- **Computer vision** encompasses *tasks and techniques in which AI systems process visual input* from images, videos, or live camera streams.
- It is a long‑established field of AI with techniques that have evolved significantly over time.
- Core goal: extract meaningful information from visual data.

## Image classification
- Predicts a **single text label** representing the main subject of an image.
- Requires a model trained on a large dataset of labeled images.
- Example scenario:
  - A grocery store implements a smart checkout system.
	  - Customers place produce on a scale.
	  - A camera captures the image, and the model identifies items such as *apple*, *orange*, *banana*.
- The model learns visual features that distinguish one class from another.

## Object detection
- Identifies **multiple objects** within a single image.
- Produces:
	-  A label for each detected object.
	- A **bounding box** specifying the object’s location.
- Useful when:
	- Multiple items appear simultaneously (e.g., several produce items on a checkout counter).
- Enables systems to detect and localize each object independently.

## Semantic segmentation
- Provides **pixel‑level classification** of objects.
- Assigns each pixel to the object category it belongs to.
- Produces more precise object boundaries than object detection.
- Useful for:
	- Medical imaging
	- Autonomous driving
	- Robotics
	 - Any scenario requiring detailed spatial understanding

## Contextual image analysis
- Modern multimodal models interpret **contextual relationships** between objects and text.
- Capabilities include:
  - Understanding activities and interactions in an image.
  - Generating descriptive captions.
  - Suggesting relevant tags.
- Example:
  - A model identifies not only an apple, but also that a **person is eating an apple**, capturing both objects and actions.

---





# U3: Images and image processing

## How computers represent images
- Images are stored as **arrays of numeric pixel values**.
- Example: a 7×7 array represents a **7×7 pixel image** (the image’s resolution).
- Pixel values range from:
    - **0** → black
    - **255** → white
    - Values in between → shades of gray
- A single 2D array represents a **grayscale image**.

## Color images and channels
- Most digital images use **three channels**:
    - Red (R)
    - Green (G)
    - Blue (B)
- Each channel is a 2D array of pixel values.
- Stacking the three channels forms a full‑color RGB image.

### Example color representation
- Purple pixel:
    - Red: 150
    - Green: 0
    - Blue: 255
- Yellow pixel:
    - Red: 255
    - Green: 255
    - Blue: 0

## Filters and image processing
- Filters modify pixel values to create visual effects or extract features.
- A filter is defined by one or more **kernels** (small numeric matrices).
- Example 3×3 kernel:

    -1  -1  -1  
    -1   8  -1  
    -1  -1  -1  

### Convolution
- The kernel is **convolved** across the image:
    - Multiply each kernel value by the corresponding pixel.
    - Sum the results to produce a new pixel value.
- This process is repeated for every pixel position.

### Example convolution steps
- Apply kernel to a 3×3 patch:
    - Weighted sum produces a new pixel value (e.g., −255).
- Move kernel one pixel at a time across the image.
- Results form a **new image** representing the filtered output.
### Padding and value adjustment
- Edges require **padding** (often 0) because the kernel extends beyond the image boundary.
- Filtered values may fall outside 0–255 and must be **clamped** or normalized (to fit in range).

![Diagram of a filter.](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-computer-vision/media/filter.gif)


## Effects of convolutional filters
- Filters can produce:
    - Blurring
    - Sharpening
    - Color inversion
    - Noise reduction
    - Embossing
    - Edge Highlighting
    - Many other effects

## Summary
- Images are numeric arrays.
- Color images use multiple channels.
- Filters use convolution to transform images.
- Convolutional filtering is foundational to many computer vision techniques, including modern deep learning models.

---



# U4: Convolutional neural networks

## Overview
- Computer vision often requires extracting **meaningful features** from images, not just applying visual effects.
- Machine learning models must learn to recognize patterns from large volumes of labeled images.
- **Convolutional neural networks (CNNs)** are the most common deep learning architecture for computer vision tasks.

## Purpose of CNNs
- CNNs use **filters** to extract numeric feature maps from images.
- Extracted features are fed into a deep learning model to generate predictions.
- Example use case:
    - Image classification for fruit types (apple, banana, orange).
    - The model predicts the main subject of an image.

## Training CNNs
- Filter kernels begin with **randomly initialized weights**.
- During training:
    - The model’s predictions are compared to known labels.
    - Errors are used to adjust:
        - Filter kernel weights
        - Neural network weights
- Over many iterations, the model learns filters that best extract features relevant to the classification task.

## How a CNN processes an image
- **Input:** Images with known labels (e.g., 0 = apple, 1 = banana, 2 = orange).
- **Convolutional layers:**
    - Apply filters to extract feature maps.
    - Filters start random and learn meaningful patterns during training.
    - Additional layers may perform **pooling** to reduce feature map size and emphasize key features.
- **Flattening:**
    - Feature maps are converted into a one‑dimensional array.
- **Fully connected layers:**
    - The flattened features are passed into a dense neural network.
- **Output layer:**
    - Uses softmax (or similar) to produce class probabilities, such as:
        - `[0.2, 0.5, 0.3]`
- **Loss calculation:**
    - Predictions are compared to true labels.
    - Example:
        - True label for banana (class 1): `[0.0, 1.0, 0.0]`
    - Loss is used to update all weights in the network.

  
![Diagram of a convolutional neural network.](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-computer-vision/media/convolutional-neural-network.png)


## Training process
- Training repeats over multiple **epochs**.
- The model gradually converges on an optimal set of weights.
- After training:
    - Weights are saved.
    - The model can classify new, unlabeled images.

## Additional architectural notes
- Real CNNs include:
    - Multiple convolutional layers
    - Pooling layers
    - Activation functions
    - Normalization layers
- These components refine and constrain feature extraction.
- This unit focuses on the core idea: **filters extract numeric features, which a neural network uses to predict labels**.

---


# U5: Vision transformers and multimodal models

## Evolution beyond CNNs
- Convolutional neural networks (CNNs) have long been the foundation of computer vision.
- CNNs support:
    - Image classification
    - Object detection (via region proposals + CNN feature extraction)
    - Many advanced vision architectures built over decades
- In parallel, natural language processing (NLP) advanced through a different architecture: the **transformer**.

## Transformers for language (semantic modeling)
- Transformers process large volumes of text and encode **tokens** (words or phrases) as **vector embeddings**.
- **Attention** assigns embedding values based on how each token relates to surrounding tokens.
- Embeddings form a multidimensional semantic space:
    - Tokens used in similar contexts have vectors pointing in similar directions.
- Enables sophisticated NLP tasks:
    - Text analysis
    - Translation
    - Language generation
    - Semantic search

> **Note**  
> Transformer encoders typically produce high‑dimensional vectors, capturing complex semantic relationships through linear algebra operations. The conceptual goal is understanding relationships, not the underlying math.

## Vision transformers (ViT)
- Inspired by transformer success in language modeling.
- Instead of text tokens, ViTs operate on **image patches**:
    - The image is divided into fixed‑size patches.
    - Each patch is flattened into a vector.
- Attention mechanisms determine contextual relationships between patches.
- Embeddings encode visual characteristics:
    - Color
    - Shape
    - Texture
    - Contrast
    - Other visual features
- Result: a multidimensional “visual semantic space” where related visual features align directionally.

### Example of contextual relationships
- Features common in a **hat** often appear near features common in a **head**.
- The model does not “understand” hats or heads conceptually.
- It infers relationships based on co‑occurrence patterns in training images.


![Diagram of vision embeddings.](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-computer-vision/media/vision-encoder.png)



## Multimodal models (vision + language)
- Language transformers create a **linguistic semantic space**.
- Vision transformers create a **visual semantic space**.
- When training data includes images paired with text:
    - Encoders from both domains can be combined.
    - **Cross‑modal attention** aligns visual and linguistic embeddings.
    - Produces a unified multimodal representation.

### Capabilities enabled by multimodal alignment
- Predicting detailed descriptions for images not seen during training.
- Associating visual features with relevant language.
- Understanding relationships between objects, actions, and textual concepts.

![Diagram of a multi-modal model that combines language and vision embeddings.](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-computer-vision/media/multi-modal-model.png)


### Example
- Input image: a person in a park wearing a hat and carrying a backpack.
- The multimodal model identifies visual features and retrieves associated language from the shared embedding space.
- Output: “A person in a park with a hat and a backpack.”

---


# U6: Image generation

## Overview
- The same multimodal architecture that enables AI to understand images and produce natural‑language descriptions can also be used in reverse: generating images from text.
- By learning the visual features associated with language, an image synthesis model can create images or videos that match a user’s prompt.

## How diffusion models generate images
- Most modern image‑generation systems use **diffusion**, a technique that creates images through an iterative denoising process.
- The model begins with:
    - A text prompt that identifies relevant visual features.
    - A random field of pixel values (pure noise).
- The model repeatedly removes noise and adds structure, guided by the prompt, until a coherent image emerges.

### Diffusion process summary
- **Start with noise:** A random pixel array.
- **Iterative refinement:** Each step removes noise and adds detail.
- **Prompt alignment:** After each iteration, the model evaluates how well the emerging image matches the prompt.
- **Final output:** A fully formed image representing the described scene.

### Example
- Prompt: “A dog carrying a stick in its mouth.”
- Early iterations: vague shapes and colors.
- Later iterations: clearer outlines, textures, and details.
- Final image: a recognizable dog holding a stick.
  
![Diagram of a series of images of a dog with increasing visual structure.](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-computer-vision/media/diffusion.png)



## Video generation
- Some models extend diffusion to **video**, using the same principles but with additional constraints:
    - **Physical realism:** Objects must behave naturally (e.g., a dog’s feet stay on the ground).
    - **Temporal coherence:** Frames must follow a logical sequence.
    - **Consistent features:** Characters, lighting, and motion must remain stable across frames.

## Summary
- Image generation uses multimodal understanding to map language to visual features.
- Diffusion models iteratively transform noise into structured images aligned with a prompt.
- Video generation adds temporal and physical constraints to maintain realism across frames.

---
