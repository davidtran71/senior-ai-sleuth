import { Module } from "./Module";

interface ModuleTwoProps {
  onComplete: () => void;
}

export const ModuleTwo = ({ onComplete }: ModuleTwoProps) => {
  return (
    <Module
      moduleId={2}
      title="Spotting AI-Generated Text"
      content={{
        introduction: "AI-generated text is everywhere - from helpful chatbots to dangerous scam emails. Learning to recognize the signs of AI-written content is your first line of defense against fraud and misinformation.",
        keyPoints: [
          "AI text often sounds overly formal, generic, or 'too perfect' - lacking the natural quirks of human writing.",
          "Watch for repetitive phrases, unusual word choices, or statements that sound authoritative but lack specific details.",
          "Scam emails often use AI to create urgent-sounding messages with generic greetings like 'Dear Customer' instead of your name.",
          "Real organizations rarely ask for personal information, passwords, or urgent payments via email - these are red flags.",
        ],
        example: "A scam email might say: 'Dear Valued Customer, Your account has been compromised. Click here immediately to verify your identity and restore access.' Notice the generic greeting, urgent language, and request for action. A real bank would call you by name and wouldn't ask you to click suspicious links."
      }}
      quiz={[
        {
          question: "Which greeting in an email is a potential warning sign?",
          options: [
            "Hello Margaret,",
            "Dear John Smith,",
            "Dear Valued Customer,",
            "Hi Robert,"
          ],
          correctAnswer: 2,
          explanation: "Generic greetings like 'Dear Valued Customer' or 'Dear User' are common in scam emails. Legitimate organizations typically address you by your actual name."
        },
        {
          question: "What's a common characteristic of AI-generated scam text?",
          options: [
            "It contains many spelling mistakes",
            "It sounds urgent but vague on specific details",
            "It's always very short and simple",
            "It uses slang and casual language"
          ],
          correctAnswer: 1,
          explanation: "AI-generated scams often create a sense of urgency ('act now!') while being vague about actual details. They pressure you to act quickly without thinking critically."
        },
        {
          question: "Which email request is most likely legitimate?",
          options: [
            "'Click this link immediately to verify your password'",
            "'Your account will be closed unless you respond within 24 hours'",
            "'We've noticed unusual activity. Please call us at the number on your card'",
            "'Send us your account details to confirm your identity'"
          ],
          correctAnswer: 2,
          explanation: "Legitimate organizations will ask you to call them using contact information you already have (like the number on your card), not click suspicious links or provide sensitive information via email."
        }
      ]}
      onComplete={onComplete}
    />
  );
};
