import React from 'react'

const About = () => {
  return (
    <div className='max-w-6xl mx-auto px-4 py-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
        <div className='col-span-1 space-y-8'>
          <div className='space-y-4'>
            <h1 className='text-5xl font-bold text-neutral-900 dark:text-white'>
              Hey there! Welcome! 👋
            </h1>
            <p className='text-xl text-neutral-600 dark:text-neutral-400'>
              Cybersecurity Expert & Digital Guardian
            </p>
          </div>
          
          <div className='space-y-6 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300'>
            <p>
              As a seasoned cybersecurity professional with over 5 years of expertise, I've dedicated my career to protecting digital landscapes and empowering organizations to build robust security infrastructures. My journey spans across Web Application Security, Network Defense, Information Security, and Advanced Penetration Testing.
            </p>
            <p>
              I've had the privilege of collaborating with prestigious organizations across multiple continents - from the bustling tech hubs of India to the innovative markets of Hong Kong, and throughout the Middle East including KSA, UAE, and Qatar. Currently, I'm leveraging my expertise as a Senior Solution Advisor at a Big4 firm, where I help shape the future of cybersecurity solutions.
            </p>
            <p>
              Beyond the digital realm, I'm an advocate for holistic growth - balancing technical excellence with physical wellness through fitness and global exploration. I'm deeply committed to nurturing the next generation of cybersecurity talents, offering mentorship and guidance to those aspiring to make their mark in this dynamic field.
            </p>
          </div>
        </div>

        <div className='col-span-1 space-y-6'>
          <div className='bg-white/50 dark:bg-neutral-900/50 backdrop-blur-lg rounded-3xl p-8 shadow-xl dark:shadow-neutral-900/30'>
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <div className='p-4 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className='text-2xl font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent'>Security Expert</h3>
                  <p className='text-neutral-600 dark:text-neutral-400'>Protecting Digital Assets</p>
                </div>
              </div>
              <p className='text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                Delivering cutting-edge security solutions through expertise in Web Security, Network Defense, and Ethical Hacking. Proven track record of strengthening security postures for organizations worldwide.
              </p>
            </div>
          </div>

          <div className='bg-white/50 dark:bg-neutral-900/50 backdrop-blur-lg rounded-3xl p-8 shadow-xl dark:shadow-neutral-900/30'>
            <div className='space-y-4'>
              <h3 className='text-xl font-semibold'>Certifications & Expertise</h3>
              <div className='grid grid-cols-3 gap-4'>
                {['CISSP', 'CEH', 'OSCP'].map((cert) => (
                  <div key={cert} className='bg-neutral-100 dark:bg-neutral-800 rounded-xl p-3 text-center'>
                    <p className='font-medium text-neutral-800 dark:text-neutral-200'>{cert}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
