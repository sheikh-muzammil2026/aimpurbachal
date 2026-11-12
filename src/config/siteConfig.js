/**
 * Centralized Institutional & Site Configuration Module
 * -----------------------------------------------------
 * Drives both Frontend (RSC & Client Components) and Backend (API routes, auth, print/PDF helpers)
 * via environment variables with safe fallback defaults.
 *
 * SECURITY NOTE:
 * - Frontend-accessible values use `NEXT_PUBLIC_*` variables.
 * - Backend-only values (such as `MONGODB_DB_NAME`) NEVER use `NEXT_PUBLIC_*` and are only
 *   resolved on the server (`typeof window === "undefined"`).
 */

export const siteConfig = {
  institution: {
    nameBn:
      process.env.NEXT_PUBLIC_INSTITUTION_NAME_BN ||
      "আস সালাম আইডিয়াল মাদরাসা (এইম) পূর্বাচল",
    nameEn:
      process.env.NEXT_PUBLIC_INSTITUTION_NAME_EN ||
      "As-Salam Ideal Madrasah (AIM) Purbachal",
    nameAr:
      process.env.NEXT_PUBLIC_INSTITUTION_NAME_AR ||
      "مدرسة السلام المثالية (إيم) بورباتشال",
    shortName:
      process.env.NEXT_PUBLIC_INSTITUTION_SHORT_NAME || "AIM Purbachal",
    shortNameBn:
      process.env.NEXT_PUBLIC_INSTITUTION_SHORT_NAME_BN || "এইম পূর্বাচল",
    acronym: process.env.NEXT_PUBLIC_INSTITUTION_ACRONYM || "AIM",
    campusNameBn:
      process.env.NEXT_PUBLIC_INSTITUTION_CAMPUS_BN || "পূর্বাচল ক্যাম্পাস",
    campusNameEn:
      process.env.NEXT_PUBLIC_INSTITUTION_CAMPUS_EN || "Purbachal Campus",
    slogan:
      process.env.NEXT_PUBLIC_INSTITUTION_SLOGAN_EN ||
      "In Search of Desired Knowledge",
    sloganBn:
      process.env.NEXT_PUBLIC_INSTITUTION_SLOGAN_BN ||
      "AIM For Ultimate Success",
    sloganAr:
      process.env.NEXT_PUBLIC_INSTITUTION_SLOGAN_AR ||
      "AIM For Ultimate Success",
    foundedYear:
      process.env.NEXT_PUBLIC_INSTITUTION_FOUNDED_YEAR || "2024",
    foundedYearBn:
      process.env.NEXT_PUBLIC_INSTITUTION_FOUNDED_YEAR_BN || "২০২৪",
    eiin: process.env.NEXT_PUBLIC_INSTITUTION_EIIN || "১৩৮৫৬৯",
    eiinEn: process.env.NEXT_PUBLIC_INSTITUTION_EIIN_EN || "138569",
    govRegNo:
      process.env.NEXT_PUBLIC_INSTITUTION_GOV_REG_NO || "৪৫৮৭৯৬৩২",
    govRegNoEn:
      process.env.NEXT_PUBLIC_INSTITUTION_GOV_REG_NO_EN || "45879632",
    descriptionBn:
      process.env.NEXT_PUBLIC_INSTITUTION_DESCRIPTION_BN ||
      "এইম পূর্বাচল বিদেশী বিশ্ববিদ্যালয় থেকে ডিগ্রি প্রাপ্ত অভিজ্ঞ শিক্ষকমন্ডলী দ্বারা পরিচালিত একটি আধুনিক শিক্ষাপ্রতিষ্ঠান।",
    descriptionEn:
      process.env.NEXT_PUBLIC_INSTITUTION_DESCRIPTION_EN ||
      "As-Salam Ideal Madrasah (AIM) Purbachal - Combining Islamic and modern education to build ideal citizens for the world and the Hereafter.",
    descriptionAr:
      process.env.NEXT_PUBLIC_INSTITUTION_DESCRIPTION_AR ||
      "مؤسسة تعليمية حديثة تجمع بين العلوم الإسلامية والعصرية لبناء جيل صالح للدنيا والآخرة.",
  },

  branding: {
    logo: process.env.NEXT_PUBLIC_BRAND_LOGO || "/logo-full-trimmed.png",
    iconLogo: process.env.NEXT_PUBLIC_BRAND_ICON_LOGO || "/aimlogo1.png",
    banner: process.env.NEXT_PUBLIC_BRAND_BANNER || "/bannar.png",
    bannerRoutine:
      process.env.NEXT_PUBLIC_BRAND_BANNER_ROUTINE || "/banner_routine.png",
    bannerAlt:
      process.env.NEXT_PUBLIC_BRAND_BANNER_ALT || "aimpurbachal",
    favicon: process.env.NEXT_PUBLIC_BRAND_FAVICON || "/favicon.ico",
    ogImage: process.env.NEXT_PUBLIC_BRAND_OG_IMAGE || "/og-image.jpg",
    principalSignature:
      process.env.NEXT_PUBLIC_PRINCIPAL_SIGNATURE || "/principle's_signature.png",
    controllerSignature:
      process.env.NEXT_PUBLIC_CONTROLLER_SIGNATURE || "/principle's_signature.png",
  },

  theme: {
    primaryColor: process.env.NEXT_PUBLIC_THEME_PRIMARY_COLOR || "#00695C",
    secondaryColor: process.env.NEXT_PUBLIC_THEME_SECONDARY_COLOR || "#10B981",
    accentColor: process.env.NEXT_PUBLIC_THEME_ACCENT_COLOR || "#D4AF37",
    darkBgColor: process.env.NEXT_PUBLIC_THEME_DARK_BG_COLOR || "#022C22",
  },

  contact: {
    addressBn:
      process.env.NEXT_PUBLIC_CONTACT_ADDRESS_BN ||
      "কাজিরবাগ (পূর্বাচল সংলগ্ন), রূপগঞ্জ, নারায়ণগঞ্জ।",
    addressEn:
      process.env.NEXT_PUBLIC_CONTACT_ADDRESS_EN ||
      "Kazirbag (Adjacent to Purbachal), Rupganj, Narayanganj.",
    addressAr:
      process.env.NEXT_PUBLIC_CONTACT_ADDRESS_AR ||
      "كازيرباغ (مجاور لبورباتشال)، روب غنج، ناريان غنج.",
    shortAddressBn:
      process.env.NEXT_PUBLIC_CONTACT_SHORT_ADDRESS_BN ||
      "কাজিরবাগ (পূর্বাচল সংলগ্ন), রূপগঞ্জ, নারায়ণগঞ্জ",
    shortAddressEn:
      process.env.NEXT_PUBLIC_CONTACT_SHORT_ADDRESS_EN ||
      "Kazirbag (Adjacent to Purbachal), Rupganj, Narayanganj",
    upazilaBn: process.env.NEXT_PUBLIC_CONTACT_UPAZILA_BN || "রূপগঞ্জ",
    upazilaEn: process.env.NEXT_PUBLIC_CONTACT_UPAZILA_EN || "Rupganj",
    districtBn: process.env.NEXT_PUBLIC_CONTACT_DISTRICT_BN || "নারায়ণগঞ্জ",
    districtEn: process.env.NEXT_PUBLIC_CONTACT_DISTRICT_EN || "Narayanganj",
    phonePrimary:
      process.env.NEXT_PUBLIC_CONTACT_PHONE_PRIMARY || "01715926164",
    phonePrimaryBn:
      process.env.NEXT_PUBLIC_CONTACT_PHONE_PRIMARY_BN || "০১৭১৫-৯২৬১৬৪",
    phonePrimaryDisplay:
      process.env.NEXT_PUBLIC_CONTACT_PHONE_PRIMARY_DISPLAY ||
      "+880 1715-926164",
    phoneSecondary:
      process.env.NEXT_PUBLIC_CONTACT_PHONE_SECONDARY || "01831572652",
    phoneSecondaryBn:
      process.env.NEXT_PUBLIC_CONTACT_PHONE_SECONDARY_BN || "০১৮৩১-৫৭২৬৫২",
    phoneOfficeDisplayBn:
      process.env.NEXT_PUBLIC_CONTACT_PHONE_OFFICE_BN ||
      "+৮৮০ ১৭১৫-৯২৬১৬৪, +৮৮০ ১৮৩১-৫৭২৬৫২",
    whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "8801715926164",
    whatsappLocal:
      process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_LOCAL || "01715926164",
    whatsappDisplay:
      process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY || "01715-926164",
    whatsappDisplayBn:
      process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY_BN || "০১৭১৫-৯২৬১৬৪",
    email:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL || "aimpurbachal@gmail.com",
    supportHoursBn:
      process.env.NEXT_PUBLIC_CONTACT_SUPPORT_HOURS_BN ||
      "সকাল ৮:০০ থেকে রাত ৮:০০ (শুক্রবার বন্ধ)",
    supportHoursEn:
      process.env.NEXT_PUBLIC_CONTACT_SUPPORT_HOURS_EN ||
      "8:00 AM to 8:00 PM (Closed on Friday)",
    baseUrl: process.env.NEXT_PUBLIC_BASE_URI || "http://localhost:3000",
    serverApiUrl:
      process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:5000",
    websiteDomain:
      process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || "www.aimpurbachal.com",
  },

  social: {
    facebookUrl:
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_URL ||
      "https://www.facebook.com/aimpurbachal",
    facebookHandle:
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_HANDLE || "fb.com/aimpurbachal",
    youtubeUrl:
      process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL ||
      "https://www.youtube.com/@aimpurbachal",
    youtubeHandle:
      process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_HANDLE || "@aimpurbachal",
    linkedinUrl:
      process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN_URL ||
      "https://www.linkedin.com/company/aimpurbachal",
  },

  academic: {
    currentYearBn:
      process.env.NEXT_PUBLIC_ACADEMIC_YEAR_BN || "২০২৬",
    currentYearEn:
      process.env.NEXT_PUBLIC_ACADEMIC_YEAR_EN || "2026",
    hijriYearBn:
      process.env.NEXT_PUBLIC_HIJRI_YEAR_BN || "১৪৪৭-৪৮ হিজরি",
    banglaYearBn:
      process.env.NEXT_PUBLIC_BANGLA_YEAR_BN || "১৪৩২-৩৩ বঙ্গাব্দ",
    currencySymbol:
      process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "৳",
    currencyCode:
      process.env.NEXT_PUBLIC_CURRENCY_CODE || "BDT",
    resultPortalEnabled:
      process.env.NEXT_PUBLIC_RESULT_PORTAL_ENABLED !== "false",
  },

  payment: {
    bkashNumber:
      process.env.NEXT_PUBLIC_PAYMENT_BKASH_NUMBER || "01715-926164",
    bkashNumberBn:
      process.env.NEXT_PUBLIC_PAYMENT_BKASH_NUMBER_BN || "০১৭১৫-৯২৬১৬৪",
    nagadNumber:
      process.env.NEXT_PUBLIC_PAYMENT_NAGAD_NUMBER || "01831-572652",
    nagadNumberBn:
      process.env.NEXT_PUBLIC_PAYMENT_NAGAD_NUMBER_BN || "০১৮৩১-৫৭২৬৫২",
    bankNameBn:
      process.env.NEXT_PUBLIC_PAYMENT_BANK_NAME_BN ||
      "ইসলামী ব্যাংক বাংলাদেশ পিএলসি",
    bankNameEn:
      process.env.NEXT_PUBLIC_PAYMENT_BANK_NAME_EN ||
      "Islami Bank Bangladesh PLC",
    bankAccountNameBn:
      process.env.NEXT_PUBLIC_PAYMENT_BANK_ACCOUNT_NAME_BN ||
      "আস সালাম আইডিয়াল মাদরাসা (এইম) পূর্বাচল",
    bankAccountNameEn:
      process.env.NEXT_PUBLIC_PAYMENT_BANK_ACCOUNT_NAME_EN ||
      "As-Salam Ideal Madrasah (AIM) Purbachal",
    bankAccountNoBn:
      process.env.NEXT_PUBLIC_PAYMENT_BANK_ACCOUNT_NO_BN ||
      "২০৫০ ২১৭০ ২০০০ ৪৫৮০৯",
    bankAccountNoEn:
      process.env.NEXT_PUBLIC_PAYMENT_BANK_ACCOUNT_NO_EN ||
      "2050 2170 2000 45809",
    bankBranchBn:
      process.env.NEXT_PUBLIC_PAYMENT_BANK_BRANCH_BN ||
      "পূর্বাচল শাখা, নারায়ণগঞ্জ",
    bankBranchEn:
      process.env.NEXT_PUBLIC_PAYMENT_BANK_BRANCH_EN ||
      "Purbachal Branch, Narayanganj",
    bankRoutingNoBn:
      process.env.NEXT_PUBLIC_PAYMENT_BANK_ROUTING_NO_BN || "১২৫৬৭০৮৯২",
  },

  geofence: {
    lat: parseFloat(process.env.NEXT_PUBLIC_MADRASA_LAT || "23.860061"),
    lng: parseFloat(process.env.NEXT_PUBLIC_MADRASA_LNG || "90.546755"),
    radiusMeters: parseInt(
      process.env.NEXT_PUBLIC_MADRASA_RADIUS || "15",
      10
    ),
  },

  // Server-only database configuration (never exposed to browser bundle)
  db: {
    name:
      typeof window === "undefined"
        ? process.env.MONGODB_DB_NAME || "aimpurbachal"
        : undefined,
  },
};

export default siteConfig;
