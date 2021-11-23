import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useTranslation } from 'react-i18next'
import { ni18nConfig } from '../../ni18n.config'
import { loadTranslations } from 'ni18n'
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import DamageSim from '../components/DamageSim'

export const getStaticProps: GetStaticProps = async (props: any) => {

  // TODO: get apollo to use localstorage caching
  // Set GQL query
  const { data } = await client.query({
    query: gql`
      query DamageSim {
        classes {
          id
          name
          stats {
            level
            hp
            attack
            defense
          }
          iname {
            ja
          }
          weapon_types {
            id
          }
        }

        weaponTypes {
          id
          name
          iname {
            ja
          }
          suffix
          isuffix {
            ja
          }
          classes {
            id
          }
          weapon_series {
            id
          }
          damage_type
        }
      
        weapons {
          id
          name
          iname {
            ja
          }
          base_attack
          attack {
            level
            value
          }
          min_attack
          max_attack
          weapon_potential {
            name
            condition {
              id
            }
            potential {
              level
              effect {
                hp
                melee_potency
                technique_potency
                ranged_potency
                potency_floor
                pp
                damage_reduction
                physical_down_resist
                poison_resist
                panic_resist
                blind_resist
                shock_resist
                freeze_resist
                burn_resist
                pp_cost_down
                pp_natural_regen
                pp_active_regen
                critical_chance
                critical_damage
              }
              conditional_effect {
                hp
                melee_potency
                technique_potency
                ranged_potency
                potency_floor
                pp
                damage_reduction
                physical_down_resist
                poison_resist
                panic_resist
                blind_resist
                shock_resist
                freeze_resist
                burn_resist
                pp_cost_down
                pp_natural_regen
                pp_active_regen
                critical_chance
                critical_damage
              }
            }
            description
            iname {
              ja
            }
            idescription {
              ja
            }
          }
          weapon_types {
            id
          }
          weapon_rarity_attack_scaling {
            id
            rarity
          }
        }

        conditions {
          id
          name
          description
          iname {
            ja
          }
          idescription {
            ja
          }
          condition_categories {
            id
          }
        }
        
        conditionCategories {
          id
          name
          description
          iname {
            ja
          }
          idescription {
            ja
          }
          conditions {
            id
          }
        }

        weaponRarityAttackScalings {
          id
          rarity
          attack {
            level
            value
          }
        }
        
        armors {
          id
          name
          iname {
            ja
          }
          base_defense
          armor_rarity_defense_scaling {
            id
            rarity
          }
          stats {
            hp
            melee_potency
            technique_potency
            ranged_potency
            potency_floor
            pp
            damage_reduction
            physical_down_resist
            poison_resist
            panic_resist
            blind_resist
            shock_resist
            freeze_resist
            burn_resist
            pp_cost_down
            pp_natural_regen
            pp_active_regen
            critical_chance
            critical_damage
          }
        }
        armorRarityDefenseScalings {
          id
          rarity
          defense {
            level
            value
          }
        }
      }
    `,
  });

  return {
    props: {
      // Translations
      ...(await loadTranslations(ni18nConfig, props.locale, [
        'translation',
      ])),
      // Static GQL Data
      apiData: data,
      locale: props.locale,
    },
  }
}

const Home: NextPage = (props: any) => {
  const { t } = useTranslation()
  return (
    <div className={styles.container}>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <h1>
        {t('title')}
      </h1>
      <DamageSim apiData={props.apiData} locale={props.locale} t={t} />
    </div>
  )
}

export default Home
