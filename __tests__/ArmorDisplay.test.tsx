import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ArmorDisplay from '../src/components/ArmorDisplay'
import { NGSClass } from '../src/helpers/HelperTypes'
import { armorMocks } from '../__mocks__/dataMocks'
import { mockTranslation } from '../__mocks__/mockTranslation'

describe("Component to display and select armor", () => {

  beforeEach(() => {
    render(<ArmorDisplay />)
  })

  it("Should render", () => {
    expect(screen.getByText(/armor/i)).toBeInTheDocument()
  })

  it("Should be able to select armor", () => {
    expect(screen.queryByPlaceholderText(/armor name/i)).not.toBeInTheDocument()
    userEvent.click(screen.getByText(/select/i))
    userEvent.click(screen.getByPlaceholderText(/armor name/i))
    userEvent.keyboard('prim')
    userEvent.click(screen.getByText(/primm armor/i))
    userEvent.click(screen.getByText(/confirm/i))

    expect(screen.getByText(/select/i)).toBeInTheDocument()
    expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument()

    expect(screen.getByText(/primm armor/i)).toBeInTheDocument()

    expect(screen.getByTestId('armor-defense-value')).toHaveTextContent('8')
    expect(screen.getByTestId('effect-hp-value')).toHaveTextContent('+10')

    // Try to set enhancement level to 2
    userEvent.click(screen.getByLabelText(/primm armor/i))
    userEvent.keyboard('{selectall}2')
    expect(screen.getByTestId('armor-defense-value')).toHaveTextContent('10')
  })

  it("Shouldn't see primm armor if typing in a Z", () => {
    userEvent.click(screen.getByText(/select/i))
    userEvent.click(screen.getByPlaceholderText(/armor name/i))
    userEvent.keyboard('z')
    expect(screen.queryByText(/primm armor/i)).not.toBeInTheDocument()
  })
})

describe("Component in Japanese", () => {
  it("Should render armor name in Japanese", () => {
    render(<ArmorDisplay locale="ja" 
    
    />)

    userEvent.click(screen.getByText(/select/i))
    userEvent.click(screen.getByPlaceholderText(/armor name/i))
    userEvent.keyboard('プリ')
    userEvent.click(screen.getByText(/primm armor/i))
    userEvent.click(screen.getByText(/confirm/i))

    expect(screen.getByText("プリムアーマ")).toBeInTheDocument()
  })
})