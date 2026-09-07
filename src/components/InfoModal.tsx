import React from 'react';
import { X, Bus, MapPin, Compass, ShieldCheck, Heart } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        id="info-modal"
        className="flex flex-col w-full max-w-md max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-sky-700 to-teal-600 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <Bus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">চট্টগ্রাম বাস রুট নির্দেশিকা</h3>
              <p className="text-[11px] text-sky-100">সিটি বাস গাইড ও যাত্রী সহায়িকা</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="বন্ধ করুন"
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4 overflow-y-auto text-sm text-slate-600">
          <div className="rounded-2xl bg-sky-50 border border-sky-100 p-3.5 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sky-900 text-xs uppercase tracking-wider">
              <Compass className="h-4 w-4 text-sky-600" />
              <span>অ্যাপের বৈশিষ্ট্যসমূহ</span>
            </div>
            <ul className="text-xs space-y-1.5 text-slate-700 pl-4 list-disc">
              <li>চট্টগ্রাম শহরের সকল প্রধান ১৪টি বাস রুটের বিস্তারিত তালিকা।</li>
              <li>যে কোনো ২টি স্টপেজের নাম দিলে সরাসরি বা কানেক্টিং বাস খুঁজে বের করা।</li>
              <li>৮০টির বেশি পরিচিত স্টপেজের সম্পূর্ণ তালিকা।</li>
              <li>পছন্দের রুট সহজে সংরক্ষণ ও এক ট্যাপে শেয়ার করার সুবিধা।</li>
              <li>সম্পূর্ণ অফলাইন উপযোগী, কোনো অতিরিক্ত ডেটা খরচ ছাড়াই দ্রুত কাজ করে।</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-rose-500" />
              <span>চট্টগ্রামের প্রধান ট্রানজিট হাবসমূহ</span>
            </h4>
            <div className="text-xs space-y-1.5 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <p>
                <strong>নিউ মার্কেট / কোতোয়ালি:</strong> শহরের প্রধান বাণিজ্যিক ও শপিং কেন্দ্র; ১, ২, ৩, ৪ (বড়), ৫, ৬, ৭ (বড়), ৮ (বড়) ইত্যাদি বাস চলাচল করে।
              </p>
              <p>
                <strong>জিইসি / ২ নম্বর গেট:</strong> শহরের কেন্দ্রীয় সংযোগস্থল; উত্তর ও দক্ষিণমুখী অধিকাংশ বাসের মিলনস্থল।
              </p>
              <p>
                <strong>পতেঙ্গা সি বিচ / বিমানবন্দর:</strong> ৫ নং (বিমানবন্দর), ৬ নং, ১০ নং ও মেট্রো প্রভাতি (সি বিচ)।
              </p>
              <p>
                <strong>একে খান / অলংকার:</strong> ঢাকা-চট্টগ্রাম মহাসড়কের প্রবেশদ্বার; ৭, ৮, ৪ (বড়) ও ১১ নং বাস।
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-100 p-3 text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>প্রদত্ত রুটসমূহ চট্টগ্রাম সিটি কর্পোরেশন ও পরিবহন রুটের প্রমিত তথ্যানুযায়ী সংকলিত।</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-colors"
          >
            ঠিক আছে, বুঝলাম
          </button>
        </div>
      </div>
    </div>
  );
};
