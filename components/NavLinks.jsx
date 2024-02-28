import Link from 'next/link';
const links = [
  { href: '/chat', label: 'Asistan' },
  { href: '/tours', label: 'Turlar' },
  { href: '/tours/new-tour', label: 'Beni Şaşırt' },
  { href: '/profile', label: 'Profilim' },
];

const NavLinks = () => {
  return (
    <ul className='menu  text-base-content'>
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link href={link.href} className='capitalize'>
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default NavLinks;