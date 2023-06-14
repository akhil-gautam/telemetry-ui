const fetchTracesList = async () => {
  const response = await fetch('http://localhost:3001/traces');
  const data = await response.json();
  return data;
};

const tracesListQuery = () => ({
  queryKey: 'tracesList',
  queryFn: fetchTracesList,
});

export { tracesListQuery };
