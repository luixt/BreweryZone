import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function BreweryChart({ breweries }) {
  const typeCounts = breweries.reduce((acc, brewery) => {
    const type = brewery.brewery_type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(typeCounts).map(type => ({
    name: type,
    value: typeCounts[type]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF'];

  return (
    <div>
      <h2>Brewery Types Distribution</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        {/* Add margin for the legend to create space */}
        <Legend layout="horizontal" verticalAlign="right" align="right" margin={{ top: 20 }} />
      </PieChart>
    </div>
  );
}

export default BreweryChart;
