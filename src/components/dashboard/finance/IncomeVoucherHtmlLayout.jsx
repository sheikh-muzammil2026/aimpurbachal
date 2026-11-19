"use client";

import React from "react";
import Image from "next/image";
import PrintSocialFooter from "@/components/shared/print/PrintSocialFooter";
import {
  resolveVoucherParty,
  VOUCHER_FONT_FAMILY,
} from "@/components/dashboard/finance/VoucherSharedParts";
import siteConfig from "@/config/siteConfig";

// English to Bengali digit converter
const toBanglaNum = (val) => {
  if (val === null || val === undefined) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(val).replace(/[0-9]/g, (d) => bnDigits[d]);
};

// Formats a numeric amount with Indian/Bangladeshi comma grouping in Bengali digits
const formatAmountBangla = (num) => {
  if (num === null || num === undefined) return "০";
  const parsed = Number(num) || 0;
  return toBanglaNum(parsed.toLocaleString("en-IN"));
};

// Single Half for Income Voucher (Office Copy or Student/Donor Copy)
function VoucherSingleHalf({
  tx,
  copyType, // "office" | "client"
  formatBanglaNumber,
  parsePayerName,
}) {
  const { isStudent, displayName, subInfo } = resolveVoucherParty(
    tx,
    parsePayerName,
  );

  const bnDigit = formatBanglaNumber || toBanglaNum;

  const copyBadgeBn =
    copyType === "office"
      ? "অফিস কপি"
      : isStudent
        ? "শিক্ষার্থী কপি"
        : "দাতা কপি";
  const copyBadgeEn =
    copyType === "office"
      ? "Office Copy"
      : isStudent
        ? "Student Copy"
        : "Donor Copy";

  const items = Array.isArray(tx.items) && tx.items.length > 0 ? tx.items : [];
  const discount = Number(tx.discount) || 0;
  const grandTotal = Number(tx.totalIncome) || 0;

  return (
    <div
      style={{ fontFamily: VOUCHER_FONT_FAMILY }}
      className="font-bornomala relative w-full h-full bg-white rounded-md border-[1.5px] border-[#C5A059] p-2 overflow-hidden flex flex-col justify-between text-slate-900"
    >
      {/* Faint Circular Institutional Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.05]">
        <Image
          src={siteConfig.branding.iconLogo}
          alt="Watermark Logo"
          width={175}
          height={175}
          loading="eager"
          className="rounded-full object-contain"
        />
      </div>

      {/* Inner Thin Border Frame */}
      <div className="w-full relative z-10 flex-1 border border-slate-200 rounded p-2 flex flex-col justify-between">
        <div>
          {/* 1. Institutional Header (Preserving Project's AIM Purbachal Branding) */}
          <div className="flex items-center justify-between gap-2 border-b-[1.5px] border-[#C5A059] pb-1.5 mb-1.5">
            <div className="w-14 h-14 rounded-full border border-emerald-100 overflow-hidden shrink-0 flex items-center justify-center bg-white p-0.5">
              <Image
                src={siteConfig.branding.iconLogo}
                alt={siteConfig.institution.nameEn}
                width={64}
                height={64}
                loading="eager"
                className="w-full h-full object-contain rounded-full"
              />
            </div>

            <div className="flex-1 text-center min-w-0 px-1">
              <div className="w-full flex justify-center">
                <Image
                  src={siteConfig.branding.banner}
                  alt={siteConfig.branding.bannerAlt}
                  width={500}
                  height={56}
                  loading="eager"
                  className="w-auto max-w-full max-h-12 object-contain mx-auto"
                />
              </div>
              <p className="text-[8.5px] text-slate-600 font-semibold leading-tight mt-0.5">
                {siteConfig.contact.addressBn}
              </p>
            </div>
          </div>

          {/* 2. Title Pill & Copy Type Badge */}
          <div className="flex items-center justify-between gap-2 my-1.5">
            <div className="inline-flex items-center bg-[#064E3B] border border-[#059669] text-white rounded-full px-3 py-0.5 shadow-xs">
              <span className="text-[9.5px] font-bold tracking-wide leading-tight">
                আদায় রসিদ{" "}
                <span className="font-ubuntu text-[8.5px] font-semibold">
                  (INCOME VOUCHER)
                </span>
              </span>
            </div>
            <div className="inline-flex items-center bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] rounded px-2 py-0.5">
              <span className="text-[8.5px] font-bold leading-tight">
                {copyBadgeBn}{" "}
                <span className="font-ubuntu text-[8px] font-semibold">
                  ({copyBadgeEn})
                </span>
              </span>
            </div>
          </div>

          {/* 3. 2-Column Metadata Grid */}
          <div className="bg-slate-50 border border-slate-200 rounded p-1.5 mb-2 space-y-1 text-[9.5px]">
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-x-2">
              <div className="flex items-baseline gap-1 min-w-0">
                <span className="font-bold text-slate-500 shrink-0">
                  রসিদ নম্বর:
                </span>
                <span className="font-bold text-[#064E3B] font-ubuntu truncate">
                  {tx.receiptNo || "N/A"}
                </span>
              </div>
              <div className="flex items-baseline justify-end gap-1 min-w-0 text-right">
                <span className="font-bold text-slate-500 shrink-0">
                  তারিখ:
                </span>
                <span className="font-bold text-slate-900 whitespace-nowrap">
                  {bnDigit(tx.date || "")}
                </span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-x-2">
              <div className="flex items-baseline gap-1 min-w-0">
                <span className="font-bold text-slate-500 shrink-0">
                  {isStudent ? "শিক্ষার্থীর নাম:" : "দাতার নাম:"}
                </span>
                <span className="font-bold text-slate-900 truncate">
                  {displayName}
                </span>
              </div>
              <div className="flex items-baseline justify-end gap-1 min-w-0 text-right">
                <span className="font-bold text-slate-500 shrink-0">
                  {isStudent ? "আইডি/শ্রেণি:" : "বিভাগ/ধরণ:"}
                </span>
                <span className="font-bold text-slate-900 truncate">
                  {subInfo || "সাধারণ"}
                </span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 gap-x-2">
              <div className="flex items-baseline gap-1 min-w-0">
                <span className="font-bold text-slate-500 shrink-0">
                  পদ্ধতি:
                </span>
                <span className="font-bold text-slate-800 truncate">
                  {tx.paymentMethod || "নগদ (Cash)"}
                </span>
              </div>
              <div className="flex items-baseline justify-end gap-1 min-w-0 text-right">
                <span className="font-bold text-slate-500 shrink-0">
                  হিসাব মাস:
                </span>
                <span className="font-bold text-slate-800 whitespace-nowrap">
                  {bnDigit(tx.month || "")}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Particulars Table */}
          <div className="border border-slate-300 rounded overflow-hidden mb-1.5">
            <table className="w-full table-fixed border-collapse text-[9.5px] font-normal">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold">
                  <th className="w-[10%] py-1 px-1 text-center border-r border-slate-200">
                    ক্র.
                  </th>
                  <th className="w-[65%] py-1 px-1.5 text-left border-r border-slate-200">
                    বিবরণ
                  </th>
                  <th className="w-[25%] py-1 px-1.5 text-right">
                    পরিমাণ (টাকা)
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-200 last:border-b-0"
                  >
                    <td className="py-1 px-1 text-center text-slate-700 border-r border-slate-200 align-top">
                      {toBanglaNum(index + 1)}
                    </td>
                    <td className="py-1 px-1.5 text-slate-800 font-semibold border-r border-slate-200 break-words align-top">
                      {item.head || "সাধারণ আয়"}
                    </td>
                    <td className="py-1 px-1.5 text-right font-bold text-slate-900 whitespace-nowrap align-top">
                      ৳ {formatAmountBangla(item.amount)}
                    </td>
                  </tr>
                ))}

                {discount > 0 && (
                  <tr className="border-t border-slate-200 bg-red-50/40 text-red-700 font-bold">
                    <td className="py-1 px-1 text-center border-r border-slate-200">
                      -
                    </td>
                    <td className="py-1 px-1.5 border-r border-slate-200">
                      ডিসকাউন্ট
                    </td>
                    <td className="py-1 px-1.5 text-right whitespace-nowrap">
                      - ৳ {formatAmountBangla(discount)}
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-[#ECFDF5] border-t border-[#059669] text-[#064E3B] font-bold">
                  <td
                    colSpan={2}
                    className="py-1.5 px-1.5 text-right text-[9.5px]"
                  >
                    সর্বমোট আদায়কৃত টাকা:
                  </td>
                  <td className="py-1.5 px-1.5 text-right text-[10.5px] font-bold whitespace-nowrap">
                    ৳ {formatAmountBangla(grandTotal)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* 5. Optional Remarks Box */}
          {tx.description ? (
            <div className="bg-slate-50 border border-slate-300 rounded px-2 py-1 mb-1.5 text-[8.5px] text-slate-700 leading-snug break-words">
              <span className="font-bold text-slate-800">বিবরণ: </span>
              <span>{tx.description}</span>
            </div>
          ) : null}
        </div>

        {/* Bottom Block: 3-Column Signature Row & Contact Footer */}
        <div className="mt-auto">
          {/* 6. 3-Column Signature Row */}
          <div className="flex items-end justify-between gap-2 pt-8 px-1 text-center">
            <div className="w-[30%] border-t border-slate-500 pt-1">
              <p className="text-[8.5px] font-bold text-slate-700 leading-tight">
                আদায়কারী
              </p>
              <span className="text-[7px] text-slate-500 block font-normal">
                স্বাক্ষর ও তারিখ
              </span>
            </div>



            <div className="w-[30%] border-t border-slate-500 pt-1">
              <p className="text-[8.5px] font-bold text-slate-700 leading-tight">
                অনুমোদনকারী
              </p>
              <span className="text-[7px] text-slate-500 block font-normal">
                প্রিন্সিপাল
              </span>
            </div>
          </div>

          {/* 7. Institutional Contact & Social Footer */}
          <PrintSocialFooter
            className="pt-1 border-t border-slate-300 mt-1.5"
            innerClassName="flex flex-wrap justify-center items-center gap-x-1.5 gap-y-0.5 text-[7.5px] font-semibold text-slate-800"
          />
        </div>
      </div>
    </div>
  );
}

// Dual-copy A4 Landscape Split-Voucher Layout (48.8% | 2.4% Cut Line | 48.8%)
export default function IncomeVoucherHtmlLayout({
  tx,
  formatBanglaNumber,
  parsePayerName,
}) {
  if (!tx) return null;

  return (
    <div
      lang="bn"
      style={{ fontFamily: VOUCHER_FONT_FAMILY }}
      className="income-voucher-a4-sheet voucher-print-root font-bornomala w-full bg-white print:p-0 print:m-0"
    >
      <div className="income-voucher-split flex flex-col md:flex-row print:flex-row items-stretch justify-between w-full gap-4 md:gap-0 print:gap-0">
        {/* Left Half: Office Copy (48.8%) */}
        <div className="income-voucher-half w-full md:w-[48.8%] print:w-[48.8%] min-w-0 flex">
          <VoucherSingleHalf
            tx={tx}
            copyType="office"
            formatBanglaNumber={formatBanglaNumber}
            parsePayerName={parsePayerName}
          />
        </div>

        {/* Center Vertical Dashed Cut Line with Scissor Badge (2.4%) */}
        <div className="income-voucher-divider hidden md:flex print:flex w-[2.4%] shrink-0 relative items-center justify-center select-none">
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l border-dashed border-slate-400" />
          <span className="relative z-10 bg-slate-100 border border-slate-300 rounded-full w-5 h-5 flex items-center justify-center text-[10px] text-slate-500 leading-none">
            ✂
          </span>
        </div>

        {/* Right Half: Student / Donor Copy (48.8%) */}
        <div className="income-voucher-half w-full md:w-[48.8%] print:w-[48.8%] min-w-0 flex">
          <VoucherSingleHalf
            tx={tx}
            copyType="client"
            formatBanglaNumber={formatBanglaNumber}
            parsePayerName={parsePayerName}
          />
        </div>
      </div>
    </div>
  );
}
