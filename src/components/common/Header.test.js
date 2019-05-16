import React from "react";
import Header from "./Header";
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

it('contains 3 NavLinks via shallow', () => {
  const numLink = shallow(<Header />).find("NavLink").length;
  expect(numLink).toEqual(3);
});

it('contains 3 anchors via mount', () => {
  const numAnchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;

  expect(numAnchors).toEqual(3);
});