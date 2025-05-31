'use client'

import React, { useEffect, useRef } from 'react';
import Script from 'next/script';
import { useTheme } from '../contexts/ThemeContext';
import { useIsMobile } from '../hooks/useIsMobile';
import type { VantaEffect } from '../../types/vanta';

const VantaBackground = () => {
  const { theme } = useTheme();
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef<VantaEffect | null>(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (typeof window !== 'undefined' && window.VANTA) {
      const backgroundColor = theme === 'dark' ? 0x0a0a0a : 0xf5f5f5;
      const color = theme === 'dark' ? 0x3c5416 : 0xaaaaaa;
      
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
      }

      vantaEffectRef.current = window.VANTA.TOPOLOGY({
        el: "#homepage-background",
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        forceAnimate: true,
        scaleMobile: 1.00,
        color: color,
        backgroundColor: backgroundColor
      });
    }
    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
      }
    };
  }, [theme]);

  return (
      <>
        {!isMobile && (
          <>
            <div 
              ref={vantaRef}
              id="homepage-background" 
              className="fixed top-0 left-0 w-full h-screen -z-10 opacity-50"
            />
            <Script
              src="/static/vanta.js"
              strategy="beforeInteractive"
            />
            <Script
              src="/static/topology.js"
              strategy="beforeInteractive"
            />
          </>
        )}
      </>
  );
};

export default VantaBackground;