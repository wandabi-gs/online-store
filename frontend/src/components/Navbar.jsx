import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { is_authenicated } from '../query/user';

function Navbar() {
  const [is_auth, setIsAuth] = useState(is_authenicated())

  const routes = [
    {
      route: '/',
      name: 'Home',
      visible : true
    },
    {
      route: '/shop',
      name: 'Shop',
      visible : true
    },
    {
      route: '/cart',
      name: 'Cart',
      visible : is_auth ? true : false
    },
    {
      route: '/login',
      name: 'Login',
      visible : !is_auth ? true : false
    },
    {
      route: '/register',
      name: 'Register',
      visible : !is_auth ? true : false
    },
    {
      route: '/logout',
      name: 'Logout',
      visible : is_auth ? true : false
    },
  ];

  const location = useLocation();

  const [currentRoute, setCurrentRoute] = useState('');

  React.useEffect(() => {
    setIsAuth(is_authenicated())
    const matchingRoute = routes.find((route) => route.route === location.pathname);
    if (matchingRoute) {
      setCurrentRoute(matchingRoute.name);
    } else {
      setCurrentRoute('');
    }
  }, [location]);

  return (
    <nav className='sticky top-0'>
      <div className="h-20 w-full bg-white pt-2 mb-4">
        <div className="flex justify-center h-full items-center font-sans">
          {routes.map((route, index) => {
            if (route.visible) {
              return (
                <Link
                  key={index}
                  to={route.route}
                  className={`text-xl ${currentRoute === route.name ? '' : ''
                    } h-full px-6 flex flex-col justify-center`}
                >
                  {route.name}
                </Link>

              )
            }
            return
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
