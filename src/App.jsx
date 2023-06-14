import { Routes, Route, NavLink } from 'react-router-dom';

import Errors from './pages/Errors';
import Metrics from './pages/Metrics';
import Traces from './pages/Traces';
import Layout from './components/Layout';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Metrics />} />
          <Route path='errors' element={<Errors />} />
          <Route path='traces' element={<Traces />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}


function NoMatch() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <h2 className='font-semibold text-2xl'>Nothing to see here!</h2>
      <p>
        <NavLink to='/' className='text-blue-600'>Go to the home page</NavLink>
      </p>
    </div>
  );
}
