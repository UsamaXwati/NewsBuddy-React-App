import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsBuddy`;
    }

    async updateNews(pageNo) {
        this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=757569d7200842ae90140de2ef6671ac&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        await fetch(url).then((res) => res.json())
            .then((json) => {
                this.setState({
                    articles: json.articles,
                    totalArticles: json.totalResults,
                    loading: false
                });
            })
            this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews()
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews()
    }
    fetchMoreData = async () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs

        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=757569d7200842ae90140de2ef6671ac&page=${this.state.page+1}&pageSize=${this.props.pageSize}`        
        await fetch(url).then((res) => res.json())
            .then((json) => {
                this.setState({
                    articles: this.state.articles.concat(json.articles),
                    totalArticles: json.totalResults,
                    loading: false,
                });
            })

    }
    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '40px 0px' }}>
                    NewsBuddy - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
                </h1>
                {/* {this.state.loading && <Spinner/>} */}

                <InfiniteScroll 
                    style={{overflow:'hidden'}}
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalArticles}
                    loader={<Spinner/>}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles && this.state.articles.map((element, index) => {
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
}

export default News