const fetchTracesList = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/traces`);
  const data = await response.json();
  return data;
};

const tracesListQuery = () => ({
  queryKey: 'tracesList',
  queryFn: fetchTracesList,
});

export { tracesListQuery };
