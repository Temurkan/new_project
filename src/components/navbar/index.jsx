import Navbar from '@/components/shadcn-studio/blocks/navbar-component-01/navbar-component-01'

const navigationData = [
  {
    title: 'Home',
    href: '#',
  },
  {
    title: 'Products',
    href: '#',
  },
  {
    title: 'About Us',
    href: '#',
  },
  {
    title: 'Contacts',
    href: '#',
  },
]

export default function Nav() {
  return (
    <div className='fixed w-full z-1'>
      <Navbar navigationData={navigationData} />
    </div>
  )
}
