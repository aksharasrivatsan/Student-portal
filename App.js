import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, PDFDownloadLink, Svg, Rect, Circle, Path } from '@react-pdf/renderer';

// Styles matching the design
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  headerLogos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#000000',
  },
  subtitle: {
    fontSize: 12,
    color: '#9D9D9D',
    textAlign: 'center',
    marginBottom: 15,
  },
  divider: {
    borderBottom: '2px solid #6561D4',
    marginBottom: 15,
  },
  achievementBanner: {
    backgroundColor: '#F5CE31',
    border: '2px solid #DB8624',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  achievementText: {
    fontSize: 11,
    textAlign: 'center',
    color: '#CB640B',
  },
  infoBox: {
    border: '1px solid #9D9D9D',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#F9FAFB',
  },
  infoHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6561D4',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 10,
    color: '#000000',
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  scoreBox: {
    width: '48%',
    border: '1px solid #B7B6B6',
    borderRadius: 8,
    padding: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  chartContainer: {
    height: 120,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreList: {
    marginTop: 10,
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    fontSize: 9,
  },
  totalBox: {
    backgroundColor: '#6561D4',
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  totalText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overallBox: {
    backgroundColor: '#6561D4',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  overallTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  overallScore: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  overallSubtext: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});

// Bar Chart Component
const BarChart = ({ data }) => {
  const colors = ['#6561D4', '#60A5FA', '#2DD4BF', '#FB923C', '#EC4899'];
  const labels = ['Apt', 'Core', 'Ver', 'Pro', 'Com'];
  const values = [data.aptitude, data.core, data.verbal, data.programming, data.comprehension];
  const maxValue = 10;
  const barWidth = 18;
  const chartHeight = 80;
  const spacing = 8;

  return (
    <View style={{ alignItems: 'center', marginVertical: 10 }}>
      <Svg width="160" height="110" viewBox="0 0 160 110">
        {values.map((value, index) => {
          const barHeight = (value / maxValue) * chartHeight;
          const x = index * (barWidth + spacing) + 20;
          const y = chartHeight - barHeight + 5;
          
          return (
            <React.Fragment key={index}>
              <Rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={colors[index]}
                rx="3"
              />
              <Svg x={x - 2} y={chartHeight + 10}>
                <Text fontSize="7" fill="#666666">{labels[index]}</Text>
              </Svg>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

// Donut Chart Component
const DonutChart = ({ data }) => {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);
  const maxTotal = 50;
  const actualPercentage = (total / maxTotal) * 100;
  
  const radius = 35;
  const centerX = 50;
  const centerY = 50;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  
  const segments = [
    { percent: 40, color: '#FB923C' },
    { percent: 35, color: '#60A5FA' },
    { percent: 25, color: '#EC4899' },
  ];
  
  let currentOffset = 0;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
      <Svg width="100" height="100" viewBox="0 0 100 100">
        <Circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={strokeWidth} />
        {segments.map((segment, index) => {
          const segmentLength = (segment.percent / 100) * circumference;
          const offset = currentOffset;
          currentOffset += segmentLength;
          return (
            <Circle
              key={index}
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${segmentLength} ${circumference}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${centerX} ${centerY})`}
            />
          );
        })}
        <Svg x={centerX - 15} y={centerY - 8}>
          <Text fontSize="18" fontWeight="bold" fill="#000000">{Math.round(actualPercentage)}%</Text>
        </Svg>
      </Svg>
    </View>
  );
};

// Main PDF Document Component
const StudentReportPDF = ({ studentData }) => {
  const {
    name = "<Name>",
    regNo = "2021CS001",
    mockId = "MOCK26001",
    dept = "CSE",
    aptitudeScores = { aptitude: 8, core: 7, verbal: 7, programming: 8, comprehension: 8 },
    gdScores = { subject_knowledge: 8, communication_skills: 7, body_language: 8, listening_skills: 7, active_participation: 6 },
    averageScore = 0,
  } = studentData;

  const totalAptitude = Object.values(aptitudeScores).reduce((sum, val) => sum + val, 0);
  const totalGD = Object.values(gdScores).reduce((sum, val) => sum + val, 0);
  const overallScore = totalAptitude + totalGD;
  const overallPercentage = ((overallScore / 100) * 100).toFixed(1);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Logos - FIXED PATHS HERE */}
        <View style={styles.headerLogos}>
          <Image 
            src="/forese-logo.png" style={{ width: 100, height: 50, objectFit: 'contain' }}
            //src="https://www.google.com/search?sca_esv=4447b92845df992b&rlz=1C1ONGR_enIN1092IN1092&sxsrf=AE3TifN9JG0DzbsgN_BX2PFgWC0ct6pRkA:1767348723104&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zEMZldv_eRjZ2XLYc5GnVnMEIxC4WQfoNDH7FwchyAayyomVtyMIlwCjX48LT0TrXSPt4cTMBEUhFjb1npEwd-pp_aRD8Rutuf9gzrxQ1X-rVJ_s4WfJYQGlZ0dCz-NY6HC6esLApXMfMf9GTGGaIaQORmX6cA&q=FORESE+backgroundless+logo&sa=X&ved=2ahUKEwj31NaGz-yRAxVxTWwGHVVhAWIQtKgLegQIFxAB&biw=1707&bih=780&dpr=1.13#sv=CAMSVhoyKhBlLXNFUEthWWtQeTVZNXNNMg5zRVBLYVlrUHk1WTVzTToOWkJJN1AwRWhQLThnNE0gBCocCgZtb3NhaWMSEGUtc0VQS2FZa1B5NVk1c00YADABGAcgh62RsgYwAkoKCAIQAhgCIAIoAg"
            //src={window.location.origin+"/forese-logo.png" }
            //style={{ width: 100, height: 50, objectFit: 'contain' }}
          />
          <View style={{ alignItems: 'center' }}>
            <Svg width="30" height="30" viewBox="0 0 24 24">
              <Path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3M18.82 9L12 12.72L5.18 9L12 5.28L18.82 9M17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="#6561D4" />
            </Svg>
          </View>
          <Image 
            src="/svce-logo.png" style={{ width: 100, height: 50, objectFit: 'contain' }}
            //src="https://www.google.com/search?q=svce+backgroundless+logo&rlz=1C1ONGR_enIN1092IN1092&oq=svce+backgroundless&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIGCAEQRRg5MgYIAhBFGEAyBwgDEAAY7wUyCggEEAAYgAQYogQyBwgFEAAY7wUyCggGEAAYgAQYogTSAQg0NjQwajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#sv=CAMSZxowKg44b2Z2dlc1UXBvYlU3TTIOOG9mdnZXNVFwb2JVN006DmJ6NXY5ekpsWjJaVXlNIAQqLwobX2Y1bFhhZTJySFl5THNlTVA2TEhmMkFnXzcxEg44b2Z2dlc1UXBvYlU3TRgAMAEYByDo8sjCBzACSgoIAhACGAIgAigC"
            //src={window.location.origin+"/svce-logo.png"} 
            //style={{ width: 150, height: 50, objectFit: 'contain' }}
          />
        </View>

        <Text style={styles.title}>Mocks '26</Text>
        <Text style={styles.subtitle}>Performance Overview</Text>
        <View style={styles.divider} />

        <View style={styles.achievementBanner}>
          <Text style={styles.achievementText}>
            {name} has scored above the average {averageScore}%!
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoHeader}>Student Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Name: {name}</Text>
            <Text style={styles.infoText}>Reg No: {regNo}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Mock'26 ID: {mockId}</Text>
            <Text style={styles.infoText}>Dept: {dept}</Text>
          </View>
        </View>

        <View style={styles.scoresContainer}>
          <View style={styles.scoreBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Svg width="16" height="16" viewBox="0 0 24 24" style={{ marginRight: 5 }}>
                <Path d="M3,13H5V11H3M13,21H11V19H13M13,13H11V11H13M21,9H19V7H21M21,5H19V3H21M21,13H19V11H21M3,21H5V19H3M3,17H5V15H3M7,21H9V19H7M3,9H5V7H3M15,21H17V19H15M19,17H21V15H19M7,3H9V5H7M11,3H13V5H11M15,3H17V5H15M19,21H21V19H19M19,3H21V5H19M19,13H21V11H19M3,5H5V3H3" fill="#6561D4" />
              </Svg>
              <Text style={styles.sectionTitle}>Aptitude Scores</Text>
            </View>
            <View style={styles.chartContainer}>
              <BarChart data={aptitudeScores} />
            </View>
            <View style={styles.scoreList}>
              <View style={styles.scoreItem}><Text>Aptitude</Text><Text>{aptitudeScores.aptitude}/10</Text></View>
              <View style={styles.scoreItem}><Text>Core</Text><Text>{aptitudeScores.core}/10</Text></View>
              <View style={styles.scoreItem}><Text>Verbal</Text><Text>{aptitudeScores.verbal}/10</Text></View>
              <View style={styles.scoreItem}><Text>Programming</Text><Text>{aptitudeScores.programming}/10</Text></View>
              <View style={styles.scoreItem}><Text>Comprehension</Text><Text>{aptitudeScores.comprehension}/10</Text></View>
            </View>
            <View style={styles.totalBox}>
              <Text style={styles.totalText}>Total: {totalAptitude} / 50</Text>
            </View>
          </View>

          <View style={styles.scoreBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Svg width="16" height="16" viewBox="0 0 24 24" style={{ marginRight: 5 }}>
                <Path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" fill="#6561D4" />
              </Svg>
              <Text style={styles.sectionTitle}>Group Discussion</Text>
            </View>
            <View style={styles.chartContainer}>
              <DonutChart data={gdScores} />
            </View>
            <View style={styles.scoreList}>
              <View style={styles.scoreItem}><Text>Subject Knowledge</Text><Text>{gdScores.subject_knowledge}/10</Text></View>
              <View style={styles.scoreItem}><Text>Communication Skills</Text><Text>{gdScores.communication_skills}/10</Text></View>
              <View style={styles.scoreItem}><Text>Body Language</Text><Text>{gdScores.body_language}/10</Text></View>
              <View style={styles.scoreItem}><Text>Listening Skills</Text><Text>{gdScores.listening_skills}/10</Text></View>
              <View style={styles.scoreItem}><Text>Active Participation</Text><Text>{gdScores.active_participation}/10</Text></View>
            </View>
            <View style={styles.totalBox}>
              <Text style={styles.totalText}>Total: {totalGD} / 50</Text>
            </View>
          </View>
        </View>

        <View style={styles.overallBox}>
          <Text style={styles.overallTitle}>Overall Performance</Text>
          <Text style={styles.overallScore}>{overallScore} / 100</Text>
          <Text style={styles.overallSubtext}>{overallPercentage}% overall score</Text>
        </View>
      </Page>
    </Document>
  );
};

// Demo Component with Download Button
function App() {
  const sampleData = {
    name: "John Doe",
    regNo: "2021CS001",
    mockId: "MOCK26001",
    dept: "CSE",
    aptitudeScores: { aptitude: 8, core: 7, verbal: 7, programming: 8, comprehension: 8 },
    gdScores: { subject_knowledge: 8, communication_skills: 7, body_language: 8, listening_skills: 7, active_participation: 6 },
    averageScore: 72
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Student Report Generator</h1>
        <PDFDownloadLink
          document={<StudentReportPDF studentData={sampleData} />}
          fileName={`${sampleData.regNo}_report.pdf`}
          className="block w-full bg-purple-600 text-white py-3 rounded-lg text-center font-semibold"
        >
          {({ loading }) => (loading ? 'Generating PDF...' : '📄 Download PDF Report')}
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default App;