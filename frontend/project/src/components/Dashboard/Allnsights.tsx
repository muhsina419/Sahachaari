import React from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const AIInsights: React.FC = () => {
  const insights = [
    {
      id: 1,
      type: 'optimization',
      message: 'Broadway & 42nd St traffic light timing can be optimized to reduce congestion by 15%',
      confidence: 92,
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'warning',
      message: 'High probability of congestion at Park Ave & 59th St in next 30 minutes',
      confidence: 87,
      icon: AlertTriangle,
      color: 'text-yellow-600'
    },
    {
      id: 3,
      type: 'recommendation',
      message: 'Suggest alternate route via 8th Ave for emergency vehicles',
      confidence: 95,
      icon: CheckCircle,
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">AI Traffic Insights</h3>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <insight.icon className={`h-5 w-5 mt-0.5 ${insight.color}`} />
            <div className="flex-1">
              <p className="text-sm text-gray-800">{insight.message}</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-xs text-gray-500">Confidence:</span>
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-purple-600 h-1.5 rounded-full transition-all"
                    style={{ width: `${insight.confidence}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-700">{insight.confidence}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;