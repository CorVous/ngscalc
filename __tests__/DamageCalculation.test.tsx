import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DamageCalculation from '../components/DamageCalculation'

describe("Calculation component", () => {

  it("Zeroed damage test", () => {

    let mockData = {
      sourceAttack: 0,
      weaponMinimumAttack: 0,
      weaponMaximumAttack: 0,
      targetDefense: 0,
      powerMultiplier: 0,
      criticalChance: 0,
      criticalDamageMultiplier: 0,
    }

    let finalMinimumDamage = "1"
    let finalMaximumDamage = "1"
    let finalCriticalDamage = "1"
    let finalAverageDamage = "1"

    render(<DamageCalculation {...mockData} />)

    const minimumDamageElement = screen.getByText(/minimum damage:/i)
    expect(minimumDamageElement).toHaveTextContent(finalMinimumDamage)

    const maximumDamageElement =  screen.getByText(/maximum damage:/i)
    expect(maximumDamageElement).toHaveTextContent(finalMaximumDamage)

    const criticalDamageElement =  screen.getByText(/critical damage:/i)
    expect(criticalDamageElement).toHaveTextContent(finalCriticalDamage)

    const averageDamageElement =  screen.getByText(/average damage:/i)
    expect(averageDamageElement).toHaveTextContent(finalAverageDamage)
  })

  it("Regular damage test", () => {

    let mockData = {
      sourceAttack: 649,
      weaponMinimumAttack: 211.5,
      weaponMaximumAttack: 282,
      targetDefense: 697,
      powerMultiplier: 1.375,
      criticalChance: 0,
      criticalDamageMultiplier: 1,
    }
    let finalMinimumDamage = "45" // 44.9625 (rounded)
    let finalMaximumDamage = "64" // 64.35 (rounded)
    let finalCriticalDamage = "77" // 77.22 (rounded)
    let finalAverageDamage = "55.7705" // 55.77047066 (rounded)

    render(<DamageCalculation {...mockData} />)

    const minimumDamageElement = screen.getByText(/minimum damage:/i)
    expect(minimumDamageElement).toHaveTextContent(finalMinimumDamage)

    const maximumDamageElement =  screen.getByText(/maximum damage:/i)
    expect(maximumDamageElement).toHaveTextContent(finalMaximumDamage)

    const criticalDamageElement =  screen.getByText(/critical damage:/i)
    expect(criticalDamageElement).toHaveTextContent(finalCriticalDamage)

    const averageDamageElement =  screen.getByText(/average damage:/i)
    expect(averageDamageElement).toHaveTextContent(finalAverageDamage)
  })

  it("Damage test where weaponMinimumAttack > weaponMaximumAttack", () => {

    let mockData = {
      sourceAttack: 649,
      weaponMinimumAttack: 290,
      weaponMaximumAttack: 282,
      targetDefense: 697,
      powerMultiplier: 1.375,
      criticalChance: 0,
      criticalDamageMultiplier: 1,
    }
    
    let finalMinimumDamage = "64" // 64.35 (rounded)
    let finalMaximumDamage = "64" // 64.35 (rounded)
    let finalCriticalDamage = "77" // 77.22 (rounded)
    let finalAverageDamage = "64.65" // 64.65 (rounded)

    render(<DamageCalculation {...mockData} />)

    const minimumDamageElement = screen.getByText(/minimum damage:/i)
    expect(minimumDamageElement).toHaveTextContent(finalMinimumDamage)

    const maximumDamageElement =  screen.getByText(/maximum damage:/i)
    expect(maximumDamageElement).toHaveTextContent(finalMaximumDamage)

    const criticalDamageElement =  screen.getByText(/critical damage:/i)
    expect(criticalDamageElement).toHaveTextContent(finalCriticalDamage)

    const averageDamageElement =  screen.getByText(/average damage:/i)
    expect(averageDamageElement).toHaveTextContent(finalAverageDamage)
  })

  it("Damage test where weaponMinimumAttack == weaponMaximumAttack", () => {

    let mockData = {
      sourceAttack: 649,
      weaponMinimumAttack: 282,
      weaponMaximumAttack: 282,
      targetDefense: 697,
      powerMultiplier: 1.375,
      criticalChance: 0,
      criticalDamageMultiplier: 1,
    }
    
    let finalMinimumDamage = "64" // 64.35 (rounded)
    let finalMaximumDamage = "64" // 64.35 (rounded)
    let finalCriticalDamage = "77" // 77.22 (rounded)
    let finalAverageDamage = "64.65" // 64.65 (rounded)

    render(<DamageCalculation {...mockData} />)

    const minimumDamageElement = screen.getByText(/minimum damage:/i)
    expect(minimumDamageElement).toHaveTextContent(finalMinimumDamage)

    const maximumDamageElement =  screen.getByText(/maximum damage:/i)
    expect(maximumDamageElement).toHaveTextContent(finalMaximumDamage)

    const criticalDamageElement =  screen.getByText(/critical damage:/i)
    expect(criticalDamageElement).toHaveTextContent(finalCriticalDamage)

    const averageDamageElement =  screen.getByText(/average damage:/i)
    expect(averageDamageElement).toHaveTextContent(finalAverageDamage)
  })
})