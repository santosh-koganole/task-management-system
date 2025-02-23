import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IChartData } from "../Interfaces";

interface ChartProps {
  chartData: IChartData[];
  chartType: string;
}
const Chart: React.FC<ChartProps> = ({ chartData, chartType }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  return (
    <ResponsiveContainer width="100%" height={300}>
      {chartType === "barLine" ? (
        <ComposedChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />

          {/* Bar Chart */}
          <Bar dataKey="total" fill="#8884d8" />

          {/* Line Chart */}
          <Line type="monotone" dataKey="total" stroke="#d90b60" />
        </ComposedChart>
      ) : (
        <PieChart>
          <Pie
            data={chartData}
            dataKey="total"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </ResponsiveContainer>
  );
};

export default Chart;
