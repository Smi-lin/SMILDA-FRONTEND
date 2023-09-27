import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import CreateEvents from "../../components/Shop/CreateEvents"

const ShopCreateEvents = () => {
  return (
    <div>
    <DashboardHeader/>
    <div className='flex items-center justify-between w-full'>
    <div className='w-[80px] 800px:w-[330px]'>
        <DashboardSidebar active={6}/>
    </div>
    <div className='w-full justify-center flex'>
        <CreateEvents/>

    </div>

  </div>
</div>
  )
}

export default ShopCreateEvents