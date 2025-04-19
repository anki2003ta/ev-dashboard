import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useStore } from "../../store/fetchAll";
import { useEffect, useState } from "react";

const COLORS = ["#10B981", "#F59E0B",];


const VehicleType = () => {
    const {totalBEV,totalPHEV,} = useStore();
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 580);
	useEffect(() => {
		const handleResize = () => {
		  setIsSmallScreen(window.innerWidth < 580);
		};
	
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	  }, []);
const categoryData=[{name:"BEV Vehicles",value:totalBEV},{name:"PHEV Vehicles", value:totalPHEV}]
    return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-100 text-center'>Distribution of BEV and PHEV</h2>
			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<PieChart>
						<Pie
							data={categoryData}
							cx={"50%"}
							cy={"50%"}
							labelLine={false}
							outerRadius={80}
							fill='#8884d8'
							dataKey='value'
							label={!isSmallScreen ? ({ name, percent }) =>
								`${name} ${(percent * 100).toFixed(0)}%`
							  : false}
						>
							{categoryData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend wrapperStyle={{ fontSize: "12px", fontWeight: "thin" }} />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
}

export default VehicleType
