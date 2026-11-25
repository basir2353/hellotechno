import type { ImgHTMLAttributes } from 'react'

type NextImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string
  alt: string
  fill?: boolean
  priority?: boolean
  sizes?: string
  quality?: number
  unoptimized?: boolean
}

export default function Image({
  src,
  alt,
  fill,
  priority,
  sizes: _sizes,
  quality: _quality,
  unoptimized: _unoptimized,
  className,
  style,
  ...rest
}: NextImageProps) {
  const fillStyle = fill
    ? {
        position: 'absolute' as const,
        inset: 0,
        width: '100%',
        height: '100%',
        ...style,
      }
    : style

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      className={className}
      style={fillStyle}
      {...rest}
    />
  )
}
