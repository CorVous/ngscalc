import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import EffectDisplay from '../src/components/EffectDisplay'
import { conditionMock, effectMock, effectMockTripot } from '../__mocks__/dataMocks'
import { mockTranslation } from '../__mocks__/mockTranslation'

describe('Component for displaying the different stat effect values', () => {
  it('Should display each stat', () => {
    render(<EffectDisplay locale="en" t={mockTranslation} effect={effectMock} />)
    expect(screen.getByTestId('effect-melee-potency')).toHaveTextContent('+1%')
    expect(screen.getByTestId('effect-technique-potency')).toHaveTextContent('+2%')
    expect(screen.getByTestId('effect-ranged-potency')).toHaveTextContent('+3%')
    expect(screen.queryByTestId('effect-tri-potency')).not.toBeInTheDocument()

    expect(screen.getByTestId('effect-critical-chance')).toHaveTextContent('+16%')
    expect(screen.getByTestId('effect-critical-damage')).toHaveTextContent('+17%')

    expect(screen.getByTestId('effect-hp')).toHaveTextContent('+10')
    expect(screen.getByTestId('effect-damage-reduction')).toHaveTextContent('+4%')

    expect(screen.getByTestId('effect-pp')).toHaveTextContent('+4')
    expect(screen.getByTestId('effect-pp-cost-down')).toHaveTextContent('+13%')
    expect(screen.getByTestId('effect-pp-natural-regen')).toHaveTextContent('+14%')
    expect(screen.getByTestId('effect-pp-active-regen')).toHaveTextContent('+15%')

    expect(screen.getByTestId('effect-physical-down-resist')).toHaveTextContent('+6%')
    expect(screen.getByTestId('effect-poison-resist')).toHaveTextContent('+7%')
    expect(screen.getByTestId('effect-panic-resist')).toHaveTextContent('+8%')
    expect(screen.getByTestId('effect-blind-resist')).toHaveTextContent('-9%')
    expect(screen.getByTestId('effect-shock-resist')).toHaveTextContent('-10%')
    expect(screen.getByTestId('effect-freeze-resist')).toHaveTextContent('+11%')
    expect(screen.getByTestId('effect-burn-resist')).toHaveTextContent('+12%')
  })

  it('Should display matching potencies of all 3 types as a tri-potency', () => {
    render(<EffectDisplay locale="en" t={mockTranslation} effect={effectMockTripot} />)
    expect(screen.queryByTestId('effect-melee-potency')).not.toBeInTheDocument()
    expect(screen.queryByTestId('effect-technique-potency')).not.toBeInTheDocument()
    expect(screen.queryByTestId('effect-ranged-potency')).not.toBeInTheDocument()
    expect(screen.getByTestId('effect-tri-potency')).toHaveTextContent('+3%')
  })

  it('Should display the condition if there is one', () => {
    render(<EffectDisplay locale="en" t={mockTranslation} effect={effectMock} condition={conditionMock} />)
    expect(screen.getByTestId('effect-condition')).toHaveTextContent('Lightning Weakness')
    expect(screen.getByTestId('effect-condition-description')).toHaveTextContent('Enemy is weak to Lightning')
  })

  it('Should display condition in Japanese in that locale', () => {
    // Fill in japanese effect
    render(<EffectDisplay locale="ja" t={mockTranslation} effect={effectMock} condition={conditionMock} />)
    expect(screen.getByTestId('effect-condition')).toHaveTextContent('雷属性弱点')
    expect(screen.getByTestId('effect-condition-description')).toHaveTextContent('敵が雷属性に弱い') 
  })
})
