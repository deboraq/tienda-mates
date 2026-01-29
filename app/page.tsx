"use client";

import { useState } from "react";
import { PRODUCTS } from "../data/products";
import confetti from "canvas-confetti";

export default function Home() {
  const [carrito, setCarrito] = useState<any[]>([]);
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  // NUEVOS ESTADOS PARA CATEGORÍAS
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [mostrarCategorias, setMostrarCategorias] = useState(false);

  const categorias = ["Todos", "Mates", "Bombillas", "Yerberas", "Set Materos", "Despolvillador"];

  // FILTRADO DOBLE: Por búsqueda Y por categoría
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

          <div className="hidden md:flex gap-6 text-xs uppercase tracking-widest font-medium">
            <a href="#nosotros" className="hover:text-amber-200 transition-colors">Nosotros</a>
            <a href="#promos" className="hover:text-amber-200 transition-colors">Promos</a>
            
            {/* PRODUCTOS CON DESPLEGABLE (Agregado aquí) */}
            <div className="relative">
              <button 
                onClick={() => setMostrarCategorias(!mostrarCategorias)}
                className="hover:text-amber-200 transition-colors flex items-center gap-1 uppercase tracking-widest outline-none"
              >
                Productos {mostrarCategorias ? '▴' : '▾'}
              </button>
              
              {mostrarCategorias && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 text-gray-800 normal-case tracking-normal font-sans">
                  {categorias.map((cat) => (
                    <button
                      key={cat}
                      className={`w-full text-left px-5 py-3 text-sm hover:bg-amber-50 transition-colors ${categoriaSeleccionada === cat ? 'bg-amber-100 font-bold text-[#4a5d23]' : ''}`}
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

            <a href="#contacto" className="hover:text-amber-200 transition-colors">Contacto</a>
          </div>

          <div className="flex items-center gap-3">
             <div className="relative block lg:hidden w-32 md:w-48">
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="w-full pl-8 pr-3 py-1.5 rounded-full bg-white/10 border border-white/20 focus:bg-white focus:text-gray-800 outline-none transition-all text-xs"
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <span className="absolute inset-y-0 left-2.5 flex items-center text-gray-400 text-xs">🔍</span>
            </div>

            <button 
              onClick={() => setMostrarResumen(!mostrarResumen)}
              className="bg-white text-[#4a5d23] px-4 py-2 rounded-full font-bold shadow-md text-sm active:scale-95 transition-all whitespace-nowrap"
            >
              🛒 Tu Carrito ({carrito.length})
            </button>
          </div>
        </div>
      </nav>

      {/* Carrito flotante */}
      {mostrarResumen && (
        <div className="fixed inset-x-4 top-20 md:left-auto md:right-6 md:w-80 bg-white shadow-2xl rounded-2xl p-6 z-[60] border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-4 border-b pb-2 font-bold text-lg">
            <span>Tu Pedido</span>
            <button onClick={() => setMostrarResumen(false)} className="text-gray-400">✕</button>
          </div>
          {carrito.length === 0 ? (
            <p className="text-gray-500 text-center py-4 italic">Tu carrito está esperando un mate...</p>
          ) : (
            <>
              <div className="max-h-60 overflow-y-auto mb-4 space-y-2">
                {carrito.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm border-b pb-2">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">${item.price.toLocaleString('es-AR')}</span>
                      <button onClick={() => eliminarDelCarrito(index)} className="p-1 hover:bg-gray-100 rounded">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xl font-black text-[#4a5d23] mb-4">TOTAL: ${totalPrecio.toLocaleString('es-AR')}</div>
              <button onClick={finalizarPedido} className="w-full bg-[#4a5d23] text-white py-4 rounded-xl font-bold hover:bg-[#3a4a1c] transition-colors">
                Enviar WhatsApp
              </button>
            </>
          )}
        </div>
      )}

      {/* --- HEADER --- */}
      <header className="py-20 text-center bg-white border-b border-gray-100">
        <h2 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4 tracking-tighter">Nómade Mates</h2>
        <p className="text-xl md:text-2xl text-gray-500 italic">"Uniendo rincones, cebando historias"</p>
        {/* Indicador de categoría activa */}
        {categoriaSeleccionada !== "Todos" && (
          <p className="mt-4 text-[#4a5d23] font-bold uppercase tracking-widest text-sm animate-pulse">
            Filtrando por: {categoriaSeleccionada}
          </p>
        )}
      </header>

      {/* --- SECCIÓN PERSONALIZADOS --- */}
      <section className="bg-amber-50 py-12 text-center border-y border-amber-100">
        <h3 className="text-2xl font-bold mb-2">✨ Personalizá tu producto</h3>
        <p className="text-gray-600 px-4">Grabados láser, nombres y logos. ¡Hacé que tu mate sea único!</p>
        <button className="mt-4 bg-[#8b4513] text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
          Consultar por grabados
        </button>
      </section>

      {/* --- CATÁLOGO FILTRADO --- */}
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
          <div className="col-span-full text-center py-20">
             <p className="text-gray-500 text-xl italic mb-4">No encontramos lo que buscás.</p>
             <button 
               onClick={() => {setCategoriaSeleccionada("Todos"); setBusqueda("");}}
               className="text-[#4a5d23] font-bold underline"
             >
               Ver todos los productos
             </button>
          </div>
        )}
      </section>

      {/* --- NUESTRA ESENCIA --- */}
      <section id="nosotros" className="bg-[#4a5d23] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-serif font-bold mb-8">Nuestra Esencia</h3>
          <p className="text-xl md:text-2xl leading-relaxed opacity-90 italic font-light px-4">
            "Somos apasionados de la cultura matera nacidos en Córdoba. En Nómade, creemos que el mate es el único objeto capaz de habitar dos lugares al mismo tiempo: el rincón donde estamos y la historia que estamos construyendo."
          </p>
        </div>
      </section>

      {/* --- FOOTER / CONTACTO --- */}
      <footer id="contacto" className="bg-white border-t border-gray-100 py-16 px-6 text-center md:text-left">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="font-bold mb-4 text-xl text-[#4a5d23]">Contacto</h4>
            <p className="text-gray-600">WhatsApp: +54 9 351 541-6836</p>
            <p className="text-gray-600">Email: hola@nomademates.com</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-xl text-[#4a5d23]">Redes Sociales</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="bg-gray-100 p-2 rounded-lg hover:bg-amber-100 transition-colors">Instagram</a>
              <a href="#" className="bg-gray-100 p-2 rounded-lg hover:bg-amber-100 transition-colors">Facebook</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-xl text-[#4a5d23]">Nómade Mates</h4>
            <p className="text-gray-500 text-sm">© 2026 - De Córdoba para el mundo.</p>
          </div>
        </div>
      </footer>

      {/* Botón WhatsApp */}
      <a
        href="https://wa.me/5493515416836"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-[#25d366] text-white p-4 rounded-full shadow-2xl z-[100] hover:scale-110 transition-transform"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </main>
  );
}