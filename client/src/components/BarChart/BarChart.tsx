// src/components/BarChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Bartype {
  label: string;
  dataSet: Array<{ label: string; data: number }>;
}

interface BarChartProps {
  data: Bartype;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const labels = data.dataSet.map(item => item.label);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: data.label,
        data: data.dataSet.map(item => item.data),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
