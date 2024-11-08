
import nextra from 'nextra'

const nextConfig = {
}

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})

export default withNextra(nextConfig)
 
// If you have other Next.js configurations, you can pass them as the parameter:
// export default withNextra({ /* other next.js config })*/

// @ts-check