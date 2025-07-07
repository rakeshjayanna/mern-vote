import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getSummary } from "../services/api";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const VoteSummary = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await getSummary();
        const totalVotes = res.data.reduce((sum, item) => sum + item.votes, 0);

        const formattedData = res.data.map((item) => ({
          name: item.candidate,
          value: item.votes,
          percent: totalVotes === 0 ? 0 : ((item.votes / totalVotes) * 100).toFixed(1),
        }));

        setData(formattedData);
      } catch (err) {
        console.error("Failed to fetch summary", err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px" }}>
        Election Results
      </h2>

      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <PieChart width={500} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={140}
            label={({ name, percent }) => `${name} (${percent}%)`}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </div>
    </div>
  );
};

export default VoteSummary;
