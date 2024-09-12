import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import Image from 'next/image'
import React from 'react'

function Hero () {
  return (
    <section className="bg-gray-50 flex items-center flex-col">
        <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black">
            Take Control of Your Finances with  <br />
              <span className="text-4xl md:text-[6rem] text-[#e59301] font-bold mt-1 leading-none">
              Budget Buddy
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/dashboard.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
    </section>
  )
}

export default Hero