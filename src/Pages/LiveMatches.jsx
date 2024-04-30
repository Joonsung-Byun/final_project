import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFavoriteMatch } from "../../store.js"
import { useSelector } from "react-redux"
import block from "../img/block.svg"
import "./liveMatches.scss";
import ApiOptions from "./Options/Options.jsx";


export default function LiveMatches() {
  let [live_matches, setLive_matches] = useState([]);
  let dispatch = useDispatch()
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);
  let state = useSelector((state) => { return state } )
  
  useEffect(() => {
    const options = ApiOptions({ live: true });

    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        let new_live_matches = [...response.data.response].map(match => ({ ...match, favorite: false }));
        setLive_matches([...new_live_matches]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  useEffect(()=>{
    if (loading) {
      document.getElementById("loadingMatches").innerText = "Loading...";
    } else {
       document.getElementById("loadingMatches").innerText = "";
    }
  }, [loading])
  

  return (
    <div className="live_matches">
      <h2>Live Matches</h2>
      <p id="loadingMatches"></p>
      {
        live_matches.map((match, i) => {
          return (
            <section key={i} className="live_matches_container">

              <div className="flex">
                <div className="flex-left">
                  <p><strong>Status:</strong> {match.fixture.status.long}</p>
                  <p>
                    <span className="text_bold">League:</span> {match.league.name}
                  </p>
                </div>
                <div className="flex-right">
                <img src={block} title="not interested in this game!" className="block" onClick={()=>{
                  let new_live_matches = [...live_matches];
                  new_live_matches.splice(i, 1);
                  setLive_matches(new_live_matches);
                }}></img>
                </div>
                
              </div>


              <div className="img_container">
                <img src={match.teams.home.logo} />
                <div id="live_score_board">
                  {match.goals.home} - {match.goals.away}
                </div>
                <img src={match.teams.away.logo} />
              </div>

              <p className="team_container">
                <span className="team_name">{match.teams.home.name}</span>
                <span id="vs">vs</span>
                <span className="team_name"> {match.teams.away.name}</span>
              </p>

              <div className="score_history">
                <div id="home_score_history">
                    {match.events.map((event, i) => {
                      if(event.type === "Goal" && event.team.name === match.teams.home.name){
                        if(event.player.name !== null) {
                          return <p key={i}>{event.player.name} {event.time.elapsed}'</p>
                        }else {
                          return <p>No name {event.time.elapsed}'</p>
                        }

                      }
                    })}
                </div>

                <div id="away_score_history">
                {match.events.map((event, i) => {
                      if(event.type === "Goal" && event.team.name === match.teams.away.name){
                        if(event.player.name !== null) {
                          return <p key={i}>{event.player.name} {event.time.elapsed}'</p>
                        } else {
                          return <p>No name {event.time.elapsed}'</p>
                        }
                      }
                    })}
                    
                </div>
              </div>

              <button onClick={()=>{
                let new_live_matches = [...live_matches];
                new_live_matches[i].favorite = !new_live_matches[i].favorite;
                setLive_matches(new_live_matches);
                dispatch(addFavoriteMatch(live_matches[i].fixture.id))
              }}>Mark as Favorite ⭐</button>
            </section>
          );
        })
     }
    </div>
  );
}
