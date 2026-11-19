export default function DashboardLoading() {
  return (
    <div
      className="w-full space-y-6 animate-pulse"
      role="status"
      aria-label="ড্যাশবোর্ড লোড হচ্ছে"
    >
      {/* Top page header skeleton */}
      <div className="rounded-2xl border border-emerald-900/10 dark:border-emerald-800/30 bg-white dark:bg-[#031810] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2.5">
          <div className="h-5 w-48 sm:w-64 rounded-lg bg-emerald-900/10 dark:bg-emerald-800/40" />
          <div className="h-3.5 w-64 sm:w-96 rounded-md bg-slate-200 dark:bg-emerald-950/80" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-24 rounded-xl bg-slate-200 dark:bg-emerald-900/40" />
          <div className="h-9 w-28 rounded-xl bg-emerald-900/15 dark:bg-emerald-800/50" />
        </div>
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200/80 dark:border-emerald-900/40 bg-white dark:bg-[#031810] p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-24 rounded bg-slate-200 dark:bg-emerald-950" />
              <div className="h-9 w-9 rounded-xl bg-emerald-900/10 dark:bg-emerald-900/40" />
            </div>
            <div className="h-7 w-28 rounded-lg bg-slate-200 dark:bg-emerald-900/50" />
            <div className="h-2.5 w-32 rounded bg-slate-100 dark:bg-emerald-950/70" />
          </div>
        ))}
      </div>

      {/* Main table / content panel skeleton */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-emerald-900/40 bg-white dark:bg-[#031810] overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-emerald-900/40 flex flex-wrap items-center justify-between gap-3">
          <div className="h-4 w-40 rounded bg-emerald-900/10 dark:bg-emerald-800/40" />
          <div className="h-8 w-48 rounded-xl bg-slate-100 dark:bg-emerald-950" />
        </div>
        <div className="divide-y divide-slate-100 dark:divide-emerald-900/30 p-4 sm:p-5 space-y-3">
          {[0, 1, 2, 3, 4].map((row) => (
            <div
              key={row}
              className="pt-3 first:pt-0 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="h-9 w-9 rounded-xl bg-slate-200 dark:bg-emerald-900/40 shrink-0" />
                <div className="space-y-2 flex-1 max-w-md">
                  <div className="h-3.5 w-2/3 rounded bg-slate-200 dark:bg-emerald-900/50" />
                  <div className="h-2.5 w-1/2 rounded bg-slate-100 dark:bg-emerald-950" />
                </div>
              </div>
              <div className="h-6 w-20 rounded-full bg-slate-100 dark:bg-emerald-950 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">তথ্য লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...</span>
    </div>
  );
}
