import React from 'react'
import { TFunction } from "i18next"
import { getLocalName, searchAllNames } from "../helpers/HelperFunctions"
import EffectDisplay from "./EffectDisplay"

type AffixBucketProps = {
  t: TFunction
  locale: string
}

type AffixBucketState = {
  selectingAffxi: boolean
}


class AffixBucket extends React.Component<AffixBucketProps, AffixBucketState> {
  
}

export default AffixBucket