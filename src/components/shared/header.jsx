"use client";

import React from "react";
// নোট: আইকনের জন্য lucide-react ব্যবহার করা হয়েছে।
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function Header() {
  return (
    <header className="w-full bg-[#00441B] text-white py-3 px-4 sm:px-6 border-b border-[#D4AF37]/30 shadow-sm font-sans antialiased print:hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        {/* --- বাম পাশে: ৩ ভাষায় মাদ্রাসার নাম ও স্লোগান --- */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          {/* বাংলা ও আরবি নাম একসাথে এক লাইনে বা পাশাপাশি */}
          <div className="flex flex-wrap justify-center md:justify-start items-baseline gap-2.5">
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-wide">
              {siteConfig.institution.nameBn}
            </h1>
            <span className="text-sm sm:text-base font-bold text-[#E8C87C] tracking-wide dir-rtl" style={{ fontFamily: "'Amiri', serif" }}>
              {siteConfig.institution.nameAr}
            </span>
          </div>

          {/* ইংরেজি নাম */}
          <h2 className="text-xs sm:text-sm font-semibold text-gray-300">
            {siteConfig.institution.nameEn}
          </h2>

          {/* স্লোগান */}
          <p className="text-[11px] sm:text-xs font-medium tracking-wider uppercase text-[#E8C87C]/90 italic mt-0.5">
            "{siteConfig.institution.slogan}"
          </p>
        </div>

        {/* --- ডান পাশে: যোগাযোগের তথ্য --- */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-gray-200">
          <a
            href={`tel:+88${siteConfig.contact.phonePrimary}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{siteConfig.contact.phonePrimaryBn}</span>
          </a>

          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{siteConfig.contact.email}</span>
          </a>

          <span className="flex items-center gap-1.5 text-gray-300">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{siteConfig.contact.addressBn}</span>
          </span>
        </div>

      </div>
    </header>
  );
}