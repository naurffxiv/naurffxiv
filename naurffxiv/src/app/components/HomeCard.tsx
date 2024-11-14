import cn from 'clsx'
import NextLink from 'next/link'
import type { ComponentProps } from 'react'
import Image from 'next/image'

function Card({
  title,
  href,
  img,
  ...props
}: {
  href: string
  title: string
  img: string
}) {
  return (
    <NextLink
      href={href}
      className={cn(
        'nextra-focus nextra-card _group _flex _flex-col _justify-start _overflow-hidden _rounded-lg _border _border-gray-200 border-2',
        '_text-current _no-underline dark:_shadow-none',
        'hover:_shadow-gray-100 dark:hover:_shadow-none _shadow-gray-100',
        'active:_shadow-sm active:_shadow-gray-200',
        '_transition-all _duration-200 hover:_border-gray-300',
        '_bg-transparent _shadow-sm dark:_border-neutral-800 hover:_shadow-md dark:hover:_border-neutral-600',
      )}
      {...props}
    >
      <Image src={img} width={500} height={147} style={{width: '100%', height: 'auto'}} alt={title} className="transition-all hover:opacity-80"/>
    </NextLink>
  )
}

function _Cards({
  children,
  num = 3,
  className,
  style,
  ...props
}: { num?: number } & ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'nextra-cards _mt-4 _gap-4 _grid',
        '_not-prose', // for nextra-theme-blog
        className
      )}
      {...props}
      style={{
        ...style,
        ['--rows' as string]: num
      }}
    >
      {children}
    </div>
  )
}

export const HomeCard = Object.assign(_Cards, { displayName: 'Cards', Card })
