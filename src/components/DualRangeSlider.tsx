import { useState, useRef, useEffect } from 'react';

interface DualRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  disabled?: boolean;
}

export function DualRangeSlider({ 
  min, 
  max, 
  step = 1, 
  value, 
  onChange, 
  disabled = false 
}: DualRangeSliderProps) {
  const [minValue, setMinValue] = useState(value[0]);
  const [maxValue, setMaxValue] = useState(value[1]);
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
  }, [value]);

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const getValueFromPosition = (clientX: number) => {
    if (!sliderRef.current) return min;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const rawValue = min + (percentage / 100) * (max - min);
    
    // Snap to step
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  };

  const handleMouseDown = (handle: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    
    if (handle === 'min') {
      setIsDraggingMin(true);
    } else {
      setIsDraggingMax(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingMin && !isDraggingMax) return;
    
    const newValue = getValueFromPosition(e.clientX);
    
    if (isDraggingMin) {
      const newMin = Math.min(newValue, maxValue - step);
      setMinValue(newMin);
      onChange([newMin, maxValue]);
    } else if (isDraggingMax) {
      const newMax = Math.max(newValue, minValue + step);
      setMaxValue(newMax);
      onChange([minValue, newMax]);
    }
  };

  const handleMouseUp = () => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  };

  useEffect(() => {
    if (isDraggingMin || isDraggingMax) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingMin, isDraggingMax, minValue, maxValue]);

  const minPercentage = getPercentage(minValue);
  const maxPercentage = getPercentage(maxValue);

  return (
    <div className="w-full">
      {/* Label */}
      <div className="text-sm font-bold text-[#1A1A1A] mb-3">
        Ages {minValue} – {maxValue}
      </div>
      
      {/* Slider Container */}
      <div 
        ref={sliderRef}
        className="relative h-2 w-full"
        style={{ cursor: disabled ? 'not-allowed' : 'default' }}
      >
        {/* Track Background */}
        <div 
          className="absolute h-full w-full rounded-full"
          style={{ backgroundColor: '#F2F2F2' }}
        />
        
        {/* Active Range Fill */}
        <div 
          className="absolute h-full rounded-full"
          style={{
            backgroundColor: '#67295F',
            left: `${minPercentage}%`,
            right: `${100 - maxPercentage}%`
          }}
        />
        
        {/* Min Handle */}
        <div
          className={`absolute w-5 h-5 rounded-full border-2 border-[#67295F] bg-white shadow-sm transition-shadow ${
            isDraggingMin ? 'shadow-md' : 'hover:shadow-md'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}`}
          style={{
            left: `${minPercentage}%`,
            transform: 'translateX(-50%)',
            top: '50%',
            marginTop: '-10px'
          }}
          onMouseDown={handleMouseDown('min')}
        />
        
        {/* Max Handle */}
        <div
          className={`absolute w-5 h-5 rounded-full border-2 border-[#67295F] bg-white shadow-sm transition-shadow ${
            isDraggingMax ? 'shadow-md' : 'hover:shadow-md'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}`}
          style={{
            left: `${maxPercentage}%`,
            transform: 'translateX(-50%)',
            top: '50%',
            marginTop: '-10px'
          }}
          onMouseDown={handleMouseDown('max')}
        />
      </div>
      
      {/* Range Labels */}
      <div className="flex justify-between mt-2 text-xs text-[#717171]">
        <span>{min}</span>
        <span>{max}+</span>
      </div>
    </div>
  );
}
