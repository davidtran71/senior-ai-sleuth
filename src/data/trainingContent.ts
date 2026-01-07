export interface QuizOption {
  text: string;
  whyWrong?: string; // Feedback shown when this incorrect option is selected
}

export interface TrainingSlide {
  type: 'intro' | 'lesson' | 'quiz' | 'tools' | 'debrief';
  title: string;
  content?: string;
  introduction?: string;
  tips?: string[];
  quiz?: {
    question: string;
    options: (string | QuizOption)[];
    correctAnswer: number | number[];
    explanation: string;
    image?: string;
    audio?: string;
    video?: string;
  };
  tools?: {
    category: string;
    examples: string[];
  }[];
  finalTips?: string[];
}

export const trainingSlides: TrainingSlide[] = [
  // Slide 1: Introduction
  {
    type: 'intro',
    title: 'Greetings, recruit! It\'s training day.',
    content: 'AI has become ubiquitous in daily life, especially online. You basically have to be a Digital Forensics Expert to distinguish between what\'s real and what isn\'t. This interactive training teaches you how to identify AI-generated content and take your power back. By the end, you\'ll know how to pinpoint AI text, images, audio, and videos so you can stay safe online.',
  },

  // Slide 2: What is AI - Part 1
  {
    type: 'lesson',
    title: 'What is AI?',
    introduction: 'AI is fundamentally a statistical process — it does not understand the physical world, the geometry and the physics. So we must look for geometric and physical anomalies to find evidence of manipulation or generation.',
    tips: [
      'AI analyzes patterns in data to make predictions',
      'It can create realistic-looking content without understanding reality',
      'Scammers use AI to create convincing fake content',
      'By learning the signs, you can protect yourself and others'
    ],
  },

  // Slide 3: What is AI - Part 2
  {
    type: 'lesson',
    title: 'The Good and The Bad of AI',
    introduction: 'AI is used for both helpful and harmful purposes.',
    content: 'THE GOOD: Helps doctors diagnose diseases earlier and more accurately | Assists people with disabilities through screen readers and voice control | Translates languages in real-time | Helps find lost pets through image recognition | Makes customer service faster THE BAD: Creates fake emails that mimic your bank | Clones voices of family members to request money | Generates deepfake videos of public figures | Writes convincing romance scam messages | Creates fake product reviews | Produces fraudulent documents',
    tips: [
      'Always verify information from multiple trusted sources',
      'Be cautious of content that creates strong emotional reactions',
      'When in doubt, consult with a trusted family member or friend',
      'Remember: Spotting AI means SLOWING DOWN to look and consider'
    ],
  },

  // Slide 4: Text Content - Lesson
  {
    type: 'lesson',
    title: 'Spotting AI-Generated Text',
    introduction: 'AI text (created by Large Language Models like ChatGPT) has telltale signs you can learn to recognize.',
    tips: [
      'Watch for overly formal or flowery language that doesn\'t sound natural',
      'Look for generic greetings like "Dear valued customer" instead of your name',
      'Be suspicious of urgent deadlines designed to make you act quickly',
      'AI text often feels "too perfect" or artificially polite',
      'Check for repetitive phrasing or the "rule of three" pattern',
      'Look for lack of personal details or lived experience',
      'Be wary of requests for personal information or money transfers'
    ],
  },

  // Slide 5: Text Content - Quiz
  {
    type: 'quiz',
    title: 'Test Your Knowledge: AI Text',
    quiz: {
      question: 'Which email is most likely AI-generated or a scam?',
      options: [
        { text: 'Hi John, it\'s Mom. Can you pick up milk on your way home? Thanks!', whyWrong: 'This message uses a personal name ("John"), references a specific relationship ("Mom"), and makes a simple, casual request. These are all signs of authentic human communication.' },
        'Dear Valued Customer, Your account requires immediate verification within 24 hours to avoid suspension. Click here to verify your personal information and banking details immediately.',
        { text: 'Hey! Just saw your post about the concert. Want to grab coffee before?', whyWrong: 'This message references a specific shared experience (seeing a post about a concert) and makes a casual, personal invitation. Real friends communicate this way.' },
        { text: 'Meeting moved to 3pm tomorrow. See you in the conference room.', whyWrong: 'This is a straightforward workplace communication with specific details (time, location). It doesn\'t contain urgency tactics or requests for personal information.' }
      ],
      correctAnswer: 1,
      explanation: 'The second email shows classic scam signs: generic greeting, urgent deadline, pressure to act quickly, and requests for personal/banking information. Real companies never ask for sensitive information via email.',
    },
  },

  // Slide 6: Image Content - Lesson
  {
    type: 'lesson',
    title: 'Spotting AI-Generated Images',
    introduction: 'AI-generated images often look impressive at first glance, but they have consistent flaws when you look closely.',
    tips: [
      'Hands and fingers: Extra digits, melted hands, or unnatural positions',
      'Teeth and smiles: Too uniform, gummy, or blurred together',
      'Eyes: Asymmetrical irises, inconsistent reflections, or "off" pupils',
      'Background text: Signs, logos, or text appear as gibberish',
      'Lighting: Shadows don\'t match or fall in impossible directions',
      'Symmetry issues: Earrings, glasses, or clothing don\'t match left to right',
      'Overly smooth skin with no pores or realistic texture'
    ],
  },

  // Slide 7: Image Content - Quiz
  {
    type: 'quiz',
    title: 'Test Your Knowledge: AI Images',
    quiz: {
      question: 'Look closely at this AI-generated image. What signs indicate this image is created by AI?',
      options: [
        'The background text on the chalkboard is gibberish or unreadable',
        'The hand holding the cup appears waxy or lacks natural skin texture',
        'The teeth appear unnaturally uniform or fused together',
        'A spoon appears to be floating or defying gravity near the cup',
        { text: 'The subject is wearing mismatched earrings or glasses', whyWrong: 'Look again — the subject is not wearing glasses, and her hair covers her ears, making it impossible to verify earrings. This detail cannot be confirmed in this image.' },
        { text: 'The pupils are non-circular or misshapen', whyWrong: 'In this specific image, the AI actually rendered the eyes and catchlights fairly well. The pupils appear normal and circular.' }
      ],
      correctAnswer: [0, 1, 2, 3],
      explanation: 'This AI-generated image shows multiple telltale signs: the menu reads "tameh onnus" which is nonsensical, the hand lacks natural skin texture with undefined knuckles, the smile is a "monoblock" of white without natural spacing, and a spoon appears to float impossibly near the cup.',
      image: '/ai-image-quiz.jpg',
    },
  },

  // Slide 8: Audio Content - Lesson
  {
    type: 'lesson',
    title: 'Spotting AI-Generated Audio',
    introduction: 'AI can now clone voices convincingly, but there are still telltale signs to listen for.',
    tips: [
      'Listen for unnatural pauses or robotic rhythm in speech',
      'Pay attention to emotional tone - does it match the content?',
      'Notice if the voice sounds too perfect or lacks natural imperfections',
      'Watch for responses that don\'t naturally follow conversation flow',
      'Be alert to voices that sound overly clean with no background noise',
      'Trust your ear when something sounds "off" about the voice',
      'Be suspicious of unexpected calls asking for money or personal information'
    ],
  },

  // Slide 9: Audio Content - Quiz
  {
    type: 'quiz',
    title: 'Test Your Knowledge: AI Audio',
    quiz: {
      question: 'Listen closely to this AI-generated message. What signs indicate this message is created by AI?',
      options: [
        'Emotional tone that doesn\'t match the content being spoken',
        { text: 'The speaker uses natural filler words like "um" and "uh"', whyWrong: 'Listen again — this audio does NOT contain filler words like "um" or "uh." AI-generated speech typically avoids these natural human speech patterns, which is actually a sign it\'s artificial.' },
        'Unnatural pauses or robotic rhythm in the speech pattern',
        'Voice sounds too perfect or lacks natural imperfections',
        { text: 'Voice has natural variations in pitch and breathing sounds', whyWrong: 'Listen carefully — standard text-to-speech does NOT simulate inhaling, breathing sounds, or natural pitch variation. The voice in this clip is unnaturally consistent.' },
        'Background noise is completely absent or unnaturally clean',
      ],
      correctAnswer: [0, 2, 3, 5],
      explanation: 'This AI-generated audio exhibits multiple telltale signs: emotional mismatch (cheerful tone for terrible news), staccato phrasing, perfect diction without hesitation, and complete digital silence with no room tone or background noise.',
      audio: '/ai-voice-security.mp3',
    },
  },

  // Slide 10: Video Content - Lesson
  {
    type: 'lesson',
    title: 'Spotting Deepfake Videos',
    introduction: 'AI-generated videos (deepfakes) are becoming more sophisticated, but they still have detectable flaws.',
    tips: [
      'Watch facial movements closely - do expressions look natural?',
      'Check if lip movements perfectly match the audio',
      'Look for unnatural blinking patterns - too frequent, rare, or irregular',
      'Notice if lighting on the face seems inconsistent or artificial',
      'Watch for sudden quality changes or glitches',
      'Look for hands or objects that warp during movement',
      'Check if the person\'s neck and body match the face properly',
      'Trust your eyes when movements seem unnatural'
    ],
  },

  // Slide 11: Video Content - Quiz
  {
    type: 'quiz',
    title: 'Test Your Knowledge: Deepfake Videos',
    quiz: {
      question: 'Watch this AI-generated video closely. What tell-tale signs indicate this video is a deepfake?',
      options: [
        { text: 'Morphing or extra fingers visible on hands', whyWrong: 'Look again — while morphing fingers are a common AI error, the hands in this video are mostly out of frame or appear relatively normal. This isn\'t a visible issue here.' },
        { text: 'Garbled or distorted text on clothing', whyWrong: 'Look at the clothing — the hoodie is solid blue with no text or logos to distort. There\'s no text present to be garbled.' },
        'Unnatural mouth & lip syncing - lips appear "rubbery" or disconnected from jaw movement',
        'Lack of micro-expressions - face remains stiff without subtle involuntary muscle movements',
        'Static/frozen background - elements are perfectly still without natural camera noise or movement',
        'Inconsistent eye gaze & blinking - irregular patterns or unnatural saccadic movement',
      ],
      correctAnswer: [2, 3, 4, 5],
      explanation: 'This deepfake video reveals several key AI-generated indicators: "rubbery" lip movements, lack of micro-expressions, perfectly frozen background elements, and irregular blinking patterns.',
      video: '/ai-deepfake-quiz.mp4',
    },
  },

  // Slide 12: Detection Tools
  {
    type: 'tools',
    title: 'Additional Tools for Detecting AI Content',
    tools: [
      {
        category: 'For Text',
        examples: [
          'Read carefully and look for the warning signs we discussed',
          'Check sender email addresses carefully for misspellings',
          'Verify urgent requests by contacting the company directly'
        ]
      },
      {
        category: 'For Images',
        examples: [
          'Google Reverse Image Search - upload the image to see where else it appears',
          'Zoom in and examine details like hands, eyes, and background text',
          'Look for watermarks from AI generators in corners'
        ]
      },
      {
        category: 'For Audio',
        examples: [
          'Hang up and call back using a known phone number',
          'Ask questions only the real person would know',
          'Listen for unnatural pauses or robotic patterns'
        ]
      },
      {
        category: 'For Video',
        examples: [
          'Pause and watch frame-by-frame for glitches',
          'Check if credible news sources report the same content',
          'Look for the source - who posted it first?'
        ]
      }
    ],
  },

  // Slide 13: Final Debrief
  {
    type: 'debrief',
    title: 'You\'re Now a Digital Detective!',
    content: 'You\'ve learned how to spot AI-generated text, images, audio, and video. Remember these final tips to stay safe online:',
    tips: [
      '🔍 AI TEXT: Look for generic language, urgency tactics, unusual sender addresses, and requests for personal information',
      '🖼️ AI IMAGES: Check hands, eyes, text, backgrounds, and symmetry for distortions and inconsistencies',
      '🎤 AI AUDIO: Listen for robotic tone, unnatural pauses, lack of emotion, and breathing patterns',
      '🎥 AI VIDEOS: Watch for facial movement mismatches, lighting inconsistencies, lip-sync issues, and unnatural blinking'
    ],
    finalTips: [
      'SLOW DOWN and examine content carefully before believing or sharing',
      'Verify information from multiple trusted sources',
      'When in doubt, ask a trusted family member or friend',
      'Never share personal information or send money based on urgent requests',
      'Trust your instincts - if something feels off, it probably is',
      'Think before you share - you could spread misinformation'
    ],
  },

  // Slide 14: Certificate prompt
  {
    type: 'debrief',
    title: 'Congratulations, Digital Detective!',
    content: 'You\'ve completed your training and are now equipped to spot AI-generated content and protect yourself online. Click below to get your certificate!',
  },
];
