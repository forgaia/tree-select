import { ChildContextProps, ToggleContext } from '../Dropdown';
import React, { Component } from 'react';
import classNames from 'classnames';
import { omit } from '../utils';

interface Props {
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
  header?: boolean;
  onClick?: (e: React.SyntheticEvent<MouseEvent>) => void;
  [rest: string]: any;
}

interface DefaultProps {
  toggle?: boolean;
  tag?: string;
}

export type DropdownItemProps = Props & DefaultProps;

class DropdownItem extends Component<DropdownItemProps> {
  static defaultProps: DefaultProps = {
    tag: 'button',
    toggle: true
  };

  onClick = (e: React.SyntheticEvent<MouseEvent>, context: ChildContextProps) => {
    const { disabled, header, divider, onClick, toggle } = this.props;

    if (disabled || header || divider) {
      e.preventDefault();
      return;
    }

    if (onClick) {
      onClick(e);
    }

    if (toggle) {
      context.toggle();
    }
  };

  getTabIndex = () => {
    const { disabled, header, divider } = this.props;

    if (disabled || header || divider) {
      return '-1';
    }

    return '0';
  };

  render() {
    const tabIndex = this.getTabIndex();
    // @ts-ignore
    // eslint-disable-next-line prefer-const
    let { className, divider, tag: Tag, header, href, active, disabled, ...props } = omit(this.props, ['toggle']) as typeof Props;

    const { toggle } = this.props;

    const classes = classNames(
      {
        active,
        disabled,
        'dropdown-item': !divider && !header,
        'dropdown-header': header,
        'dropdown-divider': divider
      },
      className
    );

    if (Tag === 'button') {
      if (header) {
        Tag = 'h6';
      } else if (divider) {
        Tag = 'div';
      } else if (href) {
        Tag = 'a';
      }
    }

    const type = Tag === 'button' && (props.onClick || toggle) ? 'button' : undefined;
    return (
      <ToggleContext.Consumer>
        {context => <Tag data-test="dropdown-item" type={type} {...props} tabIndex={tabIndex} className={classes} onClick={(e: any) => this.onClick(e, context)} href={href} />}
      </ToggleContext.Consumer>
    );
  }
}

export default DropdownItem;
