

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
              <div className="w-4 h-4 rounded-sm bg-opsuite-blue rotate-45 absolute -top-0.5 left-2.5 shadow-sm" />
              <div className="w-4 h-4 rounded-sm bg-opsuite-coral rotate-45 absolute right-0.5 top-2 shadow-sm" />
              <div className="w-4 h-4 rounded-sm bg-opsuite-yellow rotate-45 absolute left-0 bottom-0.5 shadow-sm" />
            </div>
            <div className="h-6 w-px bg-slate-300 mx-1" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-opsuite-navy">
                  opsuite<span className="text-opsuite-blue">.io</span>
                </h1>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 tracking-wider">
                  Sales Log
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}