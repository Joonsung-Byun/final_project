import { useEffect, useState } from "react";
import axios from 'axios';
import React from "react";
import block from "../img/block.svg"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addFavoriteMatch } from "../../store.js"
import { matchDate } from "./FavoriteMatches.jsx";
import ApiOptions from "./Options/Options.jsx";
import "./comingMatches.scss"


export default function Coming_Matches(){

    let [coming_matches, setComing_Matches] = useState([])
    let dispatch = useDispatch()
    let state = useSelector((state) => { return state } )

    let [matches_num, setMatches_num] = useState(5);
    let [limit_num, setLimit_num] = useState(0);
    let [no_more_matches, set_no_more_matches] = useState( '' );
    

    useEffect(() => {
      const options = ApiOptions({ next: 50 });
      
      const fetchData = async () => {
        try {
          const response = await axios.request(options);
          // setComing_Matches([...response.data.response]);
          let upcoming_20_matches = response.data.response.slice(0, 20);
          upcoming_20_matches = upcoming_20_matches.map(match => ({ ...match, favorite: false, notInterested: false}));

          setComing_Matches([...upcoming_20_matches]);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [])

    useEffect(() => {
      console.log(coming_matches);
    }, [coming_matches]
    )

    return (
      <div className="upcoming_container">
        <h2>Upcoming Matches</h2>
        {coming_matches.length > 0 ? (
          coming_matches.slice(0,parseInt(`${matches_num}`)).map((match, index) => (
            <section key={index} className="coming_match">
              <div id="time_block">
                <p className="match_day">Time: {matchDate(match.fixture.date) }</p>
                <img src={block } className="block" onClick={()=> {
                  let new_matches = [...coming_matches]
                  new_matches[index].notInterested = !new_matches[index].notInterested;
                  new_matches.splice(index, 1);
                  setComing_Matches(new_matches);
                }}/>
              </div>
              <p><span className="text_bold">League:</span> {match.league.name}</p>   
              <div className="img_container">
                <img src={match.teams.home.logo}/>
                <div className="vs"></div>
                <img src={match.teams.away.logo} />
              </div>

              <p className="team_container">
                <span>{match.teams.home.name }</span> 
                <div>vs</div>
                <span>{ match.teams.away.name}</span>
              </p>
              <button onClick={()=>{
                let new_matches = [...coming_matches];
                new_matches[index].favorite = !new_matches[index].favorite;
                setComing_Matches(new_matches);
                dispatch(addFavoriteMatch(coming_matches[index].fixture.id))
              }}>Mark as Favorite ⭐ </button>          

            </section>
          ))
        ) : (
          <p>Loading matches...</p>
        )}

        <button id="see_more_btn" onClick={()=>{
          if(limit_num <= 2){
            setLimit_num(limit_num + 1);
            setMatches_num(matches_num + 5);
          } else {
            set_no_more_matches('No more matches to show...');
          }
    
        }}>See more</button>

        <p>{no_more_matches}</p>
      </div>
    );
}

