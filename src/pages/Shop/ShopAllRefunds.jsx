import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import AllRefundOrders from "../../components/Shop/AllRefundOrders";
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar';

const ShopAllRefunds = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={7} />
        </div>
        <div className="w-full justify-center flex">
           <AllRefundOrders />
        </div>
      </div>
</div>
  )
}

export default ShopAllRefunds