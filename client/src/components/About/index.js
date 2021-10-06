import React from 'react'
import Image from 'react-bootstrap/Image';
import dogImg from '../../assets/images/dogandowner.jpg'


function About() {
  return (

    <div className='container'>
      <div class="row align-items-center">
        <div class="col-md-2">

        </div>
        <div class="col-md-8 about-middle-column">
          <Image src={dogImg} className='about-img' />
          <p className='about-text'>
            The Pet Outlet was founded in 1973 by the Viamaggi family. They lived on a ranch and their lives primarily consisted of
            always being surrounded by animals. People from the nearby village would travel great distances to buy their homemade pet
            supplies--nothing major, just wooden kennels and ceramic bowls but there the idea was planted. The original shop was then
            created, and the children went on to open a few locations in the 90s that are still going strong.
            It's 2021 so its finally time to go digital!
          </p>
        </div>
        <div class="col-2">

        </div>
      </div>
    </div>

  )
}

export default About;
