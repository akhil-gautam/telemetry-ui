const fetchErrorsList = async () => {
  const response = await fetch('http://localhost:3001/errors');
  const data = await response.json();
  return data;
};

const errorsListQuery = () => ({
  queryKey: 'errorsList',
  queryFn: fetchErrorsList,
});

export { errorsListQuery };
