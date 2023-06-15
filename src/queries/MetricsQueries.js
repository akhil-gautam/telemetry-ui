const fetchMetricsList = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/requests`);
  const data = await response.json();
  return data;
};

const metricsListQuery = () => ({
  queryKey: 'metricsList',
  queryFn: fetchMetricsList,
});

export { metricsListQuery };
