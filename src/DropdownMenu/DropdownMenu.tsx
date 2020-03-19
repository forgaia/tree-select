import { ChildContextProps, ToggleContext } from '../Dropdown';
import React, { Component } from 'react';
import classNames from 'classnames';
import { Popper } from 'react-popper';
import DropdownMenuComponent from '../DropdownMenuComponent';

import './DropdownMenu.css';

interface Props {
  isOpen?: boolean;
  children: React.ReactNode;
  [rest: string]: any;
}

interface DefaultProps {
  basic?: boolean;
  className?: string;
  flip?: boolean;
  right?: boolean;
  tag?: string;
  color?: 'primary' | 'default' | 'secondary' | 'success' | 'dark' | 'danger' | 'info' | 'warning' | 'ins' | 'indigo' | 'special';
}

export type DropdownMenuProps = Props & DefaultProps;

class DropdownMenu extends Component<DropdownMenuProps> {
  static defaultProps = {
    basic: false,
    className: '',
    flip: true,
    right: false,
    tag: 'div',
    color: false
  };

  renderDropdownMenu(context: ChildContextProps) {
    // @ts-ignore
    const { basic, children, className, color, flip, modifiers, right, tag, ...attrs } = this.props;
    const { isOpen, dropup, dropright, dropleft } = context;

    const classes = classNames(
      {
        'dropdown-menu-right': right,
        [`dropdown-${color}`]: color,
        show: isOpen,
        basic
      },
      'dropdown-menu',
      className
    );

    const Tag = tag;

    if (isOpen) {
      // eslint-disable-next-line no-nested-ternary
      const position1 = dropup ? 'top' : dropright ? 'right' : dropleft ? 'left' : 'bottom';

      const position2 = right ? 'end' : 'start';

      // @ts-ignore
      attrs.placement = `${position1}-${position2}`;
      // @ts-ignore
      attrs.component = tag;
    }

    return (
      <Popper modifiers={modifiers || (!flip && { flip: { enabled: false } })} eventsEnabled positionFixed={false} placement={attrs.placement} data-test="dropdown-menu">
        {({ placement, ref, style }) => (
          /*
          // @ts-ignore */
          <Tag ref={ref} style={style} data-placement={placement} className={classes}>
            <DropdownMenuComponent isOpen={isOpen} tag={Tag} tabIndex="-1" role="menu" attributes={attrs} aria={!isOpen} d_key="dropDownMenu" color={color}>
              {children}
            </DropdownMenuComponent>
          </Tag>
        )}
      </Popper>
    );
  }

  render() {
    return <ToggleContext.Consumer>{context => this.renderDropdownMenu(context)}</ToggleContext.Consumer>;
  }
}

export default DropdownMenu;
