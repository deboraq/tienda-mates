"use client";

import { useState } from "react";
import { PRODUCTS } from "../data/products";
import confetti from "canvas-confetti"; // Importamos la magia

export default function Home() {
  const [carrito, setCarrito] = useState<any[]>([]);
  const [mostrarResumen, setMostrarResumen] = useState(false);

  const agregarAlCarrito = (producto: any) => {
    setCarrito([...carrito, producto]);
    
    // --- LÓGICA DE CONFETI ---
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#4a5d23', '#25d366', '#fdfcf0'] // Colores de tu marca
    });
  };

  const totalPrecio = carrito.reduce((acc, item) => acc + item.price, 0);

  const finalizarPedido = () => {
    if (carrito.length === 0) return;
    const numeroTelefono = "5493515416836"; 
    const listaProductos = carrito.map(item => `- ${item.name} ($${item.price})`).join("%0A");
    const mensaje = `¡Hola! Quiero realizar el siguiente pedido desde la web:%0A%0A${listaProductos}%0A%0A*Total: $${totalPrecio}*%0A%0A¿Cómo coordinamos el pago?`;
    window.open(`https://wa.me/${numeroTelefono}?text=${mensaje}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#fdfcf0] pb-20 font-sans">
      <nav className="bg-[#4a5d23] text-white p-6 shadow-md flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold font-serif">🧉 Matería Premium</h1>
        <button 
          onClick={() => setMostrarResumen(!mostrarResumen)}
          className="bg-white text-[#4a5d23] px-5 py-2 rounded-full font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          🛒 Mi Carrito ({carrito.length})
        </button>
      </nav>

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

      <header className="py-20 text-center px-4">
        <h2 className="text-6xl font-black text-gray-800 mb-4 tracking-tighter">Materia Criolla</h2>
        <p className="text-xl text-gray-600 italic">De Córdoba para todo el país 🇦🇷</p>
      </header>

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

      <a
        href="https://wa.me/5493515416836?text=Hola!%20Tengo%20una%20consulta%20sobre%20los%20mates"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-[#25d366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-[100] flex items-center justify-center"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </main>
  );
}