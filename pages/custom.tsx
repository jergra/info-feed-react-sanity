import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {client} from '../lib/client'


const Custom = ({...props}) => {

    const [showTop, setShowTop] = useState(false);

    console.log('props.customString:', props.customString)

    let text = props.customString;
    const urls = text.split(" ");
    const window1: any = window.open("", "w1", 'height=' + screen.height + ',width=' + screen.width + ',resizable=yes,scrollbars=yes');
    let x = Math.floor((Math.random() * (urls.length - 7)) + 1);
    window1.focus();
    window1.location = urls[x]
    
        
    function newPage() {
        let x = Math.floor((Math.random() * (urls.length)) + 1);
        if (x < urls.length - 7) {
            window1.focus();
            window1.location = urls[x]
        } else {
            const searchTerm1 = props.terms[Math.floor(Math.random() * props.terms.length)]
            const searchTerm2 = props.terms[Math.floor(Math.random() * props.terms.length)]

            if (x === urls.length - 7) {
                window1.location = "https://www.google.ca/search?tbm=vid&q="+searchTerm1+"+"+searchTerm2;
            }
        
            if (x === urls.length - 6) {
                window1.location = "https://news.google.com/search?q="+searchTerm1+"+"+searchTerm2+"&hl=en-CA&lr&ie=UTF-8&oe=UTF-8&sa=N&scoring=d&gl=CA&ceid=CA:en";
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
    }

    
    setInterval(newPage, 240000)
     
    
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
        <title>news-feed</title>
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
                <Link href="/custom">News Feed</Link>
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
        
{/*         
        <div className="flex flex-col justify-center w-2/3 m-auto mt-10">
             {
                props.customArticles.articles.map((newsItem: any, index: any) => (
                    <div 
                        key={index}
                        className='mb-8 bg-white'
                    >
                        <div className="mb-2"><a href={newsItem.url} target='_blank' rel='noreferrer'><img src={newsItem.urlToImage} alt="" /></a></div>
                        <div className="px-4 mb-2 font-semibold"><a href={newsItem.url} target='_blank' rel='noreferrer'>{newsItem.title}</a></div>
                        <div className="px-4 mb-2 text-sm">{newsItem.description}</div>
                        <div className="px-4 mb-3 text-gray-500">{newsItem.source.name}</div>
                    </div>
                ))
            }
        </div> */}
        
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

    // console.log('choicesFetched:', choicesFetched)
    // console.log('choicesFetched[0].custom:', choicesFetched[0].custom)
        
    const customString = choicesFetched[0].custom

    const termsString = choicesFetched[0].random

    const terms = termsString.split(' ')
    //console.log('customString:', customString)
    
    // const customApiResponse = await fetch(
    //     `https://newsapi.org/v2/everything?q=${customString}`,
    //     {
    //         headers: {
    //             Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`
    //         }
    //     }
    // )

    // const customArticles = await customApiResponse.json()

    return {
        props: {
            customString,
            terms
            //customArticles
        }
    }
}

export default Custom
