import { useMemo } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import routes from '@/admin/index'
import Layout from '@/layouts/Default';
import Button from '@/components/common/Button';
import { useTheme } from '@/services/theme';
import { removeFromStorage } from '@/utils/storage';
import { USER_LOCAL_STORAGE_KEY } from '@/constants';
import { generateUrl } from '@/utils/url';

export default function Admin() {
  const { isDark, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
      ];
    },
    [location, pathname],
  );

  const logout = () => {
    removeFromStorage(USER_LOCAL_STORAGE_KEY);
    navigate('/login');
  };

  return (
    <Layout>
      <div className="flex flex-col gap-1 mb-4">
        <div className="navbar bg-base-100 rounded-md">
          <div className="navbar-start">
            <Button
              icon={isDark ? 'dark_mode_black_24dp' : 'light_mode_black_24dp'}
              square
              onClick={toggleTheme}
              className="mx-2"
            />
          </div>
          <div className="navbar-center">
            <p className="normal-case text-xl">Admin Panel</p>
          </div>
          <div className="navbar-end">
            <Button
              icon='logout_black_24dp'
              square
              onClick={logout}
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
