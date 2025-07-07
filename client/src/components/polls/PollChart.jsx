import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PollChart = ({ poll }) => {
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

  const data = {
    labels: poll.options.map((option) => option.text),
    datasets: [
      {
        label: "Vote Percentage",
        data: totalVotes === 0
          ? poll.options.map(() => 0)
          : poll.options.map((option) => ((option.votes / totalVotes) * 100).toFixed(2)),
        backgroundColor: "#42a5f5",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max: 100,
        ticks: {
          callback: function (value) {
            return `${value}%`;
          },
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.x}%`,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default PollChart;
