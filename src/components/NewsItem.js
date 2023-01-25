import React from 'react'

const NewsItem =(props)=> {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className='my-3'>
        <div className="card" >
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
            <span className="badge rounded-pill bg-danger" >
              {source}
            </span>
          </div>
          <img src={imageUrl ? imageUrl : "https://images.hindustantimes.com/tech/img/2023/01/03/1600x900/TOPSHOT-SKOREA-SPACE-MOON-0_1672768347953_1672768347953_1672768377156_1672768377156.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">

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

export default NewsItem