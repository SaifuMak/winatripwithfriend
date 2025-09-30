import PromoForm from "./components/home/PromoForm";

export default function Home() {
  return (

    <div className="w-full h-fit flex justify-center bg-black items-center">
      <div className="lg:w-9/12 w-full min-h-[130dvh]  relative">
        <div className="absolute inset-0 w-full h-8/12">
          <img
            src="/image/home/banner.jpg"
            alt="Banner"
            className="w-full h-full"
          />
        </div>
        <div className="absolute bottom-0 w-full h-7/12">
          <img
            src="/image/home/pattern.png"
            alt="Pattern"
            className="w-full h-full"
          />
        </div>


        <div className=" w-full h-full  absolute inset-0">
          <div className=" pt-10 2xl:pt-10 lg:w-6/12 sm:w-9/12 w-11/12  h-full mx-auto flex  flex-col items-center">

            <div className=" 2xl:w-7/12 w-7/12 space-x-6 h-fit  flex items-center justify-between  ">
              {/* coke logo */}
              <div className="w-fit h-20 2xl:h-24 ">
                <img src="/image/home/coke-logo.png" alt="coke-logo" className=" w-full h-full object-contain" />
              </div>
              {/* star logo */}
              <div className="w-fit  h-12 2xl:h-16 ">
                <img src="/image/home/star-logo.png" alt="star-logo" className=" w-full h-full object-contain" />
              </div>
            </div>

            {/* main text */}
            <div className="w-full  h-fit 2xl:mt-16 md:mt-10 mt-5 ">
              <img src="/image/home/info-text.png" alt="info" className=" w-full h-full object-contain" />
            </div>

            {/* form */}
            <div className="2xl:mt-16 xl:mt-12 mt-6  relative">
              <PromoForm />
            </div>

            {/* <div className="w-full bor absolute -bottom-56 left-72  size-96  "> */}
            <div className="w-fit  absolute  right-1  2xl:-right-12 max-md:hidden  xl:bottom-10 lg:bottom-36 bottom-0 size-[16%]  sm:size-[28%] lg:size-[32%] xl:size-[35%]   2xl:size-[37%]  ">
              <img src="/image/home/cola.png" alt="coke" className=" w-full h-full object-contain" />
            </div>

            <div className="2xl:w-[350px] lg:w-[300px] max-sm:w-[200px] h-fit max-md:hidden  absolute bottom-1 sm:bottom-8 lg:bottom-28 xl:bottom-20 2xl:bottom-20 sm:left-5 left-2 lg:left-0 xl:left-5  ">
              <p className=" max-w-xs text-center mb-4 max-sm:text-sm text-white md:font-semibold">Purchase any of these Coca-Cola products to participate  </p>
              <img src="/image/home/brand logos.png" alt="brands" className=" w-full h-full object-contain" />
            </div>

            {/* mobile view  */}
            <div className=" flex items-center  bor w-full space-x-5  justify-center md:hidden ">

              <div className=" w-fit h-12">
                <img src="/image/home/brand logos.png" alt="brands" className=" w-full h-full object-contain" />
              </div>

              <div className=" size-28">
                <img src="/image/home/cola.png" alt="coke" className=" w-full h-full object-contain" />
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>

  );
}
