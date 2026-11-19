"use client";

import React from "react";
import Image from "next/image";
import PrintSocialFooter from "@/components/shared/print/PrintSocialFooter";
import {
  resolveVoucherParty,
  VOUCHER_FONT_FAMILY,
} from "@/components/dashboard/finance/VoucherSharedParts";
import siteConfig from "@/config/siteConfig";

const BN_NUMBERS_0_99 = [
  "শূন্য", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়", "সাত", "আট", "নয়",
  "দশ", "এগারো", "বারো", "তেরো", "চৌদ্দ", "পনেরো", "ষোলো", "সতেরো", "আঠারো", "উনিশ",
  "বিশ", "একুশ", "বাইশ", "তেইশ", "চব্বিশ", "পঁচিশ", "ছাব্বিশ", "সাতাশ", "আটাশ", "ঊনত্রিশ",
  "ত্রিশ", "একত্রিশ", "বত্রিশ", "তেত্রিশ", "চৌত্রিশ", "পঁয়ত্রিশ", "ছত্রিশ", "সাঁইত্রিশ", "আটত্রিশ", "ঊনচল্লিশ",
  "চল্লিশ", "একচল্লিশ", "বিয়াল্লিশ", "তেতাল্লিশ", "চুয়াল্লিশ", "পঁয়তাল্লিশ", "ছেচল্লিশ", "সাতচল্লিশ", "আটচল্লিশ", "ঊনপঞ্চাশ",
  "পঞ্চাশ", "একান্ন", "বায়ান্ন", "তিপ্পান্ন", "চুয়ান্ন", "পঞ্চান্ন", "ছাপ্পান্ন", "সাতান্ন", "আটান্ন", "ঊনষাট",
  "ষাট", "একষট্টি", "বাষট্টি", "তেষট্টি", "চৌষট্টি", "পঁয়ষট্টি", "ছেষট্টি", "সাতষট্টি", "আটষট্টি", "ঊনসত্তর",
  "সত্তর", "একাত্তর", "বাহাত্তর", "তিয়াত্তর", "চুয়াত্তর", "পঁচাত্তর", "ছিয়াত্তর", "সাতাত্তর", "আটাত্তর", "ঊনআশি",
  "আশি", "একাশি", "বিরাশি", "তিরাশি", "চুরাশি", "পঁচাশি", "ছিয়াশি", "সাতাশি", "আটাশি", "ঊননব্বই",
  "নব্বই", "একানব্বই", "বিরানব্বই", "তিরানব্বই", "চুরানব্বই", "পঁচানব্বই", "ছিয়ানব্বই", "সাতানব্বই", "আটানব্বই", "নিরানব্বই",
];

function integerToBanglaWords(num) {
  let n = Math.floor(Math.abs(Number(num) || 0));
  if (n === 0) return BN_NUMBERS_0_99[0];

  const parts = [];
  if (n >= 10000000) {
    const crore = Math.floor(n / 10000000);
    parts.push(`${integerToBanglaWords(crore)} কোটি`);
    n %= 10000000;
  }
  if (n >= 100000) {
    const lakh = Math.floor(n / 100000);
    parts.push(`${BN_NUMBERS_0_99[lakh]} লক্ষ`);
    n %= 100000;
  }
  if (n >= 1000) {
    const thousand = Math.floor(n / 1000);
    parts.push(`${BN_NUMBERS_0_99[thousand]} হাজার`);
    n %= 1000;
  }
  if (n >= 100) {
    const hundred = Math.floor(n / 100);
    parts.push(`${BN_NUMBERS_0_99[hundred]} শত`);
    n %= 100;
  }
  if (n > 0) {
    parts.push(BN_NUMBERS_0_99[n]);
  }
  return parts.join(" ");
}

function amountToBanglaWords(amount) {
  const numeric = Number(amount) || 0;
  const whole = Math.floor(Math.abs(numeric));
  const poisha = Math.round((Math.abs(numeric) - whole) * 100);
  const wholeText = integerToBanglaWords(whole);
  if (poisha > 0 && poisha < 100) {
    return `${wholeText} টাকা ${BN_NUMBERS_0_99[poisha]} পয়সা মাত্র`;
  }
  return `${wholeText} টাকা মাত্র`;
}

export default function ExpenseVoucherHtmlLayout({
  tx,
  formatBanglaNumber,
  parsePayerName,
}) {
  if (!tx) return null;

  const { isIncome, isStudent, parsed } = resolveVoucherParty(
    tx,
    parsePayerName,
  );

  const title = isIncome ? "আয় আদায় রসিদ" : "ব্যয় পরিশোধ ভাউচার";
  const idLabel = isIncome ? "রসিদ নং" : "ভাউচার নং";
  const idValue = isIncome ? tx.receiptNo : tx.voucherNo;
  const dateValue = tx.date;
  const totalAmount = Number(isIncome ? tx.totalIncome : tx.totalExpense) || 0;
  const advanceAmount = Number(tx.advanceAmount) || 0;
  const deficit =
    !isIncome && totalAmount > advanceAmount ? totalAmount - advanceAmount : 0;
  const fundLabel = tx.fundNameBn || tx.fundName || "";

  return (
    <div
      lang="bn"
      style={{ fontFamily: VOUCHER_FONT_FAMILY }}
      className="expense-voucher-a5-sheet voucher-print-root font-bornomala relative bg-white box-border flex flex-col justify-between w-[148mm] max-w-full min-h-[209mm] mx-auto p-[6mm] text-gray-900"
    >
      {/* Admit Card Style Gold Double Border Frame */}
      <div className="w-full flex-1 border-[4px] border-double border-[#C5A059] p-3 flex flex-col justify-between box-border relative bg-white">
        {/* Background Watermark (Exact Admit Card Styling) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.08]">
          <Image
            src={siteConfig.branding.iconLogo}
            alt="Watermark Logo"
            width={260}
            height={260}
            unoptimized
            loading="eager"
            className="object-contain"
          />
        </div>

        {/* Main Content Layer */}
        <div className="relative z-10 flex-1 flex flex-col justify-between overflow-hidden">
          {/* Top Block: Header + Title Pill + Metadata */}
          <div className="space-y-1.5 flex-shrink-0">
            {/* 1. Institutional Header (Matching Admit Card Layout with Direct Static Assets) */}
            <div className="flex justify-between items-center relative gap-2 flex-shrink-0 w-full overflow-hidden">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 relative flex items-center justify-center">
                <Image
                  src={siteConfig.branding.iconLogo}
                  alt={siteConfig.institution.nameEn}
                  width={120}
                  height={120}
                  unoptimized
                  loading="eager"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 text-center min-w-0">
                <div className="w-full text-center">
                  <Image
                    src={siteConfig.branding.banner}
                    alt={siteConfig.branding.bannerAlt}
                    width={1200}
                    height={240}
                    unoptimized
                    loading="eager"
                    className="w-full h-auto max-h-20 object-contain mx-auto"
                  />
                </div>
                <p className="text-[9.5px] font-semibold text-gray-700 leading-tight mt-0.5">
                  {siteConfig.contact.addressBn}
                </p>
              </div>
            </div>

            {/* 2. Gold Double Divider & Emerald Title Pill */}
            <div className="border-t-4 border-double border-[#C5A059] pt-1.5 text-center">
              <div className="inline-block bg-emerald-800 text-white px-4 py-0.5 rounded-full border-2 border-emerald-600 shadow-sm mb-1">
                <h2 className="text-xs font-bold tracking-wider leading-tight">
                  {title}
                </h2>
              </div>
              {(fundLabel || tx.month) && (
                <p className="text-[10.5px] font-semibold text-gray-700 leading-tight">
                  {fundLabel}
                  {fundLabel && tx.month ? " • " : ""}
                  {tx.month ? `হিসাব মাস: ${formatBanglaNumber(tx.month)}` : ""}
                </p>
              )}
            </div>

            {/* 3. Metadata Section (Admit Card 2-Column Dotted Underline Grid) */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 my-1 text-[11px] font-semibold px-1 flex-shrink-0">
              {/* বাম কলাম */}
              <div className="space-y-1">
                {isIncome ? (
                  isStudent ? (
                    <>
                      <div className="flex items-baseline">
                        <span className="w-24 text-gray-800 flex-shrink-0">
                          শিক্ষার্থীর নাম:
                        </span>
                        <span className="font-bold text-gray-900 flex-1 border-b border-dotted border-gray-400 pb-0.5 truncate">
                          {tx.studentName || parsed.donorName || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-baseline">
                        <span className="w-24 text-gray-800 flex-shrink-0">
                          আইডি ও শ্রেণি:
                        </span>
                        <span className="font-bold text-gray-900 flex-1 border-b border-dotted border-gray-400 pb-0.5 truncate font-ubuntu">
                          {tx.studentId || parsed.studentId || "N/A"} (
                          {tx.className || "N/A"})
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-baseline">
                        <span className="w-24 text-gray-800 flex-shrink-0">
                          দাতার নাম:
                        </span>
                        <span className="font-bold text-gray-900 flex-1 border-b border-dotted border-gray-400 pb-0.5 truncate">
                          {tx.donorName || parsed.donorName || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-baseline">
                        <span className="w-24 text-gray-800 flex-shrink-0">
                          ধরণ:
                        </span>
                        <span className="font-bold text-gray-900 flex-1 border-b border-dotted border-gray-400 pb-0.5 truncate">
                          দাতা / অনুদানকারী
                        </span>
                      </div>
                    </>
                  )
                ) : (
                  <div className="flex items-baseline">
                    <span className="w-24 text-gray-800 flex-shrink-0">
                      খরচকারী/গ্রহীতা:
                    </span>
                    <span className="font-bold text-gray-900 flex-1 border-b border-dotted border-gray-400 pb-0.5 truncate">
                      {tx.receiverName || "N/A"}
                    </span>
                  </div>
                )}

                <div className="flex items-baseline">
                  <span className="w-24 text-gray-800 flex-shrink-0">
                    পেমেন্ট পদ্ধতি:
                  </span>
                  <span className="font-bold text-gray-900 flex-1 border-b border-dotted border-gray-400 pb-0.5 truncate font-ubuntu">
                    {tx.paymentMethod || "Cash"}
                  </span>
                </div>

                {!isIncome && advanceAmount > 0 && (
                  <div className="flex items-baseline">
                    <span className="w-24 text-gray-800 flex-shrink-0">
                      অগ্রীম গৃহীত:
                    </span>
                    <span className="font-bold text-gray-900 flex-1 border-b border-dotted border-gray-400 pb-0.5 truncate">
                      ৳{" "}
                      {formatBanglaNumber(advanceAmount.toLocaleString("bn-BD"))}
                    </span>
                  </div>
                )}
              </div>

              {/* ডান কলাম */}
              <div className="space-y-1">
                <div className="flex items-baseline">
                  <span className="w-18 text-gray-800 flex-shrink-0">
                    {idLabel}:
                  </span>
                  <span className="font-bold text-emerald-950 flex-1 border-b border-dotted border-gray-400 pb-0.5 truncate font-ubuntu">
                    {idValue || "N/A"}
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-18 text-gray-800 flex-shrink-0">
                    তারিখ:
                  </span>
                  <span className="font-bold text-gray-900 flex-1 border-b border-dotted border-gray-400 pb-0.5 truncate">
                    {formatBanglaNumber(dateValue || "")}
                  </span>
                </div>
                {!isIncome && (
                  <div className="flex items-baseline">
                    <span className="w-18 text-gray-800 flex-shrink-0">
                      চেক নং:
                    </span>
                    <span className="font-bold text-gray-900 flex-1 border-b border-dotted border-gray-400 pb-0.5 truncate font-ubuntu">
                      {tx.chequeNo || "N/A"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {deficit > 0 && (
              <div className="mx-1 px-2 py-1 rounded border border-[#C5A059] bg-rose-50/70 flex items-center justify-between text-[10px] font-bold">
                <span className="text-rose-900">
                  ঘাটতি / সমন্বয়যোগ্য পরিমাণ: ৳{" "}
                  {formatBanglaNumber(deficit.toLocaleString("bn-BD"))}
                </span>
                {tx.reimbursement?.status === "paid" ? (
                  <span className="text-emerald-800">
                    পরিশোধিত{" "}
                    {tx.reimbursement?.date
                      ? `(${formatBanglaNumber(tx.reimbursement.date)})`
                      : ""}
                  </span>
                ) : (
                  <span className="text-amber-800">অপরিশোধিত</span>
                )}
              </div>
            )}
          </div>

          {/* 4. Particulars Table (Admit Card Gold-Bordered Warm Cream Table) */}
          <div className="my-1.5 flex-1 flex flex-col justify-start">
            <h3 className="text-center text-[11px] font-bold text-gray-900 mb-1">
              {isIncome ? "আয়ের খাতসমূহের বিবরণ" : "ব্যয়ের খাত ও বিবরণ"}
            </h3>

            <table className="w-full table-fixed border-collapse border border-[#C5A059] text-[10.5px] bg-[#FDFBF7]/75">
              <thead>
                <tr className="bg-[#C5A059]/15 text-gray-900">
                  <th className="border border-[#C5A059] px-1.5 py-1 text-center font-bold w-11">
                    ক্রমিক
                  </th>
                  <th className="border border-[#C5A059] px-2 py-1 text-left font-bold">
                    বিবরণ
                  </th>
                  <th className="border border-[#C5A059] px-2 py-1 text-right font-bold w-26">
                    টাকার পরিমাণ
                  </th>
                </tr>
              </thead>
              <tbody>
                {tx.items?.map((item, index) => (
                  <tr key={index} className="hover:bg-[#F5EEDC]/50">
                    <td className="border border-[#C5A059] px-1.5 py-1 text-center text-gray-800 align-top">
                      {formatBanglaNumber(index + 1)}
                    </td>
                    <td className="border border-[#C5A059] px-2 py-1 text-gray-900 font-semibold break-words align-top">
                      <div>{item.head}</div>
                      {!isIncome && (item.institutionName || item.shopVoucher) && (
                        <div className="text-[8.5px] text-gray-600 font-normal mt-0.5 leading-tight">
                          {item.institutionName &&
                            `সরবরাহকারী প্রতিষ্ঠান: ${item.institutionName}`}
                          {item.institutionName && item.shopVoucher ? " | " : ""}
                          {item.shopVoucher && (
                            <>
                              মেমো নং:{" "}
                              <span className="font-ubuntu">
                                {item.shopVoucher}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="border border-[#C5A059] px-2 py-1 text-right font-bold text-gray-900 whitespace-nowrap align-top">
                      ৳{" "}
                      {formatBanglaNumber(
                        Number(item.amount || 0).toLocaleString("bn-BD"),
                      )}
                    </td>
                  </tr>
                ))}

                {isIncome && tx.discount > 0 && (
                  <>
                    <tr className="bg-[#FDFBF7] font-semibold print:hidden">
                      <td
                        colSpan="2"
                        className="border border-[#C5A059] px-2 py-1 text-right text-gray-700"
                      >
                        আসল মোট:
                      </td>
                      <td className="border border-[#C5A059] px-2 py-1 text-right whitespace-nowrap text-gray-800">
                        ৳{" "}
                        {formatBanglaNumber(
                          (tx.totalIncome + tx.discount).toLocaleString(
                            "bn-BD",
                          ),
                        )}
                      </td>
                    </tr>
                    <tr className="bg-rose-50/50 text-rose-800 font-bold print:hidden">
                      <td
                        colSpan="2"
                        className="border border-[#C5A059] px-2 py-1 text-right"
                      >
                        ছাড়:
                      </td>
                      <td className="border border-[#C5A059] px-2 py-1 text-right whitespace-nowrap">
                        - ৳{" "}
                        {formatBanglaNumber(tx.discount.toLocaleString("bn-BD"))}
                      </td>
                    </tr>
                  </>
                )}

                <tr className="bg-emerald-800/10 font-bold text-gray-950">
                  <td
                    colSpan="2"
                    className="border border-[#C5A059] px-2 py-1.5 text-right text-[11px]"
                  >
                    সর্বমোট:
                  </td>
                  <td className="border border-[#C5A059] px-2 py-1.5 text-right text-[11.5px] font-bold whitespace-nowrap text-emerald-950">
                    ৳ {formatBanglaNumber(totalAmount.toLocaleString("bn-BD"))}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Amount in Words (কথায়) */}
            <div className="mt-1.5 px-2 py-1 border border-[#C5A059] bg-[#FDFBF7]/90 text-[10px] leading-snug">
              <span className="font-bold text-gray-900">কথায়: </span>
              <span className="font-semibold text-gray-800">
                {amountToBanglaWords(totalAmount)}
              </span>
            </div>

            {/* Remarks Section */}
            {tx.description && (
              <div className="mt-1.5 px-2 py-1 border border-dotted border-[#C5A059] bg-white/80 text-[9.5px] leading-snug break-words">
                <span className="font-bold text-gray-800">
                  বিবরণ / মন্তব্য:{" "}
                </span>
                <span className="font-medium text-gray-700">
                  {tx.description}
                </span>
              </div>
            )}
          </div>

          {/* 5. Signature Section (Exact Admit Card Style: Prepared / Receiver / Approved) */}
          <div className="flex justify-between items-end gap-3 mt-4 mb-1.5 px-1 flex-shrink-0">


            <div className="text-center flex flex-col items-center flex-1">
              <div className="h-6" />
              <div className="w-full max-w-[105px] border-b border-gray-800 mb-0.5" />
              <span className="text-[9.5px] font-bold text-gray-800 leading-tight">
                {isIncome ? "আদায়কারী" : "গ্রহীতা / খরচকারী"}
              </span>
              <span className="text-[7.5px] text-gray-500 font-normal">
                স্বাক্ষর ও তারিখ
              </span>
            </div>

            <div className="text-center flex flex-col items-center flex-1">
              <div className="h-6" />
              <div className="w-full max-w-[105px] border-b border-gray-800 mb-0.5" />
              <span className="text-[9.5px] font-bold text-gray-800 leading-tight">
                অনুমোদনকারী
              </span>
              <span className="text-[7.5px] text-gray-500 font-normal">
                প্রিন্সিপাল
              </span>
            </div>
          </div>
        </div>

        {/* 6. Institutional Contact & Social Footer (Exact Admit Card Footer) */}
        <PrintSocialFooter
          className="relative z-10 mt-auto pt-1 border-t border-gray-300 flex-shrink-0"
          englishDigits
        />
      </div>
    </div>
  );
}
