import { mergeClassNames } from '@/utils/react';
import { Children, useMemo } from 'react';
import Icon from './Icon';

export function TableField({
  _tag,
  children,
  className,
  ...props
}) {
  const Tag = _tag;
  return <Tag className={mergeClassNames('text-start text-base p-4', className)} {...props}>{children}</Tag>;
}

TableField.defaultProps = {
  _tag: 'td',
};

export function TableRow({
  type,
  children,
  className,
  ...props
}) {
  const fieldTag = type === 'header' ? 'th' : 'td';

  const fieldChildren = useMemo(
    () => Children
      .toArray(children)
      .filter((child) => child.type === TableField)
      .map((child) => ({ ...child, props: { ...child.props, _tag: fieldTag } })),
    [children],
  );

  return fieldChildren.length ? (
    <tr className={mergeClassNames(className)} {...props}>{fieldChildren}</tr>
  ) : null;
}

TableRow.defaultProps = {
  type: 'body', // header, body, footer
};

export function TableEmptyFallback({
  children,
  className,
  ...props
}) {
  return <div className={mergeClassNames(className)} {...props}>{children}</div>;
}

export function Table({
  children,
  header,
  body,
  className,
  ...props
}) {
  const headerChildren = useMemo(
    () => Children.toArray(children).filter((child) => child.type === TableRow && child.props.type === 'header'),
    [children],
  );
  const bodyChildren = useMemo(
    () => Children.toArray(children).filter((child) => child.type === TableRow && child.props.type === 'body'),
    [children],
  );
  const emptyChildren = useMemo(
    () => Children.toArray(children).filter((child) => child.type === TableEmptyFallback),
    [children],
  );

  const renderHeaderCheck = useMemo(
    () => headerChildren.length
      && (bodyChildren.length || (!bodyChildren.length && !emptyChildren.length)),
    [children],
  );
  return (
    <div className="overflow-auto">
      <table className={mergeClassNames('w-full bg-base-100 divide-y divide-base-200 text-base', className)} {...props}>
        {renderHeaderCheck ? <thead>{headerChildren}</thead> : null}
        {bodyChildren.length ? (
          <tbody className="divide-y">{bodyChildren}</tbody>
        ) : (
          <tbody>
            <tr>
              <th colSpan="999" className="py-10 text-lg text-base-content text-opacity-80 font-normal">
                {
                  emptyChildren.length ? (
                    emptyChildren
                  ) : (
                    <div className="flex items-center justify-center gap-1">
                      <Icon name="error_outline_black_24dp" className="h-10 w-10" />
                      <span>There is nothing to show!</span>
                    </div>
                  )
                }
              </th>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}
