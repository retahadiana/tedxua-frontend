import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/a6uhs66q/image/upload/q_auto:best'

const HEADER_IMG = `${CLOUDINARY_BASE_URL}/v1791570690/Group_1000004902_1.png`
const SECTION2_RECT1 = `${CLOUDINARY_BASE_URL}/v1791570718/Rectangle_43_5.png`
const SECTION2_RECT2 = `${CLOUDINARY_BASE_URL}/v1791570715/Rectangle_43_6.png`
const SECTION2_RECT3 = `${CLOUDINARY_BASE_URL}/v1791570689/Rectangle_43_7.png`
const SECTION2_ARROW = `${CLOUDINARY_BASE_URL}/v1791570686/Vector_137_1.png`
const SECTION2_MYLO = `${CLOUDINARY_BASE_URL}/v1791570721/Aqil_mylo_kagum_1.png`

const SECTION3_INSTAGRAM = `${CLOUDINARY_BASE_URL}/v1792672320/Group_1000004999.png`
const SECTION3_YOUTUBE = `${CLOUDINARY_BASE_URL}/v1792672321/Group_1000005003.png`
const SECTION3_DEMOGRAPHIC = `${CLOUDINARY_BASE_URL}/v1792672322/Group_1000005004.png`

const SECTION3_MOBILE_INSTAGRAM = `${CLOUDINARY_BASE_URL}/v1792674734/Group_1000004999_1.png`
const SECTION3_MOBILE_YOUTUBE = `${CLOUDINARY_BASE_URL}/v1792674736/Group_1000005003_1.png`
const SECTION3_MOBILE_DEMOGRAPHIC = `${CLOUDINARY_BASE_URL}/v1792674738/Group_1000005004_1.png`

const SECTION4_RECT_BG = `${CLOUDINARY_BASE_URL}/v1791801957/Rectangle_62.png`
const SECTION4_IMG1 = `${CLOUDINARY_BASE_URL}/v1791570683/Untitled_design_17_1.png`
const SECTION4_IMG2 = `${CLOUDINARY_BASE_URL}/v1791570688/Untitled_design_18_1.png`
const SECTION4_IMG3 = `${CLOUDINARY_BASE_URL}/v1791570690/Untitled_design_18_2.png`
const SECTION4_IMG4 = `${CLOUDINARY_BASE_URL}/v1791570688/Untitled_design_18_3.png`
const SECTION4_BTN1 = `${CLOUDINARY_BASE_URL}/v1791570719/Rectangle_23.png`
const SECTION4_BTN2 = `${CLOUDINARY_BASE_URL}/v1791570689/Rectangle_24.png`
const SECTION4_BTN3 = `${CLOUDINARY_BASE_URL}/v1791570688/Rectangle_25.png`
const SECTION4_BTN4 = `${CLOUDINARY_BASE_URL}/v1791570687/Rectangle_26.png`

const SECTION5_BG = `${CLOUDINARY_BASE_URL}/v1791650992/Rectangle_43_8.png`
const SECTION5_CONTENT = `${CLOUDINARY_BASE_URL}/v1791652484/PROPOSAL_TEDX_SPONSORSHIP_FIX_1_1.png`
const SECTION5_MYLO = `${CLOUDINARY_BASE_URL}/v1791652100/Wira_MYLO_bahagia_1.png`

const SECTION6_RECT = `${CLOUDINARY_BASE_URL}/v1791652724/Rectangle_43_9.png`
const SECTION6_GRASS = `${CLOUDINARY_BASE_URL}/v1791652981/rumput_1_1.png`
const SECTION6_ICON_EMAIL = `${CLOUDINARY_BASE_URL}/v1791653158/Vector_1.png`
const SECTION6_ICON_WA = `${CLOUDINARY_BASE_URL}/v1791653228/Mask_group_1.png`

export default function SponsorshipOpenPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg,#111111 0%,#263A1F 18%,#ADA983 40%,#991A04 80%,#111111 100%)',
        }}
      />

      <Navbar />

      <main className="flex-1 flex flex-col relative w-full items-center">

        {/* Section 1 — Header */}
        <section className="flex w-full items-center justify-center pt-24 md:pt-36">
          <img
            src={HEADER_IMG}
            alt="TEDxUniversitasAirlangga – Partnership Open"
            className="w-full max-w-[205px] md:max-w-[722px] h-auto object-contain"
          />
        </section>

        {/* Section 2 — Gain */}
        <section className="flex flex-col items-center justify-center mt-12 md:mt-28 w-full px-4 relative">
          
          <div className="flex flex-col items-start md:items-center gap-1 md:gap-4 w-[293px] md:w-full md:max-w-[1025px]">
            
            {/* Rect 1 */}
            <div 
              onClick={() => document.getElementById('section-3')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative w-[293px] h-[50px] md:w-[1025px] md:h-[150px] max-w-full cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            >
              <img src={SECTION2_RECT1} alt="Gain 1 Background" className="absolute inset-0 w-full h-full object-fill" />
              <div className="absolute inset-0 flex items-center pl-2 pr-7 md:pl-8 md:pr-[100px]">
                <div className="flex-1 text-center font-swung text-[#F6EBE7] text-[14px] md:text-[50px] leading-[1.15] tracking-tight uppercase">
                  Creating ideas that inspire lasting impact
                </div>
              </div>
              <img src={SECTION2_ARROW} alt="Arrow" className="absolute right-2.5 md:right-10 top-1/2 -translate-y-1/2 w-[15px] md:w-[45px] h-auto" />
            </div>

            {/* Rect 2 */}
            <div 
              onClick={() => document.getElementById('section-4')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative w-[138px] h-[50px] md:w-[483px] md:h-[150px] max-w-full cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            >
              <img src={SECTION2_RECT2} alt="Gain 2 Background" className="absolute inset-0 w-full h-full object-fill" />
              <div className="absolute inset-0 flex items-center pl-2 pr-7 md:pl-8 md:pr-[110px]">
                <div className="flex-1 text-center font-swung text-[#F6EBE7] text-[14px] md:text-[50px] leading-[1.15] tracking-tight uppercase">
                  What You'll Gain
                </div>
              </div>
              <img src={SECTION2_ARROW} alt="Arrow" className="absolute right-2.5 md:right-10 top-1/2 -translate-y-1/2 w-[15px] md:w-[45px] h-auto" />
            </div>

            {/* Rect 3 Wrapper */}
            <div className="relative">
              {/* Rect 3 */}
              <div 
                onClick={() => document.getElementById('section-6')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative w-[267px] h-[50px] md:w-[934px] md:h-[150px] max-w-full cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              >
                <img src={SECTION2_RECT3} alt="Gain 3 Background" className="absolute inset-0 w-full h-full object-fill" />
                <div className="absolute inset-0 flex items-center pl-1 pr-7 md:pl-3 md:pr-[110px]">
                  <div className="flex-1 text-center font-swung text-[#F6EBE7] text-[14px] md:text-[50px] leading-[1.15] tracking-tight uppercase">
                    Be Part of Something Worth Spreading
                  </div>
                </div>
                <img src={SECTION2_ARROW} alt="Arrow" className="absolute right-2.5 md:right-10 top-1/2 -translate-y-1/2 w-[15px] md:w-[45px] h-auto" />
              </div>
              
              {/* Mylo Decoration - Hidden on mobile, visible on desktop */}
              <img src={SECTION2_MYLO} alt="Mylo" className="absolute -left-8 md:-left-[150px] bottom-0 md:bottom-[-40px] w-[60px] md:w-[220px] h-auto hidden md:block z-10 pointer-events-none" />
            </div>

          </div>

        </section>

        {/* Section 3 — Ideas That Reach Beyond */}
        <section id="section-3" className="scroll-mt-24 md:scroll-mt-32 flex flex-col items-center justify-center mt-16 md:mt-32 w-full px-4 relative">
          <div className="flex flex-col items-center w-[282px] md:w-full md:max-w-[1198px] gap-2 md:gap-5">
            
            {/* Title */}
            <div className="w-full text-center font-swung uppercase leading-[1.15] mb-2 md:mb-6">
              <span className="text-[#FFFB99] text-[25px] md:text-[64px]">Ideas</span>
              <span className="text-[#F6EBE7] text-[25px] md:text-[64px]"> THAT REACH </span>
              <span className="text-[#FF2B06] text-[25px] md:text-[64px]">Beyond</span>
            </div>

            {/* Mobile View */}
            <div className="w-full flex md:hidden flex-col gap-2.5">
              {/* Card 1: Instagram */}
              <div className="w-full">
                <img
                  src={SECTION3_MOBILE_INSTAGRAM}
                  alt="Instagram TEDx UniversitasAirlangga"
                  className="w-full h-auto object-contain block select-none"
                />
              </div>

              {/* Card 2: YouTube */}
              <div className="w-full">
                <img
                  src={SECTION3_MOBILE_YOUTUBE}
                  alt="YouTube TEDx"
                  className="w-full h-auto object-contain block select-none"
                />
              </div>

              {/* Card 3: Audience Demographic */}
              <div className="w-full">
                <img
                  src={SECTION3_MOBILE_DEMOGRAPHIC}
                  alt="Audience Gender Demographic"
                  className="w-full h-auto object-contain block select-none"
                />
              </div>
            </div>

            {/* Desktop View */}
            <div className="w-full hidden md:flex flex-col gap-5 lg:gap-6">
              {/* Row 1: Instagram & YouTube Cards */}
              <div className="w-full flex flex-row items-center gap-5 lg:gap-6">
                <div className="flex-[1121] min-w-0">
                  <img
                    src={SECTION3_INSTAGRAM}
                    alt="Instagram TEDx UniversitasAirlangga"
                    className="w-full h-auto object-contain block select-none"
                  />
                </div>
                <div className="flex-[784] min-w-0">
                  <img
                    src={SECTION3_YOUTUBE}
                    alt="YouTube TEDx"
                    className="w-full h-auto object-contain block select-none"
                  />
                </div>
              </div>

              {/* Row 2: Audience Demographic Card */}
              <div className="w-full">
                <img
                  src={SECTION3_DEMOGRAPHIC}
                  alt="Audience Gender Demographic"
                  className="w-full h-auto object-contain block select-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 — What Do You Gain */}
        <section id="section-4" className="scroll-mt-24 md:scroll-mt-32 flex flex-col items-center justify-center mt-16 md:mt-32 w-full px-4 relative">
          <div className="flex flex-col items-center w-[300px] md:w-full md:max-w-[1179px]">
            
            {/* Title */}
            <div className="w-full text-left font-essays leading-tight">
              <div className="text-[16px] md:text-[64px]">
                <span className="text-[#F6EBE7] font-medium">What Do You </span>
                <span className="text-[#FFFB99] font-bold">Gain</span>
                <span className="text-[#F6EBE7] font-medium"> by Partnering with</span>
              </div>
              <div className="text-[16px] md:text-[64px]">
                <span className="text-[#FF2B06] font-bold">TEDxUniversitasAirlangga</span>
                <span className="text-[#F6EBE7] font-medium">?</span>
              </div>
            </div>

            {/* Graphic Box */}
            <div className="relative w-[300px] h-[251px] md:w-[1179px] md:h-[985px] mx-auto -mt-4 md:-mt-8">
              <img src={SECTION4_RECT_BG} alt="Graphic Background" className="absolute left-0 top-[25px] w-[300px] h-[225.45px] md:w-[1179px] md:h-[886px] md:left-0 md:top-[99px] object-fill" />
              <img src={SECTION4_IMG1} alt="Graphic 1" className="absolute left-[5.6px] top-0 w-[174.56px] h-[218.2px] md:left-[22px] md:top-0 md:w-[686.03px] md:h-[857.54px] object-fill" />
              <img src={SECTION4_IMG2} alt="Graphic 2" className="absolute left-[176px] top-[115.5px] w-[69.5px] h-[130.5px] md:left-[692px] md:top-[454px] md:w-[273px] md:h-[513px] object-fill" />
              <img src={SECTION4_IMG3} alt="Graphic 3" className="absolute left-[220px] top-[35.6px] w-[69.5px] h-[116.5px] md:left-[865px] md:top-[140px] md:w-[273px] md:h-[458px] object-fill" />
              <img src={SECTION4_IMG4} alt="Graphic 4" className="absolute left-[260px] top-[149.6px] w-[22.9px] h-[16.5px] md:left-[1021px] md:top-[588px] md:w-[90px] md:h-[65px] object-fill" />
            </div>

            {/* Description */}
            <div className="w-[300px] md:w-full text-justify text-white text-[10px] md:text-[40px] font-gordita mt-2 md:mt-8 leading-[1.15]">
              There's a lot of valuable insight that you can earn from our event, such as newest trends and marketing ideas, Unique selling proposition, and Strategies other businesses use to attract new customers.
            </div>

            {/* 4 Buttons Stack */}
            <div className="flex flex-col gap-1 md:gap-8 mt-4 md:mt-24 w-full">
              <div className="relative flex items-center justify-center self-center md:self-start w-[176px] h-[38px] md:w-[485px] md:h-[105px]">
                <img src={SECTION4_BTN1} alt="Button BG" className="absolute inset-0 w-full h-full object-fill" />
                <span className="relative z-10 text-[#2D1E16] font-essays font-medium text-[12px] md:text-[48px] whitespace-nowrap">Boost Brand Visibility</span>
              </div>
              <div className="relative flex items-center justify-center self-center md:self-end w-[235px] h-[38px] md:w-[648px] md:h-[105px] mt-0 md:-mt-20">
                <img src={SECTION4_BTN2} alt="Button BG" className="absolute inset-0 w-full h-full object-fill" />
                <span className="relative z-10 text-[#2D1E16] font-essays font-medium text-[12px] md:text-[48px] whitespace-nowrap">Enhance Competitive Position</span>
              </div>
              <div className="relative flex items-center justify-center self-center md:self-start md:ml-[5%] w-[194px] h-[38px] md:w-[536px] md:h-[105px]">
                <img src={SECTION4_BTN3} alt="Button BG" className="absolute inset-0 w-full h-full object-fill" />
                <span className="relative z-10 text-[#2D1E16] font-essays font-medium text-[12px] md:text-[48px] whitespace-nowrap">Increased Brand Exposure</span>
              </div>
              <div className="relative flex items-center justify-center self-center md:self-end md:mr-[5%] w-[160px] h-[38px] md:w-[442px] md:h-[105px] mt-0 md:-mt-20">
                <img src={SECTION4_BTN4} alt="Button BG" className="absolute inset-0 w-full h-full object-fill" />
                <span className="relative z-10 text-[#2D1E16] font-essays font-medium text-[12px] md:text-[48px] whitespace-nowrap">Increase Recognition</span>
              </div>
            </div>
            
          </div>
        </section>

        {/* Section 5 — Previous Partner */}
        <section className="flex flex-col items-center justify-center mt-16 md:mt-32 w-full px-4 relative z-10">
          <div className="flex flex-col items-center w-[300px] md:w-full md:max-w-[1100px]">
            {/* Title */}
            <div className="w-full flex justify-center text-center font-swung leading-tight">
              <span className="text-[#F6EBE7] text-[16px] md:text-[64px] tracking-wide">
                PREVIOUS PARTNER
              </span>
            </div>

            {/* Content Box */}
            <div className="relative w-full mt-4 md:mt-12 flex items-center justify-center">
              {/* Background Asset */}
              <img 
                src={SECTION5_BG} 
                alt="Previous Partner Background" 
                className="w-full h-auto object-contain" 
              />
              {/* Partner Logos inside */}
              <div className="absolute inset-0 flex items-center justify-center p-4 md:p-12">
                <img 
                  src={SECTION5_CONTENT} 
                  alt="Previous Partners Logos" 
                  className="w-[80%] h-auto object-contain" 
                />
              </div>

              {/* Mylo Asset (Desktop Only) */}
              <img 
                src={SECTION5_MYLO} 
                alt="Mylo Mascot" 
                className="hidden md:block absolute -bottom-8 -left-12 lg:-bottom-16 lg:-left-24 w-[200px] lg:w-[280px] z-20" 
              />
            </div>
          </div>
        </section>

        {/* Section 6 — Contact Person */}
        <section id="section-6" className="scroll-mt-24 md:scroll-mt-32 flex flex-col items-center justify-center mt-16 md:mt-32 w-full relative z-10">
          <div className="flex flex-col items-center w-full px-4 md:px-0">
            
            {/* Title */}
            <div className="w-full flex justify-center text-center font-swung leading-tight">
              <span className="text-[#F6EBE7] text-[16px] md:text-[55px] tracking-wide">
                Will You Be Our Next Future Changemaker?
              </span>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-col gap-1 md:gap-1 mt-2 md:mt-6 items-center">
              
              {/* Button 1 */}
              <div className="relative w-[231px] h-[40px] md:w-[899px] md:h-[128px]">
                <img src={SECTION6_RECT} alt="Contact BG" className="absolute inset-0 w-full h-full object-fill" />
                <div className="relative z-10 flex items-center h-full pl-[10px] md:pl-[39px] gap-[7px] md:gap-[27px] w-full">
                  <div className="flex items-center justify-center">
                    <img src={SECTION6_ICON_WA} alt="WhatsApp" className="w-[15px] h-[15px] md:w-[58px] md:h-[58px] object-contain" />
                  </div>
                  <span className="text-[#F6EBE7] font-essays font-medium text-[10.32px] md:text-[40px]">Siti Naura Rahadatul Aisy (082119524861)</span>
                </div>
              </div>

              {/* Button 2 */}
              <div className="relative w-[231px] h-[40px] md:w-[899px] md:h-[128px]">
                <img src={SECTION6_RECT} alt="Contact BG" className="absolute inset-0 w-full h-full object-fill" />
                <div className="relative z-10 flex items-center h-full pl-[10px] md:pl-[39px] gap-[7px] md:gap-[27px] w-full">
                  <div className="flex items-center justify-center">
                    <img src={SECTION6_ICON_EMAIL} alt="Email" className="w-[14px] h-[10px] md:w-[54px] md:h-[38px] object-contain" />
                  </div>
                  <span className="text-[#F6EBE7] font-essays font-medium text-[10.32px] md:text-[40px]">financetedxunair@gmail.com</span>
                </div>
              </div>

            </div>
          </div>

          {/* Grass Asset at the Bottom */}
          <div className="w-full -mt-4 md:-mt-28 pointer-events-none">
            <img src={SECTION6_GRASS} alt="Grass Overlay" className="w-full h-auto object-cover" />
          </div>
        </section>
        
      </main>

      <Footer />
    </div>
  )
}


