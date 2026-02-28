import { useState } from "react";

interface DiscoveryPreferencesScreenProps {
  onBack: () => void;
}

export function DiscoveryPreferencesScreen({ onBack }: DiscoveryPreferencesScreenProps) {
  const [selectedGender, setSelectedGender] = useState<string>('any');
  const [ageRange, setAgeRange] = useState({ min: 18, max: 60 });
  const [maxDistance, setMaxDistance] = useState(20);

  const genderOptions = [
    { value: 'any', label: 'Any' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#FFFFFF] border-b border-[#F2F2F2] px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-[#1A1A1A] font-medium"
          >
            Cancel
          </button>
          <h1 className="text-lg font-bold text-[#1A1A1A]">Discovery Preferences</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Filters Section */}
        <div>
          <h3 
            className="mb-0"
            style={{ 
              fontFamily: 'Helvetica, Arial, sans-serif', 
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#000000'
            }}
          >
            FILTERS
          </h3>
          
          <div className="space-y-0">
            {/* Gender */}
            <div className="py-1.5 flex items-start">
              <div className="flex items-start gap-3">
                <span 
                  className="w-20 pt-1"
                  style={{ 
                    fontFamily: 'Helvetica, Arial, sans-serif', 
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#000000'
                  }}
                >
                  Gender
                </span>
                <div className="flex flex-col gap-2">
                  {genderOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedGender(option.value)}
                      className={`px-4 py-1 rounded-full transition-all ${
                        selectedGender === option.value
                          ? 'text-white'
                          : 'text-black'
                      }`}
                      style={{
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        background: selectedGender === option.value 
                          ? '#000000' 
                          : 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: selectedGender === option.value ? 'none' : 'blur(10px)',
                        border: selectedGender === option.value 
                          ? 'none' 
                          : '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Age Range */}
            <div className="py-1.5 flex items-center">
              <div className="flex items-center gap-3">
                <span 
                  className="w-20"
                  style={{ 
                    fontFamily: 'Helvetica, Arial, sans-serif', 
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#000000'
                  }}
                >
                  Age Range
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={ageRange.min}
                    onChange={(e) => setAgeRange(prev => ({ ...prev, min: Math.max(18, Math.min(60, parseInt(e.target.value) || 18)) }))}
                    className="w-16 px-3 py-2 text-center rounded-lg"
                    style={{
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                    min="18"
                    max="60"
                  />
                  <span 
                    style={{ 
                      fontFamily: 'Helvetica, Arial, sans-serif', 
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#000000'
                    }}
                  >
                    to
                  </span>
                  <input
                    type="number"
                    value={ageRange.max}
                    onChange={(e) => setAgeRange(prev => ({ ...prev, max: Math.max(18, Math.min(60, parseInt(e.target.value) || 60)) }))}
                    className="w-16 px-3 py-2 text-center rounded-lg"
                    style={{
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                    min="18"
                    max="60"
                  />
                </div>
              </div>
            </div>

            {/* Radius */}
            <div className="py-1.5 flex items-center">
              <div className="flex items-center gap-3">
                <span 
                  className="w-20"
                  style={{ 
                    fontFamily: 'Helvetica, Arial, sans-serif', 
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#000000'
                  }}
                >
                  Radius
                </span>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="200"
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                    className="w-32"
                    style={{
                      height: '2px',
                      background: '#000000',
                      borderRadius: '1px',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="number"
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(Math.max(5, Math.min(200, parseInt(e.target.value) || 20)))}
                    className="w-16 px-3 py-2 text-center rounded-lg"
                    style={{
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                    min="5"
                    max="200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
