import Footer from "@/components/public/shared/footer";
import BottomNavbar from "@/components/public/shared/BottomNavbar";
import AIChatbot from "@/components/AIChatbot";
import React from "react";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/public/shared/navbar";
import { siteConfig } from "@/config/siteConfig";

export const metadata = {
  // মেটাডাটা বেস URL (ওপেন গ্রাফ ইমেজের জন্য আবশ্যক)
  metadataBase: new URL(siteConfig.contact.baseUrl),

  title: {
    default: `${siteConfig.institution.nameEn} | ${siteConfig.institution.nameBn}`,
    template: `%s | ${siteConfig.institution.nameEn}`,
  },
  description: siteConfig.institution.descriptionBn,

  // কিওয়ার্ড সংখ্যা ও প্রাসঙ্গিকতা বৃদ্ধি
  keywords: [
    siteConfig.institution.shortName.toLowerCase().replace(/\s+/g, ""),
    siteConfig.institution.nameEn,
    siteConfig.institution.nameBn,
    "পুর্বাচল মাদ্রাসা",
    "Hifz Madrasah Purbachal",
    "Purbachal Islamic School",
    "পুর্বাচল হিফজ মাদ্রাসা",
    "best madrasah in purbachal",
    "ইসলামিক শিক্ষা পুর্বাচল",
  ],

  // Google Search & indexing নির্দেশিকা
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // সোশ্যাল মিডিয়া রিচ বাড়াতে OpenGraph (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    title: `${siteConfig.institution.nameEn} | ${siteConfig.institution.nameBn}`,
    description: siteConfig.institution.descriptionBn,
    url: siteConfig.contact.baseUrl,
    siteName: siteConfig.institution.nameEn,
    images: [
      {
        url: siteConfig.branding.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.institution.nameEn} Banner`,
      },
    ],
    locale: "bn_BD",
    type: "website",
  },

  // Twitter / X কার্ড মেটাডেটা
  twitter: {
    card: "summary_large_image",
    title: siteConfig.institution.nameEn,
    description: siteConfig.institution.descriptionBn,
    images: [siteConfig.branding.ogImage],
  },

  // ডুপ্লিকেট ইউআরএল সমস্যা দূর করতে
  alternates: {
    canonical: siteConfig.contact.baseUrl,
  },
};

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />

      <main className="min-h-screen">{children}</main>

      <BottomNavbar />

      <Footer />
    </div>
  );
};

export default layout;


