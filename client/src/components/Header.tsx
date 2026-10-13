

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 py-3.5 shadow-sm">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <img
            src="/daily-sales-log-logo.svg"
            alt=""
            className="h-9 w-9"
            aria-hidden="true"
          />
          <h1 className="text-xl font-extrabold tracking-tight text-opsuite-navy">
            Daily Sales Log
          </h1>
        </div>
      </div>
    </header>
  );
}