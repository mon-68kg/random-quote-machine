import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FaHeart } from "react-icons/fa6";
import { RiDoubleQuotesR } from "react-icons/ri";

let colors = [
    '#16a085', 
    '#27ae60', 
    '#2c3e50', 
    '#f39c12', 
    '#e74c3c', 
    '#9b59b6', 
    '#FB6964', 
    '#342224', 
    "#472E32", 
    "#BDBB99", 
    "#77B1A9", 
    "#73A857"
  ];
let url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function randomize(par) {
    let num = Math.floor(Math.random() * (par.length + 1));
    return par[num];
}

function Display() {
    const [bgColor, setBgColor] = useState(randomize(colors));
    const [quotesArray, setQuotesArray] = useState(null);
    const [quoteObj, setQuoteObj] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(res => {return res.json();})
            .then(data => {
                setQuotesArray(data.quotes);
                quoteObj ? setQuoteObj(randomize(quotesArray)) : null;
            })
    }, []);

    return (
        <div id="main" className="d-flex flex-column justify-content-center align-items-center" style={{backgroundColor: bgColor, transition: "background-color 2s"}}>
            <div className="container-md bg-white p-5 w-50 d-flex flex-column justify-content-center align-items-center rounded-2">
                <div className="d-flex justify-content-center h-75 m-5">
                    { quoteObj ? <span><span id="quote"><RiDoubleQuotesR /> {quoteObj.quote}</span><br></br><br></br><span id="author" >-{quoteObj.author}</span></span> : 'Click "New quote"!'}
                </div>
                <div className="d-flex  w-100">
                    <div className="w-50">
                        <Button className="p-3 rounded-2 text-white border-0 btns" size="lg" style={{backgroundColor: bgColor, transition: "background-color 2s"}}><FaHeart /></Button>
                    </div>
                    <div className="d-flex justify-content-end w-50">
                        <Button className="p-3 rounded-2 text-white border-0 btns" size="lg" style={{backgroundColor: bgColor, transition: "background-color 2s"}} onClick={() => {setBgColor(randomize(colors)); setQuoteObj(randomize(quotesArray));}}>New quoute</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Display;