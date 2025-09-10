import Image from 'next/image';

type Props = { size?: number; className?: string; alt?: string };

export default function Logo({ size = 28, className, alt = 'Devcore' }: Props) {
  return (
    <Image
      src="/img/logo/logdev.jpeg"
      alt={alt}
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}
