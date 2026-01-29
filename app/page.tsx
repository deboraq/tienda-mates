"use client";

import { useState } from "react";
import { PRODUCTS } from "../data/products";
import confetti from "canvas-confetti";

export default function Home() {
  const [carrito, setCarrito] = useState<any[]>([]);
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [mostrarCategorias, setMostrarCategorias] = useState(false);

  // Categorías disponibles
  const categorias = ["Todos", "Mates", "Bombillas", "Yerberas", "Set Materos", "Despolvillador"];

  // Lógica de filtrado combinada (Buscador + Categoría)
  const productosFiltrados = PRODUCTS.filter(p => {
    const coincideBusqueda = p.name.toLowerCase().includes(busqueda.toLowerCase()) || 
                             p.description.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSeleccionada === "Todos" || p.category === categoriaSeleccionada;
    return coincideBusqueda && coincideCategoria;
  });

  const agregarAlCarrito = (producto: any) => {
    setCarrito([...carrito, producto]);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { x: 0.5, y: 0.7 },
      colors: ['#4a5d23', '#8b4513', '#fdfcf0'],
      zIndex: 9999
    });
  };

  const eliminarDelCarrito = (indexAEliminar: number) => {
    setCarrito(carrito.filter((_, index) => index !== indexAEliminar));
  };

  const totalPrecio = carrito.reduce((acc, item) => acc + item.price, 0);

  const finalizarPedido = () => {
    if (carrito.length === 0) return;
    const numeroTelefono = "5493515416836"; 
    const listaProductos = carrito.map(item => `- ${item.name} ($${item.price})`).join("%0A");
    const mensaje = `¡Hola! Quiero realizar un pedido en *Nómade Mates*:%0A%0A${listaProductos}%0A%0A*Total: $${totalPrecio}*%0A%0A¿Cómo coordinamos el pago?`;
    window.open(`https://wa.me/${numeroTelefono}?text=${mensaje}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#fdfcf0] pb-20 font-sans text-gray-800">
      {/* --- NAVBAR --- */}
      <nav className="bg-[#4a5d23] text-white p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl md:text-2xl font-bold font-serif whitespace-nowrap">🍂 Nómade Mates</h1>
            <div className="hidden lg:relative lg:block">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
              <input 
                type="text" 
                placeholder="¿Qué estás buscando?" 
                className="pl-10 pr-4 py-1.5 rounded-full bg-white/10 border border-white/20 focus:bg-white focus:text-gray-800 outline-none transition-all w-64 text-sm placeholder:text-white/60 focus:placeholder:text-gray-400"
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* BOTÓN DESPLEGABLE DE CATEGORÍAS */}
            <div className="relative">
              <button 
                onClick={() => setMostrarCategorias(!mostrarCategorias)}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 border border-white/20"
              >
                📂 {categoriaSeleccionada} ▾
              </button>
              
              {mostrarCategorias && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                  {categorias.map((cat) => (
                    <button
                      key={cat}
                      className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-amber-50 hover:text-[#4a5d23] transition-colors border-b border-gray-50 last:border-0"
                      onClick={() => {
                        setCategoriaSeleccionada(cat);
                        setMostrarCategorias(false);
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => setMostrarResumen(!mostrarResumen)}
              className="bg-white text-[#4a5d23] px-4 py-2 rounded-full font-bold shadow-md text-sm active:scale-95 transition-all"
            >
              🛒 Carrito ({carrito.length})
            </button>
          </div>
        </div>
      </nav>

      {/* --- HEADER --- */}
      <header className="py-16 text-center bg-white border-b border-gray-100">
        <h2 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 tracking-tighter">Nómade Mates</h2>
        <p className="text-lg md:text-xl text-gray-500 italic">"Uniendo rincones, cebando historias"</p>
      </header>

      {/* --- CATÁLOGO FILTRADO --- */}
      <section id="productos" className="max-w-6xl mx-auto p-4 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="col-span-full mb-4 flex justify-between items-center px-2">
          <h3 className="text-2xl font-bold text-gray-700">
            {categoriaSeleccionada} <span className="text-sm font-normal text-gray-400">({productosFiltrados.length})</span>
          </h3>
          {categoriaSeleccionada !== "Todos" && (
            <button onClick={() => setCategoriaSeleccionada("Todos")} className="text-sm text-[#4a5d23] underline">Ver todos</button>
          )}
        </div>

        {productosFiltrados.map((producto) => (
          <div key={producto.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:shadow-2xl transition-all">
            <div className="h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
              <img src={producto.image} alt={producto.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 text-center flex-grow flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded-md">{producto.category}</span>
                <h4 className="text-xl font-bold mb-2 mt-2">{producto.name}</h4>
                <p className="text-gray-500 text-sm mb-4">{producto.description}</p>
                <p className="text-3xl font-black text-[#4a5d23] mb-6">${producto.price.toLocaleString('es-AR')}</p>
              </div>
              <button onClick={() => agregarAlCarrito(producto)} className="w-full bg-[#4a5d23] text-white py-3 rounded-2xl font-bold active:scale-95 transition-transform">
                Agregar al Carrito
              </button>
            </div>
          </div>
        ))}
        {productosFiltrados.length === 0 && (
          <p className="col-span-full text-center text-gray-500 italic py-20 text-xl border-2 border-dashed border-gray-200 rounded-3xl">
             No encontramos nada en "{categoriaSeleccionada}".
          </p>
        )}
      </section>

      {/* --- NUESTRA ESENCIA --- */}
      <section id="nosotros" className="bg-[#4a5d23] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-serif font-bold mb-8">Nuestra Esencia</h3>
          <p className="text-xl md:text-2xl leading-relaxed opacity-90 italic font-light">
            "Somos apasionados de la cultura matera nacidos en Córdoba. En Nómade, creemos que el mate es el único objeto capaz de habitar dos lugares al mismo tiempo..."
          </p>
        </div>
      </section>

      {/* Carrito flotante y Footer omitidos por brevedad, se mantienen igual que antes */}
    </main>
  );
}