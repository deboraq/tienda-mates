"use client";

import { useState } from "react";
import { PRODUCTS } from "../data/products";
import confetti from "canvas-confetti";

export default function Home() {
  const [carrito, setCarrito] = useState<any[]>([]);
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(busqueda.toLowerCase()) || 
    p.description.toLowerCase().includes(busqueda.toLowerCase())
  );

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
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold font-serif">🍂 Nómade Mates</h1>
          <div className="hidden md:flex gap-6 text-sm uppercase tracking-widest font-medium">
            <a href="#nosotros" className="hover:text-amber-200 transition-colors">Nosotros</a>
            <a href="#promos" className="hover:text-amber-200 transition-colors">Promos</a>
            <a href="#productos" className="hover:text-amber-200 transition-colors">Productos</a>
            <a href="#contacto" className="hover:text-amber-200 transition-colors">Contacto</a>
          </div>
          <button 
            onClick={() => setMostrarResumen(!mostrarResumen)}
            className="bg-white text-[#4a5d23] px-4 py-2 rounded-full font-bold shadow-md text-sm active:scale-95 transition-all"
          >
            🛒 Tu Carrito ({carrito.length})
          </button>
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

      {/* --- HEADER CON BUSCADOR ABAJO A LA IZQUIERDA --- */}
      <header className="pt-16 pb-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-start">
          <h2 className="text-5xl md:text-7xl font-bold text-gray-800 mb-2 tracking-tighter">
            Nómade Mates
          </h2>
          <p className="text-lg md:text-xl text-gray-500 italic mb-8">
            "Uniendo rincones, cebando historias"
          </p>
          
          {/* El Buscador: Debajo del eslogan, alineado a la izquierda y con más contraste */}
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">🔍</span>
            <input 
              type="text" 
              placeholder="¿Qué estás buscando?" 
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#4a5d23] outline-none shadow-sm transition-all bg-gray-50 text-gray-800 placeholder:text-gray-400"
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* --- SECCIÓN PERSONALIZADOS --- */}
      <section className="bg-amber-50 py-10 text-center border-y border-amber-100">
        <h3 className="text-xl font-bold mb-2">✨ Personalizá tu producto</h3>
        <p className="text-gray-600 px-4 text-sm">Grabados láser, nombres y logos. ¡Hacé que tu mate sea único!</p>
        <button className="mt-4 bg-[#8b4513] text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform text-sm">
          Consultar por grabados
        </button>
      </section>

      {/* --- CATÁLOGO --- */}
      <section id="productos" className="max-w-6xl mx-auto p-4 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
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
          <p className="col-span-full text-center text-gray-500 italic py-10">No encontramos lo que buscas...</p>
        )}
      </section>

      {/* --- SECCIÓN PROMOCIONES --- */}
      <section id="promos" className="py-16 bg-white border-y border-gray-100 text-center">
        <h3 className="text-3xl font-bold mb-6">🔥 Promociones</h3>
        <p className="text-gray-600 italic">Próximamente combos imperdibles para tus viajes.</p>
      </section>

      {/* --- SECCIÓN QUIÉNES SOMOS --- */}
      <section id="nosotros" className="bg-[#4a5d23] text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-serif font-bold mb-6">Quiénes Somos</h3>
          <p className="text-lg leading-relaxed opacity-90 italic">
            "Somos apasionados de la cultura matera nacidos en Córdoba. En Nómade Mates seleccionamos los mejores cueros y maderas para que cada cebada sea un momento especial."
          </p>
        </div>
      </section>

      {/* --- FOOTER / CONTACTO --- */}
      <footer id="contacto" className="bg-white border-t border-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h4 className="font-bold mb-4 text-xl">Contacto</h4>
            <p className="text-gray-600">WhatsApp: +54 9 351 541-6836</p>
            <p className="text-gray-600">Email: hola@nomademates.com</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-xl">Redes Sociales</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://instagram.com" target="_blank" className="bg-gray-100 p-2 rounded-lg hover:bg-amber-100 transition-colors">Instagram</a>
              <a href="https://facebook.com" target="_blank" className="bg-gray-100 p-2 rounded-lg hover:bg-amber-100 transition-colors">Facebook</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-xl">Nómade Mates</h4>
            <p className="text-gray-500 text-sm">© 2026 - De Córdoba para el mundo.</p>
          </div>
        </div>
      </footer>

      {/* Botón Flotante Fijo WhatsApp */}
      <a
        href="https://wa.me/5493515416836"
        target="_blank"
        className="fixed bottom-6 left-6 bg-[#25d366] text-white p-4 rounded-full shadow-2xl z-[100] active:scale-110 transition-transform"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </main>
  );
}