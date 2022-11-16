import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {client} from '../lib/client'
import { BsGithub } from 'react-icons/bs';


const Home = ({...props}) => {

    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            //console.log('window.pageYOffset:', window.pageYOffset)
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
        <title>NewsAPI Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center bg-gray-200">
            <button 
                className="absolute pt-1 pb-1 pl-3 pr-3 text-sm font-bold text-white bg-teal-700 
                    rounded left-4 top-4 border-2 border-teal-700"
            >
                <Link href="/">NewsAPI Search</Link>
            </button>
            <button 
                className="absolute pt-1 pb-1 pl-3 pr-3 text-sm font-bold text-teal-700 rounded 
                    right-4 top-4 border-2 border-teal-700 hover:bg-teal-700 hover:text-white"
            >
                <Link href="/info-feed">Info Feed</Link>
            </button>
          <div>
            <div className='flex w-full mt-20'>
                <div className='flex flex-wrap w-[1000px] bg-white px-3 py-2'>
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
            </div>
                <div className='flex items-center justify-center mt-10'>
                    <div className='p-2 mr-10 bg-white'>This search:</div>
                    <div className='p-2 mr-10 bg-white'>
                        {props.query}{props.inputted}
                    </div>
                    <button
                        type="button" 
                        className='pt-1 pb-1 pl-3 pr-3 text-sm font-bold text-white bg-teal-700 rounded'
                    >
                        <a  href='https://news-feed.sanity.studio/desk' target="_blank">
                            Edit Terms
                        </a>
                    </button>
                </div>
        </div>
        
        <div className="flex flex-col justify-center w-2/3 m-auto mt-10">
             {
                props.articles.articles.map((newsItem: any, index: any) => (
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

        <a href="https://github.com/jergra/info-feed-react-sanity" target="_blank">
            <div className="mt-10 mb-7 text-4xl text-teal-700"><BsGithub /></div>
        </a>
        
      </div>
    </>
  )
}

export const getServerSideProps = async () => {

    const choicesFromSanity = '*[_type == "choices"]'
    const choicesFetched = await client.fetch(choicesFromSanity)

    const termsString = choicesFetched[0].random

    const terms = termsString.split(' ')
    
    let oneOrTwo = Math.floor(Math.random() * 2 + 1)
    
    if (oneOrTwo === 1) {
        let randomPosition = Math.floor(Math.random() * terms.length)
        var selected = terms[randomPosition]
    }
    if (oneOrTwo === 2) {
        var randomPosition1 = Math.floor(Math.random() * terms.length)
        var randomPosition2 = Math.floor(Math.random() * terms.length)
        selected = terms[randomPosition1] + ' ' + terms[randomPosition2]
    }

    const query = selected

    const apiResponse = await fetch(
        `https://newsapi.org/v2/everything?q=${query}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`
            }
        }
    )

    const articles = await apiResponse.json()
    
    return {
        props: {
            articles,
            terms, 
            query
        }
    }
}

export default Home
