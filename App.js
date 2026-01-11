import React from 'react';
import { 
  Document, Page, Text, View, StyleSheet, Image, 
  PDFDownloadLink, Svg, Rect, Circle, Path 
} from '@react-pdf/renderer';
import Logoforese from './assets/forese-logo.png';
import Logosvce from './assets/svce-logo.png';

const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: '#FFFFFF', fontFamily: 'Helvetica' },
  headerLogos: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, color: '#000000' },
  subtitle: { fontSize: 12, color: '#9D9D9D', textAlign: 'center', marginBottom: 15 },
  divider: { borderBottom: '2px solid #6561D4', marginBottom: 15 },
  achievementBanner: { backgroundColor: '#F5CE31', border: '2px solid #DB8624', padding: 10, borderRadius: 8, marginBottom: 15 },
  achievementText: { fontSize: 11, textAlign: 'center', color: '#CB640B', fontWeight: 'bold' },
  infoBox: { border: '1px solid #9D9D9D', borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: '#F9FAFB' },
  infoHeader: { fontSize: 12, fontWeight: 'bold', color: '#6561D4', marginBottom: 8 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  infoText: { fontSize: 10, color: '#000000' },
  scoresContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  scoreBox: { width: '48%', border: '1px solid #B7B6B6', borderRadius: 8, padding: 12 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 10, color: '#000000' },
  chartContainer: { height: 110, marginBottom: 10, alignItems: 'center', justifyContent: 'center' },
  scoreList: { marginTop: 10 },
  scoreItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4, fontSize: 8 },
  totalBox: { backgroundColor: '#6561D4', padding: 8, borderRadius: 5, marginTop: 8 },
  totalText: { color: '#FFFFFF', fontSize: 10, fontWeight: 'bold', textAlign: 'center' },
  overallBox: { backgroundColor: '#6561D4', padding: 20, borderRadius: 8, alignItems: 'center' },
  overallTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  overallScore: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold' },
});

const BarChart = ({ data }) => {
  const colors = ['#6561D4', '#60A5FA', '#2DD4BF', '#FB923C', '#EC4899'];
  const labels = ['Apt', 'Core', 'Ver', 'Pro', 'Com'];
  const values = [data.aptitude, data.core, data.verbal, data.programming, data.comprehension];
  const maxValue = 10;
  const chartHeight = 80;

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width="140" height="100" viewBox="0 0 140 100">
        {values.map((value, i) => {
          const barHeight = (value / maxValue) * chartHeight;
          return (
            <React.Fragment key={i}>
              <Rect x={i * 25 + 10} y={chartHeight - barHeight} width="15" height={barHeight} fill={colors[i]} rx="2" />
              <text x={i * 25 + 8} y={chartHeight + 10} style={{ fontSize: 6, fill: '#666' }}>{labels[i]}</text>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

const DonutChart = ({ data }) => {
  const values = Object.values(data);
  const total = values.reduce((sum, val) => sum + val, 0);
  const maxTotal = 50; 
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const colors = ['#FB923C', '#60A5FA', '#EC4899', '#2DD4BF', '#6561D4'];
  
  let currentOffset = 0;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="100" height="100" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r={radius} stroke="#E5E7EB" strokeWidth="10" fill="none" />
        
        {values.map((val, i) => {
          if (val <= 0) return null;
          const segmentLength = (val / maxTotal) * circumference;
          const strokeOffset = -currentOffset;
          currentOffset += segmentLength;

          return (
            <Circle 
              key={i} 
              cx="50" 
              cy="50" 
              r={radius} 
              fill="none" 
              stroke={colors[i]} 
              strokeWidth="10"
              strokeDasharray={`${segmentLength} ${circumference}`}
              strokeDashoffset={strokeOffset}
              transform="rotate(-90 50 50)"
            />
          );
        })}
        <Text x="35" y="55" style={{ fontSize: 14, fontWeight: 'bold', fill: '#000' }}>
            {Math.round((total / maxTotal) * 100)}%
        </Text>
      </Svg>
    </View>
  );
};

const StudentReportPDF = ({ studentData }) => {
  const totalApt = Object.values(studentData.aptitudeScores).reduce((a, b) => a + b, 0);
  const totalGD = Object.values(studentData.gdScores).reduce((a, b) => a + b, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerLogos}>
          <Image src={Logoforese} style={{ width: 90, height: 45, objectFit: 'contain' }} />
          <View style={{ alignItems: 'center' }}>
            <Svg width="25" height="25" viewBox="0 0 24 24">
               <Path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3M18.82 9L12 12.72L5.18 9L12 5.28L18.82 9M17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="#6561D4" />
            </Svg>
          </View>
          <Image src={Logosvce} style={{ width: 130, height: 45, objectFit: 'contain' }} />
        </View>

        <Text style={styles.title}>Mocks '26</Text>
        <Text style={styles.subtitle}>Performance Overview</Text>
        <View style={styles.divider} />

        <View style={styles.achievementBanner}>
          <Text style={styles.achievementText}>
            {studentData.name} has scored above the average {studentData.averageScore}%!
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoHeader}>Student Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Name: {studentData.name}</Text>
            <Text style={styles.infoText}>Reg No: {studentData.regNo}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Mock'26 ID: {studentData.mockId}</Text>
            <Text style={styles.infoText}>Dept: {studentData.dept}</Text>
          </View>
        </View>

        <View style={styles.scoresContainer}>
          <View style={styles.scoreBox}>
            <Text style={styles.sectionTitle}>Aptitude Scores</Text>
            <View style={styles.chartContainer}><BarChart data={studentData.aptitudeScores} /></View>
            <View style={styles.scoreList}>
                {Object.entries(studentData.aptitudeScores).map(([key, val]) => (
                    <View key={key} style={styles.scoreItem}>
                      <Text style={{textTransform: 'capitalize'}}>{key}</Text>
                      <Text>{val}/10</Text>
                    </View>
                ))}
            </View>
            <View style={styles.totalBox}><Text style={styles.totalText}>Total: {totalApt}/50</Text></View>
          </View>

          <View style={styles.scoreBox}>
            <Text style={styles.sectionTitle}>Group Discussion</Text>
            <View style={styles.chartContainer}><DonutChart data={studentData.gdScores} /></View>
            <View style={styles.scoreList}>
                {Object.entries(studentData.gdScores).map(([key, val]) => (
                    <View key={key} style={styles.scoreItem}>
                      <Text style={{textTransform: 'capitalize'}}>{key.replace('_', ' ')}</Text>
                      <Text>{val}/10</Text>
                    </View>
                ))}
            </View>
            <View style={styles.totalBox}><Text style={styles.totalText}>Total: {totalGD}/50</Text></View>
          </View>
        </View>

        <View style={styles.overallBox}>
          <Text style={styles.overallTitle}>Overall Score</Text>
          <Text style={styles.overallScore}>{totalApt + totalGD} / 100</Text>
        </View>
      </Page>
    </Document>
  );
};

export default function App() {
  const data = {
    name: "<Name>", 
    regNo: "212723xxxxxxx", 
    mockId: "MOCKS26xxx", 
    dept: "<Department>",
    averageScore: 72,
    aptitudeScores: { aptitude: 8, core: 7, verbal: 9, programming: 6, comprehension: 8 },
    gdScores: { subject_knowledge: 7, communication_skills: 8, body_language: 9, listening_skills: 6, active_participation: 8 }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <PDFDownloadLink document={<StudentReportPDF studentData={data} />} fileName="StudentReport.pdf">
        {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF Report')}
      </PDFDownloadLink>
    </div>
  );
}