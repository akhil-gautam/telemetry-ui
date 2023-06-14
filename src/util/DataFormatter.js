const formatRequestsData = (requests, spanCount) => {
  const routes = [];
  let totalTime = 0;
  const slowestRequest = {}

  requests.forEach((request) => {
    const route = request.name;

    const startTime = new Date(request.startTimeUnixNano / 1e6).getTime();
    const endTime = new Date(request.endTimeUnixNano / 1e6).getTime();
    const spanTime = endTime - startTime;
    totalTime += spanTime;
    
    if (slowestRequest[route] === undefined || slowestRequest[route] < spanTime) {
      slowestRequest[route] = spanTime;
    }
    const existingRoute = routes.find((r) => r.name === route);
    if (existingRoute) {
      existingRoute.value++;
    } else {
      routes.push({ name: route, value: 1 });
    }
  });

  const averageTime = spanCount > 0 ? totalTime / spanCount : 0;
  return {routes, averageTime, slowestRequest};
}


export { formatRequestsData };