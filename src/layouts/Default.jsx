export default function Layout({
  children,
  title,
  description,
}) {
  return (
    <div className="h-full m-auto max-w-7xl p-2 relative">
      <div className="z-1">
        {children}
      </div>
    </div>
  );
}
