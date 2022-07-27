import { useSelector, useDispatch } from "react-redux";
import { addFav, getData } from "./quotesSlice";
import { selectAllQuotes, getQuotesError, getQuotesStatus, fetchQuotes } from "./quotesSlice";
import React, { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import KanyePhoto from "../../assets/KanyePhoto.jpeg"


const QuotesList = () => {
    const dispatch = useDispatch();
    const quotes = useSelector(selectAllQuotes)
    const quotesStatus = useSelector(getQuotesStatus);
    const error = useSelector(getQuotesError)

    useEffect(()=>{
        if(quotesStatus === "idle"){
            dispatch(fetchQuotes())
            console.log(quotes)
        }
    }, [quotesStatus, dispatch])

    console.log(quotes)

  if(quotes.quotes.quotes.length !== 0){
    return (
        <>

            <section className="container" style={{ 
                marginTop: "2rem"
             }}>
                <div className="container">
                    <img src={KanyePhoto} style={{
                        height: "7rem"
                    }}/>
                    <h2>Kanye's Quotes</h2>
                    <div className="container" style={{ 
                        backgroundColor: "grey",
                        borderRadius: "8px",
                        padding: "1rem 1rem"
                     }}>
                    <h6><b>{quotes.quotes.quotes[0].quote}</b></h6>
                    </div>
                    <div className="container mt-1">
                    <button type="button" className="btn btn-success" onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                            addFav()
                        )
                    }}>Add to Fav</button>
                    <button type="button" className="btn btn-success" onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                            getData()
                        )
                    }}>Get quotes</button>
                    </div>
                </div>

                <div className="container mt-5 mb-5">
                    <h2>FAVORITE QUOTES</h2>
                    <div className="containter" style={{ 
                        borderRadius: "8px",
                        padding: "1rem 1rem"
                     }}>
                        {quotes.quotes.fav.map((item)=>{
                        return(
                            <h6 style={{ 
                                display: "block",
                                fontSize: "14px"
                             }}>{item.fav}</h6>
                        )
                    })}</div>
                </div>

                <div className="container">
                    <h2>My Own Quotes</h2>
                    <div style={{ 
                        borderRadius: "8px",
                        padding: "1rem 1rem"
                     }}>
                        {quotes.quotes.owned.map((item)=>{
                        return(
                            <h6 style={{ 
                                display: "block",
                                fontSize: "14px"
                             }}>{item.quote}</h6>
                        )
                    })}</div>
                </div>
            </section>
        </>
      )
  }
}

export default QuotesList