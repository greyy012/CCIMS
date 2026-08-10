import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  Pending: "#ef4444",
  "In Progress": "#f59e0b",
  Resolved: "#22c55e",
  Withdrawn: "#94a3b8",
};

export default function ComplaintPieChart({ stats }) {
  const chartData = (stats || [])
    .filter((s) => s.count > 0)
    .map((s) => ({
      name: s.Status,
      value: Number(s.count),
    }));

  if (chartData.length === 0) {
    return <p className="chart-empty">No complaint data to display</p>;
  }

  return (
    <div className="chart-container">
      <h3>Complaints by Status</h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name] || "#6c63ff"}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
