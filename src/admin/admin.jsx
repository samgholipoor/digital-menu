import { useMemo } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import routes from '@/admin/index'
import Layout from '@/layouts/Default';
import Button from '@/components/common/Button';
import { useTheme } from '@/services/theme';
import Icon from '@/components/common/Icon';

export default function Admin() {
  const { isDark, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  const appLinks = useMemo(
    () => {
      const createAppLink = (linkTitle, linkIcon, linkTo) => {
        return {
          linkTo,
          linkTitle,
          linkIcon,
          isSelected: pathname === linkTo,
        };
      };
      return [
        createAppLink('My Store', 'storefront_black_24dp', '/admin/store'),
        createAppLink('Categories', 'menu_book_black_24dp', '/admin/categories'),
        createAppLink('Foods', 'fastfood_black_24dp', '/admin/foods'),
        createAppLink('Users', 'person_black_24dp', '/admin/users'),
      ];
    },
    [location, pathname],
  );

  return (
    <Layout>
      <div className="flex flex-col gap-1 mb-4">
        <div className="navbar bg-base-100 rounded-md">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex="0" className="btn btn-ghost btn-circle">
                <Icon name='more_vert_black_24dp' className="w-6 mx-2" />
              </label>
              <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
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
        <div className='bg-base-200 rounded-md'>
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
