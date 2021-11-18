import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, Redirect, useHistory } from "react-router-dom";

export default function DataApi({ symbol }) {
  const [data, setData] = useState();
  const [ticker, setTicker] = useState();

//   useEffect(() => {
//     const fetchData = async (ticker) => {
//       const res = await fetch(
//         `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker.toUpperCase()}&apikey=KG1DSU6ADWQ53PPV`
//       );
//       if (res.statusCode === 200) {
//         console.log("\n FETCH CLICKED", res);
//         return res["Global Quote"];
//       } else {
//         return <h1>something went wrong with the data</h1>;
//       }
//     };
//   }, [symbol]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker.toUpperCase()}&apikey=KG1DSU6ADWQ53PPV`
        );
    console.log("\n form submit", res.body);
    // if (res.statusCode === 200) {
    //   return res["Global Quote"];
    // } else {
    //   return <h1>something went wrong with the data</h1>;
    // }

    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker.toUpperCase()}&apikey=KG1DSU6ADWQ53PPV`).then(response => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        reader.read().then(function process(result) {
          if (result.done) return;
          const dataObj = decoder.decode(result.value, {stream: true});
          setData(dataObj)
          console.log(dataObj);
          return reader.read().then(process);
        }).then(() => {
          console.log('All done!');
        });
      });

  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <label>Symbol</label>
        <input onChange={e => setTicker(e.target.value)}/>
        <button type="submit">get price</button>
      </form>
      <h2>{data["Global Quote"]}</h2> */}
    </div>
  );
}
