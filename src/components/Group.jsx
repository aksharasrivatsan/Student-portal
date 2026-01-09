import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Group() {
  const data = {
    labels: [
      "Subject Knowledge",
      "Communication Skills",
      "Body Language",
      "Listening Skills",
      "Active Participation",
    ],
    datasets: [
  {
    data: [8, 9, 6, 7, 6],
    backgroundColor: [
      "#34d399",
      "#818cf8",
      "#fcd34d",
      "#f87171",
      "#0ea5e9",
    ],
    borderWidth: 0,
    spacing: 6,          
    borderRadius: 3,     
  },
],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "71%",
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="material-icons text-indigo-500">groups</span>
        <h3 className="font-semibold text-sm lg:text-base">
          Group Discussion (GD)
        </h3>
      </div>

      {/* Topic */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <p className="text-sm">
          <span className="font-semibold">Topic:</span>{" "}
          The Future of Artificial Intelligence in Engineering
        </p>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-semibold text-gray-700">Duration:</span>{" "}
          20 mins
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
        {/* Donut */}
        <div className="relative h-56 flex items-center justify-center">
          <Doughnut data={data} options={options} />
          <div className="absolute text-center">
            <p className="text-3xl font-bold">72%</p>
            <p className="text-xs text-gray-500">GD Score</p>
          </div>
        </div>

        {/* Score List */}
        <div className="mt-6 lg:mt-0 space-y-4">
          <ScoreRow label="Subject Knowledge" value="8/10" />
          <ScoreRow label="Communication Skills" value="9/10" />
          <ScoreRow label="Body Language" value="6/10" />
          <ScoreRow label="Listening Skills" value="7/10" />
          <ScoreRow label="Active Participation" value="6/10" />
        </div>
      </div>

      {/* Desktop total */}
      <div className="hidden lg:flex justify-end mt-6">
        <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
          Total: 36 / 50
        </span>
      </div>

      {/* Mobile total */}
      <div className="lg:hidden mt-4 text-center pt-4 font-semibold text-sm border-t border-gray-200">
        Total: 36 / 50
      </div>
    </div>
  );
}

function ScoreRow({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm border-b border-gray-100 last:border-none pb-3 last:pb-0">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
