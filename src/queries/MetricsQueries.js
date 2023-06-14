const fetchMetricsList = async () => {
  const response = await fetch('http://localhost:3001/requests');
  const data = await response.json();
  return data;
};

const metricsListQuery = () => ({
  queryKey: 'metricsList',
  queryFn: fetchMetricsList,
});

export { metricsListQuery };
