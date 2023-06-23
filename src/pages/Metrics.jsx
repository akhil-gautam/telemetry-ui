import { useQuery } from 'react-query';

import {
  Card,
  Flex,
  Title,
  Bold,
  Text,
  BarList,
  Metric,
  DonutChart,
  LineChart,
} from '@tremor/react';

import { metricsListQuery, usageQuery } from '../queries/MetricsQueries';
import { errorsListQuery } from '../queries/ErrorQueries';
import { formatRequestsData } from '../util/DataFormatter';

export default function Metrics() {
  const { data: requests, isLoading: isRequests } = useQuery(
    metricsListQuery()
  );
  const { data: errors, isLoading: isErrorsLoading } = useQuery(
    errorsListQuery()
  );
  const { data: usage, isLoading: isUsageLoading } = useQuery(usageQuery());

  if (isRequests || isErrorsLoading || isUsageLoading)
    return <div>Loading...</div>;

  const { averageTime, routes, slowestRequest } = formatRequestsData(
    requests.documents,
    requests.total
  );

  const lineChartData = requests.documents.map((item) => ({
    name: item.name,
    latency: new Date(
      (item.endTimeUnixNano - item.startTimeUnixNano) / 1e6
    ).getTime(),
    startTime: new Date(item.startTimeUnixNano / 1e6).toLocaleString(),
  }));

  const { routes: errorFrequency } = formatRequestsData(
    errors.documents,
    errors.total
  );

  return (
    <main className='w-full flex flex-col p-10 space-y-10 bg-yellow-100'>
      <section className='w-full flex justify-between'>
        <Card className='max-w-xl hover:scale-105 transition'>
          <Title>
            Recent requests{' '}
            <span className='text-yellow-600'>({requests.total})</span>
          </Title>
          <Flex className='mt-8'>
            <Text>
              <Bold>Source</Bold>
            </Text>
            <Text>
              <Bold>Visits</Bold>
            </Text>
          </Flex>
          <BarList
            color='lime'
            data={routes}
            showAnimation={false}
            className='mt-4'
          />
        </Card>
        <Card className='max-w-xl hover:scale-105 transition'>
          <Title>Recent errors</Title>
          <DonutChart
            className='mt-6'
            data={errorFrequency}
            category='value'
            index='name'
            colors={['yellow', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
          />
        </Card>
      </section>
      <div className='flex space-x-5'>
        <Card
          className='max-w-md hover:scale-105 transition'
          decoration='left'
          decorationColor={averageTime > 50 ? 'lime' : 'blue'}
        >
          <Title>Average request time</Title>
          <Metric>{averageTime.toFixed(2)}ms</Metric>
        </Card>
        <Card
          className='max-w-md hover:scale-105 transition'
          decoration='left'
          decorationColor={
            Object.values(slowestRequest).some((el) => el > 40)
              ? 'lime'
              : 'blue'
          }
        >
          <Title className='mb-2'>Slowest endpoints</Title>
          {Object.entries(slowestRequest)
            .slice(0, 3)
            .map(([route, spanTime]) => (
              <Text key={route} className='text-sm mb-1 flex justify-between'>
                <span className='text-yellow-700'>{route}</span>{' '}
                <span> {spanTime.toFixed(2)}ms</span>
              </Text>
            ))}
        </Card>
        <Card
          className='max-w-md hover:scale-105 transition'
          decoration='left'
          decorationColor={'amber'}
        >
          <Title>Usage</Title>
          <Text className='mb-1'>
            <span className='font-semibold'>CPU: </span>
            {usage.documents[0]?.cpu}
          </Text>
          <Text className='mb-1'>
            <span className='font-semibold'>Memory usage: </span>
            {usage.documents[0]?.memoryUsage}
          </Text>
          <Text>
            <span className='font-semibold'>Heap usage: </span>
            {usage.documents[0]?.heapUsage}
          </Text>
        </Card>
      </div>
      <Card>
        <Title>Latency</Title>
        <LineChart
          className='mt-6'
          data={lineChartData}
          index='startTime'
          categories={['latency']}
          colors={['emerald']}
          fontSize={'4px'}
          curveType='natural'
          valueFormatter={(value) => `${value}ms`}
        />
      </Card>
      <Card>
        <Title>Request/Latency</Title>
        <LineChart
          className='mt-6'
          data={lineChartData}
          index='name'
          categories={['latency']}
          colors={['emerald']}
          fontSize={'4px'}
          curveType='natural'
          valueFormatter={(value) => `${value}ms`}
        />
      </Card>
    </main>
  );
}
