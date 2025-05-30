declare global {
  interface Window {
    VANTA: {
      TOPOLOGY: (config: VantaTopologyConfig) => VantaEffect;
    };
  }
}

interface VantaTopologyConfig {
  el: string | HTMLElement;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
  scale?: number;
  scaleMobile?: number;
  color?: number;
  backgroundColor?: number;
  forceAnimate?: boolean;
}

interface VantaEffect {
  destroy: () => void;
}

export type { VantaEffect, VantaTopologyConfig };