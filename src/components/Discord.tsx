import Image from 'next/image';

const Discord = ({ src, alt, width, height, className }: any) => {
  const isSvg = src.endsWith('.svg');

  if (isSvg) {
    // For SVG, use a regular img tag for better control
    return (
      <img
        src={src}
        alt={alt || "Logo"}
        width={width || 50}
        height={height || 50}
        className={className}
      />
    );
  }

  // For other image types, use Next.js Image component for optimization
  return (
    <div className={className} style={{ width, height, position: 'relative' }}>
      <Image
        src={src}
        alt={alt || "Join our Community on Discord"}
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
};

export default Discord;