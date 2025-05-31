'use client';
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { EB_Garamond } from 'next/font/google'

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-garamond',
})

export default function AllenCardPage() {
  const { theme } = useTheme();
  return (
    <div lang="en" className={garamond.className}>
<div className="flex items-center justify-center min-h-screen bg-bone">
      <div className="relative w-[640px] h-[360px] p-10 text-[#1a1a1a] border border-gray-300 shadow-inner bg-[#f8f7f2]" style={{ backgroundImage: 'url(/static/allenBG.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Top */}
        <div className="flex justify-between text-sm">
          <span className="tracking-wide">212.555.6342</span>
          <div className="text-right leading-tight">
            <div className="uppercase tracking-wider font-semibold">Pierce &amp; Pierce</div>
            <div className="text-xs tracking-wide">Mergers and Acquisitions</div>
          </div>
        </div>

        {/* Center */}
        <div className="flex items-center justify-center mt-24">
          <div className="text-center">
            <h1 className="text-xl font-bold uppercase tracking-wider">Volodymyr Lukasevych</h1>
            <p className="uppercase tracking-wider text-sm mt-1">Senior SWE</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="absolute bottom-10 left-10 text-sm tracking-wide">
          <p>358 Exchange Place New York, N.Y. 10099</p>
          <p className="mt-1">Fax 212 555 6390&nbsp;&nbsp;&nbsp; Telex 10 4534</p>
        </div>
      </div>
    </div>
    </div>
  );
}
