import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import ClassDisplay from '../components/ClassDisplay'

describe("Component for displaying and selecting class properties", () => {

  beforeEach(() => {
      render(<ClassDisplay />)
  })

  it("Should be rendered", () => {
    expect(screen.getByText(/Class/i, {exact: true})).toBeInTheDocument()
  })

  it("Should be able to set the class", () => {
    // Enable Class Selection Radio Buttons
    fireEvent.click(screen.getByText(/class/i))

    // Class Selection Radio Buttons should be showing
    expect(screen.getByLabelText(/bouncer/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/hunter/i)).toBeInTheDocument()

    // Select bouncer
    fireEvent.click(screen.getByLabelText(/bouncer/i))
    
    // Hide Class Selection Radio Buttons
    expect(screen.getByText(/class/i)).not.toBeInTheDocument()
    expect(screen.getByLabelText(/hunter/i)).not.toBeInTheDocument()

    // Check if the class is set
    expect(screen.getByLabelText(/bouncer/i)).toBeInTheDocument()

    it("Should be able to set the level of the class to 2", () => {
      // Set level to 2
      fireEvent.change(screen.getByLabelText(/level/i), {target: {value: "2"}})
      expect(screen.getByText(/hp/i)).toHaveValue("278")
      expect(screen.getByText(/attack/i)).toHaveValue("462")
      expect(screen.getByText(/defense/i)).toHaveValue("304")
    })

    it("Should not be able to set level to 0", () => {
      // Try to set level to 0
      fireEvent.change(screen.getByLabelText(/level/i), {target: {value: "0"}})
      expect(screen.getByLabelText(/level/i)).toHaveValue("0")
      expect(screen.getByText(/hp/i)).toHaveValue("275")
      expect(screen.getByText(/attack/i)).toHaveValue("453")
      expect(screen.getByText(/defense/i)).toHaveValue("299")
    })
  })

})