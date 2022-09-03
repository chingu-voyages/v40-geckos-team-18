import React, { ReactNode } from 'react'
import ControlPanel from '../components/Account/ControlPanel'

interface AccountLayoutProps {
    children: ReactNode
}
const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <div className="flex mt-5">
      <div className="grow-0 bg-gray-200">
        <ControlPanel />
      </div>
      <div className="grow">
        { children }
      </div>
    </div>
  )
}

export default AccountLayout