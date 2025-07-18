import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. AI suggestions will be disabled.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const generateChatSuggestion = async (
  userMessage: string,
  senderName: string,
  receiverName: string,
  context?: string
): Promise<string> => {
  if (!genAI) {
    // Fallback suggestions when API key is not available
    const fallbackSuggestions = [
      "Great idea! This could be a perfect collaboration opportunity.",
      "I suggest scheduling a video call to discuss project details and timeline.",
      "Consider creating a shared GitHub repository to start collaborating on code.",
      "This project aligns well with both of your skill sets and interests.",
      "Have you considered using agile methodology for this project?",
      "What's your preferred tech stack for this collaboration?"
    ];
    return fallbackSuggestions[Math.floor(Math.random() * fallbackSuggestions.length)];
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You are CollabMate AI, an intelligent assistant helping students and developers collaborate on projects. 

Context:
- ${senderName} just sent a message to ${receiverName}
- Message: "${userMessage}"
- This is a professional collaboration platform for finding teammates and working on projects together
${context ? `- Additional context: ${context}` : ''}

Generate a helpful, encouraging, and actionable suggestion that could help facilitate their collaboration. The suggestion should be:
- Professional and friendly
- Focused on collaboration and project success
- Actionable (suggesting next steps, tools, or approaches)
- Brief (1-2 sentences max)
- Relevant to the message content

Respond only with the suggestion, no additional formatting or explanation.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestion = response.text().trim();

    return suggestion || "Consider discussing your project goals and timeline to ensure successful collaboration.";
  } catch (error) {
    console.error('Error generating Gemini suggestion:', error);
    
    // Fallback to contextual suggestions based on message content
    const message = userMessage.toLowerCase();
    if (message.includes('project') || message.includes('build')) {
      return "Consider creating a project roadmap and defining roles for each team member.";
    } else if (message.includes('meet') || message.includes('call')) {
      return "Great idea! Video calls are excellent for building team rapport and discussing complex topics.";
    } else if (message.includes('code') || message.includes('github')) {
      return "Setting up a shared repository with clear contribution guidelines will help streamline your workflow.";
    } else {
      return "This sounds like a great opportunity for collaboration. What are your next steps?";
    }
  }
};

export const generateProjectSuggestion = async (
  userSkills: string[],
  userInterests?: string[]
): Promise<{
  title: string;
  description: string;
  technologies: string[];
  estimatedTime: string;
  reason: string;
}> => {
  if (!genAI) {
    // Fallback project suggestions
    const fallbackProjects = [
      {
        title: "AI Resume Parser",
        description: "Build a tool that extracts and categorizes information from resumes using NLP",
        technologies: ["Python", "NLP", "Flask"],
        estimatedTime: "2-3 weeks",
        reason: "Suggested based on your technical skills and current market demand"
      },
      {
        title: "Collaborative Task Manager",
        description: "Create a real-time task management app for team collaboration",
        technologies: ["React", "Node.js", "Socket.io"],
        estimatedTime: "3-4 weeks",
        reason: "Perfect for showcasing full-stack development skills"
      }
    ];
    return fallbackProjects[Math.floor(Math.random() * fallbackProjects.length)];
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
Generate a project suggestion for a developer/student with these skills: ${userSkills.join(', ')}
${userInterests ? `Interests: ${userInterests.join(', ')}` : ''}

Create a project that:
- Utilizes their existing skills
- Is achievable in 2-6 weeks
- Would be impressive for a portfolio
- Encourages collaboration with others
- Addresses a real-world problem

Respond in this exact JSON format:
{
  "title": "Project Name",
  "description": "Brief description of what the project does",
  "technologies": ["tech1", "tech2", "tech3"],
  "estimatedTime": "X-Y weeks",
  "reason": "Why this project is suggested for this person"
}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    try {
      const suggestion = JSON.parse(text);
      return suggestion;
    } catch (parseError) {
      console.error('Error parsing Gemini project suggestion:', parseError);
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error generating project suggestion:', error);
    
    // Fallback based on skills
    const hasWebSkills = userSkills.some(skill => 
      ['react', 'javascript', 'html', 'css', 'node.js'].includes(skill.toLowerCase())
    );
    
    if (hasWebSkills) {
      return {
        title: "Social Learning Platform",
        description: "Build a platform where students can share knowledge and collaborate on projects",
        technologies: ["React", "Node.js", "MongoDB"],
        estimatedTime: "4-5 weeks",
        reason: "Leverages your web development skills and addresses educational collaboration"
      };
    } else {
      return {
        title: "Skill Matching Algorithm",
        description: "Create an algorithm that matches people based on complementary skills",
        technologies: ["Python", "Machine Learning", "APIs"],
        estimatedTime: "3-4 weeks",
        reason: "Great for showcasing algorithmic thinking and problem-solving skills"
      };
    }
  }
};