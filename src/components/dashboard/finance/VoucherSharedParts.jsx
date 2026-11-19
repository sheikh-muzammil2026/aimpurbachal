"use client";

import React from "react";
import Image from "next/image";
import siteConfig from "@/config/siteConfig";

export const VOUCHER_FONT_FAMILY = '"Bornomala", "Ubuntu Sans", sans-serif';

export function getVoucherPrintFonts() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return [
    {
      family: "Bornomala",
      source: `url("${origin}/fonts/Bornomala-Regular.woff2") format("woff2")`,
      weight: "400",
      style: "normal",
    },
    {
      family: "Bornomala",
      source: `url("${origin}/fonts/Bornomala-Bold.woff2") format("woff2")`,
      weight: "700",
      style: "normal",
    },
  ];
}

export async function preloadVoucherFonts() {
  if (typeof document === "undefined" || !document.fonts?.load) return;
  try {
    await Promise.allSettled([
      document.fonts.load('400 12px "Bornomala"'),
      document.fonts.load('700 12px "Bornomala"'),
    ]);
  } catch (_) {}
}

export function buildVoucherPageStyle({
  size = "A5 portrait",
  margin = "10mm",
  extraCss = "",
} = {}) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `
    @font-face {
      font-family: "Bornomala";
      src: url("${origin}/fonts/Bornomala-Regular.woff2") format("woff2");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: "Bornomala";
      src: url("${origin}/fonts/Bornomala-Bold.woff2") format("woff2");
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: "Ubuntu Sans";
      src: url("${origin}/fonts/UbuntuSans.woff2") format("woff2");
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }

    @page {
      size: ${size};
      margin: ${margin};
    }

    @media print {
      *,
      *::before,
      *::after {
        box-sizing: border-box !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      html,
      body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        height: auto !important;
        min-height: 0 !important;
        overflow: visible !important;
        background: #ffffff !important;
        color: #000000 !important;
        font-family: "Bornomala", "Ubuntu Sans", sans-serif !important;
      }

      .voucher-print-root,
      .voucher-print-root * {
        font-family: "Bornomala", "Ubuntu Sans", sans-serif !important;
      }

      .voucher-print-root .font-ubuntu,
      .voucher-print-root .font-mono {
        font-family: "Ubuntu Sans", "Bornomala", sans-serif !important;
      }

      .voucher-print-root {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }

      ${extraCss}
    }
  `;
}

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
  logoClassName = "w-14 h-14 print:w-12 print:h-12 object-contain",
  bannerClassName = "w-auto object-contain mx-auto max-h-12 print:max-h-11",
  addressClassName = "text-[9px] print:text-[8.5px] text-slate-600 font-semibold mt-0.5 leading-tight",
  className = "flex items-center justify-between gap-2 border-b-2 border-[#C5A059] pb-2",
}) {
  return (
    <div className={className}>
      <div className="rounded-md overflow-hidden shrink-0 flex items-center justify-center border border-emerald-100 p-1 bg-white">
        <Image
          src={siteConfig.branding.iconLogo}
          alt={siteConfig.institution.nameEn}
          width={96}
          height={96}
          loading="eager"
          className={logoClassName}
        />
      </div>

      <div className="flex-1 text-center min-w-0 px-1">
        <div className="w-full flex justify-center">
          <Image
            src={siteConfig.branding.banner}
            alt={siteConfig.branding.bannerAlt}
            width={500}
            height={48}
            loading="eager"
            className={bannerClassName}
          />
        </div>
        <p className={addressClassName}>{siteConfig.contact.addressBn}</p>
      </div>
    </div>
  );
}
