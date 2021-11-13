import '@testing-library/jest-dom'
import { fireEvent, getByText, render, screen } from '@testing-library/react'

describe.skip("Component for displaying and selecting class properties", () => {

  beforeEach(() => {
      render(<ClassDisplay />)
  })

  it("Should be rendered", () => {
    expect(screen.getByText(/Class/i, {exact: true})).toBeInTheDocument()
  })
      

  it("Should be able to set the class", () => {
    // Activate Class Selection popup
    fireEvent.click(screen.getByText(/select class/i))

    // Class Select Popup Screen
    const classSelectPopup = screen.getByText(/class selection/i).closest("div")

    expect(classSelectPopup).toBeInTheDocument()

    // Select bouncer
    fireEvent.click(getByText(classSelectPopup, /bouncer/i))
    
    // Hide Class Popup
    expect(classSelectPopup).not.toBeInTheDocument()

    // Check if the class is set
    expect(screen.getByText(/bouncer/i)).toBeInTheDocument()

    it("Should be able to set the level of the class", () => {
      
    })
  })

})