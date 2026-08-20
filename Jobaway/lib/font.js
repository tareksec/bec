import { Arimo, Noto_Serif_Bengali } from 'next/font/google'

export const arimo = Arimo({
    subsets: ['latin'],
    variable: "--arimo",
    display: 'swap',
})

export const noto_bengali = Noto_Serif_Bengali({
    subsets: ['bengali'],
    variable: "--noto-bengali",
    display: 'swap',
})
