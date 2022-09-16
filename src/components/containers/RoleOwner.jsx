import Image from "next/image";

const people = [
  {
    name: "Lindsay Walton",
    role: "Human Resource Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    linkedinUrl: "www.linkedIn.com/lindsay-walton",
  },
];

export default function RoleOwner() {
  return (
    <div className='bg-white'>
      <div className='mx-auto py-2 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-2'>
        <div className='space-y-12'>
          {people.map((person) => (
            <div key={person.name} className='space-y-4'>
              <div className='aspect-w-3 aspect-h-2 text-center mx-auto'>
                <Image
                  className='h-64 w-64 text-center mx-auto object-cover shadow-lg rounded-full'
                  src={person.imageUrl}
                  alt={person.name}
                />
              </div>

              <div className='space-y-2 mx-auto text-center'>
                <div className='text-lg leading-6 font-medium space-y-1'>
                  <h3>{person.name}</h3>
                  <p className='text-black'>{person.role}</p>
                </div>
                <a
                  href={person.twitterUrl}
                  className='text-black hover:text-[#26ADB4]'
                >
                  {person.linkedinUrl}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
