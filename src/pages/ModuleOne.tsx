import { Module } from "./Module";

interface ModuleOneProps {
  onComplete: () => void;
}

export const ModuleOne = ({ onComplete }: ModuleOneProps) => {
  return (
    <Module
      moduleId={1}
      title="What is AI? Understanding Artificial Intelligence"
      content={{
        introduction: "Artificial Intelligence (AI) is technology that allows computers to perform tasks that typically require human intelligence. Think of it as teaching computers to learn, recognize patterns, and make decisions - much like how we learn from experience.",
        keyPoints: [
          "AI learns from examples and data, just like we learn from experience. The more examples it sees, the better it becomes.",
          "AI can recognize patterns in text, images, audio, and video - but it's not perfect and can make mistakes.",
          "AI doesn't 'think' like humans do. It follows patterns it has learned, which means it can be fooled or misled.",
          "Modern AI can create realistic-looking content (text, images, voice) that never actually existed.",
        ],
        example: "When you ask your phone a question and it responds, that's AI. When Netflix recommends a show you might like, that's AI using patterns from what you've watched before. These are helpful uses - but the same technology can also be used to create fake content or scams."
      }}
      quiz={[
        {
          question: "How does AI primarily learn to perform tasks?",
          options: [
            "By copying exactly what humans do",
            "By learning from patterns in examples and data",
            "By following a strict set of programmed rules",
            "By randomly guessing until it gets it right"
          ],
          correctAnswer: 1,
          explanation: "AI learns by studying patterns in large amounts of data or examples. This is similar to how we learn - by seeing many examples and finding patterns in them."
        },
        {
          question: "Which statement about AI is most accurate?",
          options: [
            "AI is always 100% accurate and never makes mistakes",
            "AI can think and reason exactly like a human brain",
            "AI can be fooled because it follows learned patterns",
            "AI cannot create any new content on its own"
          ],
          correctAnswer: 2,
          explanation: "AI follows patterns it has learned from data, which means it can be fooled or make mistakes. This is why it's important to stay critical and verify information, even if it looks convincing."
        },
        {
          question: "What can modern AI create that we should be aware of?",
          options: [
            "Only simple text messages",
            "Realistic-looking text, images, voice, and video that never existed",
            "Nothing that looks real or convincing",
            "Only helpful recommendations"
          ],
          correctAnswer: 1,
          explanation: "Modern AI can create very realistic content across multiple formats - text, images, audio, and video. This capability is powerful but also means we need to be careful about verifying what we see and hear online."
        }
      ]}
      onComplete={onComplete}
    />
  );
};
