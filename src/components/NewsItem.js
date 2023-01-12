import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className='my-3'>      
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageUrl ? imageUrl : "https://images.hindustantimes.com/tech/img/2023/01/03/1600x900/TOPSHOT-SKOREA-SPACE-MOON-0_1672768347953_1672768347953_1672768377156_1672768377156.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}>
              {source}
            </span>
            <h5 className="card-title">{title}
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem