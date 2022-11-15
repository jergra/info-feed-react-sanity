import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {client} from '../lib/client'


const Custom = ({...props}) => {

    const [showTop, setShowTop] = useState(false);

    // console.log('props.customString:', props.customString)

    let text = props.customString;
    const urls = text.split(" ");
    //console.log('urls.length:', urls.length)
    //console.log('props.terms.length:', props.terms.length)
        
    useEffect(() => {
        const window1: any = window.open("", "w1", 'height=' + screen.height + ',width=' + screen.width + ',resizable=yes,scrollbars=yes');
        window1.focus();
        const y: number = Math.floor(Math.random() * (urls.length - 7));
        window1.location = urls[y]
        // console.log('y, urls[y]:', y, urls[y])
    }, [])
        
    function newPage() {
        const window1: any = window.open("", "w1", 'height=' + screen.height + ',width=' + screen.width + ',resizable=yes,scrollbars=yes');
        const x = Math.floor(Math.random() * urls.length);
        if (x < (urls.length - 7)) {
            // console.log('x, urls[x]:', x, urls[x])
            window1.focus();
            window1.location = urls[x]
        } else {
            const z = Math.floor(Math.random() * 2 + 1);
            console.log('z:', z)
            const randomNumber1 = Math.floor(Math.random() * props.terms.length)
            const randomNumber2 = Math.floor(Math.random() * props.terms.length)
            const randomNumber3 = Math.floor(Math.random() * props.terms.length)
            const searchTerm1 = props.terms[randomNumber1]
            const searchTerm2 = props.terms[randomNumber2]
            const searchTerm3 = props.terms[randomNumber3]
            if (z === 1) {
                if (x === urls.length - 7) {
                    window1.location = "https://news.google.com/search?q="+searchTerm1+"+"+searchTerm2+"&hl=en-CA&lr&ie=UTF-8&oe=UTF-8&sa=N&scoring=d&gl=CA&ceid=CA:en";
                }
                if (x === urls.length - 6) {
                    window1.location = "https://www.google.ca/search?tbm=vid&q="+searchTerm1+"+"+searchTerm2;
                }
                if (x === urls.length - 5) {
                    window1.location = "https://www.google.com/search?q="+searchTerm1+"+"+searchTerm2;
                }
                if (x === urls.length - 4) {
                    window1.location = "https://www.google.ca/search?tbm=bks&tbo=1&q="+searchTerm1+"%20"+searchTerm2+"&btnG=Search+Books";
                }
                if (x === urls.length - 3) {
                    window1.location = "https://www.youtube.com/results?search_query="+searchTerm1+"%20"+searchTerm2;
                }
                if (x === urls.length - 2) {
                    window1.location =  "https://www.google.ca/search?hl=en&tbm=isch&q="+searchTerm1+"+"+searchTerm2;
                }
                if (x === urls.length - 1) {
                    window1.location = "https://scholar.google.ca/scholar?q="+searchTerm1+"%20"+searchTerm2+"&hl=en&btnG=Search&as_sdt=1%2C5&as_sdtp=on";
                }
            }
            if (z === 2) {
                if (x === urls.length - 7) {
                    window1.location = "https://news.google.com/search?q="+searchTerm1+"+"+searchTerm2+"+"+searchTerm3+"&hl=en-CA&lr&ie=UTF-8&oe=UTF-8&sa=N&scoring=d&gl=CA&ceid=CA:en";
                }
                if (x === urls.length - 6) {
                    window1.location = "https://www.google.ca/search?tbm=vid&q="+searchTerm1+"+"+searchTerm2+"+"+searchTerm3;
                }
                if (x === urls.length - 5) {
                    window1.location = "https://www.google.com/search?q="+searchTerm1+"+"+searchTerm2+"+"+searchTerm3;
                }
                if (x === urls.length - 4) {
                    window1.location = "https://www.google.ca/search?tbm=bks&tbo=1&q="+searchTerm1+"%20"+searchTerm2+"+"+searchTerm3+"&btnG=Search+Books";
                }
                if (x === urls.length - 3) {
                    window1.location = "https://www.youtube.com/results?search_query="+searchTerm1+"%20"+searchTerm2+"+"+searchTerm3;
                }
                if (x === urls.length - 2) {
                    window1.location =  "https://www.google.ca/search?hl=en&tbm=isch&q="+searchTerm1+"+"+searchTerm2+"+"+searchTerm3;
                }
                if (x === urls.length - 1) {
                    window1.location = "https://scholar.google.ca/scholar?q="+searchTerm1+"%20"+searchTerm2+"+"+searchTerm3+"&hl=en&btnG=Search&as_sdt=1%2C5&as_sdtp=on";
                }
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
          newPage()
        }, 24000);
        return () => clearInterval(interval);
      }, []);
     
    useEffect(() => {
        const onScroll = () => {
            if (window.pageYOffset > 10) {
                setShowTop(true)
            } else {
                setShowTop(false)
            }
        };
    
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const goToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    };

    return (
    <>
      <Head>
        <title>Info Feed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        
      <div className="flex flex-col items-center justify-center bg-gray-200">
        <div className='flex mt-10'>
            <button 
                className="absolute pt-1 pb-1 pl-3 pr-3 text-sm font-bold text-teal-700 rounded 
                    left-4 top-4 border-2 border-teal-700 hover:bg-teal-700 hover:text-white"
            >
                <Link href="/">NewsAPI Search</Link>
            </button>
            <button 
                className="absolute pt-1 pb-1 pl-3 pr-3 text-sm font-bold text-white bg-teal-700 
                    rounded right-4 top-4 border-2 border-teal-700"
            >
                <Link href="/info-feed">Info Feed</Link>
            </button>
            <div className='flex w-full mt-20 mb-7'>
                <div className='flex flex-wrap w-[900px] bg-white px-3 py-2'>
                    {
                        props.terms.map((term: any, index: any) => (
                            <div 
                                key={index}
                                className=''
                            >
                                <div className="pr-2">{term}</div>
                            </div>
                        ))
                    }
                </div>
                
                    
                    <button
                        type="button" 
                        className='h-7 pt-1 pb-1 pl-3 pr-3 ml-5 text-sm font-bold text-white bg-teal-700 rounded'
                    >
                        <a  href='https://news-feed.sanity.studio/desk' target="_blank">
                            Edit Terms
                        </a>
                    </button>
                
            </div>
        </div>

        <div className="flex mt-5 mb-5">
           <div className="bg-white p-2 w-[900px] mr-5">{props.customString}</div>
            <button
                type="button" 
                className='h-7 pb-1 pt-1 pl-3 pr-3 text-sm font-bold text-white bg-teal-700 rounded'
            >
                <a  href='https://news-feed.sanity.studio/desk' target="_blank">
                    Edit Pages
                </a>
            </button>
        </div>
        
        {showTop ? (
            <div className='fixed bottom-5 right-5'>
                <button 
                    className="pt-1 pb-1 pl-3 pr-3 text-sm font-bold text-white bg-teal-700 rounded"
                    onClick={goToTop}
                >
                    Top
                </button>
            </div>
        ) : (
            <div></div>
        )}
      </div>
    </>
  )
}

export const getServerSideProps = async () => {

    const choicesFromSanity = '*[_type == "choices"]'
    const choicesFetched = await client.fetch(choicesFromSanity)

    const customString = choicesFetched[0].custom

    const termsString = choicesFetched[0].random

    const terms = termsString.split(' ')

    return {
        props: {
            customString,
            terms
        }
    }
}

export default Custom
