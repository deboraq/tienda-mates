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
            <a href="#productos" className="hover:text-amber-200">Productos</a>
            <a href="#promos" className="hover:text-amber-200">Promos</a>
            <a href="#nosotros" className="hover:text-amber-200">Nosotros</a>
            <a href="#contacto" className="hover:text-amber-200">Contacto</a>
          </div>
          <button 
            onClick={() => setMostrarResumen(!mostrarResumen)}
            className="bg-white text-[#4a5d23] px-4 py-2 rounded-full font-bold shadow-md text-sm"
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
                      <button onClick={() => eliminarDelCarrito(index)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xl font-black text-[#4a5d23] mb-4">TOTAL: ${totalPrecio.toLocaleString('es-AR')}</div>
              <button onClick={finalizarPedido} className="w-full bg-[#4a5d23] text-white py-4 rounded-xl font-bold">Enviar WhatsApp</button>
            </>
          )}
        </div>
      )}

      {/* --- HERO / HEADER --- */}
      <header className="py-20 text-center bg-white border-b border-gray-100">
        <h2 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4 tracking-tighter">Nómade Mates</h2>
        <p className="text-xl md:text-2xl text-gray-500 italic">"Uniendo rincones, cebando historias"</p>
      </header>

      {/* --- SECCIÓN PERSONALIZADOS --- */}
      <section className="bg-amber-50 py-12 text-center border-y border-amber-100">
        <h3 className="text-2xl font-bold mb-2">✨ Personalizá tu producto</h3>
        <p className="text-gray-600 px-4">Grabados láser, nombres y logos. ¡Hacé que tu mate sea único!</p>
        <button className="mt-4 bg-[#8b4513] text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">Consultar por grabados</button>
      </section>

      {/* --- BUSCADOR --- */}
      <section id="productos" className="max-w-xl mx-auto px-4 mt-16 mb-8">
        <div className="relative">
          <span className="absolute inset-y-0 left-4 flex items-center">🔍</span>
          <input 
            type="text" 
            placeholder="¿Qué estás buscando? (Mates, bombillas, sets...)" 
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#4a5d23] outline-none shadow-sm"
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </section>

      {/* --- CATÁLOGO --- */}
      <section className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
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
              <button onClick={() => agregarAlCarrito(producto)} className="w-full bg-[#4a5d23] text-white py-3 rounded-2xl font-bold active:scale-95 transition-transform">Agregar al Carrito</button>
            </div>
          </div>
        ))}
      </section>

      {/* --- SECCIÓN QUIÉNES SOMOS --- */}
      <section id="nosotros" className="bg-[#4a5d23] text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-serif font-bold mb-6">Quiénes Somos</h3>
          <p className="text-lg leading-relaxed opacity-90">
            Somos apasionados de la cultura matera nacidos en Córdoba. En Nómade Mates seleccionamos los mejores cueros y maderas para que cada cebada sea un momento especial. No solo vendemos mates, compartimos historias.
          </p>
        </div>
      </section>

      {/* --- PREGUNTAS FRECUENTES --- */}
      <section className="max-w-4xl mx-auto py-20 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h3>
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h4 className="font-bold text-lg mb-2">¿Cómo comprar?</h4>
            <p className="text-gray-600 text-sm">Elegí tus productos, agregalos al carrito y finalizá el pedido por WhatsApp. Coordinamos pago y envío por ahí.</p>
          </div>
          <div className="border-b pb-4">
            <h4 className="font-bold text-lg mb-2">Envíos</h4>
            <p className="text-gray-600 text-sm">Hacemos envíos a todo el país a través de Correo Argentino y cadetería privada en Córdoba Capital.</p>
          </div>
          <div className="border-b pb-4">
            <h4 className="font-bold text-lg mb-2">Cambios y Devoluciones</h4>
            <p className="text-gray-600 text-sm">Tenés 15 días para realizar cambios por fallas de fábrica. El producto debe estar sin curar/uso.</p>
          </div>
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
              <span className="bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors">Instagram</span>
              <span className="bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors">Facebook</span>
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
        className="fixed bottom-6 left-6 bg-[#25d366] text-white p-4 rounded-full shadow-2xl z-[100]"
      >
        WS
      </a>
    </main>
  );
}