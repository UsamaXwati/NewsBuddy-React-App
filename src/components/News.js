import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews= async()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`        
        setloading(true)
        await fetch(url).then((res) => res.json())
            .then((json) => {
                setarticles(json.articles)
                settotalResults(json.totalResults)
                setloading(false)
                
                props.setProgress(70);
            })
            props.setProgress(100);
    }
    
    useEffect(() => {

        updateNews()    
      
    }, [])
    

    const handlePrevClick = async () => {
        setpage(page-1)
        updateNews()
    }

    const handleNextClick = async () => {        
        setpage(page+1)
        updateNews()
    }
    const fetchMoreData = async () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=757569d7200842ae90140de2ef6671ac&page=${page+1}&pageSize=${props.pageSize}`        
        setpage(page+1)
        await fetch(url).then((res) => res.json())
            .then((json) => {
                setarticles(articles.concat(json.articles))
                settotalResults(json.totalResults)
                setloading(false)
            })

    }
        return (
            <>
                <h1 className="text-center" style={{ margin: '40px 0px', marginTop: '90px' }}>
                    NewsBuddy - Top {capitalizeFirstLetter(props.category)} Headlines
                </h1>
                {/* {this.state.loading && <Spinner/>} */}

                <InfiniteScroll 
                    style={{overflow:'hidden'}}
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                        <div className="row">
                            {articles && articles.map((element, index) => {
                                // {this.state.articles.map((element)=>{
                                return <div className="col-md-4" key={index}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </>
        )
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News