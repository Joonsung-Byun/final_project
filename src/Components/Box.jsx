import React from "react";
import {matchDate} from "../Pages/FavoriteMatches"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addFavoriteMatch } from "../../store.js"

function Box({ pastFixture,nextFixture  }) {
    console.log(pastFixture)
    console.log(nextFixture)
    let dispatch = useDispatch()
    let state = useSelector((state) => { return state } )
    return (
        <div id="box">
            <h4>Last match</h4>
            <section className="match_info">
                {
                    pastFixture != [] ? 
                    <>
                        <span id="time"><strong>Date:</strong>{` ${matchDate(pastFixture.fixture.date)}`}</span>
                        <span id="league"><strong>League:</strong>{` ${pastFixture.league.name}`}</span>

                        <div className="image_container">
                            <div className="home">
                                <img src={pastFixture.teams.home.logo} alt="home team logo"/>
                            </div>

                            <div id="live_score_board">
                                {pastFixture.goals.home} - {pastFixture.goals.away}
                            </div>

                            <div className="away">
                            <img src={pastFixture.teams.away.logo} alt="away team logo"/>
                            </div>
                        </div>

                        <div className="name_container">
                            <div>
                                <p>{pastFixture.teams.home.name}</p>
                            </div>
                            <div>
                                <p>vs</p>
                            </div>
                            <div>
                                <p>{pastFixture.teams.away.name}</p>
                            </div>    
                        </div>

                        <button onClick={()=>{
                            let new_matches = [...state.favoriteMatches];
                            new_matches.push(pastFixture.fixture.id);
                            dispatch(addFavoriteMatch(pastFixture.fixture.id));
                        }}>Mark as Favorite ⭐ </button>
                    </> : 
                    <p>No past match</p>
                }
            </section>

            <h4>Next match</h4>
            <section className="match_info">
               {
                    nextFixture != [] ? 
                    <>
                        <span id="time"><strong>Date:</strong>{` ${matchDate(nextFixture[0].fixture.date)}`}</span>
                        <span id="league"><strong>League:</strong>{` ${nextFixture[0].league.name}`}</span>

                        <div className="image_container">
                            <div className="home">
                                <img src={nextFixture[0].teams.home.logo} alt="home team logo"/>
                            </div>

                            <span></span>

                            <div className="away">
                            <img src={nextFixture[0].teams.away.logo} alt="away team logo"/>
                            </div>
                        </div>

                        <div className="name_container">
                            <div>
                                <p>{nextFixture[0].teams.home.name}</p>
                            </div>
                            <div>
                                <p>vs</p>
                            </div>
                            <div>
                                <p>{nextFixture[0].teams.away.name}</p>
                            </div>    
                        </div>
                    
                        <button onClick={()=>{
                            let new_matches = [...state.favoriteMatches];
                            new_matches.push(nextFixture[0].fixture.id);
                            dispatch(addFavoriteMatch(nextFixture[0].fixture.id));
                        }}>Mark as Favorite ⭐ </button>
                    </>
                    : <p>No next match</p>
               }
            </section>
        </div>
    );
    }
    export default Box;