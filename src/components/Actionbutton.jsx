export default function Actionbutton() {
  return (
    <div className="w-full">

      {/* ================= MOBILE ACTION BUTTONS ================= */}
      <div className="lg:hidden flex justify-center mt-4">
  <div className="bg-white rounded-2xl px-3 py-4 shadow-md w-full
    max-w-sm
    md:max-w-md
    md:-mt-6
    space-y-4
  ">

    {/* Download */}
    <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition">
      <span className="material-icons text-lg">download</span>
      Download Report PDF
    </button>

    <p className="text-xs text-center text-gray-400">
      Printable A4 report for mock interviews
    </p>

    {/* Logout */}
    <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition">
      <span className="material-icons text-lg">logout</span>
      Logout
    </button>

  </div>
</div>


      {/* ================= DESKTOP ACTION BUTTONS ================= */}
<div className="hidden lg:block mt-4 ml-4">
  <div className="bg-white rounded-2xl shadow-md p-4 w-100 space-y-4">

    {/* DOWNLOAD PDF CARD */}
    <div className="relative bg-white rounded-2xl p-3 overflow-hidden border border-indigo-100">

      {/* Soft corner decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full" />

      {/* Icon */}
      <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
        <span className="material-icons text-indigo-600">
          picture_as_pdf
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900">
        Download Report
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-1 mb-4">
        Download your complete mock interview report as a printable PDF.
      </p>

      {/* CTA */}
      <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition">
        <span className="material-icons text-sm">download</span>
        Download PDF
      </button>
    </div>

    {/* Logout (UNCHANGED) */}
    <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition">
      <span className="material-icons text-lg">logout</span>
      Logout
    </button>

  </div>
</div>

    </div>
  );
}
