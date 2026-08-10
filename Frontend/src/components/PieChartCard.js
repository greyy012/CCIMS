import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PALETTE = [
  "#6c63ff",
  "#ef4444",
  "#f59e0b",
  "#22c55e",
  "#3b82f6",
  "#ec4899",
  "#14b8a6",
  "#94a3b8",
];

const STATUS_COLORS = {
  Pending: "#ef4444",
  "In Progress": "#f59e0b",
  Resolved: "#22c55e",
  Withdrawn: "#94a3b8",
};

export default function PieChartCard({
  title,
  stats,
  nameKey = "name",
  valueKey = "value",
  useStatusColors = false,
}) {
  const chartData = (stats || [])
    .map((s) => ({
      name: s[nameKey] ?? s.Status ?? s.Category_Name,
      value: Number(s[valueKey] ?? s.count ?? 0),
    }))
    .filter((d) => d.value > 0);

  if (chartData.length === 0) {
    return (
      <div className="chart-card glass-card">
        <h3>{title}</h3>
        <p className="chart-empty">No data yet</p>
      </div>
    );
  }

  return (
    <div className="chart-card glass-card">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={95}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((entry, i) => (
              <Cell
                key={entry.name}
                fill={
                  useStatusColors
                    ? STATUS_COLORS[entry.name] || PALETTE[i % PALETTE.length]
                    : PALETTE[i % PALETTE.length]
                }
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
