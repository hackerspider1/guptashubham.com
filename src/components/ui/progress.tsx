import * as React from "react";

interface ProgressProps {
  value: number;
  max?: number;
}

const Progress: React.FC<ProgressProps> = ({ value, max = 100 }) => {
  return (
    <div className="relative w-full h-2 bg-gray-200 rounded-lg overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
};

export default Progress;