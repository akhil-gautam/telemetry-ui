import { useQuery } from 'react-query';
import {
  Text,
  AccordionList,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@tremor/react';
import { tracesListQuery } from '../queries/TracesQueries';

export default function Traces() {
  const { data: traces, isLoading: isTracesLoading } = useQuery(
    tracesListQuery()
  );

  if (isTracesLoading) return <div>Loading...</div>;

  function groupAndSortSpans(spans) {
    const groupedSpans = {};

    for (const span of spans) {
      const traceId = span.traceId;

      if (!groupedSpans[traceId]) {
        groupedSpans[traceId] = [];
      }

      groupedSpans[traceId].push(span);
    }

    for (const traceId in groupedSpans) {
      groupedSpans[traceId].sort(
        (a, b) => a.startTimeUnixNano - b.startTimeUnixNano
      );
    }

    return groupedSpans;
  }
  const parsedTraces = groupAndSortSpans(traces.documents);

  return (
    <main className='w-full flex flex-col p-10 space-y-10 bg-gradient-to-tr from-yellow-100 to-yellow-50'>
      <h1 className='text-3xl font-light'>
        Traces ({Object.keys(parsedTraces).length})
      </h1>
      <AccordionList className='max-w-6xl'>
        {Object.keys(parsedTraces).map((traceId) => (
          <Accordion key={traceId}>
            <AccordionHeader>
              <div className='w-full grid grid-cols-3 gap-4'>
                <Text className='text-left font-semibold text-yellow-600'>
                  {parsedTraces[traceId][0].name}
                </Text>
              </div>
            </AccordionHeader>
            <AccordionBody className='space-y-1'>
              {parsedTraces[traceId].map((item, index) => {
                return (
                  <>
                    <div
                      key={item.spanId}
                      className='px-4 py-1 flex w-full border border-black shadow'
                    >
                      <Text className='text-sm'>{item.name}</Text>
                      {
                        item.error_code === 1 && (
                          <pre className='bg-yellow-100 text-red-600 max-w-6xl overflow-auto p-2 max-h-36'>
                            {item.error}
                          </pre>
                        )
                      }
                    </div>
                    {index + 1 < parsedTraces[traceId].length && (
                      <div className='flex justify-end pr-10'>
                        {' '}
                        <ArrowUTurn />
                      </div>
                    )}
                  </>
                );
              })}
            </AccordionBody>
          </Accordion>
        ))}
      </AccordionList>
    </main>
  );
}

const ArrowUTurn = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-6 h-6'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3'
    />
  </svg>
);
