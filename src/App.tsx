import { useState } from 'react'

export default function App() {
  const [skor, setSkor] = useState<number>(0);

  const tambahSkor = () => setSkor(skor + 1);
  const kurangSkor = () => setSkor(skor - 1);
  const reset = () => setSkor(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-8">
      
      {/* 
        Kartu Utama dijadikan Flexbox berpola kolom (ke bawah)
        dan dipaksa rata tengah dengan 'items-center'
      */}
      <div className="w-72 bg-amber-200 rounded-2xl p-6 flex flex-col items-center">
        <h1 className="text-2xl text-black font-bold text-center mb-2">Menghitung Skor</h1>
        <h2 className="text-center text-4xl text-black font-extrabold mb-4">{skor}</h2>

        {/* --- DUA TOMBOL TANPA DIV PEMBUNGKUS --- */}
        <button 
          className="bg-amber-800 text-white w-32 py-2 rounded-3xl mt-2 hover:bg-amber-900 transition" 
          onClick={tambahSkor}
        >
          tambah
        </button>

        <button 
          className="bg-amber-800 text-white w-32 py-2 rounded-3xl mt-2 hover:bg-amber-900 transition" 
          onClick={kurangSkor}
        >
          kurang
        </button>

        <button 
          className="bg-amber-700 text-white w-32 py-2 rounded-3xl mt-2 hover:bg-amber-900 transition" 
          onClick={reset}
        >
          reset
        </button>

      </div>

    </div>
  )
}