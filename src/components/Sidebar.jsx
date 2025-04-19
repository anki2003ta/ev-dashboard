import {
	Car,
	ChartNoAxesCombined,
	Flame,
	LayoutDashboard,
	Menu,
	
  } from "lucide-react";
  import { useState } from "react";
  import { AnimatePresence, motion } from "framer-motion";
  import { Link } from "react-router";
  
  const SIDEBAR_ITEMS = [
	{ name: "Overview", icon: LayoutDashboard, color: "#F59E0B", href: "/" },
	{ name: "Analytics", icon: ChartNoAxesCombined , color: "#6EE7B7", href: "/analytics" },
	{ name: "Vehicles", icon: Car, color: "#EC4899", href: "/vehicles" },
	{ name: "Trends", icon: Flame, color: "#3B82F6", href: "/trends" },
  ];
  
  const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
	return (
	  <>
		{/* Desktop Sidebar */}
		<motion.div
		  className={`relative hidden sm:block z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
			isSidebarOpen ? "w-64" : "w-20"
		  }`}
		  animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
		  <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
			<motion.button
			  whileHover={{ scale: 1.1 }}
			  whileTap={{ scale: 0.9 }}
			  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			  className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
			>
			  <Menu size={24} />
			</motion.button>
  
			<nav className="mt-8 flex-grow">
			  {SIDEBAR_ITEMS.map((item) => (
				<Link key={item.href} to={item.href}>
				  <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
					<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
					<AnimatePresence>
					  {isSidebarOpen && (
						<motion.span
						  className="ml-4 whitespace-nowrap"
						  initial={{ opacity: 0, width: 0 }}
						  animate={{ opacity: 1, width: "auto" }}
						  exit={{ opacity: 0, width: 0 }}
						  transition={{ duration: 0.2, delay: 0.3 }}
						>
						  {item.name}
						</motion.span>
					  )}
					</AnimatePresence>
				  </motion.div>
				</Link>
			  ))}
			</nav>
		  </div>
		</motion.div>
  
		{/* Mobile Sidebar */}
		<div className="sm:hidden fixed top-4 right-4 z-20">
		  <motion.button
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			onClick={() => setIsMobileSidebarOpen(true)}
			className="p-2 rounded-full bg-gray-900 text-white"
		  >
			<Menu size={24} />
		  </motion.button>
		</div>
  
		<AnimatePresence>
		  {isMobileSidebarOpen && (
			<motion.div
			  className="fixed top-0 right-0 h-full w-64 bg-gray-800 bg-opacity-90 backdrop-blur-md p-4 flex flex-col border-l border-gray-700 z-30"
			  initial={{ x: "100%" }}
			  animate={{ x: 0 }}
			  exit={{ x: "100%" }}
			  transition={{ duration: 0.3 }}
			>
			  <motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={() => setIsMobileSidebarOpen(false)}
				className="size-8 rounded-full hover:bg-gray-700 text-white self-end"
			  >
				✕
			  </motion.button>
  
			  <nav className="mt-8 flex-grow" onClick={()=>setIsMobileSidebarOpen(false)}>
				{SIDEBAR_ITEMS.map((item) => (
				  <Link key={item.href} to={item.href} >
					<motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
					  <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
					  <span className="ml-4 whitespace-nowrap">{item.name}</span>
					</motion.div>
				  </Link>
				))}
			  </nav>
			</motion.div>
		  )}
		</AnimatePresence>
	  </>
	);
  };
  
  export default Sidebar;
  