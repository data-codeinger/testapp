import { useState } from "react";

interface BlockContactsScreenProps {
  onBack: () => void;
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  isBlocked: boolean;
}

export function BlockContactsScreen({ onBack }: BlockContactsScreenProps) {
  const [activeTab, setActiveTab] = useState<'find' | 'blocked'>('find');
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Sarah Chen', phone: '+1 555-0123', isBlocked: false },
    { id: '2', name: 'Mike Johnson', phone: '+1 555-0124', isBlocked: false },
    { id: '3', name: 'Emma Wilson', phone: '+1 555-0125', isBlocked: true },
    { id: '4', name: 'David Lee', phone: '+1 555-0126', isBlocked: false },
    { id: '5', name: 'Lisa Anderson', phone: '+1 555-0127', isBlocked: true },
  ]);

  const handleBlock = (contactId: string) => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactId ? { ...contact, isBlocked: true } : contact
    ));
  };

  const handleUnblock = (contactId: string) => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactId ? { ...contact, isBlocked: false } : contact
    ));
  };

  const handleSyncContacts = () => {
    // Simulate contact sync
    console.log('Syncing contacts...');
  };

  const unblockedContacts = contacts.filter(c => !c.isBlocked);
  const blockedContacts = contacts.filter(c => c.isBlocked);

  // Filter contacts based on search query
  const filteredUnblockedContacts = unblockedContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );
  
  const filteredBlockedContacts = blockedContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

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
          <h1 className="text-lg font-bold text-[#1A1A1A]">Block Contacts</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-[#FFFFFF] border-b border-[#F2F2F2]">
        <div className="flex">
          <button
            onClick={() => setActiveTab('find')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'find'
                ? 'text-[#67295F] border-b-2 border-[#67295F]'
                : 'text-[#717171]'
            }`}
          >
            Find Contacts
          </button>
          <button
            onClick={() => setActiveTab('blocked')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'blocked'
                ? 'text-[#67295F] border-b-2 border-[#67295F]'
                : 'text-[#717171]'
            }`}
          >
            Blocked List ({blockedContacts.length})
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[#FFFFFF] px-4 py-3 border-b border-[#F2F2F2]">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F8F8F8] border border-[#F2F2F2] rounded-lg text-[#1A1A1A] placeholder:text-[#717171] focus:outline-none focus:ring-2 focus:ring-[#67295F] focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <svg className="w-5 h-5 text-[#717171] hover:text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {activeTab === 'find' && (
          <div className="space-y-4">
            {/* Sync Button */}
            <button
              onClick={handleSyncContacts}
              className="w-full py-3 bg-[#67295F] text-white rounded-lg font-medium"
            >
              Sync Phone Contacts
            </button>

            {/* Contacts List */}
            <div className="space-y-3">
              {filteredUnblockedContacts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[#717171]">
                    {searchQuery ? 'No contacts found' : 'No contacts available'}
                  </p>
                </div>
              ) : (
                filteredUnblockedContacts.map(contact => (
                  <div key={contact.id} className="flex items-center justify-between p-3 border border-[#F2F2F2] rounded-lg">
                    <div>
                      <h4 className="font-medium text-[#1A1A1A]">{contact.name}</h4>
                      <p className="text-sm text-[#717171]">{contact.phone}</p>
                    </div>
                    <button
                      onClick={() => handleBlock(contact.id)}
                      className="px-4 py-2 border border-[#67295F] text-[#67295F] rounded-lg text-sm font-medium hover:bg-[#67295F] hover:text-white transition-colors"
                    >
                      Block
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'blocked' && (
          <div className="space-y-4">
            {filteredBlockedContacts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[#717171]">
                  {searchQuery ? 'No blocked contacts found' : 'No blocked contacts'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredBlockedContacts.map(contact => (
                  <div key={contact.id} className="flex items-center justify-between p-3 border border-[#F2F2F2] rounded-lg">
                    <div>
                      <h4 className="font-medium text-[#1A1A1A]">{contact.name}</h4>
                      <p className="text-sm text-[#717171]">{contact.phone}</p>
                      <p className="text-xs text-[#67295F] mt-1">Blocked</p>
                    </div>
                    <button
                      onClick={() => handleUnblock(contact.id)}
                      className="px-4 py-2 bg-[#67295F] text-white rounded-lg text-sm font-medium hover:bg-[#5A1F4F] transition-colors"
                    >
                      Unblock
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
