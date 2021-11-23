import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ArmorDisplay from '../src/components/ArmorDisplay'
import { ArmorSet } from '../src/helpers/HelperTypes'
import { armorMock, armorRarityScalingMock } from '../__mocks__/dataMocks'
import { mockTranslation } from '../__mocks__/mockTranslation'

function mockSetArmor(armor: ArmorSet[]) {}
const mockTestArmor: ArmorSet[] = [
  {
    armor: armorMock[0],
    enhanceLevel: 0,
  },
  {
    armor: armorMock[0],
    enhanceLevel: 3,
  },
  {
    armor: armorMock[0],
    enhanceLevel: 4,
  },
]

describe("Component to display and select armor", () => {

  beforeEach(() => {
    render(<ArmorDisplay t={mockTranslation} locale="en" setArmor={mockSetArmor}
      armors={armorMock}
      armorRarityScalings={armorRarityScalingMock}
    />)
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
    expect(screen.getByTestId('effect-hp')).toHaveTextContent('+10')

    // Try to set enhancement level to 2
    userEvent.click(screen.getByLabelText(/primm armor/i))
    userEvent.keyboard('{selectall}2')
    expect(screen.getByTestId('armor-defense-value')).toHaveTextContent('10')

    // Try to set enhancement level to -19
    // Expect level 0 to be the minimum
    userEvent.click(screen.getByLabelText(/primm armor/i))
    userEvent.keyboard('{selectall}-19')
    expect(screen.getByTestId('armor-defense-value')).toHaveTextContent('8')

    // Try to set enhancement level to 48
    // Expect level 40 to be the max
    userEvent.click(screen.getByLabelText(/primm armor/i))
    userEvent.keyboard('{selectall}45')
    expect(screen.getByTestId('armor-defense-value')).toHaveTextContent('48')

  })

  it("Shouldn't see primm armor if typing in a Z", () => {
    userEvent.click(screen.getByText(/select/i))
    userEvent.click(screen.getByPlaceholderText(/armor name/i))
    userEvent.keyboard('z')
    expect(screen.queryByText(/primm armor/i)).not.toBeInTheDocument()
  })

  it("Should be able to set 3 primm armors", () => {
    userEvent.click(screen.getByText(/select/i))
    userEvent.click(screen.getByPlaceholderText(/armor name/i))
    userEvent.click(screen.getByText(/primm armor/i))
    userEvent.click(screen.getByText(/primm armor x1/i))
    userEvent.click(screen.getByText(/primm armor x2/i))
    expect(screen.getAllByText(/primm armor/i)).toHaveLength(4)
    userEvent.click(screen.getByText(/confirm/i))
    expect(screen.getAllByText(/primm armor/i)).toHaveLength(3)
  })

  it("Should be able to remove 1 primm armor in search and remove 1 primm armor after search", () => {
    userEvent.click(screen.getByText(/select/i))
    userEvent.click(screen.getByPlaceholderText(/armor name/i))
    userEvent.click(screen.getByText(/primm armor/i))
    userEvent.click(screen.getAllByText(/primm armor/i)[1])
    userEvent.click(screen.getAllByText(/primm armor/i)[2])
    expect(screen.getAllByText(/primm armor/i)).toHaveLength(4)
    userEvent.click(screen.getAllByText("[x]")[0])
    expect(screen.getAllByText(/primm armor/i)).toHaveLength(3)
    userEvent.click(screen.getByText(/confirm/i))
    expect(screen.getAllByText(/primm armor/i)).toHaveLength(2)
    userEvent.click(screen.getAllByText("[x]")[0])
    expect(screen.getAllByText(/primm armor/i)).toHaveLength(1)
  })
})

describe("Component in Japanese", () => {
  it("Should render armor name in Japanese", () => {
    render(<ArmorDisplay t={mockTranslation} locale="ja" setArmor={mockSetArmor}
      armors={armorMock}
      armorRarityScalings={armorRarityScalingMock}
    />)

    userEvent.click(screen.getByText(/select/i))
    userEvent.click(screen.getByPlaceholderText(/armor name/i))
    userEvent.keyboard('プリ')
    userEvent.click(screen.getByText(/プリムアーマ/))
    userEvent.click(screen.getByText(/confirm/i))

    expect(screen.getByText(/プリムアーマ/)).toBeInTheDocument()
  })
})