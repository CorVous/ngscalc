import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NGSClassDisplay from '../src/components/NGSClassDisplay'
import { NGSClass } from '../src/helpers/HelperTypes'
import { classMocks } from '../__mocks__/dataMocks'
import { mockTranslation } from '../__mocks__/mockTranslation'

function mockSetClass(nClass: NGSClass, level: number) {}

describe("Component for displaying and selecting class properties", () => {
  beforeEach(() => {
      render(<NGSClassDisplay classes={classMocks} locale="en" t={mockTranslation} setClass={mockSetClass} />)
  })

  it("Should be rendered", () => {
    expect(screen.getByText(/class/i, {exact: true})).toBeInTheDocument()
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
    expect(screen.getByText(/278/)).toBeInTheDocument()
    // Attack should be updated
    expect(screen.getByText(/462/)).toBeInTheDocument()
    // Defense should be updated
    expect(screen.getByText(/304/)).toBeInTheDocument()

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
    expect(screen.getByText(/275/)).toBeInTheDocument()
    // Attack should be updated
    expect(screen.getByText(/453/)).toBeInTheDocument()
    // Defense should be updated
    expect(screen.getByText(/299/)).toBeInTheDocument()

  })
})

const testStartingClass = { current: classMocks[0], level: 2 }
describe("Component starts with Ranger and level 2", () => {
  beforeEach(() => {
    render(<NGSClassDisplay locale="en" t={mockTranslation} setClass={mockSetClass} classes={classMocks} startingClass={testStartingClass} />)
  })

  it("Should render with the correct class and info", () => {
    expect(screen.getByText(/ranger/i)).toBeInTheDocument()
    expect(screen.getByText(/242/)).toBeInTheDocument()
    expect(screen.getByText(/457/)).toBeInTheDocument()
    expect(screen.getByText(/305/)).toBeInTheDocument()
  })
})

describe("Component starts with Ranger and level 2 AND is in japanese", () => {
  beforeEach(() => {
    render(<NGSClassDisplay locale="ja" t={mockTranslation} setClass={mockSetClass} classes={classMocks} startingClass={testStartingClass} />)
  })

  it("Should render with the correct class and info", () => {
    expect(screen.getByText(/レンジャー/i)).toBeInTheDocument()
    expect(screen.getByText(/242/)).toBeInTheDocument()
    expect(screen.getByText(/457/)).toBeInTheDocument()
    expect(screen.getByText(/305/)).toBeInTheDocument()
  })
})