// const navigation = {
//   main: [
//     { name: 'Dashboard', href: '/dashboard' },
//     { name: 'Roles', href: '/roles' },
//     { name: 'Company', href: '#' },
//     { name: 'Profile', href: '#' },
//     { name: 'Settings', href: '#' },
//   ],
// };

export default function Footer() {
  return (
    //Footer style 1

    // <footer className='bg-white'>
    //   <div className='max-w-7xl mx-auto py-2 px-4  sm:px-6 lg:px-8'>
    // <nav
    //   className='-mx-5 -my-2 flex flex-wrap justify-center'
    //   aria-label='Footer'
    // >
    //       {navigation.main.map((item) => (
    //         <div key={item.name} className='px-5 py-2'>
    //           <a
    //             href={item.href}
    //             className='text-base text-gray-500 hover:text-gray-900'
    //           >
    //             {item.name}
    //           </a>
    //         </div>
    //       ))}
    //     </nav>

    //     <p className='my-2 text-center text-base text-gray-400'>
    //       &copy; 2022 Loop Not Luck. All rights reserved.
    //     </p>
    //   </div>
    // </footer>

    <footer>
      <div className='max-w-7xl mx-auto px-4  sm:px-6 lg:px-8 border border-t py-6'>
        <nav
          className='-mx-5 -my-2 flex flex-wrap justify-evenly'
          aria-label='Footer'
        >
          <div>
            <p c className='text-sm text-gray-900 hover:text-gray-900'>
              &copy; Loop Not Luck 2022
            </p>
          </div>
          <div className='space-evenly flex space-x-3'>
            <div>
              <a
                href='https://www.facebook.com/loopnotluck/'
                target='_blank'
                rel='noreferrer'
                className='hover:text-[#F7B919] text-black'
              >
                <svg
                  className='h-6 w-6'
                  viewBox='0 0 256 256'
                  version='1.1'
                  preserveAspectRatio='xMidYMid'
                >
                  <g>
                    <path
                      d='M256,128 C256,57.3075 198.6925,0 128,0 C57.3075,0 0,57.3075 0,128 C0,191.8885 46.80775,244.8425 108,254.445 L108,165 L75.5,165 L75.5,128 L108,128 L108,99.8 C108,67.72 127.1095,50 156.3475,50 C170.35175,50 185,52.5 185,52.5 L185,84 L168.8595,84 C152.95875,84 148,93.86675 148,103.98925 L148,128 L183.5,128 L177.825,165 L148,165 L148,254.445 C209.19225,244.8425 256,191.8885 256,128'
                      fill='currentColor'
                    ></path>
                    <path
                      d='M177.825,165 L183.5,128 L148,128 L148,103.98925 C148,93.86675 152.95875,84 168.8595,84 L185,84 L185,52.5 C185,52.5 170.35175,50 156.3475,50 C127.1095,50 108,67.72 108,99.8 L108,128 L75.5,128 L75.5,165 L108,165 L108,254.445 C114.51675,255.4675 121.196,256 128,256 C134.804,256 141.48325,255.4675 148,254.445 L148,165 L177.825,165'
                      fill='#FFFFFF'
                    ></path>
                  </g>
                </svg>
              </a>
            </div>
            <div>
              <a
                href='https://www.instagram.com/loopnotluck/'
                target='_blank'
                rel='noreferrer'
                className='hover:text-[#F7B919]'
              >
                <svg
                  className='h-6 w-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
            </div>
            <div>
              <a
                href='https://www.linkedin.com/company/loopnotluck/'
                target='_blank'
                rel='noreferrer'
              >
                <svg
                  className='h-6 w-6 hover:text-[#F7B919]'
                  fill='currentColor'
                  viewBox='0 0 256 256'
                >
                  <g>
                    <path
                      fillRule='evenodd'
                      d='M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055'
                      clipRule='evenodd'
                    ></path>
                  </g>
                </svg>
              </a>
            </div>
          </div>
          <div className='text-sm'>
            <a href='privacy' className='hover:text-[#F7B919]'>
              Privacy Policy
            </a>

            <span> | </span>

            <a href='terms-and-conditions' className='hover:text-[#F7B919]'>
              Terms & Conditions
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
