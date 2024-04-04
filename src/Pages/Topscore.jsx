import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from 'react-bootstrap/Nav';

export default function Topscore() {
  const [key, setKey] = useState("home");
  // 39는 이피엘, //78은 분데스리가, 135는 세리에 A, //챔피언스리그는 2// 라리가는 140
  let [league, setLeague] = useState(39);
  let [topscorers, setTopscorers] = useState([]);
  let [scorers_num, setScorers_num] = useState(10);
  let [btn_click_num, setBtn_click_num] = useState(0);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/players/topscorers",
      params: {
        league: league,
        season: "2023",
      },
      headers: {
        "X-RapidAPI-Key": "67142be9e1msha21067b17d884d6p1f558ejsn8dc79fea8402",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };
   
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        setTopscorers([...response.data.response]);
        // console.log(topscorers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [league]);

  useEffect(() => {
    console.log(topscorers);
  }, [topscorers]);


return (
  <div className="topscore_container">
    <div className="goals_flex">
            <h2>Top Scorers</h2>
        </div>
    <Nav variant="tabs" defaultActiveKey="link-0">
      <Nav.Item>
        <Nav.Link eventKey="link-0" className="league_names" onClick={()=>{
            setScorers_num(10);
            setBtn_click_num(0);
         setLeague(39);
        }}>EPL</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" className="league_names" onClick={()=>{
            setScorers_num(10);
            setBtn_click_num(0);
            setLeague(2);
        }}>UEFA</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" className="league_names" onClick={()=>{
            setScorers_num(10);
            setBtn_click_num(0);
            setLeague(78);
        }}>Bundesliga</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link eventKey="link-3" className="league_names" onClick={()=>{
            setScorers_num(10);
            setBtn_click_num(0);
            setLeague(140);
        }}>La Liga</Nav.Link>
      </Nav.Item>
    </Nav>

    <div className="topscore_content">
        <div className="goals_flex">
            <h2>{
              league == 39 ? "EPL" : league == 2 ? "UEFA" : league == 78 ? "Bundesliga" : "La Liga"
              }</h2>
        </div>
        
        <div className="topscorers_container">
            { topscorers.length > 0 ?
                    
                        topscorers.slice(0, parseInt(`${scorers_num}`)).map( (a, i) => {
                            return (
                                <div key={i} className="scorer_table">
                                    <div className="left">
                                        <span>{i + 1}.</span>
                                        <img src={a.player.photo} />
                                        <span>{a.player.name}</span>
                                    </div>
                                    <span>{a.statistics[0].goals.total}</span>
                                </div>
                            )
                        } )
                    
                    : null
            }
        </div>
    </div>

    {
        btn_click_num == 3 ? <p>No more scorers to show...</p> :
        <button id="top_see_more_btn" onClick={()=>{
            setBtn_click_num(btn_click_num + 1);
            setScorers_num(scorers_num + 5);
        }}>See more</button>
        
    }
    
    
  </div>
  
);
}


