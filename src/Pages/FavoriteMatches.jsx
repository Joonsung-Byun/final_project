import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from "react-redux"
// import { useDispatch } from "react-redux"
import block from "../img/block.svg"

export const matchDate = (match_date) => {
    const dateString = match_date;
    const date = new Date(dateString);
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    const hour = date.getHours();

    return `${month}/ ${day}/ 0${hour}:00`;
  }
export default function FavoriteMatches() {
        let state = useSelector((state) => { return state } )
        let favorite_array = state.favoriteMatches
        let [favoriteMatches, setFavoriteMatches] = useState([])

        function transformArrayToString(array) {
            return array.join('-');
        }

useEffect(() => {
const options = {
  method: 'GET',
  url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
  params: {
    ids: transformArrayToString(favorite_array)
  },
  headers: {
    'X-RapidAPI-Key': '67142be9e1msha21067b17d884d6p1f558ejsn8dc79fea8402',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
};

    const fetchData = async () => {
        try{
        const response = await axios.request(options);
        console.log(response.data);
        setFavoriteMatches([...response.data.response]);
    }
    catch (error) {
    console.error(error);
}

};
fetchData();
}, []);

useEffect(() => {
    console.log(favoriteMatches);
}, [favoriteMatches]);



    
    return (
        
        <div className="favorite_matches">
            <h2>Favorite Matches</h2>
            {favoriteMatches.length > 0 ? (
                favoriteMatches.map((match, i) => {
                    return (
                        <section key={i} className="favorite_matches_container">
                            <p className='date'>
                                <span>{`Time: ${matchDate(match.fixture.date)}`}</span>
                                {/* <img src={block} id='block'/>   */}
                            </p>
                            <p className='status'><strong>Status:</strong> {match.fixture.status.long}</p>
                            <p>
                                <span className="text_bold"><strong>League:</strong></span> {match.league.name}
                            </p>


                            <div className="img_container">
                                <img src={match.teams.home.logo} />
                                <div id="live_score_board">
                                    {match.goals.home} - {match.goals.away}
                                </div>
                                <img src={match.teams.away.logo} />
                            </div>

                            <div className='match_teams'>
                                <p>{match.teams.home.name}</p>
                                <span>vs</span>
                                <p>{match.teams.away.name}</p>
                            </div>
                        </section>
                    )
                })
            ) : (
                <p>No favorite matches</p>
            )}
            </div>
    )
}