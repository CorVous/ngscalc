import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WeaponDisplay from '../src/components/WeaponDisplay'
import { WeaponSeries } from '../src/helpers/HelperTypes'
import { classMocks, conditionCategoriesMock, conditionsMock, weaponRarityAttackScalingsMock, weaponsMock, weaponTypesMock } from '../__mocks__/dataMocks'
import { mockTranslation } from '../__mocks__/mockTranslation'

function mockSetWeapon(weapon: WeaponSeries, level: number) {}

describe("Component for Selecting and showing your weapon", () => {
  
  beforeEach(() => {
    render(<WeaponDisplay locale="en" t={mockTranslation} 
      currentClass={classMocks[1]}
      weapons={weaponsMock}
      weaponTypes={weaponTypesMock}
      weaponRarityAttackScalings={weaponRarityAttackScalingsMock}
      setWeapon={mockSetWeapon}
    />)
  })

  it("Should be rendered", () => {
    expect(screen.getByText(/weapon/i, {exact: true})).toBeInTheDocument()
  })

  it("Should be able to find and select \"primm blade\"", () => {
    userEvent.click(screen.getByText(/select/i))
    expect(screen.getByText(/select/i)).not.toBeInTheDocument()

    userEvent.click(screen.getByPlaceholderText(/search/i))
    userEvent.keyboard('prim')

    userEvent.click(screen.getByText(/primm blade/i))
    userEvent.click(screen.getByText(/confirm/i))

    expect(screen.getByText(/select/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/search/i)).not.toBeInTheDocument()

    expect(screen.getByText(/primm blade/i)).toBeInTheDocument()

    expect(screen.getByTestId('weapon-attack-value')).toHaveTextContent('172')
    expect(screen.getByTestId('weapon-potential-name')).toHaveTextContent('Recycler Unit')
    expect(screen.getByTestId('weapon-min-value')).toHaveTextContent('70%')
    expect(screen.getByTestId('weapon-max-value')).toHaveTextContent('100%')
    expect(screen.getByTestId('weapon-potential-description')).toHaveTextContent("After equipping for 10 seconds, 20% chance of Restasigne to not be consumed on use\n\n//Potential of: Primm, Silver Primm, Gold Primm")

    // Try to set enhancement level to 2
    userEvent.click(screen.getByLabelText(/enhancement/i))
    userEvent.keyboard('{selectall}2')
    expect(screen.getByTestId('weapon-attack-value')).toHaveTextContent('183')
    
    // Try to set potential level to 2
    userEvent.click(screen.getByLabelText(/potential/i))
    userEvent.keyboard('{selectall}2')
    // TODO: Check if potential is set to 2
  })
})


describe("Component in Japanese", () => {
  
  beforeEach(() => {
    render(<WeaponDisplay locale="ja" t={mockTranslation} 
      currentClass={classMocks[1]}
      weapons={weaponsMock}
      weaponTypes={weaponTypesMock}
      weaponRarityAttackScalings={weaponRarityAttackScalingsMock}
      setWeapon={mockSetWeapon}
    />)
  })

  it("Should be rendered", () => {
    expect(screen.getByText(/weapon/i, {exact: true})).toBeInTheDocument()
  })

  it("Should be able to find and select \"プリム blade\"", () => {
    userEvent.click(screen.getByText(/select/i))
    expect(screen.getByText(/select/i)).not.toBeInTheDocument()

    userEvent.click(screen.getByPlaceholderText(/search/i))
    userEvent.keyboard('プリ')

    userEvent.click(screen.getByText(/プリム blade/i))
    userEvent.click(screen.getByText(/confirm/i))

    expect(screen.getByTestId('weapon-potential-name')).toHaveTextContent('節制の型')
    expect(screen.getByTestId('weapon-potential-description')).toHaveTextContent("After equipping for 10 seconds, 20% chance of Restasigne to not be consumed on use\n\n//Potential of: Primm, Silver Primm, Gold Primm")
  })
})
  // Test for japanese as well