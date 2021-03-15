import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Pattr in topnav', () => {
  render(<App />)
  const linkElement = screen.getByText(/Pattr/i)
  expect(linkElement).toBeInTheDocument()
})
