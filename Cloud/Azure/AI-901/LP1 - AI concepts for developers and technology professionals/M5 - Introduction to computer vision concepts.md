
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
