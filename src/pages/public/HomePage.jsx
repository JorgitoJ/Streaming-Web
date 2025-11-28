import { Link } from "react-router-dom";

export const HomePage = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

			{/* Hero */}
			<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
				Entrega Automática de Códigos y Activaciones de TV
			</h1>

			<p className="text-lg text-gray-600 max-w-2xl mb-10">
				Obtén tus códigos de streaming o revisa activaciones de TV en segundos,
				sin esperas y de forma totalmente automática.
			</p>

			{/* Cards de plataformas */}
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 max-w-3xl">
				
				<div className="w-42 h-22 rounded-xl overflow-hidden shadow-2xl">
					<img 
						src="/logos/images.png" 
						alt="Netflix"
						className="w-full h-full object-cover shadow-lg" />
				</div>

				<div className="w-42 h-22 rounded-xl overflow-hidden shadow-2xl">
					<img 
						src="/logos/HBO-Max-Logo.png" 
						alt="HBO Max"
						className="w-full h-full object-cover" />
				</div>

				<div className="w-42 h-22 rounded-xl overflow-hidden shadow-2xl p-1">
					<img 
						src="/logos/imaeges.png" 
						alt="Crunchyroll"
						className="w-full h-full object-fit" />
				</div>

				<div className="w-42 h-22 rounded-xl overflow-hidden shadow-2xl p-2">
					<img 
						src="/logos/Amazon-Prime-Video-Logo-2022-500x281.png" 
						alt="Prime Video"
						className="w-full h-full object-cover" />
				</div>
			</div>

			{/* Botones principales */}
			<div className="flex flex-col md:flex-row gap-4">
				<Link
					to="/buscar-codigo"
					className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition"
				>
					Buscar Código
				</Link>

				<Link
					to="/activacion"
					className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-semibold shadow-md transition"
				>
					Ver Activación de TV
				</Link>

				<Link 
					to="/servicio"
					className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-semibold shadow-md transition"
				>
					Adquirir Servicio
					
				</Link>
			</div>

		</div>
	);
}