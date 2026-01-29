"use client";

import { useState } from "react";
import { PRODUCTS } from "../data/products";

export default function Home() {
  const [carrito, setCarrito] = useState<any[]>([]);
  const [mostrarResumen, setMostrarResumen] = useState(false);

  const agregarAlCarrito = (producto: any) => {
    setCarrito([...carrito, producto]);
  };

  const totalPrecio = carrito.reduce((acc, item) => acc + item.price, 0);

  // --- LÓGICA DE WHATSAPP ---
  const finalizarPedido = () => {
    if (carrito.length === 0) return;

    // Tu número con código de país 54 (Argentina) + 9 (celular) + 351...
    const numeroTelefono = "5493515416836"; 
    
    // Formateamos la lista de productos para que se vea linda en el mensaje
    const listaProductos = carrito.map(item => `- ${item.name} ($${item.price})`).join("%0A");
    const mensaje = `¡Hola! Quiero realizar el siguiente pedido desde la web:%0A%0A${listaProductos}%0A%0A*Total: $${totalPrecio}*%0A%0A¿Cómo coordinamos el pago?`;
    
    // Abre WhatsApp en una pestaña nueva
    window.open(`https://wa.me/${numeroTelefono}?text=${mensaje}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#fdfcf0] pb-20 font-sans">
      {/* Navbar */}
      <nav className="bg-[#4a5d23] text-white p-6 shadow-md flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold font-serif">🧉 Matería Premium</h1>
        <button 
          onClick={() => setMostrarResumen(!mostrarResumen)}
          className="bg-white text-[#4a5d23] px-5 py-2 rounded-full font-bold shadow-md hover:scale-105 transition-all flex items-center gap-2"
        >
          🛒 Mi Carrito ({carrito.length})
        </button>
      </nav>

      {/* Resumen del Carrito */}
      {mostrarResumen && (
        <div className="fixed right-6 top-24 w-80 bg-white shadow-2xl rounded-2xl p-6 z-[60] border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-4 border-b pb-2 text-gray-800 font-bold text-lg">
            <span>Tu Pedido</span>
            <button onClick={() => setMostrarResumen(false)} className="text-gray-400">✕</button>
          </div>
          
          {carrito.length === 0 ? (
            <p className="text-gray-500 text-center py-4 italic">Tu carrito está esperando un mate...</p>
          ) : (
            <>
              <div className="max-h-60 overflow-y-auto mb-4 space-y-2">
                {carrito.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm border-b border-gray-50 pb-1">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-bold text-gray-800">${item.price.toLocaleString('es-AR')}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center text-xl font-black text-[#4a5d23] pt-2 mb-6">
                <span>TOTAL:</span>
                <span>${totalPrecio.toLocaleString('es-AR')}</span>
              </div>
              <button 
                onClick={finalizarPedido}
                className="w-full bg-[#4a5d23] text-white py-4 rounded-xl font-bold hover:bg-[#3a4a1c] transition-colors shadow-lg"
              >
                Enviar pedido por WhatsApp
              </button>
            </>
          )}
        </div>
      )}

      {/* Header */}
      <header className="py-20 text-center px-4">
        <h2 className="text-6xl font-black text-gray-800 mb-4 tracking-tighter">Materia Criolla</h2>
        <p className="text-xl text-gray-600 italic">De Córdoba para todo el país 🇦🇷</p>
      </header>

      {/* Catálogo */}
      <section className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {PRODUCTS.map((producto) => (
          <div key={producto.id} className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 flex flex-col hover:shadow-2xl transition-all duration-300">
            <div className="h-72 overflow-hidden">
              <img src={producto.image} alt={producto.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-8 text-center flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{producto.name}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{producto.description}</p>
                <p className="text-4xl font-black text-[#4a5d23] mb-8">${producto.price.toLocaleString('es-AR')}</p>
              </div>
              <button 
                onClick={() => agregarAlCarrito(producto)}
                className="w-full bg-[#4a5d23] text-white py-4 rounded-2xl font-bold hover:brightness-110 active:scale-95 transition-all shadow-md"
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}