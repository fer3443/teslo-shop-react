import { Outlet } from 'react-router'
import { CustomFooter, CustomHeader } from '../components'


export const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomHeader/>
      <Outlet />
      <CustomFooter/>
    </div>
  )
}
