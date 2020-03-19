import React from 'react';

interface Props {
  aria: boolean;
  attributes: {};
  d_key: string;
  role: string;
  tabIndex: string;
  children: React.ReactNode;
  tag?: string;
  onClick?: (e: React.SyntheticEvent<MouseEvent>) => void;
  [rest: string]: any;
}

export type DropdownMenuComponent = Props;

const DropdownMenuComponent: React.FC<DropdownMenuComponent> = ({ tag: Tag, tabIndex, role, attributes, aria, d_key, children }) => (
  /*
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/camelcase */
  <Tag data-test="dropdown-menu-component" tabIndex={tabIndex} role={role} {...attributes} aria-hidden={aria} key={d_key}>
    {children}
  </Tag>
);

export default DropdownMenuComponent;
