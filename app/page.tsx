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

  const categorias = ["Todos", "Mates", "Bombillas", "Yerberas", "Set Materos", "Despolvillador"];

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
    const numeroTelefono = "5493515416836"; 
    const listaProductos = carrito.map(item => `- ${item.name} ($${item.price})`).join("%0A");
    const mensaje = `¡Hola! Quiero realizar un pedido en *Nómade Mates*:%0A%0A${listaProductos}%0A%0A*Total: $${totalPrecio}*%0A%0A¿Cómo coordinamos el pago?`;
    window.open(`https://wa.me/${numeroTelefono}?text=${mensaje}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#fdfcf0] pb-20 font-sans text-gray-800">
      {/* --- NAVBAR COMPLETA --- */}
      <nav className="bg-[#4a5d23] text-white p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <h1 className="text-xl md:text-2xl font-bold font-serif whitespace-nowrap">🍂 Nómade Mates</h1>

          {/* MENÚ DE NAVEGACIÓN CENTRAL */}
          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium">
            <a href="#nosotros" className="hover:text-amber-200 transition-colors">Nosotros</a>
            <a href="#promos" className="hover:text-amber-200 transition-colors">Promos</a>
            
            {/* PRODUCTOS CON DESPLEGABLE */}
            <div className="relative group">
              <button 
                onClick={() => setMostrarCategorias(!mostrarCategorias)}
                className="hover:text-amber-200 transition-colors flex items-center gap-1 uppercase tracking-widest"
              >
                Productos ▾
              </button>
              
              {mostrarCategorias && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden text-gray-800 normal-case tracking-normal">
                  {categorias.map((cat) => (
                    <button
                      key={cat}
                      className={`w-full text-left px-5 py-3 text-sm hover:bg-amber-50 transition-colors ${categoriaSeleccionada === cat ? 'bg-amber-100 font-bold text-[#4a5d23]' : ''}`}
                      onClick={() => {
                        setCategoriaSeleccionada(cat);
                        setMostrarCategorias(false);
                        window.location.href = "#productos";
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="#contacto" className="hover:text-amber-200 transition-colors">Contacto</a>
          </div>

          {/* BUSCADOR Y CARRITO */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:relative lg:block">
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="pl-8 pr-4 py-1.5 rounded-full bg-white/10 border border-white/20 focus:bg-white focus:text-gray-800 outline-none transition-all w-40 text-sm placeholder:text-white/60"
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <span className="absolute inset-y-0 left-2.5 flex items-center text-gray-400">🔍</span>
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

      {/* HEADER */}
      <header className="py-20 text-center bg-white border-b border-gray-100">
        <h2 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4 tracking-tighter">Nómade Mates</h2>
        <p className="text-xl md:text-2xl text-gray-500 italic">"Uniendo rincones, cebando historias"</p>
        <p className="mt-4 text-[#4a5d23] font-bold text-sm uppercase">Viendo: {categoriaSeleccionada}</p>
      </header>

      {/* CATÁLOGO */}
      <section id="productos" className="max-w-6xl mx-auto p-4 pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {productosFiltrados.map((producto) => (
          <div key={producto.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:shadow-2xl transition-all">
            <div className="h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
              <img src={producto.image} alt={producto.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 text-center flex-grow flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold mb-2">{producto.name}</h4>
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
          <p className="col-span-full text-center text-gray-400 italic py-20">No hay productos en "{categoriaSeleccionada}".</p>
        )}
      </section>

      {/* CARRITO FLOTANTE */}
      {mostrarResumen && (
        <div className="fixed inset-x-4 top-20 md:left-auto md:right-6 md:w-80 bg-white shadow-2xl rounded-2xl p-6 z-[60] border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-4 border-b pb-2 font-bold text-lg">
            <span>Tu Pedido</span>
            <button onClick={() => setMostrarResumen(false)} className="text-gray-400">✕</button>
          </div>
          <div className="max-h-60 overflow-y-auto mb-4 space-y-2">
            {carrito.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm border-b pb-2">
                <span>{item.name}</span>
                <button onClick={() => eliminarDelCarrito(index)}>🗑️</button>
              </div>
            ))}
          </div>
          <div className="text-xl font-black text-[#4a5d23] mb-4">TOTAL: ${totalPrecio.toLocaleString('es-AR')}</div>
          <button onClick={finalizarPedido} className="w-full bg-[#4a5d23] text-white py-4 rounded-xl font-bold">WhatsApp</button>
        </div>
      )}

      {/* NUESTRA ESENCIA */}
      <section id="nosotros" className="bg-[#4a5d23] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-serif font-bold mb-8">Nuestra Esencia</h3>
          <p className="text-xl md:text-2xl leading-relaxed opacity-90 italic">
            "Somos apasionados de la cultura matera nacidos en Córdoba. En Nómade, creemos que el mate es el único objeto capaz de habitar dos lugares al mismo tiempo..."
          </p>
        </div>
      </section>

      {/* CONTACTO */}
      <footer id="contacto" className="bg-white border-t border-gray-100 py-16 px-6 text-center">
        <h4 className="font-bold mb-4 text-[#4a5d23]">Nómade Mates</h4>
        <p className="text-gray-600 text-sm mb-2">WhatsApp: +54 9 351 541-6836</p>
        <p className="text-gray-400 text-xs">© 2026 Córdoba, Argentina.</p>
      </footer>
    </main>
  );
}