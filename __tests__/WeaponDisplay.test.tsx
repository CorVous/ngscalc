import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WeaponDisplay from '../src/components/WeaponDisplay'

describe("Component for Selecting and showing your weapon", () => {
  
  beforeEach(() => {
    render(<WeaponDisplay />)
  })

  it("Should be rendered", () => {
    expect(screen.getByText(/weapon/i, {exact: true})).toBeInTheDocument()
  })
})