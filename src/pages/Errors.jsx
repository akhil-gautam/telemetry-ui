import {
  AccordionList,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
  Text,
} from '@tremor/react';
import { useQuery } from 'react-query';
import { errorsListQuery } from '../queries/ErrorQueries';

const Errors = () => {
  const { data: errors, isLoading: isErrorsLoading } = useQuery(
    errorsListQuery()
  );
  
  if (isErrorsLoading) return <div>Loading...</div>;

  return (
    <main className='w-full flex flex-col p-10 space-y-10 bg-yellow-100'>
      <h1 className='text-3xl font-light'>Errors ({errors.total})</h1>
      <AccordionList className='max-w-6xl'>
        {errors.documents.map((error) => (
          <Accordion key={error.id}>
            <AccordionHeader>
              <div className='w-full grid grid-cols-3 gap-4'>
                <Text className='text-left text-blue-600'>{error.name}</Text>
                <Text>
                  {new Date(error.startTimeUnixNano / 1e6).toLocaleString()}
                </Text>
                <Button disabled size='xs' variant='secondary' className='rounded-md ml-auto'>
                  View trace
                </Button>
              </div>
            </AccordionHeader>
            <AccordionBody>
              <pre className='p-2 bg-yellow-50 max-w-full overflow-x-auto text-red-600'>
                {error.error}
              </pre>
            </AccordionBody>
          </Accordion>
        ))}
      </AccordionList>
    </main>
  );
};

export default Errors;
