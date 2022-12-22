import { useTheme } from '@/services/theme';
import Button from '@/components/common/Button';
import history from '@/utils/history';

export default function Layout({
  title,
  children,
}) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="h-full m-auto max-w-7xl p-2 relative">
      <div className="navbar bg-base-200 bg-opacity-80 rounded-md">
        <div className="navbar-start">
          <Button
            icon={isDark ? 'dark_mode_black_24dp' : 'light_mode_black_24dp'}
            square
            onClick={toggleTheme}
            className="mx-2"
          />
        </div>
        <div className="navbar-center">
          <p className="normal-case text-xl">{title}</p>
        </div>
        <div className="navbar-end">
          <Button
            icon='logout_black_24dp'
            square
            onClick={history.back}
            className="mx-2"
          />
        </div>
      </div>
      <div className="z-1">
        {children}
      </div>
    </div>
  );
}
