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
    expect(screen.getByTestId('class-hp-value')).toHaveTextContent('278')
    expect(screen.getByTestId('class-attack-value')).toHaveTextContent('462')
    expect(screen.getByTestId('class-defense-value')).toHaveTextContent('304')
  })

  it("Should not be able to set level to 0", async () => {
    // Set class to bouncer
    fireEvent.click(screen.getByText(/class/i))
    fireEvent.click(screen.getByText(/bouncer/i))

    // Try to set level to 0
    userEvent.click(screen.getByLabelText(/level/i))
    userEvent.keyboard('{selectall}0')

    expect(screen.getByLabelText(/level/i)).toHaveValue(1)
    expect(screen.getByTestId('class-hp-value')).toHaveTextContent('275')
    expect(screen.getByTestId('class-attack-value')).toHaveTextContent('453')
    expect(screen.getByTestId('class-defense-value')).toHaveTextContent('299')

  })
})

const testStartingClass = { current: classMocks[0], level: 2 }
describe("Component starts with Ranger and level 2", () => {
  beforeEach(() => {
    render(<NGSClassDisplay locale="en" t={mockTranslation} setClass={mockSetClass} classes={classMocks} startingClass={testStartingClass} />)
  })

  it("Should render with the correct class and info", () => {
    expect(screen.getByText(/ranger/i)).toBeInTheDocument()
    expect(screen.getByTestId('class-hp-value')).toHaveTextContent('242')
    expect(screen.getByTestId('class-attack-value')).toHaveTextContent('457')
    expect(screen.getByTestId('class-defense-value')).toHaveTextContent('305')
  })
})

describe("Component starts with Ranger and level 2 AND is in japanese", () => {
  beforeEach(() => {
    render(<NGSClassDisplay locale="ja" t={mockTranslation} setClass={mockSetClass} classes={classMocks} startingClass={testStartingClass} />)
  })

  it("Should render with the correct class and info", () => {
    expect(screen.getByText(/???????????????/i)).toBeInTheDocument()
    expect(screen.getByTestId('class-hp-value')).toHaveTextContent('242')
    expect(screen.getByTestId('class-attack-value')).toHaveTextContent('457')
    expect(screen.getByTestId('class-defense-value')).toHaveTextContent('305')
  })
})