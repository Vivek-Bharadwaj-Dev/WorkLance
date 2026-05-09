
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
  showText?: boolean;
}

export function Logo({ className, iconSize = 36, textSize = "text-2xl", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-2 font-bold text-primary hover:opacity-80 transition-opacity ${className}`}>
      <div className="relative flex-shrink-0" style={{ width: iconSize, height: iconSize }}>
        <Image
          src="/images/logo.png"
          alt="Worklance Logo"
          fill
          sizes={`${iconSize}px`}
          className="object-contain"
          priority
        />
      </div>
      {showText && <span className={textSize}>Worklance</span>}
    </Link>
  );
}
