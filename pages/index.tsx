import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useTranslation } from 'react-i18next'
import { ni18nConfig } from '../ni18n.config'
import { loadTranslations } from 'ni18n'

const Home: NextPage = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.container}>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <h1>
        {t('title')}
      </h1>
    </div>
  )
}

export default Home

export const getStaticProps = async (props: any) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, props.locale, [
        'default'
      ]))
    },
  }
}