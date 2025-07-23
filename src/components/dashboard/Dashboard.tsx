import React from 'react';
import { useState, useEffect } from 'react';
import { Users, MessageCircle, Lightbulb, RefreshCw, ChevronDown, Sparkles, Brain, Zap } from 'lucide-react';
import { User, ProjectSuggestion as ProjectSuggestionType } from '../../types';
import { StatsCard } from './StatsCard';
import { MatchCard } from './MatchCard';
import { ProjectSuggestion } from './ProjectSuggestion';
import { GeminiInsights } from '../gemini/GeminiInsights';
import { useFirebaseMatches } from '../../hooks/useFirebaseMatches';
import { generateProjectSuggestion } from '../../lib/gemini';

export function Dashboard({ user, onAskGemini }: { user: User; onAskGemini: () => void }) {
  const { matches, loading: matchesLoading, refreshMatches } = useFirebaseMatches(user);
  const [projectSuggestions, setProjectSuggestions] = useState<ProjectSuggestionType[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  const handleRefresh = () => {
    refreshMatches();
  };

  const generateAIProjectSuggestions = async () => {
    setLoadingProjects(true);
    try {
      const suggestions = await Promise.all([
        generateProjectSuggestion(user),
        generateProjectSuggestion(user),
        generateProjectSuggestion(user)
      ]);
      setProjectSuggestions(suggestions);
    } catch (error) {
      console.error('Error generating project suggestions:', error);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    generateAIProjectSuggestions();
  }, []);

  return (
    <div className="space-y-6">
      {/* AI Insights Section */}
      <GeminiInsights 
        user={user} 
        matches={matches} 
        onAskGemini={onAskGemini} 
      />

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Your Dashboard</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onAskGemini()}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Brain className="h-4 w-4" />
              <span>Smart Insights</span>
            </button>
            <button
              onClick={onAskGemini}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span>Ask Gemini</span>
            </button>
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Zap className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            title="AI-Generated Matches" 
            value={matches.length.toString()} 
            icon={Users} 
            color="indigo" 
            subtitle="Smart compatibility analysis"
          />
          <StatsCard 
            title="Active Conversations" 
            value="7" 
            icon={MessageCircle} 
            color="purple" 
            subtitle="With AI chat assistance"
          />
          <StatsCard 
            title="Project Suggestions" 
            value={projectSuggestions.length.toString()} 
            icon={Lightbulb} 
            color="green" 
            subtitle="Powered by Gemini AI"
          />
        </div>

        {/* Top Matches */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 flex items-center">
              <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
              AI-Powered Smart Matches
            </h3>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              Compatibility Analysis
            </span>
          </div>
          {matchesLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">AI is analyzing compatibility...</p>
            </div>
          ) : matches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matches.slice(0, 4).map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No matches found yet. Complete your profile to get better matches!</p>
            </div>
          )}
        </div>

        {/* Project Suggestions */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 flex items-center">
              <Brain className="h-5 w-5 text-green-500 mr-2" />
              Gemini AI Project Recommendations
            </h3>
            <button 
              onClick={generateAIProjectSuggestions}
              className="flex items-center space-x-1 text-sm bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-full transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate New Ideas</span>
            </button>
          </div>
          {loadingProjects ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Gemini AI is creating personalized project ideas...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {projectSuggestions.map((suggestion) => (
                <ProjectSuggestion
                  key={suggestion.id}
                  suggestion={suggestion}
                  onFindTeam={() => {
                    onAskGemini();
                    // Could pass specific context about the project
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}