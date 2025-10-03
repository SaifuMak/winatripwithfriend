import React from 'react'
import AbridgedTermsData from '../components/AbridgedTermsData'

function AbridgedTerms() {
  return (
    <div className=" bg-[#e41e2a]">

      <div className="lg:min-h-[60vh] min-h-[50vh]   py-10 relative flex flex-col  items-center bg-no-repeat bg-[url('/image/home/banner-1.jpg')] bg-cover bg-center">

        <div className="  h-fit max-w-9/12  flex items-center space-x-10  lg:space-x-20 ">
          {/* coke logo */}
          <div className="w-fit h-20 2xl:h-24 ">
            <img src="/image/home/coke-logo.png" alt="coke-logo" className=" w-full h-full object-contain" />
          </div>
          {/* star logo */}
          <div className="w-fit  h-12 2xl:h-16 ">
            <img src="/image/home/star-logo.png" alt="star-logo" className=" w-full h-full object-contain" />
          </div>
        </div>

        <div className="   h-fit mt-3  lg:mt-10 max-w-10/12 md:max-w-4/12  ">
          <img src="/image/home/info-text.png" alt="info" className=" w-full h-full object-contain" />
        </div>

      </div>

      <AbridgedTermsData />
    </div>




  )
}

export default AbridgedTerms