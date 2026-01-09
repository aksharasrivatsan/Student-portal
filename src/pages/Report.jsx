import TopSection from "../components/TopSection";
import TotalScore from "../components/Totalscore";
import Aptitude from "../components/Aptitude";
import Group from "../components/Group";
import Actionbutton from "../components/Actionbutton";
import mockReport from "../data/mockReport";

export default function Report() {
  const { profile, aptitude, gd, overallTotal } = mockReport;
  return (
    <div className="bg-[#f5f6f8] min-h-screen">
   
      {/* Top section needs ONLY profile */}
      <TopSection profile={profile} />

      <main className="px-4 -mt-16 lg:mt-6 relative z-20 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:px-8">

          {/* LEFT COLUMN — DESKTOP */}
          <div className="hidden lg:block space-y-6 lg:-ml-8">
            <TotalScore overall={overallTotal} aptitude={aptitude.total} gd={gd.total} />
            <Actionbutton />
          </div>
          {/* RIGHT COLUMN — ALL SCREENS */}
          <div className="lg:col-span-2 space-y-6 lg:-ml-8 lg:-mt-61">
            {/* Mobile / Tablet Total */}
            <div className="lg:hidden">
              <TotalScore
                overall={overallTotal}
                aptitude={aptitude.total}
                gd={gd.total}
              />
            </div>
            <Aptitude data={aptitude} />
            <Group data={gd} />
            {/* Mobile / Tablet Actions */}
            <div className="lg:hidden pt-4">
              <Actionbutton />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
