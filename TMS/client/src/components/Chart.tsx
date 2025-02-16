import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IChartData } from "../Interfaces";

interface ChartProps {
  chartData: IChartData[];
}
const Chart: React.FC<ChartProps> = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="1 1" />

        {/* Bar Chart */}
        <Bar dataKey="total" fill="#8884d8" />

        {/* Line Chart */}
        <Line type="monotone" dataKey="total" stroke="#d90b60" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Chart;
