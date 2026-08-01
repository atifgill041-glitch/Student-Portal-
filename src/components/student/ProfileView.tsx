import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { User, Globe, Mail, Phone, Lock, Save, CheckCircle2, Shield } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { activeStudent, updateStudent } = useAcademy();

  if (!activeStudent) return null;

  const [formData, setFormData] = useState({
    name: activeStudent.name,
    parentName: activeStudent.parentName,
    email: activeStudent.email,
    whatsapp: activeStudent.whatsapp,
    country: activeStudent.country,
    countryFlag: activeStudent.countryFlag,
    timezone: activeStudent.timezone,
    password: '••••••••'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudent(activeStudent.id, {
      name: formData.name,
      parentName: formData.parentName,
      email: formData.email,
      whatsapp: formData.whatsapp,
      country: formData.country,
      countryFlag: formData.countryFlag,
      timezone: formData.timezone
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const countries = [
    { name: 'United States', flag: '🇺🇸', tz: 'EST (UTC-5)' },
    { name: 'United Kingdom', flag: '🇬🇧', tz: 'GMT (UTC+0)' },
    { name: 'United Arab Emirates', flag: '🇦🇪', tz: 'GST (UTC+4)' },
    { name: 'Pakistan', flag: '🇵🇰', tz: 'PKT (UTC+5)' },
    { name: 'Canada', flag: '🇨🇦', tz: 'EST (UTC-5)' },
    { name: 'Australia', flag: '🇦🇺', tz: 'AEST (UTC+10)' },
    { name: 'Saudi Arabia', flag: '🇸🇦', tz: 'AST (UTC+3)' },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-serif text-emerald-950 dark:text-emerald-300 flex items-center space-x-2">
            <User className="w-6 h-6 text-emerald-600" />
            <span>Student & Parent Profile Settings</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your portal account, location details & emergency contact info
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-emerald-100 dark:border-gray-700 shadow-sm space-y-6">
        
        {/* Avatar badge */}
        <div className="flex items-center space-x-4 border-b border-gray-100 dark:border-gray-700 pb-6">
          <img
            src={activeStudent.avatarUrl}
            alt={activeStudent.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow"
          />
          <div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">{activeStudent.name}</h3>
            <p className="text-xs text-gray-400 font-mono">Reg No: {activeStudent.registrationNumber}</p>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 rounded-2xl text-xs font-bold flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Profile settings updated successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
              Student Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs font-medium text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
              Parent / Guardian Name
            </label>
            <input
              type="text"
              required
              value={formData.parentName}
              onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
              className="w-full p-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs font-medium text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs font-medium text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
              WhatsApp Number
            </label>
            <input
              type="text"
              required
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full p-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs font-medium text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
              Country of Residence
            </label>
            <select
              value={formData.country}
              onChange={(e) => {
                const found = countries.find((c) => c.name === e.target.value);
                if (found) {
                  setFormData({
                    ...formData,
                    country: found.name,
                    countryFlag: found.flag,
                    timezone: found.tz
                  });
                }
              }}
              className="w-full p-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs font-medium text-gray-900 dark:text-white"
            >
              {countries.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.flag} {c.name} ({c.tz})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
              Timezone
            </label>
            <input
              type="text"
              readOnly
              value={formData.timezone}
              className="w-full p-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-xs font-mono font-bold text-gray-600 dark:text-gray-300 cursor-not-allowed"
            />
          </div>

        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-2xl shadow transition flex items-center space-x-2"
          >
            <Save className="w-4 h-4 text-amber-300" />
            <span>Save Profile Changes</span>
          </button>
        </div>

      </form>

    </div>
  );
};
