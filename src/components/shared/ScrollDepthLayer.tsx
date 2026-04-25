import React from 'react';

interface ScrollDepthLayerProps {
  depth?: number;
  lift?: number;
  rotateX?: number;
  rotateY?: number;
  className?: string;
  layerClassName?: string;
  children: React.ReactNode;
}

const ScrollDepthLayer: React.FC<ScrollDepthLayerProps> = ({
  depth = 1,
  lift = 0,
  rotateX = 0,
  rotateY = 0,
  className = '',
  layerClassName = '',
  children,
}) => {
  const style: React.CSSProperties = {
    transform: `translateY(${lift}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    transformStyle: 'preserve-3d',
    perspective: `${1000 / depth}px`, // Adjust perspective based on depth
  };

  return (
    <div className={className} style={style}>
      <div className={layerClassName}>
        {children}
      </div>
    </div>
  );
};

export default ScrollDepthLayer;