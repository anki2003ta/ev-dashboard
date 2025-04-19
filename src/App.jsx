import { useEffect } from "react";
import { useStore } from "./store/fetchAll";

import OverviewPage from "./pages/OverviewPage";
import { Loader } from "lucide-react";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router";
import VehiclePage from "./pages/VehiclePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import TrendsPage from "./pages/TrendsPage";

export default function App() {
  const { fetchData, isFetching } = useStore();
  useEffect(() => {
    fetchData();
  }, []);

  if (isFetching) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-gray-900 h-full">
          <Loader className="animate-spin text-white size-10" />
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			{/* <div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80 -z-10' />
				<div className='absolute inset-0 backdrop-blur-sm -z-10' />
			</div> */}
      <Sidebar />
			<Routes>
				<Route path='/' element={<OverviewPage />} />
				<Route path='/vehicles' element={<VehiclePage />} />
				<Route path='/analytics' element={<AnalyticsPage />} />
				<Route path='/trends' element={<TrendsPage />} />
				{/* <Route path='/users' element={<UsersPage />} />
				<Route path='/orders' element={<OrdersPage />} />
				<Route path='/settings' element={<SettingsPage />} /> */}
			</Routes>
    </div>
  );
}
