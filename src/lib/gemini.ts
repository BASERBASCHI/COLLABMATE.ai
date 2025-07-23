import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const generateChatSuggestion = async (
  userMessage: string,
  senderName: string,
  receiverName: string,
  context?: string
): Promise<string> => {
  if (!genAI) {
    // Enhanced fallback suggestions when API key is not available
    const contextualSuggestions = [
      "Great idea! This could be a perfect collaboration opportunity. Let's discuss the technical requirements and timeline.",
      "I suggest scheduling a video call to discuss project details, roles, and deliverables in depth.",
      "Consider creating a shared GitHub repository with clear contribution guidelines to streamline your workflow.",
      "This project aligns well with both of your skill sets. Have you thought about the MVP features?",
      "Have you considered using agile methodology with weekly sprints for this project?",
      "What's your preferred tech stack? I'd recommend discussing architecture decisions early.",
      "This sounds exciting! Consider setting up a project roadmap with clear milestones and deadlines.",
      "Great collaboration potential! Make sure to define roles clearly - who handles frontend vs backend?",
      "I recommend using tools like Figma for design collaboration and Notion for project management.",
      "Consider doing a technical feasibility study before diving into development."
    ];
    return contextualSuggestions[Math.floor(Math.random() * contextualSuggestions.length)];
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

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
- Include specific technical or project management advice when appropriate

Respond only with the suggestion, no additional formatting or explanation.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestion = response.text().trim();

    return suggestion || "Consider discussing your project goals and timeline to ensure successful collaboration.";
  } catch (error) {
    console.error('Error generating Gemini suggestion:', error);
    
    // Enhanced contextual fallbacks based on message content
    const message = userMessage.toLowerCase();
    if (message.includes('project') || message.includes('build')) {
      return "Consider creating a detailed project roadmap with clear milestones, technology choices, and role definitions for each team member.";
    } else if (message.includes('meet') || message.includes('call')) {
      return "Great idea! Video calls are excellent for building team rapport. I suggest preparing an agenda with technical discussions and timeline planning.";
    } else if (message.includes('code') || message.includes('github')) {
      return "Setting up a shared repository with clear branching strategy, code review process, and contribution guidelines will help streamline your development workflow.";
    } else if (message.includes('design') || message.includes('ui')) {
      return "Consider using collaborative design tools like Figma and establishing a design system early to maintain consistency across your project.";
    } else {
      return "This sounds like a great opportunity for collaboration. What are your next steps for moving this project forward?";
    }
  }
};

export const generateProjectSuggestion = async (
  userSkills: string[],
  userInterests?: string[],
  userExperience?: string
): Promise<{
  title: string;
  description: string;
  technologies: string[];
  estimatedTime: string;
  reason: string;
  teamSize: number;
  difficulty: string;
  marketDemand: string;
}> => {
  if (!genAI) {
    // Enhanced fallback project suggestions based on skills
    const fallbackProjects = [
      {
        title: "AI-Powered Resume Analyzer",
        description: "Build an intelligent tool that analyzes resumes, extracts key information, and provides improvement suggestions using NLP and machine learning.",
        technologies: ["Python", "NLP", "Flask", "React", "PostgreSQL"],
        estimatedTime: "3-4 weeks",
        reason: "Perfect for showcasing AI/ML skills with practical business application",
        teamSize: 3,
        difficulty: "Intermediate",
        marketDemand: "High - HR tech is booming"
      },
      {
        title: "Real-Time Collaborative Code Editor",
        description: "Create a web-based code editor with real-time collaboration, syntax highlighting, and integrated chat for pair programming sessions.",
        technologies: ["React", "Node.js", "Socket.io", "Monaco Editor", "Redis"],
        estimatedTime: "4-5 weeks",
        reason: "Excellent for demonstrating full-stack skills and real-time technologies",
        teamSize: 4,
        difficulty: "Advanced",
        marketDemand: "Medium - Developer tools market"
      },
      {
        title: "Smart Expense Tracker with AI Insights",
        description: "Build a mobile-first expense tracking app that uses AI to categorize expenses, predict spending patterns, and provide financial insights.",
        technologies: ["React Native", "Node.js", "MongoDB", "TensorFlow.js"],
        estimatedTime: "3-4 weeks",
        reason: "Great for mobile development and AI integration skills",
        teamSize: 3,
        difficulty: "Intermediate",
        marketDemand: "High - FinTech is growing rapidly"
      }
    ];
    
    // Select based on user skills
    const hasWebSkills = userSkills.some(skill => 
      ['react', 'javascript', 'html', 'css', 'node.js', 'vue', 'angular'].includes(skill.toLowerCase())
    );
    const hasAISkills = userSkills.some(skill => 
      ['python', 'machine learning', 'ai', 'tensorflow', 'pytorch', 'nlp'].includes(skill.toLowerCase())
    );
    const hasMobileSkills = userSkills.some(skill => 
      ['react native', 'flutter', 'swift', 'kotlin', 'mobile'].includes(skill.toLowerCase())
    );
    
    if (hasAISkills) return fallbackProjects[0];
    if (hasWebSkills) return fallbackProjects[1];
    if (hasMobileSkills) return fallbackProjects[2];
    return fallbackProjects[0];
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `
Generate a personalized project suggestion for a developer/student with these details:
- Skills: ${userSkills.join(', ')}
- Interests: ${userInterests ? userInterests.join(', ') : 'General software development'}
- Experience Level: ${userExperience || 'Intermediate'}

Create a project that:
- Utilizes their existing skills while introducing 1-2 new technologies
- Is achievable in 2-6 weeks with a team
- Would be impressive for a portfolio and job interviews
- Addresses a real-world problem with market demand
- Encourages collaboration with complementary skills
- Has clear technical challenges and learning opportunities

Respond in this exact JSON format:
{
  "title": "Specific Project Name",
  "description": "Detailed description of what the project does and its value proposition",
  "technologies": ["tech1", "tech2", "tech3", "tech4", "tech5"],
  "estimatedTime": "X-Y weeks",
  "reason": "Why this project is perfect for this person's skill level and goals",
  "teamSize": 3,
  "difficulty": "Beginner/Intermediate/Advanced",
  "marketDemand": "Brief explanation of market opportunity"
}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    try {
      // Clean the response to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const suggestion = JSON.parse(jsonMatch[0]);
        return suggestion;
      }
      throw new Error('No valid JSON found');
    } catch (parseError) {
      console.error('Error parsing Gemini project suggestion:', parseError);
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error generating project suggestion:', error);
    
    // Enhanced fallback based on user profile
    const hasWebSkills = userSkills.some(skill => 
      ['react', 'javascript', 'html', 'css', 'node.js'].includes(skill.toLowerCase())
    );
    
    if (hasWebSkills) {
      return {
        title: "Social Learning Platform",
        description: "Build a comprehensive platform where students can share knowledge, collaborate on projects, find study partners, and track learning progress with gamification elements.",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "JWT"],
        estimatedTime: "4-5 weeks",
        reason: "Leverages your web development skills while addressing the growing need for collaborative learning platforms",
        teamSize: 4,
        difficulty: "Intermediate",
        marketDemand: "High - EdTech market is expanding rapidly"
      };
    } else {
      return {
        title: "Intelligent Skill Matching Algorithm",
        description: "Create an advanced algorithm that matches people based on complementary skills, learning goals, and project interests using machine learning techniques.",
        technologies: ["Python", "Scikit-learn", "FastAPI", "PostgreSQL", "Docker"],
        estimatedTime: "3-4 weeks",
        reason: "Perfect for showcasing algorithmic thinking, data science skills, and solving real collaboration challenges",
        teamSize: 3,
        difficulty: "Advanced",
        marketDemand: "Medium - HR and collaboration tools market"
      };
    }
  }
};

export const generateGeminiResponse = async (
  question: string,
  context?: string,
  userProfile?: any
): Promise<string> => {
  if (!genAI) {
    // Enhanced fallback responses with more comprehensive coverage
    const fallbackResponses: { [key: string]: string } = {
      'teammate': "When looking for teammates, focus on complementary skills rather than identical ones. Look for people who share your passion and work ethic but bring different expertise. Good communication, similar availability, and aligned project goals are crucial for successful collaboration.",
      'project': "Great projects solve real problems and showcase your unique skills. Start with something achievable in 2-4 weeks, ensure it has clear user value, and consider what would be impressive to potential employers. Don't be afraid to put your own innovative spin on existing ideas!",
      'collaboration': "Effective collaboration requires clear communication, defined roles, and regular check-ins. Use tools like Slack for daily communication, GitHub for code collaboration, Figma for design, and project management tools like Notion or Linear to track progress and maintain accountability.",
      'timeline': "Break your project into weekly milestones: Week 1 - Planning and architecture, Week 2-3 - Core development and features, Week 4 - Testing, polish, and deployment. Always add 20% buffer time for unexpected challenges, and communicate early if you're falling behind schedule.",
      'skills': "Focus on building projects that stretch your current skills while remaining achievable. The best way to learn is by doing - pick technologies that are one step beyond your comfort zone. Pair programming with teammates is excellent for knowledge transfer.",
      'portfolio': "Your portfolio should tell a story of growth and versatility. Include 3-4 projects that showcase different skills, document your process and challenges overcome, and always include live demos. Quality over quantity - better to have fewer polished projects than many incomplete ones."
    };
    
    const questionLower = question.toLowerCase();
    for (const [key, response] of Object.entries(fallbackResponses)) {
      if (questionLower.includes(key)) {
        return response;
      }
    }
    
    return "That's a great question! While I'm having trouble connecting to my full knowledge base right now, I'd recommend discussing this with experienced developers in your network or checking out resources like GitHub, Stack Overflow, or developer communities for detailed guidance.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const userContext = userProfile ? `
User Profile Context:
- Skills: ${userProfile.skills?.join(', ') || 'Not specified'}
- Experience: ${userProfile.experience || 'Not specified'}
- Interests: ${userProfile.interests?.join(', ') || 'Not specified'}
- Current Projects: ${userProfile.projects?.length || 0} active projects
` : '';

    const prompt = `
You are Gemini AI, an intelligent assistant for CollabMate - a platform that helps developers and students find teammates and collaborate on projects.

${userContext}

User Question: "${question}"
${context ? `Additional Context: ${context}` : ''}

Provide a helpful, actionable response that:
- Is specific to collaboration, teamwork, and project development
- Offers practical advice and concrete next steps
- Is encouraging and supportive while being realistic
- Is comprehensive but concise (3-5 sentences)
- Relates to the CollabMate platform and user's profile when relevant
- Includes specific tools, technologies, or methodologies when appropriate

Focus on topics like:
- Finding and working with teammates
- Project planning and management
- Technical collaboration best practices
- Communication and workflow optimization
- Skill development and learning paths
- Career advice for developers/students
- Code review and development processes
- Team dynamics and conflict resolution

Respond in a friendly, professional tone as if you're a knowledgeable mentor with years of experience in software development and team collaboration.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    return text || "I'd be happy to help! Could you provide a bit more detail about what specific aspect you'd like guidance on?";
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    
    // Enhanced contextual fallback based on question content
    const questionLower = question.toLowerCase();
    if (questionLower.includes('team') || questionLower.includes('collaborate')) {
      return "Successful collaboration starts with clear communication and shared goals. Make sure everyone understands their role, set up regular check-ins (daily standups work great), and use collaborative tools like GitHub for code sharing, Slack for communication, and Linear or Notion for project management.";
    } else if (questionLower.includes('project') || questionLower.includes('idea')) {
      return "Great projects solve real problems and showcase your skills effectively. Start with something achievable that you're passionate about, consider your target audience and their pain points, and don't be afraid to iterate on your initial idea based on user feedback and technical constraints.";
    } else if (questionLower.includes('skill') || questionLower.includes('learn')) {
      return "Focus on building projects that stretch your current skills while being achievable. The most effective learning happens through hands-on practice - pair programming with teammates is excellent for knowledge transfer, and don't hesitate to ask questions in developer communities.";
    } else if (questionLower.includes('portfolio') || questionLower.includes('job')) {
      return "Your portfolio should demonstrate both technical skills and problem-solving ability. Include 3-4 polished projects with clear documentation, live demos, and explanations of challenges you overcame. Quality beats quantity every time.";
    } else {
      return "That's an interesting question! For the best guidance, I'd recommend discussing this with experienced developers in your network or checking out resources like developer communities, documentation, and tutorials specific to your technology stack.";
    }
  }
};

export const generateSmartMatchingInsights = async (
  currentUser: any,
  potentialMatch: any
): Promise<string> => {
  if (!genAI) {
    const commonSkills = currentUser.skills?.filter((skill: string) => 
      potentialMatch.skills?.includes(skill)
    ) || [];
    
    if (commonSkills.length > 0) {
      return `Strong technical alignment with shared expertise in ${commonSkills.slice(0, 2).join(' and ')}. This collaboration could leverage both of your strengths effectively.`;
    }
    return "Complementary skill sets could lead to innovative solutions and mutual learning opportunities.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `
Analyze the compatibility between these two developers for potential collaboration:

Current User:
- Skills: ${currentUser.skills?.join(', ') || 'Not specified'}
- Interests: ${currentUser.interests?.join(', ') || 'Not specified'}
- Experience: ${currentUser.experience || 'Not specified'}
- Work Style: ${currentUser.preferences?.workStyle?.join(', ') || 'Not specified'}

Potential Match:
- Skills: ${potentialMatch.skills?.join(', ') || 'Not specified'}
- Interests: ${potentialMatch.interests?.join(', ') || 'Not specified'}
- Experience: ${potentialMatch.experience || 'Not specified'}
- Work Style: ${potentialMatch.preferences?.workStyle?.join(', ') || 'Not specified'}

Generate a brief, insightful analysis (2-3 sentences) that highlights:
- Key compatibility factors
- Potential collaboration strengths
- What makes this a good match for project work

Be specific about technical skills and work style compatibility.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error generating matching insights:', error);
    return "This match shows potential for productive collaboration based on complementary skills and shared interests.";
  }
};

export const generateProjectRoadmap = async (
  projectTitle: string,
  technologies: string[],
  teamSize: number,
  timeframe: string
): Promise<{
  phases: Array<{
    name: string;
    duration: string;
    tasks: string[];
    deliverables: string[];
  }>;
  risks: string[];
  recommendations: string[];
}> => {
  if (!genAI) {
    return {
      phases: [
        {
          name: "Planning & Setup",
          duration: "Week 1",
          tasks: ["Define requirements", "Set up development environment", "Create project structure"],
          deliverables: ["Project specification", "Development setup", "Initial wireframes"]
        },
        {
          name: "Core Development",
          duration: "Week 2-3",
          tasks: ["Implement core features", "Set up database", "Create API endpoints"],
          deliverables: ["Working MVP", "API documentation", "Database schema"]
        },
        {
          name: "Testing & Deployment",
          duration: "Week 4",
          tasks: ["Write tests", "Deploy to production", "Performance optimization"],
          deliverables: ["Test suite", "Live application", "Performance report"]
        }
      ],
      risks: ["Scope creep", "Technical complexity", "Team coordination"],
      recommendations: ["Use agile methodology", "Regular code reviews", "Clear communication channels"]
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `
Create a detailed project roadmap for: "${projectTitle}"
- Technologies: ${technologies.join(', ')}
- Team Size: ${teamSize} people
- Timeframe: ${timeframe}

Generate a comprehensive roadmap with phases, tasks, deliverables, risks, and recommendations.

Respond in this exact JSON format:
{
  "phases": [
    {
      "name": "Phase Name",
      "duration": "Time period",
      "tasks": ["task1", "task2", "task3"],
      "deliverables": ["deliverable1", "deliverable2"]
    }
  ],
  "risks": ["risk1", "risk2", "risk3"],
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"]
}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No valid JSON found');
    } catch (parseError) {
      console.error('Error parsing roadmap:', parseError);
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw error;
  }
};