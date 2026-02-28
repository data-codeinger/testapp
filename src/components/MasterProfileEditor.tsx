import React, { useState, useEffect } from 'react';

interface MasterProfileEditorProps {
  onBack: () => void;
  onSave: (profileData: any) => void;
}

interface ProfileData {
  photos: string[];
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  genderDetails?: string;
  sexuality: string;
  interestedIn: string[];
  languages: string[];
  hometown: string;
  height: string;
  heightUnit: 'cm' | 'ft';
  education: string;
  university: string;
  jobTitle: string;
  industry: string;
  religion: string;
  relationshipStatus: string;
  intent: string;
  children: string;
  familyPlans: string;
  politics: string;
  bioPrompt: string;
  bioAnswer: string;
  interests: string[];
  smoking: string;
  drinking: string;
  marijuana: string;
  diet: string;
  pets: string[];
  zodiac: string;
}

const INDIAN_LANGUAGES = [
  'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Urdu', 'Gujarati', 'Kannada',
  'Odia', 'Punjabi', 'Malayalam', 'Assamese', 'Sanskrit', 'Konkani', 'Manipuri',
  'Nepali', 'Sindhi', 'Dogri', 'Kashmiri', 'Bodo', 'Santali', 'Meitei'
];

const GENDER_OPTIONS = ['Male', 'Female', 'Non-Binary'];
const NON_BINARY_OPTIONS = [
  'Agender', 'Bigender', 'Genderfluid', 'Genderqueer', 'Demigender', 
  'Pangender', 'Two-Spirit', 'Transmasculine', 'Transfeminine'
];
const SEXUALITY_OPTIONS = [
  'Gay', 'Lesbian', 'Bisexual', 'Pansexual', 'Queer', 'Asexual', 'Demisexual', 'Straight'
];
const INTERESTED_IN_OPTIONS = ['Men', 'Women', 'Everyone', 'Non-Binary', 'Same Gender'];

const INTERESTS_CATEGORIES = {
  '🎨 Creative Arts': ['Painting', 'Drawing', 'Photography', 'Sculpture', 'Digital Art', 'Music Production'],
  '🎵 Entertainment': ['Movies', 'TV Shows', 'Concerts', 'Theater', 'Stand-up Comedy', 'Podcasts'],
  '🏔️ Outdoor': ['Hiking', 'Camping', 'Rock Climbing', 'Kayaking', 'Cycling', 'Running'],
  '🧘 Wellness': ['Yoga', 'Meditation', 'Spa', 'Massage', 'Mindfulness', 'Fitness'],
  '🧠 Intellectual': ['Reading', 'Writing', 'Chess', 'Puzzles', 'Learning Languages', 'Debates'],
  '🎮 Gaming': ['Video Games', 'Board Games', 'Tabletop RPG', 'Mobile Games', 'Esports', 'Game Development'],
  '⚽ Active Sports': ['Football', 'Basketball', 'Tennis', 'Swimming', 'Gym', 'Dance'],
  '🍽️ Food': ['Cooking', 'Baking', 'Wine Tasting', 'Coffee', 'Street Food', 'Fine Dining']
};

const BIO_PROMPTS = [
  "I'm looking for someone who...",
  "My perfect first date would be...",
  "Two truths and a lie...",
  "My simple pleasures...",
  "I'm weirdly good at...",
  "The way to win me over is..."
];

const EDUCATION_OPTIONS = ['High School', 'Undergraduate', 'Post-grad', 'PhD'];
const RELIGION_OPTIONS = ['Atheist', 'Hindu', 'Muslim', 'Christian', 'Spiritual', 'Buddhist', 'Sikh', 'Other'];
const RELATIONSHIP_OPTIONS = ['Single', 'Divorced', 'In-relationship', 'Married'];
const INTENT_OPTIONS = [
  'Life Partner', 'Long-term', 'Long-term open to short', 'Short-term open to long', 
  'Casual', 'Friendship/Networking', 'Figuring out'
];
const CHILDREN_OPTIONS = ['Have', "Don't have", 'Prefer not to say'];
const FAMILY_PLANS_OPTIONS = ['Want', "Don't want", 'Open', 'Not sure'];
const POLITICS_OPTIONS = ['Liberal', 'Moderate', 'Conservative', 'Not political', 'Other'];
const HABIT_OPTIONS = ['Never', 'Socially', 'Regularly'];
const DIET_OPTIONS = ['Vegan', 'Vegetarian', 'Non-Veg', 'Pescatarian', 'Jain'];
const PET_OPTIONS = ['Dog lover', 'Cat lover', 'Pet-free', 'Allergies'];
const ZODIAC_OPTIONS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export function MasterProfileEditor({ onBack, onSave }: MasterProfileEditorProps) {
  const [profileData, setProfileData] = useState<ProfileData>({
    photos: [],
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    age: 0,
    gender: '',
    sexuality: '',
    interestedIn: [],
    languages: [],
    hometown: '',
    height: '',
    heightUnit: 'cm',
    education: '',
    university: '',
    jobTitle: '',
    industry: '',
    religion: '',
    relationshipStatus: '',
    intent: '',
    children: '',
    familyPlans: '',
    politics: '',
    bioPrompt: '',
    bioAnswer: '',
    interests: [],
    smoking: '',
    drinking: '',
    marijuana: '',
    diet: '',
    pets: [],
    zodiac: ''
  });

  const [showBottomSheet, setShowBottomSheet] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (profileData.dateOfBirth) {
      const birthYear = new Date(profileData.dateOfBirth).getFullYear();
      const age = 2026 - birthYear;
      setProfileData(prev => ({ ...prev, age }));
    }
  }, [profileData.dateOfBirth]);

  const updateProfileData = (key: keyof ProfileData, value: any) => {
    setProfileData(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(value)
        ? (prev[key] as string[]).filter(item => item !== value)
        : [...(prev[key] as string[]), value]
    }));
  };

  const filteredLanguages = INDIAN_LANGUAGES.filter(lang =>
    lang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const BottomSheet = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowBottomSheet(null)}>
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6" onClick={e => e.stopPropagation()}>
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-gray-600 font-medium">Cancel</button>
          <h1 className="text-lg font-bold">Edit Profile</h1>
          <button 
            onClick={() => onSave(profileData)}
            className="text-[#67295F] font-medium"
          >
            Save
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-8">
        {/* Phase 1: The Vitals */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-[#67295F]">The Vitals</h2>
          
          {/* Photos */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Photos</h3>
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  {profileData.photos[i] ? (
                    <img src={profileData.photos[i]} alt={`Photo ${i + 1}`} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <button className="text-gray-400 text-2xl">+</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Name</h3>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First Name"
                value={profileData.firstName}
                onChange={(e) => updateProfileData('firstName', e.target.value)}
                className="flex-1 border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={profileData.lastName}
                onChange={(e) => updateProfileData('lastName', e.target.value)}
                className="flex-1 border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Date of Birth</h3>
            <input
              type="date"
              value={profileData.dateOfBirth}
              onChange={(e) => updateProfileData('dateOfBirth', e.target.value)}
              className="w-full border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
            />
            {profileData.age > 0 && (
              <p className="text-sm text-gray-500 mt-2">Age: {profileData.age}</p>
            )}
          </div>

          {/* Gender */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Gender</h3>
            <button
              onClick={() => setShowBottomSheet('gender')}
              className="w-full text-left border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
            >
              {profileData.gender || 'Select gender'}
            </button>
          </div>

          {/* Sexuality */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Sexuality</h3>
            <button
              onClick={() => setShowBottomSheet('sexuality')}
              className="w-full text-left border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
            >
              {profileData.sexuality || 'Select sexuality'}
            </button>
          </div>

          {/* Interested In */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Interested In</h3>
            <div className="flex flex-wrap gap-2">
              {INTERESTED_IN_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => toggleArrayItem('interestedIn', option)}
                  className={`px-4 py-2 rounded-full border ${
                    profileData.interestedIn.includes(option)
                      ? 'bg-[#67295F] text-white border-[#67295F]'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Languages</h3>
            <button
              onClick={() => setShowBottomSheet('languages')}
              className="w-full text-left border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
            >
              {profileData.languages.length > 0 
                ? profileData.languages.join(', ')
                : 'Select languages'
              }
            </button>
          </div>

          {/* Hometown & Height */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Hometown</h3>
              <input
                type="text"
                placeholder="City, Country"
                value={profileData.hometown}
                onChange={(e) => updateProfileData('hometown', e.target.value)}
                className="w-full border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
              />
            </div>
            <div>
              <h3 className="font-semibold mb-3">Height</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Height"
                  value={profileData.height}
                  onChange={(e) => updateProfileData('height', e.target.value)}
                  className="flex-1 border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
                />
                <button
                  onClick={() => updateProfileData('heightUnit', profileData.heightUnit === 'cm' ? 'ft' : 'cm')}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                >
                  {profileData.heightUnit}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 2: Status & Virtues */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-[#67295F]">Status & Virtues</h2>
          
          {/* Education */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Education</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowBottomSheet('education')}
                className="text-left border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
              >
                {profileData.education || 'Select degree'}
              </button>
              <input
                type="text"
                placeholder="University/College"
                value={profileData.university}
                onChange={(e) => updateProfileData('university', e.target.value)}
                className="border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
              />
            </div>
          </div>

          {/* Work */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Work</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Job Title"
                value={profileData.jobTitle}
                onChange={(e) => updateProfileData('jobTitle', e.target.value)}
                className="border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
              />
              <input
                type="text"
                placeholder="Industry"
                value={profileData.industry}
                onChange={(e) => updateProfileData('industry', e.target.value)}
                className="border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
              />
            </div>
          </div>

          {/* Religion */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Religion</h3>
            <button
              onClick={() => setShowBottomSheet('religion')}
              className="w-full text-left border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
            >
              {profileData.religion || 'Select religion'}
            </button>
          </div>
        </section>

        {/* Phase 3: Intent & Social */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-[#67295F]">Intent & Social</h2>
          
          {/* Relationship Status */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Relationship Status</h3>
            <button
              onClick={() => setShowBottomSheet('relationship')}
              className="w-full text-left border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
            >
              {profileData.relationshipStatus || 'Select status'}
            </button>
          </div>

          {/* Intent */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Dating Intent</h3>
            <button
              onClick={() => setShowBottomSheet('intent')}
              className="w-full text-left border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
            >
              {profileData.intent || 'Select intent'}
            </button>
          </div>

          {/* Children & Family Plans */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Children</h3>
              <button
                onClick={() => setShowBottomSheet('children')}
                className="w-full text-left border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
              >
                {profileData.children || 'Select option'}
              </button>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Family Plans</h3>
              <button
                onClick={() => setShowBottomSheet('familyPlans')}
                className="w-full text-left border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
              >
                {profileData.familyPlans || 'Select option'}
              </button>
            </div>
          </div>

          {/* Politics */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Politics</h3>
            <button
              onClick={() => setShowBottomSheet('politics')}
              className="w-full text-left border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
            >
              {profileData.politics || 'Select political view'}
            </button>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Bio</h3>
            <button
              onClick={() => setShowBottomSheet('bio')}
              className="w-full text-left border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
            >
              {profileData.bioPrompt ? `${profileData.bioPrompt}: ${profileData.bioAnswer}` : 'Add a prompt-based bio'}
            </button>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Interests</h3>
            <div className="space-y-4">
              {Object.entries(INTERESTS_CATEGORIES).map(([category, interests]) => (
                <div key={category}>
                  <h4 className="font-bold mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {interests.map(interest => (
                      <button
                        key={interest}
                        onClick={() => toggleArrayItem('interests', interest)}
                        className={`px-3 py-1 rounded-full text-sm border ${
                          profileData.interests.includes(interest)
                            ? 'bg-[#67295F] text-white border-[#67295F]'
                            : 'border-gray-300 text-gray-700'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Phase 4: Lifestyle Habits */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-[#67295F]">Lifestyle Habits</h2>
          
          {/* Habits */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Habits</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Smoking</label>
                <button
                  onClick={() => setShowBottomSheet('smoking')}
                  className="w-full text-left border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
                >
                  {profileData.smoking || 'Select option'}
                </button>
              </div>
              <div>
                <label className="text-sm text-gray-600">Drinking</label>
                <button
                  onClick={() => setShowBottomSheet('drinking')}
                  className="w-full text-left border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
                >
                  {profileData.drinking || 'Select option'}
                </button>
              </div>
              <div>
                <label className="text-sm text-gray-600">Marijuana</label>
                <button
                  onClick={() => setShowBottomSheet('marijuana')}
                  className="w-full text-left border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
                >
                  {profileData.marijuana || 'Select option'}
                </button>
              </div>
            </div>
          </div>

          {/* Diet */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Diet</h3>
            <div className="flex flex-wrap gap-2">
              {DIET_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => updateProfileData('diet', option)}
                  className={`px-4 py-2 rounded-lg border ${
                    profileData.diet === option
                      ? 'bg-[#67295F] text-white border-[#67295F]'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Pets */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Pets</h3>
            <div className="flex flex-wrap gap-2">
              {PET_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => toggleArrayItem('pets', option)}
                  className={`px-4 py-2 rounded-lg border ${
                    profileData.pets.includes(option)
                      ? 'bg-[#67295F] text-white border-[#67295F]'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Zodiac */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Zodiac</h3>
            <button
              onClick={() => setShowBottomSheet('zodiac')}
              className="w-full text-left border-b border-gray-200 pb-2 outline-none focus:border-[#67295F]"
            >
              {profileData.zodiac || 'Select zodiac sign'}
            </button>
          </div>
        </section>
        {showBottomSheet === 'gender' && (
          <BottomSheet title="Select Gender">
            <div className="space-y-2">
              {GENDER_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    updateProfileData('gender', option);
                    if (option !== 'Non-Binary') {
                      updateProfileData('genderDetails', '');
                    }
                    setShowBottomSheet(null);
                  }}
                  className={`w-full text-left p-3 rounded-lg ${
                    profileData.gender === option ? 'bg-[#67295F] text-white' : 'bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
              {profileData.gender === 'Non-Binary' && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold mb-2">Specify:</h4>
                  {NON_BINARY_OPTIONS.map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        updateProfileData('genderDetails', option);
                        setShowBottomSheet(null);
                      }}
                      className={`w-full text-left p-3 rounded-lg ${
                        profileData.genderDetails === option ? 'bg-[#67295F] text-white' : 'bg-gray-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </BottomSheet>
        )}

        {showBottomSheet === 'sexuality' && (
          <BottomSheet title="Select Sexuality">
            <div className="space-y-2">
              {SEXUALITY_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    updateProfileData('sexuality', option);
                    setShowBottomSheet(null);
                  }}
                  className={`w-full text-left p-3 rounded-lg ${
                    profileData.sexuality === option ? 'bg-[#67295F] text-white' : 'bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </BottomSheet>
        )}

        {showBottomSheet === 'education' && (
          <BottomSheet title="Select Education">
            <div className="space-y-2">
              {EDUCATION_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    updateProfileData('education', option);
                    setShowBottomSheet(null);
                  }}
                  className={`w-full text-left p-3 rounded-lg ${
                    profileData.education === option ? 'bg-[#67295F] text-white' : 'bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </BottomSheet>
        )}

        {showBottomSheet === 'religion' && (
          <BottomSheet title="Select Religion">
            <div className="space-y-2">
              {RELIGION_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    updateProfileData('religion', option);
                    setShowBottomSheet(null);
                  }}
                  className={`w-full text-left p-3 rounded-lg ${
                    profileData.religion === option ? 'bg-[#67295F] text-white' : 'bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </BottomSheet>
        )}

        {showBottomSheet === 'relationship' && (
          <BottomSheet title="Select Relationship Status">
            <div className="space-y-2">
              {RELATIONSHIP_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    updateProfileData('relationshipStatus', option);
                    setShowBottomSheet(null);
                  }}
                  className={`w-full text-left p-3 rounded-lg ${
                    profileData.relationshipStatus === option ? 'bg-[#67295F] text-white' : 'bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </BottomSheet>
        )}

        {showBottomSheet === 'intent' && (
          <BottomSheet title="Select Dating Intent">
            <div className="space-y-2">
              {INTENT_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    updateProfileData('intent', option);
                    setShowBottomSheet(null);
                  }}
                  className={`w-full text-left p-3 rounded-lg ${
                    profileData.intent === option ? 'bg-[#67295F] text-white' : 'bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </BottomSheet>
        )}

        {showBottomSheet === 'children' && (
          <BottomSheet title="Select Children Status">
            <div className="space-y-2">
              {CHILDREN_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    updateProfileData('children', option);
                    setShowBottomSheet(null);
                  }}
                  className={`w-full text-left p-3 rounded-lg ${
                    profileData.children === option ? 'bg-[#67295F] text-white' : 'bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </BottomSheet>
        )}

        {showBottomSheet === 'familyPlans' && (
          <BottomSheet title="Select Family Plans">
            <div className="space-y-2">
              {FAMILY_PLANS_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    updateProfileData('familyPlans', option);
                    setShowBottomSheet(null);
                  }}
                  className={`w-full text-left p-3 rounded-lg ${
                    profileData.familyPlans === option ? 'bg-[#67295F] text-white' : 'bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </BottomSheet>
        )}

        {showBottomSheet === 'politics' && (
          <BottomSheet title="Select Political View">
            <div className="space-y-2">
              {POLITICS_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    updateProfileData('politics', option);
                    setShowBottomSheet(null);
                  }}
                  className={`w-full text-left p-3 rounded-lg ${
                    profileData.politics === option ? 'bg-[#67295F] text-white' : 'bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </BottomSheet>
        )}

        {showBottomSheet === 'bio' && (
          <BottomSheet title="Add Bio">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Choose a prompt:</h4>
                <div className="space-y-2">
                  {BIO_PROMPTS.map(prompt => (
                    <button
                      key={prompt}
                      onClick={() => updateProfileData('bioPrompt', prompt)}
                      className={`w-full text-left p-3 rounded-lg ${
                        profileData.bioPrompt === prompt ? 'bg-[#67295F] text-white' : 'bg-gray-50'
                      }`}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
              {profileData.bioPrompt && (
                <div>
                  <h4 className="font-semibold mb-2">Your answer:</h4>
                  <textarea
                    value={profileData.bioAnswer}
                    onChange={(e) => updateProfileData('bioAnswer', e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none"
                    rows={4}
                  />
                  <button
                    onClick={() => setShowBottomSheet(null)}
                    className="mt-3 w-full bg-[#67295F] text-white py-3 rounded-lg font-semibold"
                  >
                    Save Bio
                  </button>
                </div>
              )}
            </div>
          </BottomSheet>
        )}

        {showBottomSheet === 'smoking' && (
          <BottomSheet title="Select Smoking Habits">
            <div className="space-y-2">
              {HABIT_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    updateProfileData('smoking', option);
                    setShowBottomSheet(null);
                  }}
                  className={`w-full text-left p-3 rounded-lg ${
                    profileData.smoking === option ? 'bg-[#67295F] text-white' : 'bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </BottomSheet>
        )}

        {showBottomSheet === 'drinking' && (
          <BottomSheet title="Select Drinking Habits">
            <div className="space-y-2">
              {HABIT_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    updateProfileData('drinking', option);
                    setShowBottomSheet(null);
                  }}
                  className={`w-full text-left p-3 rounded-lg ${
                    profileData.drinking === option ? 'bg-[#67295F] text-white' : 'bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </BottomSheet>
        )}

        {showBottomSheet === 'marijuana' && (
          <BottomSheet title="Select Marijuana Habits">
            <div className="space-y-2">
              {HABIT_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    updateProfileData('marijuana', option);
                    setShowBottomSheet(null);
                  }}
                  className={`w-full text-left p-3 rounded-lg ${
                    profileData.marijuana === option ? 'bg-[#67295F] text-white' : 'bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </BottomSheet>
        )}

        {showBottomSheet === 'zodiac' && (
          <BottomSheet title="Select Zodiac Sign">
            <div className="space-y-2">
              {ZODIAC_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    updateProfileData('zodiac', option);
                    setShowBottomSheet(null);
                  }}
                  className={`w-full text-left p-3 rounded-lg ${
                    profileData.zodiac === option ? 'bg-[#67295F] text-white' : 'bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </BottomSheet>
        )}
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <button
          onClick={() => onSave(profileData)}
          className="w-full bg-[#67295F] text-white py-4 rounded-xl font-semibold"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
