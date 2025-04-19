import React from 'react'

import Header from '../components/common/Header';
import EVTrendsChart from '../components/Charts/EVTrendsChart';
import EVProductionChart from '../components/Charts/EVProductionChart';
const TrendsPage = () => {
    return (
        <div className="flex-1 overflow-auto relative z-10">
          <Header title="Trends" />
          <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 space-y-8">
          
    
            <EVTrendsChart/>
            <EVProductionChart/>
          </main>
        </div>
      );
}

export default TrendsPage
