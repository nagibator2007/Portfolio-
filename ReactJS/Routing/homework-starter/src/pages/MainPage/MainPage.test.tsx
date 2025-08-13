import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MainPage } from '../MainPage';

describe('MainPage', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});