import React, { Component } from 'react'
import NewsItem from './NewsItem'

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
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=757569d7200842ae90140de2ef6671ac&page=1&pageSize=20"
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
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=757569d7200842ae90140de2ef6671ac&page=${this.state.page - 1}&pageSize=20`
        await fetch(url).then((res) => res.json())
            .then((json) => {
                this.setState({
                    page: this.state.page - 1,
                    articles: json.articles,
                });
            })
    }

    handleNextClick = async () => {
        console.log("next")
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        }
        else {

            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=757569d7200842ae90140de2ef6671ac&page=${this.state.page + 1}&pageSize=20`
            await fetch(url).then((res) => res.json())
                .then((json) => {
                    this.setState({
                        page: this.state.page + 1,
                        articles: json.articles,
                    });
                })
        }


    }

    render() {
        return (
            <div className='container my-3'>
                <h1>NewsBuddy - News Headlines for you</h1>
                <div className="row">
                    {this.state.articles && this.state.articles.map((element) => {
                        // {this.state.articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>

                    })}

                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>

                </div>

            </div>
        )
    }
}

export default News