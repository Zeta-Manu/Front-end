import React, { FC, useState } from 'react';

declare module '@components/Navbar' {
  export interface NavbarProps {}

  export const Navbar: FC<NavbarProps>;
}