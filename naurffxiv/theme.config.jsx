import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'

export default {
    head: function useHead() {
      const { asPath } = useRouter()
      const config = useConfig()
      const { route } = useRouter()
      const title = config.title + (route === '/' ? '' : ' - NAUR')
      return (
        <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <link
          rel="icon"
          href="/naurfavicon.png"
          type="image/png"
        />
        </>
      )
    },
    logo: <><img width="48" src='/images/naur.png' /></>,
    docsRepositoryBase: "https://github.com/naurffxiv/naurffxiv",
    project: {
      link: 'https://github.com/naurffxiv/naurffxiv'
    },
    editLink: {
      component: null
    },
    feedback: {
      content: 'Suggest a change'
    },
    footer: {
      content: (
        <span>
          <center>
          naurffxiv is a non-profit community-owned website.
          </center>
          FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd. | 
          © SQUARE ENIX CO., LTD. All Rights Reserved | 
          All content © their respective authors 
        </span>
      )
    }
  }