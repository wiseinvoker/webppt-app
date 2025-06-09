import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders header title', () => {
  render(<App />);
  const headerElement = screen.getByText(/MarkdownPPT/i);
  expect(headerElement).toBeTruthy();
});
