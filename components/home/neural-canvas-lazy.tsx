'use client'

import dynamic from 'next/dynamic'

const NeuralCanvas = dynamic(
  () => import('./neural-canvas').then((m) => m.NeuralCanvas),
  { ssr: false },
)

/** Canvas dekoratif — di-load setelah hydration, bukan bagian render awal. */
export function NeuralCanvasLazy(props: { className?: string }) {
  return <NeuralCanvas {...props} />
}
