import { useState } from "react";
import { motion } from "framer-motion";

interface EditProfileScreenProps {
  onBack: () => void;
  onSave: (profileData: ProfileData) => void;
}

interface ProfileData {
  photos: string[];
  jobTitle: string;
  zodiac: string;
  ethnicity: string;
  ethnicityVisible: boolean;
  languages: string[];
  politics: string;
  politicsVisible: boolean;
  familyPlans: string;
  familyPlansVisible: boolean;
  interestedInGender: string[];
  profileVisibility: string;
  diet: string;
  smoking: string;
  drinking: string;
  datingIntent: string;
  bio: string;
}

const ZODIAC_SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const ETHNICITY_OPTIONS = ['Asian', 'Black/African', 'Hispanic/Latino', 'Middle Eastern', 'Native American', 'Pacific Islander', 'South Asian', 'White/Caucasian', 'Mixed', 'Other'];
const LANGUAGE_OPTIONS = ['English', 'Hindi', 'Marathi', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese', 'Korean'];
const DIET_OPTIONS = ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Eggetarian'];
const HABIT_OPTIONS = ['Yes', 'No', 'Occasionally'];
const DATING_INTENT_OPTIONS = ['Short-term', 'Long-term', 'Figuring out', 'Something casual', 'Something serious', 'Open to exploring'];
const FAMILY_PLANS_OPTIONS = ['Don\'t have', 'Have', 'Prefer not to say'];
const POLITICS_OPTIONS = ['Very Liberal', 'Liberal', 'Moderate', 'Conservative', 'Very Conservative', 'Apolitical'];

export function EditProfileScreen({ onBack, onSave }: EditProfileScreenProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showGenderOverlay, setShowGenderOverlay] = useState(false);
  const [showZodiacPicker, setShowZodiacPicker] = useState(false);
  const [showEthnicityPicker, setShowEthnicityPicker] = useState(false);
  const [showFamilyPlansPicker, setShowFamilyPlansPicker] = useState(false);
  const [showPoliticsPicker, setShowPoliticsPicker] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  
  const [profileData, setProfileData] = useState<ProfileData>({
    photos: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face'
    ],
    jobTitle: 'Software Engineer',
    zodiac: 'Leo',
    ethnicity: 'Asian',
    ethnicityVisible: true,
    languages: ['English', 'Hindi'],
    politics: 'Moderate',
    politicsVisible: true,
    familyPlans: 'Don\'t have',
    familyPlansVisible: true,
    interestedInGender: ['Female'],
    profileVisibility: 'All Genders',
    diet: 'Vegetarian',
    smoking: 'No',
    drinking: 'Occasionally',
    datingIntent: 'Long-term',
    bio: 'Passionate about technology and outdoor adventures. Love hiking, trying new cuisines, and meaningful conversations.'
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSave(profileData);
    setIsSaving(false);
  };

  const handleAddPhoto = () => {
    if (profileData.photos.length < 6) {
      // In a real app, this would open image picker
      const newPhoto = `https://picsum.photos/seed/${Date.now()}/200/200.jpg`;
      setProfileData(prev => ({
        ...prev,
        photos: [...prev.photos, newPhoto]
      }));
    }
  };

  const handleRemovePhoto = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSetMainPhoto = (index: number) => {
    const newPhotos = [...profileData.photos];
    [newPhotos[0], newPhotos[index]] = [newPhotos[index], newPhotos[0]];
    setProfileData(prev => ({ ...prev, photos: newPhotos }));
  };

  const handleAddLanguage = (language: string) => {
    if (!profileData.languages.includes(language)) {
      setProfileData(prev => ({
        ...prev,
        languages: [...prev.languages, language]
      }));
    }
  };

  const handleRemoveLanguage = (language: string) => {
    setProfileData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== language)
    }));
  };

  const handleGenderToggle = (gender: string) => {
    setProfileData(prev => ({
      ...prev,
      interestedInGender: prev.interestedInGender.includes(gender)
        ? prev.interestedInGender.filter(g => g !== gender)
        : [...prev.interestedInGender, gender]
    }));
  };

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
          <h1 className="text-lg font-bold text-[#1A1A1A]">Edit Profile</h1>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="text-[#67295F] font-medium disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Photo Section */}
        <div>
          <h2 className="text-sm font-semibold text-[#1A1A1A] mb-3">Photos (Min 2, Max 6)</h2>
          <div className="grid grid-cols-3 gap-2">
            {profileData.photos.map((photo, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-[#67295F] text-white text-xs px-2 py-1 rounded-full">
                    Main
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  {index !== 0 && (
                    <button
                      onClick={() => handleSetMainPhoto(index)}
                      className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      title="Set as main photo"
                    >
                      <svg className="w-3 h-3 text-[#67295F]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => handleRemovePhoto(index)}
                    className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    title="Remove photo"
                  >
                    <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            {profileData.photos.length < 6 && (
              <button
                onClick={handleAddPhoto}
                className="aspect-square border-2 border-dashed border-[#F2F2F2] rounded-lg flex flex-col items-center justify-center hover:border-[#67295F] transition-colors"
              >
                <svg className="w-6 h-6 text-[#717171] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs text-[#717171]">Add Photo</span>
              </button>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="bg-[#F8F8F8] rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-xs text-[#717171] mb-1">Location</div>
              <div className="text-sm text-[#1A1A1A] truncate">Survey, kharadkar park... Pune, MH 411014</div>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.7 9l-9.1-9.1c-.8-.8-2.1-.8-2.9 0L1.3 9c-.8.8-.8 2.1 0 2.9l9.1 9.1c.8.8 2.1.8 2.9 0l9.1-9.1c.8-.8.8-2.1 0-2.9zM12 15.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
              </svg>
              <span className="text-xs text-[#4285F4]">Google</span>
            </div>
          </div>
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Job Title</label>
          <input
            type="text"
            value={profileData.jobTitle}
            onChange={(e) => setProfileData(prev => ({ ...prev, jobTitle: e.target.value }))}
            className="w-full p-3 border border-[#F2F2F2] rounded-lg text-[#1A1A1A] focus:border-[#67295F] focus:outline-none"
            placeholder="What do you do?"
          />
        </div>

        {/* Zodiac */}
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Zodiac Sign</label>
          <button
            onClick={() => setShowZodiacPicker(true)}
            className="w-full p-3 border border-[#F2F2F2] rounded-lg text-left text-[#1A1A1A] flex items-center justify-between"
          >
            <span>{profileData.zodiac}</span>
            <svg className="w-4 h-4 text-[#717171]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Ethnicity with Visibility Toggle */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-[#1A1A1A]">Ethnicity</label>
            <button
              onClick={() => setProfileData(prev => ({ ...prev, ethnicityVisible: !prev.ethnicityVisible }))}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                profileData.ethnicityVisible ? 'bg-[#67295F]' : 'bg-[#F2F2F2]'
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  profileData.ethnicityVisible ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <button
            onClick={() => setShowEthnicityPicker(true)}
            className="w-full p-3 border border-[#F2F2F2] rounded-lg text-left text-[#1A1A1A] flex items-center justify-between"
          >
            <span>{profileData.ethnicity}</span>
            <svg className="w-4 h-4 text-[#717171]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <p className="text-xs text-[#717171] mt-1">Visible on profile</p>
        </div>

        {/* Languages */}
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Languages</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {profileData.languages.map((language) => (
              <div
                key={language}
                className="bg-[#67295F] text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                <span>{language}</span>
                <button
                  onClick={() => handleRemoveLanguage(language)}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              onClick={() => setShowLanguageSelector(true)}
              className="border border-[#F2F2F2] text-[#1A1A1A] px-3 py-1 rounded-full text-sm hover:border-[#67295F] transition-colors"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Interested In Gender */}
        <div>
          <button
            onClick={() => setShowGenderOverlay(true)}
            className="w-full p-3 border border-[#F2F2F2] rounded-lg text-left text-[#1A1A1A] flex items-center justify-between"
          >
            <span>Interested in: {profileData.interestedInGender.join(', ')}</span>
            <svg className="w-4 h-4 text-[#717171]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Profile Visibility */}
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Profile Visibility</label>
          <div className="flex gap-2">
            {['All Genders', 'Non-Binary Only'].map((option) => (
              <button
                key={option}
                onClick={() => setProfileData(prev => ({ ...prev, profileVisibility: option }))}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  profileData.profileVisibility === option
                    ? 'bg-[#67295F] text-white'
                    : 'border border-[#F2F2F2] text-[#1A1A1A] hover:bg-[#F2F2F2]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Lifestyle Section */}
        <div>
          <h2 className="text-sm font-semibold text-[#1A1A1A] mb-3">Lifestyle</h2>
          
          {/* Diet */}
          <div className="mb-4">
            <label className="block text-sm text-[#717171] mb-2">Diet</label>
            <div className="flex flex-wrap gap-2">
              {DIET_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => setProfileData(prev => ({ ...prev, diet: option }))}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    profileData.diet === option
                      ? 'bg-[#67295F] text-white'
                      : 'border border-[#F2F2F2] text-[#1A1A1A] hover:bg-[#F2F2F2]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Smoking */}
          <div className="mb-4">
            <label className="block text-sm text-[#717171] mb-2">Smoking</label>
            <div className="flex flex-wrap gap-2">
              {HABIT_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => setProfileData(prev => ({ ...prev, smoking: option }))}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    profileData.smoking === option
                      ? 'bg-[#67295F] text-white'
                      : 'border border-[#F2F2F2] text-[#1A1A1A] hover:bg-[#F2F2F2]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Drinking */}
          <div>
            <label className="block text-sm text-[#717171] mb-2">Drinking</label>
            <div className="flex flex-wrap gap-2">
              {HABIT_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => setProfileData(prev => ({ ...prev, drinking: option }))}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    profileData.drinking === option
                      ? 'bg-[#67295F] text-white'
                      : 'border border-[#F2F2F2] text-[#1A1A1A] hover:bg-[#F2F2F2]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dating Intent */}
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Dating Intent</label>
          <div className="flex flex-wrap gap-2">
            {DATING_INTENT_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => setProfileData(prev => ({ ...prev, datingIntent: option }))}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  profileData.datingIntent === option
                    ? 'bg-[#67295F] text-white'
                    : 'border border-[#F2F2F2] text-[#1A1A1A] hover:bg-[#F2F2F2]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Bio</label>
          <div className="relative">
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value.slice(0, 200) }))}
              className="w-full p-3 border border-[#F2F2F2] rounded-lg text-[#1A1A1A] resize-none focus:border-[#67295F] focus:outline-none"
              rows={4}
              placeholder="Tell us about yourself..."
              maxLength={200}
            />
            <div className={`absolute bottom-2 right-2 text-xs ${
              profileData.bio.length > 180 ? 'text-[#67295F]' : 'text-[#717171]'
            }`}>
              {profileData.bio.length}/200
            </div>
          </div>
        </div>
      </div>

      {/* Gender Preference Overlay */}
      {showGenderOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowGenderOverlay(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-2xl p-6 m-4 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Interested in Gender</h3>
            <div className="space-y-3">
              {['Male', 'Female', 'Both'].map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileData.interestedInGender.includes(option)}
                    onChange={() => handleGenderToggle(option)}
                    className="w-5 h-5 text-[#67295F] rounded focus:ring-[#67295F]"
                  />
                  <span className="text-[#1A1A1A]">{option}</span>
                </label>
              ))}
            </div>
            <button
              onClick={() => setShowGenderOverlay(false)}
              className="w-full bg-[#67295F] text-white py-2 rounded-lg font-medium mt-4 hover:bg-opacity-90 transition-colors"
            >
              Done
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Zodiac Picker */}
      {showZodiacPicker && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowZodiacPicker(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-2xl p-6 m-4 max-w-sm w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Select Zodiac Sign</h3>
            <div className="grid grid-cols-2 gap-2">
              {ZODIAC_SIGNS.map((sign) => (
                <button
                  key={sign}
                  onClick={() => {
                    setProfileData(prev => ({ ...prev, zodiac: sign }));
                    setShowZodiacPicker(false);
                  }}
                  className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                    profileData.zodiac === sign
                      ? 'bg-[#67295F] text-white'
                      : 'border border-[#F2F2F2] text-[#1A1A1A] hover:bg-[#F2F2F2]'
                  }`}
                >
                  {sign}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Ethnicity Picker */}
      {showEthnicityPicker && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowEthnicityPicker(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-2xl p-6 m-4 max-w-sm w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Select Ethnicity</h3>
            <div className="space-y-2">
              {ETHNICITY_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setProfileData(prev => ({ ...prev, ethnicity: option }));
                    setShowEthnicityPicker(false);
                  }}
                  className={`w-full p-2 rounded-lg text-sm font-medium transition-colors text-left ${
                    profileData.ethnicity === option
                      ? 'bg-[#67295F] text-white'
                      : 'border border-[#F2F2F2] text-[#1A1A1A] hover:bg-[#F2F2F2]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Language Selector */}
      {showLanguageSelector && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowLanguageSelector(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-2xl p-6 m-4 max-w-sm w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Select Languages</h3>
            <div className="space-y-2">
              {LANGUAGE_OPTIONS.map((language) => (
                <button
                  key={language}
                  onClick={() => handleAddLanguage(language)}
                  disabled={profileData.languages.includes(language)}
                  className={`w-full p-2 rounded-lg text-sm font-medium transition-colors text-left ${
                    profileData.languages.includes(language)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border border-[#F2F2F2] text-[#1A1A1A] hover:bg-[#F2F2F2]'
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
