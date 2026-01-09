export default function TopSection({ profile }) {
  if (!profile) return null;

  return (
    <>
      {/* ================= PURPLE HEADER ================= */}
      <div className="bg-[#6A7CF6] text-white rounded-b-3xl lg:rounded-b-none">

        {/* INNER WRAPPER */}
        <div className="px-4 pt-4 pb-20 lg:px-8 lg:pt-0 lg:pb-0 relative z-10">


          {/* ================= MOBILE HEADER + PROFILE ================= */}
          <div className="lg:hidden">

            {/* Mobile Header */}
            <div className="flex items-center justify-between mb-6">
              <button className="text-xl font-bold">←</button>

              <h1 className="w-full text-center text-sm font-semibold">
                Report Dashboard
              </h1>
            </div>

            {/* Mobile Profile */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-green-300 flex items-center justify-center text-lg font-bold text-black">
                {profile.username[0]}
              </div>

              <div>
                <h2 className="font-semibold text-base">
                  {profile.username}
                </h2>

                <p className="text-xs text-white/90">
                  {profile.dept}
                </p>

                <span className="inline-block mt-1 px-2 py-[2px] text-[10px] rounded-full bg-green-500 text-white">
                  Reg: {profile.regNo}
                </span>
              </div>
            </div>
          </div>

          {/* ================= DESKTOP HEADER ONLY ================= */}
          <div className="hidden lg:flex items-center h-16">
            <button className="text-2xl font-bold mr-4">←</button>

            <h1 className="text-lg font-semibold">
              Report Dashboard
            </h1>
          </div>

        </div>
      </div>

      {/* ================= DESKTOP PROFILE CARD ================= */}
      <div className="hidden lg:block px-8 mt-6">
        <div className="bg-white rounded-2xl p-6 w-100 shadow-sm">

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-green-300 flex items-center justify-center text-2xl font-bold text-black mb-3">
              {profile.username[0]}
            </div>

            <h2 className="font-semibold text-lg">
              {profile.username}
            </h2>

            <p className="text-sm text-gray-500">
              {profile.dept}
            </p>

            <span className="mt-2 px-3 py-1 text-xs rounded-full bg-green-500 text-white">
              Reg: {profile.regNo}
            </span>
          </div>

        </div>
      </div>
    </>
  );
}
