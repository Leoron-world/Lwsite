import { useSpring, animated } from 'react-spring';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useState } from 'react';

export default function Home() {
  const [particlesLoaded, setParticlesLoaded] = useState(false);

  const animationProps = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 1000,
  });

  const particlesInit = async (main) => {
    await loadFull(main);
    setParticlesLoaded(true);
  };

  const particlesOptions = {
    // particle options

    particles: {
      number: {
        value: 40,
        density: {
          enable: true,
          value_area: 1200,
        },
      },
      color: {
        value: '#00ff00',
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#00ff00',
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: 'img/github.svg',
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 2,
        random: true,
        anim: {
          enable: true,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: 'window',
      events: {
        onhover: {
          enable: true,
          mode: 'repulse',
        },
        onclick: {
          enable: false,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,

  };



  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white h-full w-full'>
      <div className='flex flex-row items-end h-screen'>
       

        
        <img src='/vr.png' alt='landingIcon' className='object-cover'/>
        <div className='flex flex-col ml-4 '>
        <div style={{ position: 'relative', width: '300px', height: '300px' }}>
          <Particles
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            init={particlesInit}
            options={particlesOptions}
          />
        </div>
          <animated.h1 style={animationProps} className='text-6xl font-bold banner'>
            Welcome to the Leoron World
          </animated.h1>
          <animated.p style={animationProps} className='mt-6 text-lg'>
            Building a digital world devoted to sports.
            <br />
            An immersive digital platform to celebrate sporting rivalries among fans through virtual territories of clubs/teams.
            <br />
            Aspiring to become the 1st metaverse company catering to India's unique needs in sports, starting with Cricket and Football.
          </animated.p>
          
          <div className='mt-12'>
          <button className='px-4 mt-1 py-1 bg-green-700 text-white rounded-xl font-serif tracking-tighter text-xl'>Know More</button>
            <div className='flex place-content-center mt-12'>
              <a href='https://play.google.com/store/apps/details?id=YOUR_APP_PACKAGE_NAME'>
                <img
                  alt='Get it on Google Play'
                  src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'
                  style={{ width: '200px', marginTop: '24px' }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





{/* <iframe width="850" height="500" src="https://www.youtube.com/embed/Bl79t_SEeIM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */ }