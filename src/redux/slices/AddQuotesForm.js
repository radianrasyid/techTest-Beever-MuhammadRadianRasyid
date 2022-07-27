import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { quotesAdd, addFav, getData } from "./quotesSlice";
import "bootstrap/dist/css/bootstrap.min.css"

const AddQuotesForm = () => {
    const dispatch = useDispatch();
    const [quotes, setQuotes] = useState("")

    const quotesOnChange = (e) => {
        setQuotes(e.target.value)
        console.log(quotes)
    };
    const onSave = (e) => {
        e.preventDefault()
        if(quotes !== ""){
            dispatch(
                quotesAdd({
                    quote: quotes
                })
            )

            setQuotes("")
        }
    }

  return (
    <div className="container mb-5">
        <form>
            <label htmlFor="quotes">Your Quotes</label>
            <input
            type="text"
            id="quotes"
            name="quotes"
            value={quotes}
            onChange={quotesOnChange}
            />

        
        <button 
        type="button"
        className="btn btn-success"
        style={{ 
            marginLeft: "1rem",
            borderRadius: "8px"
         }}
        onClick={onSave}>Add Quotes</button>
        </form>
    </div>
  )
}

export default AddQuotesForm