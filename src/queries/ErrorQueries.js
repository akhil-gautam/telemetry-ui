const fetchErrorsList = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/errors`);
  const data = await response.json();
  return data;
};

const errorsListQuery = () => ({
  queryKey: 'errorsList',
  queryFn: fetchErrorsList,
});

export { errorsListQuery };
