import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import StatSheet from '../components/StatSheet'

describe("StatSheet component", () => {

  beforeEach(() => {
      render(<StatSheet />)
  })
      

  it("Should be able to set the class", () => {
    // TODO: Click on selection
    // Then selection should be highlighted and inside the "class display"
  });

  it("Should be able to set the level of the class", () => {

  });

  it("Should be able to set the weapon", () => {

  });

  it("Should be able to set the weapon level", () => {

  });

  /*TODO
  * Should be able to
  * Set the armor and armor level
  * Add affix and assign them to the weapon or armor
  * Set the enemy and its level
  */ 
});