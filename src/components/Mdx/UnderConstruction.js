import React from 'react';
import { ReportProblem } from '@mui/icons-material';

const UnderConstruction = ({ 
  title = "Page Under Construction", 
  message = "We're working hard to bring you new content. Please check back soon!",
  showEstimate = false,
  estimatedCompletion = "soon"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 my-8 border border-yellow-300 rounded-lg bg-yellow-50">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-xl font-bold text-yellow-800">
          <ReportProblem className="mx-1 w-6 h-6 text-yellow-600" />
        {title}</h2>
      </div>
      
      <p className="mb-4 text-center text-yellow-700">{message}</p>
      
      {showEstimate && (
        <div className="text-sm text-yellow-600">
          Expected completion: <span className="font-medium">{estimatedCompletion}</span>
        </div>
      )}

      <div className="flex justify-center w-full mt-6 space-x-3">
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 delay-100 bg-yellow-500 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 delay-200 bg-yellow-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default UnderConstruction;