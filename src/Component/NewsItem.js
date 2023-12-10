import React from 'react'


export default function NewsItem(props) {
  return (
    <div className='my-3 mx-3'>
        <div className="card" style={{height:"600px"}}>
          <div>
        <span className="badge rounded-pill bg-danger" style={{display:"flex",alignItems:"flex-end",position:"absolute",right:"0"}}>{props.source}</span></div>
  <img src={props.imageUrl==""?"https://www.hindustantimes.com/ht-img/img/2023/12/09/1600x900/rashmika_1702085909735_1702085909935.png":props.imageUrl} className="card-img-top" style={{height:"250px",width:"100%"}} alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text">{props.description.length>=50?props.description.substr(0,200)+"...":props.description+"..."}</p>
    <p className="card-text"><small className="text-muted">By {props.author} on {new Date(props.date).toGMTString()}</small></p>
    <a href={props.newsUrl} target="_blank" className="btn btn-sm btn-primary">Read more</a>
  </div>
</div>
      </div>
  )
}
