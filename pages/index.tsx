import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useTranslation } from 'react-i18next'

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

export const getStaticProps: GetStaticProps = async (props: any) => {
  return {
    props: {
      test: 'test',
    },
  }
}