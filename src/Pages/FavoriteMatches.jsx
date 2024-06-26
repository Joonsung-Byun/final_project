import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFavoriteMatch } from "../../store";
import block from "../img/block.svg";
import "./favoriteMatches.scss";
import ApiOptions from "./Options/Options";

export const matchDate = (match_date) => {
  const dateString = match_date;
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();

  return `${month}/ ${day}/ ${hour}:00`;
};


export default function FavoriteMatches() {
  let state = useSelector((state) => {
    return state;
  });

  let favorite_array = state.favoriteMatches;
  let [favoriteMatches, setFavoriteMatches] = useState([]);

  let [loading, setLoading] = useState(true);



  function transformArrayToString(array) {
    return array.join("-");
  }

  useEffect(() => {
    const options = {
      ...ApiOptions({ favorite: true }), 
      params: { ids: transformArrayToString(favorite_array) } 
    };
    
    
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setFavoriteMatches([...response.data.response]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  let [loadingMsg, setloadingMsg] = useState("Loading...");

  useEffect(()=>{
    if (loading) {
      setloadingMsg("Loading...")
    } 
    else if (!loading && favoriteMatches.length === 0) {
      setloadingMsg("No favorite matches yet")
    }
    else if (!loading && favoriteMatches.length > 0){
      setloadingMsg("")
    }
  }, [loading])



  let dispatch = useDispatch();
  return (
    <div className="favorite_matches">
      <h2>Favorite Matches</h2>
      <p> {loadingMsg} </p>
      {favoriteMatches.length > 0 ? (
        favoriteMatches.map((match, i) => {
          return (
            <section key={i} className="favorite_matches_container">
              <p className="date">
                <span>{`Time: ${matchDate(match.fixture.date)}`}</span>
                <img
                  src={block}
                  onClick={() => {
                    dispatch(removeFavoriteMatch(match.fixture.id))
                    let copy = [...favoriteMatches];
                    copy.splice(i, 1);
                    setFavoriteMatches(copy);
                  }}
                  id="block"
                />
              </p>
              <p className="status">
                <strong>Status:</strong> {match.fixture.status.long}
              </p>
              <p>
                <span className="text_bold">
                  <strong>League:</strong>
                </span>{" "}
                {match.league.name}
              </p>

              <div className="img_container">
                <img src={match.teams.home.logo} />
                <div id="live_score_board">
                  {match.goals.home} - {match.goals.away}
                </div>
                <img src={match.teams.away.logo} />
              </div>

              <div className="match_teams">
                <p>{match.teams.home.name}</p>
                <span>vs</span>
                <p>{match.teams.away.name}</p>
              </div>
            </section>
          );
        })
      ) : (
       <></>
      )}
    </div>
  );
}
