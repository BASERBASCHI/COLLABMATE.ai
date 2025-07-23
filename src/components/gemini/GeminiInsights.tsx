import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Users, Lightbulb, Target } from 'lucide-react';
import { generateSmartMatchingInsights, generateProjectSuggestion } from '../../lib/gemini';
import { User } from '../../types';

interface GeminiInsightsProps {
  user: User;
  matches?: any[];
  onAskGemini: () => void;
}

export const GeminiInsights: React.FC<GeminiInsightsProps> = ({ 
  user, 
  matches = [], 
  onAskGemini 
}) => {
  const [insights, setInsights] = useState<{
    profileInsight: string;
    skillGrowth: string;
    collaborationTip: string;
    projectIdea: string;
  }>({
    profileInsight: '',
    skillGrowth: '',
    collaborationTip: '',
    projectIdea: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateInsights();
  }, [user]);

  const generateInsights = async () => {
    setLoading(true);
    try {
      // Generate personalized insights based on user profile
      const profileStrengthInsight = user.profileStrength < 80 
        ? `Your profile is ${user.profileStrength}% complete. Adding more skills, projects, or work preferences could help you find better matches and collaboration opportunities.`
        : `Great profile! At ${user.profileStrength}% completion, you're well-positioned to attract quality collaboration partners.`;

      const skillGrowthSuggestion = user.skills.length > 0
        ? `Based on your ${user.skills.slice(0, 2).join(' and ')} skills, consider learning ${getComplementarySkill(user.skills)} to expand your project opportunities.`
        : 'Adding technical skills to your profile will help you find more relevant project matches and teammates.';

      const collaborationAdvice = user.preferences.workStyle.length > 0
        ? `Your ${user.preferences.workStyle[0]} work style pairs well with team members who complement your approach. Look for diverse perspectives in your collaborations.`
        : 'Define your work style preferences to find teammates who complement your collaboration approach.';

      // Generate a quick project idea
      let projectSuggestion = 'Consider starting a project that combines your interests with trending technologies to build an impressive portfolio.';
      try {
        const aiProject = await generateProjectSuggestion(user.skills, user.interests, user.experience);
        projectSuggestion = `Try building: "${aiProject.title}" - ${aiProject.description.substring(0, 100)}...`;
      } catch (error) {
        console.log('Using fallback project suggestion');
      }

      setInsights({
        profileInsight: profileStrengthInsight,
        skillGrowth: skillGrowthSuggestion,
        collaborationTip: collaborationAdvice,
        projectIdea: projectSuggestion
      });
    } catch (error) {
      console.error('Error generating insights:', error);
      // Fallback insights
      setInsights({
        profileInsight: 'Complete your profile to get personalized AI insights and better collaboration matches.',
        skillGrowth: 'Learning new technologies and working on diverse projects will expand your opportunities.',
        collaborationTip: 'Great collaboration starts with clear communication and complementary skills.',
        projectIdea: 'Consider building a project that solves a real problem you\'ve encountered.'
      });
    } finally {
      setLoading(false);
    }
  };

  const getComplementarySkill = (currentSkills: string[]): string => {
    const skillMap: { [key: string]: string[] } = {
      'react': ['Node.js', 'TypeScript', 'GraphQL'],
      'javascript': ['Python', 'React', 'Node.js'],
      'python': ['JavaScript', 'Docker', 'AWS'],
      'node.js': ['React', 'MongoDB', 'Docker'],
      'html': ['JavaScript', 'React', 'CSS'],
      'css': ['JavaScript', 'Sass', 'Figma']
    };

    for (const skill of currentSkills) {
      const suggestions = skillMap[skill.toLowerCase()];
      if (suggestions) {
        const newSkill = suggestions.find(s => !currentSkills.includes(s));
        if (newSkill) return newSkill;
      }
    }

    return 'Docker'; // Default suggestion
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
          </div>
          <h3 className="font-bold text-gray-800">AI Insights</h3>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-purple-100 rounded animate-pulse"></div>
          <div className="h-4 bg-purple-100 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-purple-100 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-bold text-gray-800">AI Insights</h3>
        </div>
        <button
          onClick={onAskGemini}
          className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full transition-colors"
        >
          Ask More
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-800 text-sm">Profile Optimization</h4>
            <p className="text-xs text-gray-600 mt-1">{insights.profileInsight}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Target className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-800 text-sm">Skill Growth</h4>
            <p className="text-xs text-gray-600 mt-1">{insights.skillGrowth}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Users className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-800 text-sm">Collaboration Tip</h4>
            <p className="text-xs text-gray-600 mt-1">{insights.collaborationTip}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-800 text-sm">Project Idea</h4>
            <p className="text-xs text-gray-600 mt-1">{insights.projectIdea}</p>
          </div>
        </div>
      </div>
    </div>
  );
};