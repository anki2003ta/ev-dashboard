import React from 'react'
import VehicleTable from '../components/VehicleTable'
import Header from '../components/common/Header'
import ModelsPerBrand from '../components/Charts/ModelsPerBrand'

const VehiclePage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title="Vehicles" />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 space-y-8">
          <ModelsPerBrand/>
      <VehicleTable/>
           </main>
    </div>
  )
}

export default VehiclePage
