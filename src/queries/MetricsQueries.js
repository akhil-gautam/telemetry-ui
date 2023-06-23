const fetchMetricsList = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/requests`);
  const data = await response.json();
  return data;
};

const fetchUsage = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/usage`);
  const data = await response.json();
  return data;
};

const metricsListQuery = () => ({
  queryKey: 'metricsList',
  queryFn: fetchMetricsList,
});

const usageQuery = () => ({
  queryKey: 'usage',
  queryFn: fetchUsage,
});

export { metricsListQuery, usageQuery };
