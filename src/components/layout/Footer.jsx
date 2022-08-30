const navigation = {
  main: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Roles', href: '/roles' },
    { name: 'Company', href: '#' },
    { name: 'Profile', href: '#' },
    { name: 'Settings', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className='bg-white'>
      <div className='max-w-7xl mx-auto py-2 px-4  sm:px-6 lg:px-8'>
        <nav
          className='-mx-5 -my-2 flex flex-wrap justify-center'
          aria-label='Footer'
        >
          {navigation.main.map((item) => (
            <div key={item.name} className='px-5 py-2'>
              <a
                href={item.href}
                className='text-base text-gray-500 hover:text-gray-900'
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>

        <p className='my-2 text-center text-base text-gray-400'>
          &copy; 2022 Loop Not Luck. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
