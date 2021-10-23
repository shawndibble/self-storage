import React from 'react';
/* eslint-disable react/prop-types */
export default function Label({
  forInput, value, className, children,
}) {
  return (
    <label htmlFor={forInput} className={`block font-medium text-sm text-gray-700 ${className}`}>
      {value || { children }}
    </label>
  );
}
