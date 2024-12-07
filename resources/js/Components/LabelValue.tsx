import React from 'react'

interface Props {
    label: string;
    value: React.ReactNode;
    className?: string;
    icon?: React.ReactNode; 
  }
  
  const LabelValue: React.FC<Props> = ({ label, value, className = "", icon }) => {
    return (
      <div className="flex flex-col py-1">
         {icon && <span>{icon}</span>}
        <span className="font-medium text-gray-600">{label}:</span>
        <span className={` ${className}`}>{value}</span>
      </div>
    );
  };
  

export default LabelValue;
