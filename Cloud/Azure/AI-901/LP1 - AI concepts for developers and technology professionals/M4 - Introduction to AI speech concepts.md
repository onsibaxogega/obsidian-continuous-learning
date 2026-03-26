

# U1: Introduction

Imagine AI apps and agents that you can talk to. Explore the concepts behind AI speech, including speech recognition and synthesis.

## Learning objectives

After completing this module, you'll be able to:

- [ ] Identify different scenarios for AI speech
- [ ] Describe how speech recognition works
- [ ] Describe how speech synthesis works

---


# U2: Speech-enabled solutions

## Overview
- Speech capabilities transform how users interact with AI applications and agents.
- Core components:
  - **Speech recognition (speech-to-text)** — converts spoken words into text.
  - **Speech synthesis (text-to-speech)** — generates natural-sounding audio from text.

### Benefits of integrating speech:
  - Expand accessibility for users with visual or mobility impairments.
  - Increase productivity by enabling hands-free operation.
  - Enhance user experience with natural conversational interactions.
  - Reach global audiences through multilingual and dialect support.

## Common speech recognition scenarios

> **Speech recognition** — converts audio input into written text.

### Customer service and support
- Transcribe customer calls in real time.
- Route callers based on spoken intent.
- Analyze call sentiment and identify common issues.
- Generate searchable call records for compliance and training.
- **Business value:** Reduces manual note-taking, improves accuracy, and captures insights that improve service quality.

### Voice-activated assistants and agents
- Accept voice commands for hands-free control.
- Answer questions using natural language understanding.
- Perform tasks such as reminders, messaging, and search.
- Control smart home, automotive, and wearable devices.
- **Business value:** Increases engagement, simplifies workflows, and supports screenless operation.

### Meeting and interview transcription
- Create searchable meeting notes and action items.
- Provide real-time captions for participants with hearing impairments.
- Summarize interviews, focus groups, and research sessions.
- Extract key discussion points for documentation.
- **Business value:** Saves time, ensures accurate records, and improves accessibility.

### Healthcare documentation
- Dictate patient notes directly into electronic health records.
- Update treatment plans without interrupting care.
- Reduce administrative burden and physician burnout.
- Improve documentation accuracy by capturing details immediately.
- **Business value:** Increases time for patient care and reduces documentation errors.

## Common speech synthesis scenarios

> **Speech synthesis** — converts written text into spoken audio.

### Conversational AI and chatbots
- Respond to users with natural-sounding voices.
- Personalize tone, pace, and speaking style.
- Handle customer inquiries through voice channels.
- Provide consistent brand experiences across voice and text.
- **Business value:** Makes agents more approachable and extends service to voice-only channels.

### Accessibility and content consumption
- Read web content and documents aloud.
- Support users with reading disabilities.
- Enable audio consumption while multitasking.
- Provide audio alternatives for text-heavy interfaces.
- **Business value:** Expands audience reach and improves user satisfaction.

### Notifications and alerts
- Announce alerts, reminders, and status updates.
- Provide navigation instructions.
- Deliver time-sensitive information without requiring screens.
- Communicate system status in industrial environments.
- **Business value:** Ensures critical information is delivered promptly and safely.

### E-learning and training
- Create narrated lessons without recording studios.
- Provide pronunciation examples for language learning.
- Generate audio versions of written materials.
- Scale content across multiple languages.
- **Business value:** Reduces production costs and supports diverse learning styles.

### Entertainment and media
- Generate character voices for games and interactive experiences.
- Produce podcast drafts and audiobook prototypes.
- Create voiceovers for videos and presentations.
- Personalize audio content for users.
- **Business value:** Lowers production costs and enables rapid prototyping.

## Combining speech recognition and synthesis
- Enables fluid, two-way conversational experiences.
- Example scenarios:
  - **Voice-driven customer service:** recognition → processing → synthesized response.
  - **Interactive voice response (IVR) systems:** callers speak needs; system guides with natural dialogue.
  - **Language learning:** students speak phrases; system provides feedback.
  - **Voice-controlled vehicles:** drivers issue commands; system responds audibly.

> These combined capabilities reduce friction and create natural conversational flows.

## Key considerations before implementing speech
- **Audio quality:** background noise, microphone quality, and bandwidth affect accuracy.
- **Language and dialect support:** verify coverage for target audiences.
- **Privacy and compliance:** understand how audio is processed, stored, and protected.
- **Latency expectations:** real-time scenarios require low latency.
- **Accessibility standards:** ensure compliance with WCAG and avoid creating barriers.

> **Important:** Always provide alternative input/output methods for users who prefer or require text-based interfaces.

---



# U3: Speech recognition

## Overview
- **Speech recognition (speech-to-text)** converts spoken language into written text.
- The full pipeline includes six coordinated stages:
  - Audio capture
  - Pre-processing
  - Acoustic modeling
  - Language modeling
  - Decoding
  - Post-processing

## Audio capture: Convert analog audio to digital
- Microphone converts sound waves into a digital signal.
- Typical sampling rate for speech: **16 kHz** (16,000 samples per second).
- Each sample stored as a numeric value representing amplitude.

### Why sampling rate matters
- Higher rates (e.g., 44.1 kHz for music) capture more detail but require more processing.
- Speech recognition balances clarity and efficiency at **8–16 kHz**.
- Accuracy is affected by:
  - Background noise
  - Microphone quality
  - Speaker distance
- Basic noise filters often applied before feature extraction.

## Pre-processing: Extract meaningful features
- Raw audio contains too much information for efficient pattern recognition.
- Pre-processing transforms the waveform into a compact representation emphasizing speech characteristics.

### Mel-Frequency Cepstral Coefficients (MFCCs)
> **MFCCs** — feature extraction technique that models how the human ear perceives sound.

#### How MFCC works
- **Divide audio into frames:** 20–30 ms overlapping windows.
- **Apply Fourier transform:** convert each frame to frequency domain.
- **Map to Mel scale:** emphasize frequencies important to human hearing.
- **Extract coefficients:** typically 13 values summarizing spectral shape.

### Example MFCC vectors
- Each frame produces a 13‑value feature vector:
  - Frame 1: `[ -113.2, 45.3, 12.1, -3.4, 7.8, ... ]`
  - Frame 2: `[ -112.8, 44.7, 11.8, -3.1, 7.5, ... ]`
  - Frame 3: `[ -110.5, 43.9, 11.5, -2.9, 7.3, ... ]`


## Acoustic modeling: Recognize phonemes

> **Phonemes** — smallest units of sound that distinguish words (English has ~44).

- Acoustic models learn relationships between MFCC features and phonemes.
- Modern systems use **transformer architectures**.

### Transformer advantages
- **Attention mechanism:** examines surrounding frames to resolve ambiguity.
- **Parallel processing:** faster and more accurate than recurrent models.
- **Contextualized predictions:** learns common phoneme sequences.

### Output
- Probability distribution over phonemes for each frame.
  - Example (frame 42):
    - /æ/: 80%
    - /ɛ/: 15%
    - Others: 5%

> **Note:** Phonemes are language-specific; English-trained models cannot recognize Mandarin tones without retraining.

## Language modeling: Predict word sequences

- Resolves ambiguities where phonemes map to multiple words.
- Guides transcription using:
  - **Statistical patterns:** common phrases appear more frequently.
  - **Context awareness:** predicts likely next words.
  - **Domain adaptation:** improves accuracy for specialized fields (medical, legal, etc.).

## Decoding: Select the best text hypothesis
- Searches for the transcription that best matches acoustic + language model predictions.
- Must balance:
  - Faithfulness to audio
  - Readability and grammatical correctness

### Beam search decoding
- Maintains a shortlist (“beam”) of top partial hypotheses.
- Expands each hypothesis with likely next words.
- Prunes low-scoring paths.
- Example:
  - Chooses **“Please send the report by Friday”** over alternatives like:
    - “Please sent the report buy Friday”

> **Caution:** Decoding is computationally intensive; real-time systems limit beam width to reduce latency.

## Post-processing: Refine the output
- Cleans and formats raw decoded text.

### Common post-processing tasks
- Capitalization
- Punctuation restoration
- Number formatting
- Profanity filtering
- Inverse text normalization (e.g., “three p m” → “3 PM”)
- Confidence scoring for low-certainty words

- Azure Speech returns:
  - Final transcription
  - Word-level timestamps
  - Confidence scores

## How the pipeline works together

Each stage builds on the previous one:

- **Audio capture** → raw signal  
- **Pre-processing** → MFCC features  
- **Acoustic modeling** → phoneme probabilities  
- **Language modeling** → vocabulary + grammar guidance  
- **Decoding** → best word sequence  
- **Post-processing** → readable final text  

- Each stage contributes to overall accuracy.
- Troubleshooting low accuracy often involves:
  - Improving audio quality
  - Enhancing language model training
  - Adjusting post-processing rules

---



# U4: Speech synthesis

## Overview
- **Speech synthesis (text-to-speech, TTS)** converts written text into spoken audio.
- Common use cases:
  - Virtual assistants reading notifications
  - Navigation apps announcing directions
  - Accessibility tools reading content aloud
- Speech synthesis systems process text through four stages:
  - Text normalization
  - Linguistic analysis
  - Prosody generation
  - Speech synthesis (waveform generation)

## Text normalization: Standardize the text
- Prepares raw text for pronunciation by expanding abbreviations, numbers, and symbols.
- Example:
  - Input: "Dr. Smith ordered 3 items for $25.50 on 12/15/2023."
  - Normalized: "Doctor Smith ordered three items for twenty-five dollars and fifty cents on December fifteenth, two thousand twenty-three."

### Common normalization tasks
- Expand abbreviations (e.g., "Dr." → "Doctor")
- Convert numbers to words (e.g., "3" → "three")
- Handle dates and times (e.g., "12/15/2023" → "December fifteenth, two thousand twenty-three")
- Process symbols (e.g., "$" → "dollars")
- Resolve homographs using context (e.g., "read" present vs. past tense)

> **Tip** — Different domains require specialized normalization rules (medical, financial, legal, etc.).

## Linguistic analysis: Map text to phonemes
- Breaks normalized text into phonemes and determines pronunciation.
- Tasks include:
  - Segmenting text into words and syllables
  - Looking up pronunciations in lexicons
  - Applying G2P rules or neural models for unknown words
  - Marking syllable boundaries and stress
  - Determining phonetic context

### Grapheme-to-phoneme (G2P) conversion
> **G2P** — maps written letters (graphemes) to pronunciation sounds (phonemes).

- English spelling is inconsistent; G2P uses rules + learned patterns.
- Examples:
  - "though" → /θoʊ/
  - "through" → /θruː/
  - "cough" → /kɔːf/
- Modern G2P uses neural networks trained on pronunciation dictionaries.
- Transformer models help resolve context-dependent pronunciations:
  - "I read books" → /riːd/
  - "I read that book yesterday" → /rɛd/

## Prosody generation: Determine pronunciation characteristics
> **Prosody** — rhythm, stress, and intonation patterns that make speech sound natural.

### Elements of prosody
- Pitch contours (rising/falling)
- Duration (length of sounds)
- Intensity (volume variations)
- Pauses (phrase boundaries)
- Stress patterns (emphasized syllables)

### Example of meaning changes through emphasis
- "I never said he ate the cake."
- "I never said he ate the cake."
- "I never said he ate the cake."
- "I never said he ate the cake."

### Transformer-based prosody prediction
- Transformers analyze context across entire sentences.
- Process:
  - **Input encoding:** phoneme sequence + linguistic features
  - **Contextual analysis:** self-attention identifies relationships
  - **Prosody prediction:** pitch, duration, energy per phoneme
  - **Style factors:** speaker identity, emotional tone, speaking style

### Factors influencing prosody
- Syntax (clause boundaries)
- Semantics (important concepts)
- Discourse context (contrast, emphasis)
- Speaker identity (pitch range, rate)
- Emotional tone (excitement, concern, neutrality)

> **Important** — Robotic speech often results from flat prosody, not incorrect phonemes.

## Speech synthesis: Generate audio
- Produces the final waveform using phoneme sequence + prosody targets.

### Waveform generation approaches
- Modern systems use **neural vocoders**:
  - WaveNet
  - WaveGlow
  - HiFi-GAN

### The synthesis process
- **Acoustic feature generation:** transformer-based model converts phonemes + prosody into mel-spectrograms.
- **Vocoding:** neural vocoder converts mel-spectrograms into raw audio waveforms (16,000–48,000 samples/sec).
- **Post-processing:** filtering, normalization, audio effects.

> **Note** — Neural vocoders provide:
> - High fidelity  
> - Naturalness  
> - Real-time performance  
> - Flexibility across speakers and languages  

- Vocoders perform the inverse of speech recognition:
  - ASR: audio → text
  - TTS: linguistic representation → audio

## The complete pipeline in action
- Input: "Dr. Chen's appointment is at 3:00 PM"
- **Text normalization:** "Doctor Chen's appointment is at three o'clock P M"
- **Linguistic analysis:** converts to phonemes  
  `/ˈdɑktər ˈtʃɛnz əˈpɔɪntmənt ɪz æt θri əˈklɑk pi ɛm/`
- **Prosody generation:** predicts pitch rise on "appointment", pause after "is", emphasis on "three"
- **Speech synthesis:** generates audio waveform matching specifications
- Entire process typically completes in under one second.

---
