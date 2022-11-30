import { useMemo } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import routes from '@/admin/index'
import Layout from '@/layouts/Default';
import Button from '@/components/common/Button';
import { useTheme } from '@/services/theme';

export default function Admin() {
  const { isDark, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  const appLinks = useMemo(
    () => {
      const createAppLink = (linkTitle, linkIcon, linkTo) => {
        console.log(pathname === linkTo, pathname , linkTo);
        return {
          linkTo,
          linkTitle,
          linkIcon,
          isSelected: pathname === linkTo,
        };
      };
      return [
        createAppLink('Stores', 'storefront_black_24dp', '/admin/stores'),
        createAppLink('Categories', 'menu_book_black_24dp', '/admin/categories'),
        createAppLink('Foods', 'fastfood_black_24dp', '/admin/foods'),
        createAppLink('Users', 'person_black_24dp', '/admin/users'),
      ];
    },
    [location, pathname],
  );

  return (
    <Layout>
      <div className="flex flex-col gap-1">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabindex="0" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
              </label>
              <ul tabindex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Exit</a></li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <p className="normal-case text-xl">Admin Panel</p>
          </div>
          <div className="navbar-end">
            <Button
              icon={isDark ? 'dark_mode_black_24dp' : 'light_mode_black_24dp'}
              square
              onClick={toggleTheme}
              className="mx-2"
            />
          </div>
        </div>
        <div className='bg-base-200'>
          <div className='flex flex-row flex-nowrap gap-2 whitespace-nowrap overflow-auto p-2'>
            { appLinks.map((appLink) => (
              <Button
                key={appLink.linkTitle}
                selected={appLink.isSelected}
                icon={appLink.linkIcon}
                component={NavLink}
                to={appLink.linkTo}
                title={appLink.linkTitle}
                transparent
              >
                { appLink.linkTitle }
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </Layout>
  );
}




Admin.routerConfig = {
  type: 'page',
  path: '/admin',
  autoLogin: true,
  userValidator: (user) => !!user,
  nestedRoutes: routes
};
