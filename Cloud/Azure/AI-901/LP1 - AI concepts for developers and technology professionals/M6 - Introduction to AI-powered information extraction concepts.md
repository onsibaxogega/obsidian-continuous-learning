
# U1: Introduction

## Overview
- **AI information extraction** focuses on *pulling structured data fields out of unstructured media* such as documents, images, videos, and audio recordings. 
- While this module emphasizes documents and images, emerging systems increasingly apply speech recognition and other advanced techniques to extract information from additional media types.

## Common scenarios for information extraction
Information extraction supports a wide range of real‑world workflows, from simple consumer apps to large‑scale enterprise automation systems. A typical example is reading contact information from a business card, but the same principles extend to complex financial, legal, healthcare, and logistics documents.

## Financial document processing
- **Invoices**
    - Vendor information: company names, addresses, contact details
    - Transaction details: invoice numbers, dates, payment terms
    - Line items: product descriptions, quantities, unit prices, totals
    - Tax information: rates, amounts, exemptions
- **Receipts**
    - Merchant details: store names, locations, transaction IDs
    - Purchase information: items, prices, discounts
    - Payment details: methods, change amounts, loyalty points
- **Financial statements**
    - Account information: numbers, balances, transaction histories
    - Performance metrics: revenue, expenses, profit margins
    - Compliance data: regulatory fields, audit trail elements

## Legal and compliance documents
- **Contracts**
    - Party information: contracting entities, signatories, witnesses
    - Terms and conditions: effective dates, renewals, termination clauses
    - Financial terms: payment schedules, penalties, insurance requirements
- **Regulatory forms**
    - Tax documents: W‑2s, 1099s, and similar forms
    - Insurance forms: policy numbers, claim amounts, incident details
    - Government forms: application data, certification requirements

## Healthcare documentation
- **Medical records**
    - Patient information: demographics, record numbers, insurance details
    - Clinical data: diagnoses, treatments, medications, vital signs
    - Administrative data: appointments, billing codes, provider information

## Supply chain and logistics
- **Shipping documents**
    - Shipment details: tracking numbers, weights, dimensions
    - Address information: sender, recipient, delivery instructions
    - Customs documentation: commodity codes, values, origin
- **Purchase orders**
    - Vendor information: supplier details, contacts
    - Product specifications: item codes, descriptions, quantities
    - Delivery requirements: schedules, locations, special instructions

## Summary
AI‑driven information extraction forms the backbone of automation systems across finance, law, healthcare, logistics, and many other domains. By converting unstructured content into structured data, these systems streamline workflows, reduce manual effort, and improve accuracy.

---




# U2: Overview of information extraction

## What information extraction involves

Information extraction brings together several AI capabilities to pull structured data out of unstructured content such as scanned documents, PDFs, images, and other media. A complete solution typically includes:

- **Text detection and extraction** using optical character recognition (OCR) to convert visual text into machine‑readable text.
- **Value identification and mapping** to interpret the extracted text and assign it to specific data fields.

## Example: Expense claim processing
A receipt‑processing system might extract fields such as:

![Diagram of a receipt.](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-information-extraction/media/receipt.png)

- Vendor: Fourth Coffee  
- Date: 2024‑08‑15  
- Subtotal: $6.48  
- Tax: $0.49  
- Total Claim: $6.97  

These extracted values can then be passed into downstream workflows for validation, approval, or reimbursement.

## Choosing an approach for information extraction
Selecting the right strategy depends on the characteristics of the documents and the operational requirements of the system.

### Document characteristics
- **Layout consistency**  
    - Standardized forms work well with template‑based extraction.  
    - Highly variable layouts often require machine learning or generative AI models.
- **Volume**  
    - Large‑scale processing benefits from automated, optimized models.
- **Accuracy needs**  
    - High‑stakes workflows may require human‑in‑the‑loop review.

### Infrastructure and operational constraints
- **Security and privacy**  
    - Documents may contain sensitive or regulated data, requiring strong access controls and compliance measures.
- **Processing power**  
    - Deep learning and generative AI models can be computationally intensive.
- **Latency**  
    - Real‑time extraction may limit model complexity.
- **Scalability**  
    - Cloud‑based architectures support fluctuating workloads.
- **Integration**  
    - API compatibility and data format requirements influence design choices.

## Using platform services

Many solutions can be built using existing AI services such as Azure Document Intelligence and Azure Content Understanding. These services reduce development effort while providing:

- High scalability  
- Strong accuracy  
- Built‑in security  
- Streamlined integration  

They serve as a foundation for building robust information extraction workflows across industries.

---



# U3: Optical character recognition (OCR)

## What OCR enables
- **Optical Character Recognition** *converts visual text* from images, scans, PDFs, screenshots, and handwritten notes *into searchable, editable digital text*. 
	- It removes the need for manual transcription and supports automated data extraction across many document types, including invoices, receipts, forms, and captured photos.

## The five stages of the OCR pipeline
OCR systems follow a structured sequence of steps to transform visual content into usable text data.

### 1. Image acquisition and input
- OCR begins when an image containing text enters the system. 
- Common sources include smartphone photos, scanned pages, video frames, and PDF pages rendered as images. 
- Image quality at this stage strongly influences recognition accuracy.

### 2. Preprocessing and image enhancement

Before text detection begins, the following techniques are used to optimize the image for better recognition accuracy:

- **Noise reduction** removes visual artifacts, dust spots, and scanning imperfections that could interfere with text detection. The specific techniques used to perform noise reduction include:
    
    - **Filtering and image processing algorithms**: Gaussian filters, median filters, and morphological operations.
    - **Machine learning models**: Denoising autoencoders and convolutional neural networks (CNNs) trained specifically for document image cleanup.
- **Contrast adjustment** enhances the difference between text and background to make characters more distinct. Again, there are multiple possible approaches:
    
    - **Classical methods**: Histogram equalization, adaptive thresholding, and gamma correction.
    - **Machine learning**: Deep learning models that learn optimal enhancement parameters for different document types.
- **Skew correction** detects and corrects document rotation, ensuring text lines are properly aligned horizontally. Techniques for skew correction include:
    
    - **Mathematical techniques**: Hough transform for line detection, projection profiles, and connected component analysis.
    - **Neural network models**: Regression CNNs that predict rotation angles directly from image features.
- **Resolution optimization** adjusts image resolution to the optimal level for character recognition algorithms. You can optimize image resolution with:
    
    - **Interpolation methods**: Bicubic, bilinear, and Lanczos resampling algorithms.
    - **Super-resolution models**: Generative adversarial networks (GANs) and residual networks that intelligently upscale low-resolution text images.

### 3. Text region detection

The system analyzes the preprocessed image to identify areas that contain text by using the following techniques:

- **Layout analysis** distinguishes between text regions, images, graphics, and white space areas. Techniques for layout analysis include:
    
    - **Traditional approaches**: Connected component analysis, run-length encoding, and projection-based segmentation.
    - **Deep learning models**: Semantic segmentation networks like U-Net, Mask R-CNN, and specialized document layout analysis models (for example, LayoutLM, or PubLayNet-trained models).
- **Text block identification** groups individual characters into words, lines, and paragraphs based on spatial relationships. Common approaches include:
    
    - **Classical methods**: Distance-based clustering, white space analysis, and morphological operations
    - **Neural networks**: Graph neural networks and transformer models that understand spatial document structure
- **Reading order determination** establishes the sequence in which text should be read (left-to-right, top-to-bottom for English). The correct order can be determined by:
    
    - **Rule-based systems**: Geometric algorithms using bounding box coordinates and spatial heuristics.
    - **Machine learning models**: Sequence prediction models and graph-based approaches that learn reading patterns from training data.
- **Region classification** identifies different types of text regions (headers, body text, captions, tables).
    
    - **Feature-based classifiers**: Support vector machines (SVMs) using handcrafted features like font size, position, and formatting
    - **Deep learning models**: Convolutional neural networks and vision transformers trained on labeled document datasets

### 4. Character recognition and classification
This stage identifies individual characters and words.

- **Feature extraction**
    - Traditional: statistical moments, Fourier descriptors, structural features
    - Deep learning: CNNs learning features directly from pixels
- **Pattern matching**
    - Template matching: correlation with stored character templates
    - Statistical classifiers: HMMs, SVMs, k‑NN
    - Neural networks: MLPs, CNNs, LeNet, ResNet, DenseNet, EfficientNet
- **Context analysis**
    - N‑gram models for character sequence prediction
    - Dictionary-based correction using edit distance
    - Neural language models: LSTMs, transformers, BERT variants
    - Attention mechanisms to focus on relevant input regions
- **Confidence scoring**
    - Bayesian uncertainty estimation
    - Softmax probability outputs
    - Ensemble methods combining multiple model predictions

### 5. Output generation and post-processing
The final stage assembles recognized characters into structured text.

- **Text compilation**
    - Rule-based assembly using spatial proximity
    - Sequence models (RNNs, LSTMs)
    - Transformer-based sequence handling
- **Format preservation**
    - Geometric algorithms for layout reconstruction
    - Layout-aware models such as graph neural networks and multimodal transformers
- **Coordinate mapping**
    - Pixel-to-document coordinate transformations
    - Spatial indexing (R‑trees, quad‑trees)
    - Regression models predicting text positions
- **Quality validation**
    - Dictionary checks and domain-specific vocabularies
    - Statistical language models for grammar validation
    - Neural models (GPT, BERT) for error detection and correction
    - Ensemble validation for improved reliability

## Summary
OCR is a multi-stage pipeline that blends classical image processing with modern deep learning. It transforms raw visual text into structured, validated, and contextually accurate digital content. This capability forms the foundation of automated document processing systems across finance, healthcare, logistics, and many other domains.

A natural next step is exploring how OCR integrates with broader information extraction workflows, especially when combined with layout analysis and semantic models.

---



# U4: The field extraction pipeline

## Overview
Field extraction transforms OCR output into structured, meaningful data that can be used in downstream business systems. The process builds on OCR results by detecting fields, mapping them to a schema, normalizing values, and integrating them into operational workflows.

## Stage 1: OCR output ingestion
The pipeline begins with the structured output produced by OCR, which typically includes:
- Raw text content extracted from the document.
- Positional metadata such as bounding boxes, page coordinates, and reading order.
- Confidence scores for each recognized text element.
- Layout information including paragraphs, line breaks, and structural regions.

Field extraction depends heavily on **where** text appears, not just what it says. A number like “12345” could represent an invoice number, a customer ID, or a phone number depending on its position and surrounding context.

## Stage 2: Field detection and candidate identification
This stage identifies potential field values within the OCR output. Multiple approaches can be used individually or in combination.

### Template-based detection
- Uses predefined layouts and anchor keywords.
- Searches for label–value pairs such as “Invoice Number:”, “Date:”, or “Total:”.
- Employs regular expressions and string matching.
- Strengths: high accuracy for known formats, fast, explainable.
- Limitations: requires manual template creation and struggles with layout variations.

### Machine learning-based detection
Models learn to identify fields from examples rather than fixed rules.
- **Supervised learning** with labeled documents.
- **Self-supervised learning** on large corpora to learn layout patterns.
- **Multimodal learning** combining text, visual cues, and positional data.

Advanced architectures include:
- Graph Neural Networks modeling spatial relationships.
- Attention-based models focusing on relevant regions.
- Sequence-to-sequence models converting unstructured text into structured fields.

### Generative AI for schema-based extraction
Modern LLMs enable flexible, schema-driven extraction:
- Prompt-based extraction using a schema definition.
- Few-shot learning with minimal examples.
- Chain-of-thought reasoning for stepwise field identification.

## Stage 3: Field mapping and association
Once candidate values are identified, they must be mapped to specific schema fields.

### Key–value pairing
- **Proximity analysis** using spatial clustering, reading order, and geometric alignment.
- **Linguistic pattern recognition** using NER, part-of-speech tagging, and dependency parsing.

### Table and structured content processing
Documents often contain tables, such as line items in receipts or invoices.

Detection techniques include:
- CNN-based table structure recognition.
- Object detection adapted for table cells.
- Graph-based parsing of table relationships.

Mapping techniques include:
- Row–column association.
- Header detection.
- Hierarchical processing for nested tables and subtotals.

### Confidence scoring and validation
Accuracy is evaluated using:
- OCR confidence scores.
- Pattern-matching confidence.
- Context validation to ensure values make sense.
- Cross-field validation (for example, verifying that line item totals sum correctly).

## Stage 4: Data normalization and standardization
Extracted values are transformed into consistent, validated formats.

### Format standardization
- **Date normalization** through format detection, parsing, and ambiguity resolution.
- **Currency and numeric processing** including symbol handling, decimal normalization, and unit conversion.
- **Text standardization** such as case normalization, encoding cleanup, and abbreviation expansion.

### Data validation and quality assurance
- **Rule-based validation** for formats, ranges, and required fields.
- **Statistical validation** using outlier detection and distribution analysis.
- **Cross-document validation** for consistency across related documents.

## Stage 5: Integration with business processes and systems
The final stage connects extracted data to operational workflows.

### Schema mapping
Extracted fields are transformed to match downstream system requirements:
- Mapping to database schemas.
- Formatting for API payloads.
- Preparing messages for queues or event-driven systems.

Transformations may include:
- Field renaming.
- Data type conversion.
- Conditional logic based on business rules.

### Quality metrics and reporting
Organizations often track:
- Field-level confidence scores.
- Document-level extraction quality.
- Error categories and root causes.

These metrics support continuous improvement of extraction models and workflows.

---
