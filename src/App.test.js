import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('Clear button', () => {
  render(<App />);

  fireEvent.click(screen.getByText('1'));
  fireEvent.click(screen.getByText('2'));

  expect(screen.getByRole('textbox').value).toBe('12');

  fireEvent.click(screen.getByText('Clear'));

  expect(screen.getByRole('textbox').value).toBe('');
});

test('Equal button', () => {
  render(<App />);

  fireEvent.click(screen.getByText('7'));
  fireEvent.click(screen.getByText('+'));
  fireEvent.click(screen.getByText('5'));

  expect(screen.getByRole('textbox').value).toBe('7+5');

  fireEvent.click(screen.getByText('='));

  expect(screen.getByRole('textbox').value).toBe('12');
});

test('Backspace button', () => {
  render(<App />);

  fireEvent.click(screen.getByText('3'));
  fireEvent.click(screen.getByText('4'));
  fireEvent.click(screen.getByText('5'));

  expect(screen.getByRole('textbox').value).toBe('345');

  fireEvent.click(screen.getByText('C'));

  expect(screen.getByRole('textbox').value).toBe('34');

  fireEvent.click(screen.getByText('C'));

  expect(screen.getByRole('textbox').value).toBe('3');
});

test('Multiplication and Division', () => {
  render(<App />);

  fireEvent.click(screen.getByText('6'));
  fireEvent.click(screen.getByText('*'));
  fireEvent.click(screen.getByText('7'));

  expect(screen.getByRole('textbox').value).toBe('6*7');

  fireEvent.click(screen.getByText('='));

  expect(screen.getByRole('textbox').value).toBe('42');

  fireEvent.click(screen.getByText('Clear'));

  fireEvent.click(screen.getByText('8'));
  fireEvent.click(screen.getByText('0'));
  fireEvent.click(screen.getByText('/'));
  fireEvent.click(screen.getByText('4'));

  expect(screen.getByRole('textbox').value).toBe('80/4');

  fireEvent.click(screen.getByText('='));

  expect(screen.getByRole('textbox').value).toBe('20');
});
