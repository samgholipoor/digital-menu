import { HashRouter, Routes, Route } from 'react-router-dom';
import pages from '@/pages';
import Error from '@/layouts/Error';
import { ThemeProvider } from '@/services/theme';
import { LoadingProvider } from '@/services/loading';
import { OverlaysProvider } from '@/services/overlay';

export const UserValidationWrapper = ({ userValidator, children }) => {
  const user = {};

  if (userValidator(user)) {
    return children;
  }

  return <Error code={403} message="You Can't Access to This Page!" />;
};

const generateRoutes = (p) => {
  return p.map((Page) => {
    const {
      routerConfig: { path, autoLogin = true, userValidator = () => true, nestedRoutes = null },
    } = Page;

    const element = (
      <UserValidationWrapper
        autoLogin={autoLogin}
        userValidator={userValidator}
      >
        <Page />
      </UserValidationWrapper>
    );

    return <Route key={path} path={path} element={element} > {nestedRoutes && generateRoutes(nestedRoutes)} </Route>;
  });
}

export function RouterView() {
  const appRoutesList = generateRoutes(pages)
  
  // 404
  appRoutesList.push(
    <Route
      key="*"
      path="*"
      element={<Error code={404} message="Not Found!" />}
    />,
  );

  return (
    <HashRouter>
      <LoadingProvider>
        <ThemeProvider>
          <OverlaysProvider>
            <Routes>{appRoutesList}</Routes>
          </OverlaysProvider>
        </ThemeProvider>
      </LoadingProvider>
    </HashRouter>
  );
}
