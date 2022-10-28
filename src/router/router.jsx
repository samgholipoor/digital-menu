import { HashRouter, Routes, Route } from 'react-router-dom';
import pages from '@/pages';
import Error from '@/layouts/Error';

export const UserValidationWrapper = ({ userValidator, children }) => {
  const user = {};

  if (userValidator(user)) {
    return children;
  }

  return <Error code={403} message="You Can't Access to This Page!" />;
};

export function RouterView() {
  const appRoutesList = pages.map((Page) => {
    const {
      routerConfig: { path, autoLogin = true, userValidator = () => true },
    } = Page;

    const element = (
      <UserValidationWrapper
        autoLogin={autoLogin}
        userValidator={userValidator}
      >
        <Page />
      </UserValidationWrapper>
    );

    return <Route key={path} path={path} element={element} />;
  });

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
      <Routes>{appRoutesList}</Routes>
    </HashRouter>
  );
}
