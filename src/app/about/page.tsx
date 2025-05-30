'use client';
import { useTheme } from '../contexts/ThemeContext';


export default function AboutPage() {
  const { theme } = useTheme();
  return (
    <>
    <main className="flex flex-col items-center justify-between pt-6 p-14">
      <div className="absolute top-6 left-14 flex">
        <div className="flex gap-3">
          <a href="mailto:workgolf@gmail+20.gmail.com" title="Mail me" target="_blank">
            <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM23.9639 26.0193L14.9987 19.5115V33.23H13.5009C12.6664 33.23 12.0031 32.5667 12.0031 31.7322V16.562C12.0031 16.4985 12.007 16.4389 12.0144 16.3831C12.0416 16.1451 12.1284 15.9122 12.2813 15.7061C12.7734 15.0428 13.7363 14.893 14.421 15.3851L23.9853 22.3391L33.6138 15.2996C34.2771 14.8074 35.2186 14.9572 35.7107 15.6419C35.9723 15.9945 36.0525 16.4256 35.9674 16.8261V31.7536C35.9674 32.5667 35.3041 33.23 34.4697 33.23H32.9719V19.4788L23.9639 26.0193Z" fill={theme === 'dark' ? '#d9d3d2' : 'black'}/>
            </svg>
          </a>
         
          <a href="https://www.linkedin.com/in/volodymyr-lukasevych-swe-fe/" title="linkedIn" target="_blank">
            <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24ZM16.9605 19.8778H11.5216V36.2196H16.9605V19.8778ZM17.3188 14.8227C17.2835 13.2204 16.1377 12 14.277 12C12.4164 12 11.2 13.2204 11.2 14.8227C11.2 16.3918 12.3805 17.6473 14.2064 17.6473H14.2412C16.1377 17.6473 17.3188 16.3918 17.3188 14.8227ZM36.5754 26.8497C36.5754 21.8303 33.8922 19.4941 30.3131 19.4941C27.4254 19.4941 26.1326 21.0802 25.4107 22.1929V19.8783H19.9711C20.0428 21.4117 19.9711 36.22 19.9711 36.22H25.4107V27.0934C25.4107 26.605 25.446 26.1178 25.5898 25.7681C25.9829 24.7924 26.8779 23.7822 28.3805 23.7822C30.3494 23.7822 31.1365 25.2807 31.1365 27.4767V36.2196H36.5752L36.5754 26.8497Z" fill={theme === 'dark' ? '#d9d3d2' : 'black'}/>
            </svg>
          </a>
          <a href="https://medium.com/@volodymyrlukasevych" title='Medium' target="_blank">
            <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24ZM11.3912 15.234C11.6845 15.5046 11.8343 15.9019 11.7946 16.3039V30.779C11.8816 31.3011 11.7208 31.8345 11.3613 32.2158L8 36.3886V36.9389H17.5313V36.3886L14.1699 32.2158C13.8079 31.8351 13.6371 31.3053 13.7068 30.779V18.2604L22.0728 36.9389H23.0439L30.2297 18.2604V33.1481C30.2297 33.5456 30.2297 33.622 29.9757 33.8818L27.3912 36.4497V37H39.9402V36.4497L37.4454 33.943C37.2251 33.7712 37.1159 33.4888 37.1615 33.2093V14.7907C37.1159 14.5112 37.2251 14.2288 37.4454 14.057L40 11.5503V11H31.1559L24.8515 27.0952L17.6807 11H8.40336V11.5503L11.3912 15.234Z" fill={theme === 'dark' ? '#d9d3d2' : 'black'}/>
            </svg>
          </a>
        </div>
        <a href="" className="ml-6 lg:text-xl text-base font-bold mr-2 underline" target="_blank" rel="noopener noreferrer">resume</a>
      </div>
     
      <div className="xl:min-h-[80vh] flex flex-col gap-12 mt-14 mb-16 xl:mb-0 lg:mt-18 xl:mt-24 xl:pr-96 z-10">
        <h2 className="mt-2 mb-0 font-bold text-2xl lg:text-3xl xl:text-4xl">Hello !</h2>
        <h2 className="mt-2 mb-0 font-bold text-2xl lg:text-3xl xl:text-4xl">My name is Volodymyr Lukasevych</h2>
        <h2 className="mt-2 mb-0 font-bold text-2xl lg:text-3xl xl:text-4xl">A Senior Frontend Engineer with 11+ years in developing scalable web applications. Passionate about building
intuitive, high-performance UIs, optimizing frontend architecture, and leading development teams.</h2>
      </div>
    </main>
    </>
  );
}
