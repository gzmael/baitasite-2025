import { Img, Link } from '@react-email/components'

interface SocialIconProps {
  name: string
  href: string
  iconSrc: string
}

export const SocialIcon = ({ href, iconSrc, name }: SocialIconProps) => {
  return (
    <Link href={href} target="_blank" className="mx-1.5 inline-block h-10 w-10">
      <Img src={iconSrc} alt={`Social Logo ${name}`} className="w-10" />
    </Link>
  )
}
