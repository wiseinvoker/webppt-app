import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders new slide link', () => {
  render(<App />);
  const linkElement = screen.getByText(/new slide/i);
  expect(linkElement).toBeTruthy();
});
