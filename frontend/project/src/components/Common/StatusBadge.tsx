import React from 'react';
import clsx from 'clsx';

interface StatusBadgeProps {
  status: string;
  variant?: 'traffic' | 'incident' | 'emergency';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'traffic' }) => {
  const getStatusColor = () => {
    if (variant === 'traffic') {
      switch (status) {
        case 'low': return 'bg-green-100 text-green-800';
        case 'medium': return 'bg-yellow-100 text-yellow-800';
        case 'high': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
    
    if (variant === 'incident') {
      switch (status) {
        case 'reported': return 'bg-blue-100 text-blue-800';
        case 'investigating': return 'bg-yellow-100 text-yellow-800';
        case 'resolved': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }

    if (variant === 'emergency') {
      switch (status) {
        case 'active': return 'bg-red-100 text-red-800';
        case 'completed': return 'bg-green-100 text-green-800';
        case 'cancelled': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }

    return 'bg-gray-100 text-gray-800';
  };

  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
      getStatusColor()
    )}>
      {status.replace('_', ' ')}
    </span>
  );
};

export default StatusBadge;