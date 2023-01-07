import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=757569d7200842ae90140de2ef6671ac&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        await fetch(url).then((res) => res.json())
            .then((json) => {
                this.setState({
                    articles: json.articles,
                    totalArticles: json.totalResults,
                    loading: false
                });
            })
        // let parsedData = await data.json;
        // console.log(parsedData)
        // this.setState({articles: parsedData.articles})
    }

    handlePrevClick = async () => {
        console.log("pre")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=757569d7200842ae90140de2ef6671ac&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        await fetch(url).then((res) => res.json())
            .then((json) => {
                this.setState({
                    page: this.state.page - 1,
                    articles: json.articles,
                    loading: false
                });
            })
    }

    handleNextClick = async () => {
        console.log("next")
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 15))) {       

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=757569d7200842ae90140de2ef6671ac&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            this.setState({loading:true})
            await fetch(url).then((res) => res.json())
                .then((json) => {
                    this.setState({
                        page: this.state.page + 1,
                        articles: json.articles,
                        loading: false
                    }); 
                })
        }


    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center" style={{margin: '40px 0px'}}>
                NewsBuddy - News Headlines for you
                </h1>
                {this.state.loading && <Spinner/>}

                <div className="row">
                    {!this.state.loading  && this.state.articles && this.state.articles.map((element) => {
                        // {this.state.articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>

                    })}

                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>

                </div>

            </div>
        )
    }
}

export default News