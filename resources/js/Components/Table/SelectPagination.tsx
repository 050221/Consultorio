import React from 'react';

interface FiltersProps {
  children: React.ReactNode;
  className?: string;
  value: number;
  onChange: (value: number) => void;
}

export default function SelectPagination({ 
  children,
  value,
  onChange,
  className = ''
}: FiltersProps) {
  return (
    <select 
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`border-1 h-12 border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:ring-1 focus:outline-none ${className}`}
    >    
      {children}
    </select>
  );
}