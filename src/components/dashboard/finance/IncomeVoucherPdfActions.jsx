"use client";

import React, { useMemo } from "react";
import { Printer, Download } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import {
  buildVoucherPageStyle,
  getVoucherPrintFonts,
  preloadVoucherFonts,
} from "@/components/dashboard/finance/VoucherSharedParts";

export default function IncomeVoucherPdfActions({ tx, contentRef }) {
  const documentTitle = `Income-Voucher-${tx?.receiptNo || tx?._id || "Receipt"}`;

  const printFonts = useMemo(() => getVoucherPrintFonts(), []);
  const pageStyle = useMemo(
    () =>
      buildVoucherPageStyle({
        size: "A4 landscape",
        margin: "8mm",
        extraCss: `
          .income-voucher-a4-sheet {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          .income-voucher-split {
            display: flex !important;
            flex-direction: row !important;
            align-items: stretch !important;
            justify-content: space-between !important;
            width: 100% !important;
            gap: 0 !important;
          }
          .income-voucher-half {
            width: 48.8% !important;
            max-width: 48.8% !important;
            display: flex !important;
            flex-shrink: 0 !important;
          }
          .income-voucher-divider {
            display: flex !important;
            width: 2.4% !important;
            flex-shrink: 0 !important;
            position: relative !important;
            align-items: center !important;
            justify-content: center !important;
          }
        `,
      }),
    [],
  );

  const handlePrintIncomeVoucher = useReactToPrint({
    contentRef,
    documentTitle,
    bodyClass: "font-bornomala",
    fonts: printFonts,
    pageStyle,
    onBeforePrint: preloadVoucherFonts,
  });

  if (!tx) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => handlePrintIncomeVoucher()}
        className="px-4 py-2 bg-emerald-800 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
        title="A4 Landscape সাইজে আদায় রসিদ প্রিন্ট করুন"
      >
        <Printer className="w-4 h-4" /> প্রিন্ট রসিদ (A4)
      </button>
      <button
        type="button"
        onClick={() => handlePrintIncomeVoucher()}
        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
        title="A4 Landscape PDF হিসেবে সংরক্ষণ করুন"
      >
        <Download className="w-4 h-4 text-emerald-700" /> ডাউনলোড PDF
      </button>
    </div>
  );
}
