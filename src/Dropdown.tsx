import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Manager } from 'react-popper';
import classNames from 'classnames';
import { omit, keyCodes } from './utils';

interface Props {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  size?: 'sm' | 'lg';
  toggle?: () => void;
  [rest: string]: any;
}

interface DefaultProps {
  tag?: string;
  dropup?: boolean;
  dropright?: boolean;
  dropleft?: boolean;
}

export type DropdownProps = Props & DefaultProps;

export interface ChildContextProps {
  dropleft: boolean;
  dropright: boolean;
  dropup: boolean;
  isOpen: boolean;
  toggle: () => void;
}

interface State {
  isOpen: boolean;
}

export const ToggleContext = React.createContext<ChildContextProps>({
  isOpen: false,
  dropup: false,
  dropright: false,
  dropleft: false,
  toggle: () => {}
});

class Dropdown extends Component<DropdownProps, State> {
  static defaultProps: DefaultProps = {
    dropleft: false,
    dropright: false,
    dropup: false,
    tag: 'div'
  };

  state = {
    isOpen: false
  };

  getContextValue(): ChildContextProps {
    const { isOpen } = this.state;
    const { dropup, dropright, dropleft } = this.props;
    return {
      isOpen,
      dropup: !!dropup,
      dropright: !!dropright,
      dropleft: !!dropleft,
      toggle: this.toggle
    };
  }

  componentDidMount() {
    this.handleEventsBinding();
  }

  componentDidUpdate() {
    this.handleEventsBinding();
  }

  componentWillUnmount() {
    this.removeEvents();
  }

  getContainer = () => {
    // eslint-disable-next-line react/no-find-dom-node
    return ReactDOM.findDOMNode(this);
  };

  addEvents = () => {
    ['click', 'touchstart', 'keyup'].forEach(event => document.addEventListener(event, this.handleDocumentClick, true));
  };

  removeEvents = () => {
    ['click', 'touchstart', 'keyup'].forEach(event => document.removeEventListener(event, this.handleDocumentClick, true));
  };

  // @ts-ignore
  handleDocumentClick = e => {
    const { which: keyCode, type, target } = e;
    const { tab } = keyCodes;

    const MOUSE_RIGHT_CLICK = keyCode === 3;
    const TAB = keyCode === tab;
    const KEYUP = type === 'keyup';

    if (MOUSE_RIGHT_CLICK || (KEYUP && !TAB)) {
      return;
    }

    const container = this.getContainer();

    // @ts-ignore
    if (container.contains(target) && container !== target && (!KEYUP || TAB)) {
      return;
    }

    this.toggle();
  };

  // @ts-ignore
  handleFocus = (e, items) => {
    const { up, down } = keyCodes;
    const { which: keyCode, target } = e;

    const UP = keyCode === up;
    const DOWN = keyCode === down;

    let index = [...items].findIndex(item => item === target);

    if (UP && index > 0) {
      index -= 1;
    }

    if (DOWN && index < items.length - 1) {
      index += 1;
    }

    if (index < 0) {
      index = 0;
    }

    items[index].focus();
  };

  // @ts-ignore
  handleKeyDown = e => {
    const { isOpen } = this.state;
    const { disabled } = this.props;
    const { which: keyCode, target } = e;
    const { esc, up, down, space } = keyCodes;

    const SPACE = keyCode === space;
    const ESC = keyCode === esc;

    if (![esc, up, down, space].includes(keyCode) || (/button/i.test(target.tagName) && SPACE) || /input|textarea/i.test(target.tagName)) {
      return;
    }

    e.preventDefault();

    if (disabled) {
      return;
    }

    const container = this.getContainer();

    if (SPACE && isOpen && container !== target) {
      target.click();
    }

    if (ESC || !isOpen) {
      this.toggle();
      // @ts-ignore
      const btn = container.children[0];
      btn.focus();

      return;
    }

    // @ts-ignore
    const items = container.querySelectorAll('.dropdown-menu .dropdown-item:not(.disabled)');

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    items.length && this.handleFocus(e, items);
  };

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleEventsBinding() {
    const { isOpen } = this.state;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isOpen ? this.addEvents() : this.removeEvents();
  }

  render() {
    // @ts-ignore
    const { className, children, dropup, dropright, dropleft } = omit(this.props, ['toggle', 'disabled']);

    const { isOpen } = this.state;

    const classes = classNames(
      {
        dropdown: true,
        show: isOpen,
        dropup,
        dropright,
        dropleft
      },
      className
    );
    return (
      <Manager>
        <div data-test="dropdown" className={classes} role="button" tabIndex={0} onKeyDown={this.handleKeyDown}>
          <ToggleContext.Provider value={this.getContextValue()}>{children}</ToggleContext.Provider>
        </div>
      </Manager>
    );
  }
}

export default Dropdown;
