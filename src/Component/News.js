import React, { useEffect } from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import Load from './Load';
import { useNavigate } from 'react-router-dom';


export default function News(props) {
  const navigate=useNavigate();
  const [Articles, setArticles] = useState([]);
  const [Total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
      let updateNews=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=9141346c6bf74e6f8f05d98659ae4fbc&page=${page}&pageSize=${props.pageSize}`;
        let data= await fetch(url);
        let parsedata=await data.json();
        setArticles(parsedata.articles);
        setTotal(parsedata.totalResults);
        setLoading(false);
      }

      let fetchMoreData=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9141346c6bf74e6f8f05d98659ae4fbc&page=${page+1}&pageSize=${props.pageSize}`;
        let data= await fetch(url);
        let parsedata=await data.json();
        setArticles(Articles.concat(parsedata.articles))
        setPage(page+1)
      }

      useEffect(() => {
          if(!localStorage.getItem("auth-token")){
            navigate("/signup");
          }
          updateNews();
      }, []);
    
  return (
    <>
    <h1 className='text-center' style={{margin:"35px 0px"}}>NewsMonkey-Top Headlines</h1>\
    {loading && <Load/>}
    {!loading && <InfiniteScroll dataLength={Articles.length} next={fetchMoreData} hasMore={Articles.length!==Total} loader={<Load/>}>
     <div className='container'>
        <div className='row'>
          {Articles.map((element)=>{
          return <div className='col-md-4' key={element.url}>
          <NewsItem title={element.title?element.title:""} source={element.source.name} date={element.publishedAt?element.publishedAt:""} author={element.author?element.author:"Unknown"} description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"} newsUrl={element.url}/>
        </div>
          })}
        </div>
        </div> </InfiniteScroll>}
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: "6",
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.string,
  category: PropTypes.string,}
