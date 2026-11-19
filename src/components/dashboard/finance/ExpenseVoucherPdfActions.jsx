"use client";

import React, { useMemo } from "react";
import { Printer, Download } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import {
  buildVoucherPageStyle,
  getVoucherPrintFonts,
  preloadVoucherFonts,
} from "@/components/dashboard/finance/VoucherSharedParts";

export default function ExpenseVoucherPdfActions({ tx, contentRef }) {
  const documentTitle = `Expense-Voucher-${tx?.voucherNo || tx?._id || "Voucher"}`;

  const printFonts = useMemo(() => getVoucherPrintFonts(), []);
  const pageStyle = useMemo(
    () =>
      buildVoucherPageStyle({
        size: "A5 portrait",
        margin: "0mm",
        extraCss: `
          html,
          body {
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
          }

          .expense-voucher-a5-sheet {
            width: 148mm !important;
            max-width: 148mm !important;
            height: 209mm !important;
            min-height: 209mm !important;
            margin: 0 auto !important;
            padding: 6mm !important;
            box-sizing: border-box !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            overflow: hidden !important;
          }
        `,
      }),
    [],
  );

  const handlePrintExpenseVoucher = useReactToPrint({
    contentRef,
    documentTitle,
    bodyClass: "font-bornomala",
    fonts: printFonts,
    pageStyle,
    onBeforePrint: preloadVoucherFonts,
  });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => handlePrintExpenseVoucher()}
        className="px-4 py-2 bg-emerald-800 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
        title="A5 সাইজে ব্যয় ভাউচার প্রিন্ট করুন"
      >
        <Printer className="w-4 h-4" /> প্রিন্ট ভাউচার (A5)
      </button>
      <button
        type="button"
        onClick={() => handlePrintExpenseVoucher()}
        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
        title="A5 PDF হিসেবে সংরক্ষণ করুন"
      >
        <Download className="w-4 h-4 text-emerald-700" /> ডাউনলোড PDF
      </button>
    </div>
  );
}
