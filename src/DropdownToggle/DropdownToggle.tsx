import React from 'react';
import classNames from 'classnames';
import { Reference } from 'react-popper';
import { ToggleContext } from '../Dropdown';

interface Props {
  caret?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  nav?: boolean;
  tag?: string;
  onClick?: (e: React.SyntheticEvent<MouseEvent>) => void;
  [rest: string]: any;
}

interface DefaultProps {
  'aria-haspopup'?: boolean;
  color?: string;
}

export type DropdownToggleProps = Props & DefaultProps;

class DropdownToggle extends React.Component<DropdownToggleProps> {
  static defaultProps = {
    'aria-haspopup': true,
    color: 'secondary'
  };

  onClick = (e: React.SyntheticEvent<MouseEvent>, toggle: any) => {
    const { disabled, nav, tag, onClick } = this.props;

    if (disabled) {
      e.preventDefault();
      return;
    }

    if (nav && !tag) {
      e.preventDefault();
    }

    if (onClick) {
      onClick(e);
    }

    toggle(e);
  };

  render() {
    const { className, color, caret, nav, tag, ...props } = this.props;
    const ariaLabel = props['aria-label'] || 'Toggle Dropdown';

    const classes = classNames(
      'btn-primary btn btn-md',
      {
        'dropdown-toggle': caret,
        'nav-link': nav
      },
      className
    );

    const children = props.children || <span className="sr-only">{ariaLabel}</span>;

    let Tag = tag;

    if (nav && !tag) {
      Tag = 'a';
      // @ts-ignore
      props.href = '#';
    } else if (!tag) {
      Tag = 'button';
      // @ts-ignore
      props.color = color;
    }

    return (
      <Reference data-test="dropdown-toggle">
        {({ ref }) => {
          return (
            <ToggleContext.Consumer>
              {({ isOpen, toggle }) =>
                tag || nav ? (
                  /*
                  // @ts-ignore */
                  <Tag {...props} className={classes} onClick={e => this.onClick(e, toggle)} aria-expanded={isOpen} ref={ref}>
                    {children}
                  </Tag>
                ) : (
                  /*
                  // @ts-ignore */
                  <Tag {...props} className={classes} onClick={e => this.onClick(e, toggle)} aria-expanded={isOpen} ref={ref}>
                    {children}
                  </Tag>
                )
              }
            </ToggleContext.Consumer>
          );
        }}
      </Reference>
    );
  }
}

export default DropdownToggle;
