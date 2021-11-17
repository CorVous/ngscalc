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
      conditions={conditionsMock}
      conditionCategories={conditionCategoriesMock}
      weaponRarityAttackScalings={weaponRarityAttackScalingsMock}
      setWeapon={mockSetWeapon}
    />)
  })

  it("Should be rendered", () => {
    expect(screen.getByText(/weapon/i, {exact: true})).toBeInTheDocument()
  })
})