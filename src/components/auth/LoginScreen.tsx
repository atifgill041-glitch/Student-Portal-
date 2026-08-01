import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Sparkles, Shield, GraduationCap, UserCheck, Lock, User, ArrowRight, KeyRound, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../../types';

export const LoginScreen: React.FC = () => {
  const { login, students } = useAcademy();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [username, setUsername] = useState('FEI-2026-089');
  const [password, setPassword] = useState('quran123');
  const [errorMsg, setErrorMsg] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleStudentMode = () => {
    setSelectedRole('student');
    setUsername('FEI-2026-089');
    setPassword('quran123');
    setErrorMsg('');
  };

  const handleAdminMode = () => {
    setSelectedRole('admin');
    setUsername('ADMIN-DIRECTOR');
    setPassword('admin123');
    setErrorMsg('');
  };

  const handleTeacherMode = () => {
    setSelectedRole('teacher');
    setUsername('TEACHER-101');
    setPassword('quran123');
    setErrorMsg('');
  };

  const handleLoginSubmit = (e: React.FormEvent, roleOverride?: UserRole) => {
    e.preventDefault();
    setErrorMsg('');

    const targetRole = roleOverride || selectedRole;
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    if (!cleanUsername) {
      setErrorMsg('Please enter a valid Username or Registration ID.');
      return;
    }

    if (!cleanPassword) {
      setErrorMsg('Please enter your account password.');
      return;
    }

    // Role-based credential verification
    if (targetRole === 'admin') {
      const isUserMatch =
        cleanUsername.toLowerCase() === 'admin-director' ||
        cleanUsername.toLowerCase() === 'admin' ||
        cleanUsername.toLowerCase() === 'director' ||
        cleanUsername.toLowerCase().includes('admin');
      
      const isPassMatch = cleanPassword === 'admin123' || cleanPassword === 'admin' || cleanPassword.length >= 4;

      if (!isUserMatch || !isPassMatch) {
        setErrorMsg('Invalid Admin Credentials. Use Admin ID: ADMIN-DIRECTOR and Password: admin123');
        return;
      }

      login('admin', 'admin-001');
      return;
    }

    if (targetRole === 'teacher') {
      const isUserMatch =
        cleanUsername.toLowerCase() === 'teacher-101' ||
        cleanUsername.toLowerCase() === 'teacher' ||
        cleanUsername.toLowerCase().includes('teacher');
      
      const isPassMatch = cleanPassword === 'quran123' || cleanPassword.length >= 4;

      if (!isUserMatch || !isPassMatch) {
        setErrorMsg('Invalid Teacher Credentials. Use Teacher ID: TEACHER-101 and Password: quran123');
        return;
      }

      login('teacher', 't-101');
      return;
    }

    // Student role login matching
    let stId = 'st-001';
    const found = students.find(
      (s) =>
        s.registrationNumber.toLowerCase() === cleanUsername.toLowerCase() ||
        s.email.toLowerCase() === cleanUsername.toLowerCase() ||
        s.name.toLowerCase().includes(cleanUsername.toLowerCase())
    );

    if (found) {
      stId = found.id;
    }

    login('student', stId);
  };

  const fillDemoAccount = (role: UserRole, id: string = 'st-001', reg: string = 'FEI-2026-089', pass: string = 'quran123') => {
    setSelectedRole(role);
    setUsername(reg);
    setPassword(pass);
    login(role, id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decorative Stars / Geometric Rings */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md z-10">
        
        {/* Main Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-emerald-100 dark:border-gray-800 overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 p-8 text-center text-white relative">
            
            {/* Logo Emblem */}
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 shadow-xl flex items-center justify-center border-4 border-amber-200 mb-4 relative">
              <span className="text-emerald-950 font-serif font-black text-4xl">ف</span>
              <Sparkles className="w-5 h-5 text-amber-100 absolute -top-1 -right-1 animate-pulse" />
            </div>

            <h1 className="font-serif font-bold text-2xl tracking-wide text-white drop-shadow">
              Faizan-e-Ilm
            </h1>
            <p className="text-amber-300 font-semibold text-xs tracking-widest uppercase mt-0.5">
              Online Academy Learning Portal
            </p>
            <p className="text-emerald-200 text-xs mt-2 font-serif font-light">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ • Knowledge, Tajweed & Quranic Excellence
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div className="grid grid-cols-3 bg-emerald-950/20 p-2 border-b border-gray-100 dark:border-gray-800 gap-1.5">
            <button
              type="button"
              onClick={handleStudentMode}
              className={`py-2.5 px-3 rounded-2xl font-bold text-xs transition flex items-center justify-center space-x-1.5 ${
                selectedRole === 'student'
                  ? 'bg-emerald-800 text-white shadow-lg ring-2 ring-emerald-500'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 border border-emerald-100'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Student</span>
            </button>

            <button
              type="button"
              onClick={handleTeacherMode}
              className={`py-2.5 px-3 rounded-2xl font-bold text-xs transition flex items-center justify-center space-x-1.5 ${
                selectedRole === 'teacher'
                  ? 'bg-emerald-800 text-white shadow-lg ring-2 ring-emerald-500'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 border border-emerald-100'
              }`}
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Teacher</span>
            </button>

            <button
              type="button"
              onClick={handleAdminMode}
              className={`py-2.5 px-3 rounded-2xl font-bold text-xs transition flex items-center justify-center space-x-1.5 ${
                selectedRole === 'admin'
                  ? 'bg-amber-600 text-emerald-950 shadow-lg ring-2 ring-amber-400'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-50 border border-emerald-100'
              }`}
            >
              <Shield className="w-4 h-4 text-emerald-950" />
              <span>Admin</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={(e) => handleLoginSubmit(e)} className="p-6 space-y-4">
            
            {errorMsg && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-rose-700 dark:text-rose-300 rounded-xl text-xs font-semibold">
                ⚠️ {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                {selectedRole === 'student'
                  ? 'Student Username / Registration ID'
                  : selectedRole === 'admin'
                  ? 'Admin Username'
                  : 'Teacher ID / Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={selectedRole === 'student' ? 'e.g. FEI-2026-089' : 'e.g. ADMIN-DIRECTOR'}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none dark:text-white font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none dark:text-white font-medium"
                />
              </div>

              {/* Credential Hint */}
              <div className="mt-2 p-2.5 bg-emerald-50/70 dark:bg-gray-800/80 rounded-xl border border-emerald-100 dark:border-gray-700 text-[11px] text-emerald-950 dark:text-emerald-200 flex items-center justify-between">
                <span className="font-semibold text-gray-500">Demo Login Info:</span>
                <span className="font-mono font-bold">
                  {selectedRole === 'student' && 'User: FEI-2026-089 | Pass: quran123'}
                  {selectedRole === 'teacher' && 'User: TEACHER-101 | Pass: quran123'}
                  {selectedRole === 'admin' && 'User: ADMIN-DIRECTOR | Pass: admin123'}
                </span>
              </div>
            </div>

            {/* Direct Login Action Buttons */}
            <div className="space-y-2 pt-2">
              {selectedRole === 'student' ? (
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 hover:from-emerald-900 hover:to-emerald-950 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-900/30 flex items-center justify-center space-x-2 transition transform active:scale-98"
                >
                  <GraduationCap className="w-4 h-4 text-amber-300" />
                  <span>Login as Student</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              ) : selectedRole === 'admin' ? (
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-emerald-950 rounded-2xl font-black text-sm shadow-lg shadow-amber-600/30 flex items-center justify-center space-x-2 transition transform active:scale-98"
                >
                  <Shield className="w-4 h-4 text-emerald-950" />
                  <span>Login as Admin</span>
                  <ArrowRight className="w-4 h-4 text-emerald-950" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-800 text-white rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center space-x-2"
                >
                  <UserCheck className="w-4 h-4 text-amber-300" />
                  <span>Login as Teacher</span>
                </button>
              )}
            </div>
          </form>

          {/* Quick Demo Credentials Access Section */}
          <div className="px-6 pb-6 pt-3 border-t border-gray-100 dark:border-gray-800 bg-emerald-50/40 dark:bg-gray-800/40">
            <p className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider mb-2 text-center">
              ⚡ 1-Click Direct Demo Login
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillDemoAccount('student', 'st-001', 'FEI-2026-089', 'quran123')}
                className="p-2 bg-white dark:bg-gray-800 border border-emerald-300 dark:border-gray-700 rounded-xl hover:border-emerald-600 text-emerald-900 dark:text-emerald-200 text-center shadow-xs flex flex-col items-center justify-center space-y-0.5"
              >
                <GraduationCap className="w-4 h-4 text-emerald-700" />
                <span className="font-bold text-[11px]">Student</span>
                <span className="text-[9px] text-gray-500 font-mono">FEI-2026-089</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemoAccount('teacher', 't-101', 'TEACHER-101', 'quran123')}
                className="p-2 bg-white dark:bg-gray-800 border border-emerald-300 dark:border-gray-700 rounded-xl hover:border-emerald-600 text-emerald-900 dark:text-emerald-200 text-center shadow-xs flex flex-col items-center justify-center space-y-0.5"
              >
                <UserCheck className="w-4 h-4 text-emerald-700" />
                <span className="font-bold text-[11px]">Teacher</span>
                <span className="text-[9px] text-gray-500 font-mono">TEACHER-101</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemoAccount('admin', '', 'ADMIN-DIRECTOR', 'admin123')}
                className="p-2 bg-amber-100/70 dark:bg-gray-800 border border-amber-300 dark:border-gray-700 rounded-xl hover:border-amber-500 font-bold text-amber-950 dark:text-amber-300 text-center shadow-xs flex flex-col items-center justify-center space-y-0.5"
              >
                <Shield className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-[11px]">Admin</span>
                <span className="text-[9px] text-amber-800 dark:text-amber-400 font-mono">DIRECTOR</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-emerald-200/80 mt-6">
          🔒 Encrypted 256-bit Portal Connection • Faizan-e-Ilm Support: +92 300 1234567
        </p>

      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-emerald-800">
              <KeyRound className="w-6 h-6 text-amber-500" />
              <h3 className="font-bold text-base">Reset Portal Password</h3>
            </div>
            {resetSent ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs space-y-2">
                <p className="font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Password Reset Email Sent!</span>
                </p>
                <p>Instructions have been sent to your registered email/WhatsApp contact.</p>
                <button
                  onClick={() => {
                    setForgotModalOpen(false);
                    setResetSent(false);
                  }}
                  className="w-full py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold mt-2"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Enter your registered Student ID or Email address to receive password reset link:
                </p>
                <input
                  type="text"
                  placeholder="FEI-2026-089 or student@gmail.com"
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => setForgotModalOpen(false)}
                    className="w-1/2 py-2 text-xs font-semibold text-gray-500 border rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setResetSent(true)}
                    className="w-1/2 py-2 text-xs font-bold bg-emerald-800 text-white rounded-xl"
                  >
                    Send Reset Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
