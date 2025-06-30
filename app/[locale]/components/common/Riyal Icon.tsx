'use client';

interface RiyalIconProps {
  size?: number;
  className?: string;
}

const RiyalIcon = ({ size = 20, className = '' }: RiyalIconProps) => {
  return (
    <span
      className={`icon-saudi_riyal inline-block align-middle ${className}`}
      style={{
        fontSize: `${size}px`,
      }}
    />
  );
};

export default RiyalIcon;
