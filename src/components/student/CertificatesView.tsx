import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Medal, Printer, Sparkles, ShieldCheck, Download, Award, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Certificate } from '../../types';

export const CertificatesView: React.FC = () => {
  const { certificates, activeStudent } = useAcademy();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  if (!activeStudent) return null;

  const studentCerts = certificates.filter((c) => c.studentId === activeStudent.id);

  const handleDownloadCertificate = (cert: Certificate) => {
    setSelectedCert(cert);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-serif text-emerald-950 dark:text-emerald-300 flex items-center space-x-2">
            <Medal className="w-6 h-6 text-amber-500" />
            <span>Digital Graduation Certificates</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Verified course completion diplomas with QR authenticity codes for <span className="font-bold">{activeStudent.name}</span>
          </p>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studentCerts.length === 0 ? (
          <div className="col-span-2 bg-white dark:bg-gray-800 p-8 text-center rounded-3xl text-gray-400">
            No certificates issued yet. Complete your course & final exam to receive your diploma!
          </div>
        ) : (
          studentCerts.map((cert) => (
            <div
              key={cert.id}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 border-2 border-amber-300 dark:border-amber-600 shadow-md space-y-4 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Crest Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-amber-400 text-emerald-950 font-black flex items-center justify-center font-serif text-xl shadow">
                      ف
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-emerald-950 dark:text-emerald-300">
                        Faizan-e-Ilm Academy
                      </h4>
                      <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">
                        Official Diploma
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-300">
                    {cert.certificateCode}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-gray-900 dark:to-emerald-950/40 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 text-center space-y-2">
                  <span className="text-[10px] font-serif font-bold uppercase text-amber-800 dark:text-amber-300 tracking-widest block">
                    Certificate of Achievement
                  </span>
                  <h3 className="font-bold font-serif text-lg text-emerald-950 dark:text-emerald-200">
                    {cert.studentName}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    has successfully completed the course <span className="font-bold text-emerald-900 dark:text-emerald-300">"{cert.courseName}"</span>
                  </p>
                  <span className="inline-block px-3 py-1 bg-amber-400 text-emerald-950 font-extrabold text-xs rounded-full shadow-xs">
                    {cert.grade}
                  </span>
                </div>

                <div className="flex justify-between text-[11px] text-gray-500 font-mono pt-1">
                  <span>Issued: {cert.issueDate}</span>
                  <span>Instructor: {cert.teacherName}</span>
                </div>

              </div>

              <button
                onClick={() => handleDownloadCertificate(cert)}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-emerald-950 text-white text-xs font-bold rounded-xl transition shadow flex items-center justify-center space-x-1.5"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>View & Print Official Certificate</span>
              </button>

            </div>
          ))
        )}
      </div>

      {/* Full Certificate Modal Viewer */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 border-4 border-amber-400 w-full max-w-2xl rounded-3xl shadow-2xl p-6 sm:p-10 relative space-y-6 text-center my-8">
            
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-1 rounded-full border border-gray-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Print Area */}
            <div id="printable-certificate" className="space-y-6 print:p-8">
              
              {/* Gold Islamic Border Framing */}
              <div className="border-2 border-emerald-800 p-6 rounded-2xl bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 relative">
                
                {/* Crest & Header */}
                <div className="flex flex-col items-center space-y-2 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-emerald-950 font-serif font-black text-3xl shadow-lg flex items-center justify-center border-4 border-amber-200">
                    ف
                  </div>
                  <h1 className="font-serif font-black text-2xl text-emerald-950">
                    Faizan-e-Ilm Online Academy
                  </h1>
                  <p className="text-xs text-amber-700 font-semibold tracking-widest uppercase">
                    International Quranic & Islamic Learning Institute
                  </p>
                </div>

                <div className="my-6 space-y-3">
                  <p className="text-xs uppercase font-serif tracking-widest text-emerald-800 font-bold">
                    This is to certifying that
                  </p>
                  
                  <h2 className="text-2xl sm:text-3xl font-serif font-black text-emerald-950 underline decoration-amber-400 underline-offset-8">
                    {selectedCert.studentName}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-700 max-w-md mx-auto pt-2">
                    has satisfactorily fulfilled all academic requirements, exams, and recitation evaluations to be awarded certification in:
                  </p>

                  <h3 className="text-xl font-serif font-bold text-amber-700 py-2">
                    {selectedCert.courseName}
                  </h3>

                  <p className="text-xs font-bold text-emerald-900 font-mono">
                    Awarded Distinction: {selectedCert.grade}
                  </p>
                </div>

                {/* Signatures & QR Code */}
                <div className="grid grid-cols-3 items-end pt-6 border-t border-emerald-200/80 text-xs text-gray-600">
                  <div className="text-center">
                    <p className="font-serif font-bold text-emerald-950">{selectedCert.teacherName}</p>
                    <p className="text-[10px] text-gray-400 border-t border-gray-300 pt-1 mt-1">Lead Instructor Signature</p>
                  </div>

                  <div className="text-center flex flex-col items-center">
                    {selectedCert.qrCodeUrl && (
                      <img
                        src={selectedCert.qrCodeUrl}
                        alt="QR Verification"
                        className="w-16 h-16 border rounded bg-white p-1"
                      />
                    )}
                    <span className="text-[9px] font-mono font-bold text-amber-700 mt-1">
                      {selectedCert.certificateCode}
                    </span>
                  </div>

                  <div className="text-center">
                    <p className="font-serif font-bold text-emerald-950">Prof. Qari Allama Directorship</p>
                    <p className="text-[10px] text-gray-400 border-t border-gray-300 pt-1 mt-1">Academy Principal Seal</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Actions */}
            <div className="flex justify-center space-x-3 pt-4">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2.5 border rounded-2xl text-xs font-semibold text-gray-600"
              >
                Close Preview
              </button>
              <button
                onClick={handlePrint}
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl text-xs font-bold shadow-lg flex items-center space-x-2"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>Print / Save PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
