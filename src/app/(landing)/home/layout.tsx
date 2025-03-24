import Outlet from '@/components/Outlet'
import React from 'react'

const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <Outlet>
      {children}
    </Outlet>
  )
}

export default layout
