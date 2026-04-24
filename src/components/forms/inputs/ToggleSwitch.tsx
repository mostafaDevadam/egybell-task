"use client";


import React from "react";

type Props = { value: boolean; 
  onToggle: (v: boolean) => boolean | void; 
  label?: string, name?: string
  isMobile: boolean

};
const ToggleSwitch = ({ value, onToggle, label, name, isMobile }: Props) => {
  const handleToggle = (e: any) => {
    e.preventDefault()
    const newVal = !value;
    return onToggle(newVal);
  };
  return (
    <label className={`flex items-center cursor-pointer gap-2 sm:gap-3 ${isMobile ? 'mt-5 justify-between' : ''}`}>
      <input
        type="checkbox"
        className="sr-only peer"
        checked={value}
        readOnly
        name={name}
      />

      <div
        onClick={handleToggle}
        className={`
      relative rounded-full transition-colors
      w-9 h-5 sm:w-11 sm:h-6 md:w-12 md:h-7
      ${value ? 'bg-blue-600' : 'bg-gray-300'}
    `}
      >
        <div
          className={`
        absolute bg-white rounded-full transition-transform
        top-0.5 left-0.5
        w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6
        ${value ? 'translate-x-4 sm:translate-x-5 md:translate-x-6' : ''}
      `}
        />
      </div>

      {label && (
        <span className="text-xs sm:text-sm md:text-base test-toggle">
          {label}
        </span>
      )}
    </label>
  );
};





/*
const ToggleSwitch = ({ label = null, initialValue = false, onToggle }: Props) => {
  const [isOn, setIsOn] = useState(initialValue);

  useEffect(() => {
    setIsOn(initialValue);
  }, [initialValue]);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onToggle?.(newValue);
  };

  return (
    <label className="flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        className="sr-only"
        checked={isOn}
        onChange={handleToggle}
        aria-checked={isOn}
      />

      <div
        onClick={handleToggle}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
          isOn ? "bg-blue-600 dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${
            isOn ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>

      {label && <span className="ml-3 text-gray-700 dark:text-gray-300 text-sm font-medium">{label}</span>}
    </label>
  );
};
*/
export default ToggleSwitch;
