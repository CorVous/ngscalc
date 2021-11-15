import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useTranslation } from 'react-i18next'
import { ni18nConfig } from '../../ni18n.config'
import { loadTranslations } from 'ni18n'
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import NGSClassDisplay, { NGSClass } from '../components/NGSClassDisplay'

export const getStaticProps: GetStaticProps = async (props: any) => {

  // Set GQL query
  const { data } = await client.query({
    query: gql`
      {
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
      classes: data.classes
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
      <NGSClassDisplay classes={props.classes} />
    </div>
  )
}

export default Home

