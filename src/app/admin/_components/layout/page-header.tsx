import React from 'react'

export default function PageHeader({children}: {children: React.ReactNode}) {
  return (
    <header className='flex items-center justify-between mb-8'>{children}</header>
  )
}
