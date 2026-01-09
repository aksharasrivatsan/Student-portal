export default function TotalScore() {
  return (
    <div className="w-full">

      {/* mobile */}
      <div className="lg:hidden flex justify-center">
        <div className="bg-white rounded-2xl px-4 py-3 shadow-md w-full max-w-sm">
          {/* Title */}
          <h3 className="text-center text-[11px] font-semibold text-gray-400 tracking-widest mb-1">
            TOTAL SCORE
          </h3>

          {/* Score */}
          <div className="flex items-baseline justify-center leading-none">
            <span className="text-[44px] font-bold text-indigo-500">
              74
            </span>
            <span className="text-base text-gray-400 ml-1">
              /100
            </span>
          </div>

          {/* Sub text */}
          <p className="text-center text-[13px] text-gray-500 mt-1">
            Aptitude: <span className="font-semibold">38/50</span>
            {" "}•{" "}
            GD: <span className="font-semibold">36/50</span>
          </p>

        </div>
      </div>

      {/* desktop */}
<div className="hidden lg:block">
  <div className="bg-white rounded-2xl shadow-md border-2 border-indigo-200 p-3 relative overflow-hidden w-100 mt-1 ml-4">

    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" />

    <h3 className="text-center text-sm font-semibold text-gray-400 tracking-widest mb-2 mt-2">
      TOTAL SCORE
    </h3>

    <div className="flex items-end justify-center mb-4">
      <span className="text-6xl font-semibold text-indigo-400 leading-none">
        74
      </span>
      <span className="text-3xl text-gray-300 ml-1 mb-1">
        /100
      </span>
    </div>

    <div className="border-t border-gray-200 pt-5 flex justify-between items-center">
  <div className="text-center">
    <p className="text-xs uppercase text-gray-400 mb-1">Aptitude</p>
    <p className="text-xl font-bold">38/50</p>
  </div>

  <div className="w-px bg-gray-200 h-10" />

  <div className="text-center">
    <p className="text-xs uppercase text-gray-400 mb-1">GD Score</p>
    <p className="text-xl font-bold">36/50</p>
  </div>
</div>


  </div>
</div>
    </div>
  );
}
