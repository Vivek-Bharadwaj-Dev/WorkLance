
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
  showText?: boolean;
}

export function Logo({ className, iconSize = 140, textSize = "text-2xl", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-2 font-bold text-primary hover:opacity-80 transition-opacity ${className}`}>
      <div className="relative" style={{ width: iconSize, height: iconSize }}>
        <Image
          src="/images/logo.png"
          alt="Interna Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && <span className={textSize}>Interna</span>}
    </Link>
  );
}
