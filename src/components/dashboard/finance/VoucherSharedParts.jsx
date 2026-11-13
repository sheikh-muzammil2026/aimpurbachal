"use client";

import React from "react";
import Image from "next/image";
import { MdEmail, MdInstallMobile } from "react-icons/md";
import siteConfig from "@/config/siteConfig";

export function resolveVoucherParty(tx, parsePayerName) {
  const isIncome = tx?.type !== "expense";
  const isStudent =
    tx?.payerType === "student" ||
    Boolean(tx?.studentId) ||
    Boolean(tx?.studentName) ||
    Boolean(tx?.payerName && tx.payerName.includes(" / "));

  const parsed = parsePayerName
    ? parsePayerName(tx?.payerName)
    : {
        donorName: tx?.donorName || tx?.payerName || "N/A",
        studentId: tx?.studentId || "",
      };

  const displayName = isStudent
    ? tx?.studentName || parsed.donorName || "N/A"
    : tx?.donorName || parsed.donorName || "N/A";

  const subInfo = isStudent
    ? `${tx?.studentId || parsed.studentId || "N/A"} (${tx?.className || "N/A"})`
    : "দাতা / অনুদানকারী";

  return {
    isIncome,
    isStudent,
    parsed,
    displayName,
    subInfo,
  };
}

export function VoucherHeader({
  bannerClassName = "w-auto object-fill mx-auto max-h-15",
  className = "flex items-center justify-between border-b-2 border-[#C5A059] pb-2",
}) {
  return (
    <div className={className}>
      <div className="rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center border border-green-100 px-2">
        <Image
          src={siteConfig.branding.iconLogo}
          alt={siteConfig.institution.nameEn}
          width={160}
          height={160}
          className="w-25 h-25 object-contain"
        />
      </div>

      <div className="flex-1 text-center min-w-0 px-1">
        <div className="w-full flex justify-center">
          <Image
            src={siteConfig.branding.banner}
            alt={siteConfig.branding.bannerAlt}
            width={500}
            height={40}
            className={bannerClassName}
            priority
          />
        </div>
        <p className="text-[9px] text-slate-600 font-semibold mt-0.5">
          {siteConfig.contact.addressBn}
        </p>
      </div>
    </div>
  );
}
