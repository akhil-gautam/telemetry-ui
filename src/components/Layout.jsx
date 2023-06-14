import { Outlet, NavLink } from 'react-router-dom';
import { ChartBarIcon, ViewGridIcon } from '@heroicons/react/outline';

function Layout() {
  return (
    <div className='flex w-screen h-full'>
      <div className='w-24 h-screen rounded-[unset] flex flex-col items-center py-10 px-4 sticky top-0 border-r'>
        <NavLink to='/'>
          <h1 className='text-2xl ring-1 ring-black font-bold text-center p-2 -skew-x-6 bg-yellow-500'>
            TLM
          </h1>
        </NavLink>
        <ul className='mt-20 space-y-6'>
          <li>
            <NavLink to='/'>
              {({ isActive }) => (
                <ViewGridIcon
                  className={`h-10 w-10 p-2 ${
                    isActive ? 'bg-gray-800' : 'bg-yellow-500'
                  } hover:ring-1 ring-black text-white hover:bg-green-500 hover:ring-offset-2 transition`}
                />
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to='/traces'>
              {({ isActive }) => (
                <ChartBarIcon
                  className={`h-10 w-10 p-2 ${
                    isActive ? 'bg-gray-800' : 'bg-yellow-500'
                  } hover:ring-1 ring-black text-white hover:bg-green-500 hover:ring-offset-2 transition`}
                />
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to='/errors'>
              {({ isActive }) => <BugIcon isActive={isActive} />}
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

// eslint-disable-next-line react/prop-types
const BugIcon = ({ isActive }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className={`h-10 w-10 p-2 ${
      isActive ? 'bg-gray-800' : 'bg-yellow-500'
    } hover:ring-1 ring-black text-white hover:bg-green-500 hover:ring-offset-2 transition`}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082'
    />
  </svg>
);

export default Layout;
