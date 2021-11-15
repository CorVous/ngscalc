import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import NGSClassDisplay, { NGSClass } from '../src/components/NGSClassDisplay'
import userEvent from '@testing-library/user-event'

describe("Component for displaying and selecting class properties", () => {

  let classMocks: NGSClass[] =  [
    {
      "id": "8",
      "name": "Ranger",
      "stats": [
        {
          "level": 1,
          "hp": 240,
          "attack": 448,
          "defense": 300,
        },
        {
          "level": 2,
          "hp": 242,
          "attack": 457,
          "defense": 305,
        }
      ],
    },
    {
      "id": "13",
      "name": "Bouncer",
      "stats": [
        {
          "level": 1,
          "hp": 275,
          "attack": 453,
          "defense": 299,
        },
        {
          "level": 2,
          "hp": 278,
          "attack": 462,
          "defense": 304,
        },
      ],
    },
    {
      "id": "4",
      "name": "Hunter",
      "stats": [
        {
          "level": 1,
          "hp": 300,
          "attack": 450,
          "defense": 304,
        },
        {
          "level": 2,
          "hp": 303,
          "attack": 459,
          "defense": 309,
        },
      ],
    }
  ]

  beforeEach(() => {
      render(<NGSClassDisplay classes={classMocks} />)
  })

  it("Should be rendered", () => {
    expect(screen.getByText(/Class/i, {exact: true})).toBeInTheDocument()
  })

  it("Should be able to set the class", () => {
    // Enable Class Selection Radio Buttons
    userEvent.click(screen.getByText(/class/i))

    // Class Selection Radio Buttons should be showing
    expect(screen.getByText(/bouncer/i)).toBeInTheDocument()
    expect(screen.getByText(/hunter/i)).toBeInTheDocument()

    // Select bouncer
    userEvent.click(screen.getByText(/bouncer/i))
    
    // Hide Class Selection Radio Buttons
    expect(screen.queryByText(/class/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/hunter/i)).not.toBeInTheDocument()

    // Check if the class is set
    expect(screen.getByText(/bouncer/i)).toBeInTheDocument()
  })

  it("Should be able to set the level of the class to 2", async () => {
    // Set class to bouncer
    userEvent.click(screen.getByText(/class/i))
    userEvent.click(screen.getByText(/bouncer/i))

    // Set level to 2
    userEvent.click(screen.getByLabelText(/level/i))
    userEvent.keyboard('{selectall}2')

    expect(screen.getByLabelText(/level/i)).toHaveValue(2)
    // HP should be updated
    expect(screen.getByText(/278/i)).toBeInTheDocument()
    // Attack should be updated
    expect(screen.getByText(/462/i)).toBeInTheDocument()
    // Defense should be updated
    expect(screen.getByText(/304/i)).toBeInTheDocument()

  })

  it("Should not be able to set level to 0", async () => {
    // Set class to bouncer
    fireEvent.click(screen.getByText(/class/i))
    fireEvent.click(screen.getByText(/bouncer/i))

    // Try to set level to 0
    userEvent.click(screen.getByLabelText(/level/i))
    userEvent.keyboard('{selectall}0')

    expect(screen.getByLabelText(/level/i)).toHaveValue(1)
    // HP should be updated
    expect(screen.getByText(/275/i)).toBeInTheDocument()
    // Attack should be updated
    expect(screen.getByText(/453/i)).toBeInTheDocument()
    // Defense should be updated
    expect(screen.getByText(/299/i)).toBeInTheDocument()

  })  
})