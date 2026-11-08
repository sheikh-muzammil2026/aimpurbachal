import Footer from "@/components/public/shared/footer";
import BottomNavbar from "@/components/public/shared/BottomNavbar";
import AIChatbot from "@/components/AIChatbot";
import React from "react";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/public/shared/navbar";

export const metadata = {
  // মেটাডাটা বেস URL (ওপেন গ্রাফ ইমেজের জন্য আবশ্যক)
  metadataBase: new URL("https://aimhabiganj.vercel.app"),

  title: {
    default: "As-Salam Ideal Madrasah (AIM) Purbachal | আস সালাম আইডিয়াল মাদরাসা (এইম) পুর্বাচল",
    template: "%s | As-Salam Ideal Madrasah (AIM) Purbachal",
  },
  description:
    "আধুনিক ও সুশৃঙ্খল আবাসন ব্যবস্থাসহ একাডেমিক শিক্ষা ও ৬ মাসে হিফজ করার এক অনন্য প্রতিষ্ঠান, কাজিরবাগ (পুর্বাচল সংলগ্ন), রূপগঞ্জ, নারায়ণগঞ্জ।",

  // কিওয়ার্ড সংখ্যা ও প্রাসঙ্গিকতা বৃদ্ধি
  keywords: [
    "aimpurbachal",
    "As-Salam Ideal Madrasah (AIM) Purbachal",
    "আস সালাম আইডিয়াল মাদরাসা (এইম) পুর্বাচল",
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
    title: "As-Salam Ideal Madrasah (AIM) Purbachal | আস সালাম আইডিয়াল মাদরাসা (এইম) পুর্বাচল",
    description:
      "আধুনিক ও সুশৃঙ্খল আবাসন ব্যবস্থাসহ একাডেমিক শিক্ষা ও ৬ মাসে হিফজ করার এক অনন্য প্রতিষ্ঠান, কাজিরবাগ (পুর্বাচল সংলগ্ন), রূপগঞ্জ, নারায়ণগঞ্জ।",
    url: "https://aimhabiganj.vercel.app",
    siteName: "As-Salam Ideal Madrasah (AIM) Purbachal",
    images: [
      {
        url: "/og-image.png", // public/og-image.png ফোল্ডারে ১২০০x৬৩০ সাইজের ব্যানার রাখবেন
        width: 1200,
        height: 630,
        alt: "As-Salam Ideal Madrasah (AIM) Purbachal Banner",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },

  // Twitter / X কার্ড মেটাডেটা
  twitter: {
    card: "summary_large_image",
    title: "As-Salam Ideal Madrasah (AIM) Purbachal",
    description:
      "আধুনিক ও সুশৃঙ্খল আবাসন ব্যবস্থাসহ একাডেমিক শিক্ষা ও ৬ মাসে হিফজ করার এক অনন্য প্রতিষ্ঠান।",
    images: ["/og-image.png"],
  },

  // ডুপ্লিকেট ইউআরএল সমস্যা দূর করতে
  alternates: {
    canonical: "https://aimhabiganj.vercel.app",
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


