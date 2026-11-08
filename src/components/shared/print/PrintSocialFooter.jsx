import React from "react";
import { Globe, Mail, Phone } from "lucide-react";
import { BsWhatsapp, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { siteConfig } from "@/config/siteConfig";

export default function PrintSocialFooter({
  className = "pt-1 border-t border-gray-300",
  innerClassName = "flex flex-wrap justify-center items-center gap-x-1 gap-y-0.5 text-[8.5px] font-semibold text-gray-800",
  englishDigits = false,
}) {
  return (
    <div className={className}>
      <div className={innerClassName}>
        <span className="flex items-center gap-0.5">
          <Phone className="w-2.5 h-2.5 text-gray-700" />
          {englishDigits
            ? siteConfig.contact.phoneSecondary
            : siteConfig.contact.phoneSecondaryBn}
        </span>

        <span className="flex items-center gap-0.5">
          <BsWhatsapp className="w-2.5 h-2.5 text-green-600" />
          {englishDigits
            ? siteConfig.contact.whatsappDisplay
            : siteConfig.contact.whatsappDisplayBn}
        </span>

        <span className="flex items-center gap-0.5">
          <Globe className="w-2.5 h-2.5 text-blue-500" />
          {siteConfig.contact.websiteDomain}
        </span>

        <span className="flex items-center gap-0.5">
          <Mail className="w-2.5 h-2.5 text-red-500" />
          {siteConfig.contact.email}
        </span>

        <span className="flex items-center gap-0.5">
          <FaFacebook className="w-2.5 h-2.5 text-blue-600" />
          {siteConfig.social.facebookHandle}
        </span>

        <span className="flex items-center gap-0.5">
          <BsYoutube className="w-2.5 h-2.5 text-red-600" />
          {siteConfig.social.youtubeHandle}
        </span>
      </div>
    </div>
  );
}
