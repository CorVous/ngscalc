import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ArmorDisplay from '../src/components/ArmorDisplay'
import { } from '../src/helpers/HelperTypes'
import {  } from '../__mocks__/dataMocks'
import { mockTranslation } from '../__mocks__/mockTranslation'

describe.skip('Affix Bucket Component', () => {
  /*
  * This test is for the Affix Bucket component.
  * Inputs:
  * - amount of affix slots in each zone,
  * - amount of zones in the bucket,
  * - each zone is specified as armor or weapon
  * - can also input a set of starting affixes to the bucket
  * - can also input "Reserved types" for use to indicate which affixes are reserved 
  *     in other parts of the application
  * 
  * Functionality: 
  * - The component should display the correct number of slots
  * - Can only have one affix of each type per zone
  * - Can drag an affix to another Affix Bucket
  *     or select a location to send it to
  *   - when selecting a location, make sure that the target bucket is able to accept the affix
  * - Can enter "Selection mode" that allows user to select affixes and preview
  *   what affixes will be in the bucket after confirming selection
  * - If amount of slots reduce below the amount of affixes are in the bucket,
  *   the component should prevent adding new affixes until affixes are removed
  */
  it('should render the correct number of slots', () => {
  })
})