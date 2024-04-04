import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Box from "../Components/Box";

function ByTeams() {
  let [value, setValue] = useState("");
  let [teams, setTeams] = useState([]);
  let [pastFixture, setPastFixture] = useState([]);
  let [nextFixture, setNextFixture] = useState([]);
  
  async function fetchData(team_name) {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/teams",
      params: {
        search: team_name,
      },
      headers: {
        "X-RapidAPI-Key": "67142be9e1msha21067b17d884d6p1f558ejsn8dc79fea8402",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      console.log(response.data.response);
      setTeams([...response.data.response]);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchFixtureById(fixtureID) {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: {
          season: '2023',
          team: fixtureID,
        },
        headers: {
          'X-RapidAPI-Key': '67142be9e1msha21067b17d884d6p1f558ejsn8dc79fea8402',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      };
      try {
        
          const response = await axios.request(options);
          console.log(response.data.response);
          response.data.response.sort((a,b)=>new Date(a.fixture.date).getTime()-new Date(b.fixture.date).getTime());
          let today = new Date();
          let past = [];
          let next = [];

          response.data.response.forEach((fixture)=>{
              if(new Date(fixture.fixture.date).getTime()<today.getTime()){
                  past.push(fixture);
              }else{
                  next.push(fixture);
              }
          });
          const lastFixture = past.pop();
          const nextFixture = next.slice(0,1);
          setPastFixture(lastFixture);
          setNextFixture(nextFixture);
      } catch (error) {
          console.error(error);
      }
  }

  useEffect(() => {
    console.log(pastFixture);
    console.log(nextFixture);
  }, [pastFixture,nextFixture]);


  return (
    <>
      <div id="byteams_container">
        Search you team!
        <form>
          <input
            type="text"
            id="searchbar"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log('clicked');
              fetchData(value);
              setValue("");
            }}
          >
            Search
          </button>
        </form>
      </div>

      <div id="team_info">
        {teams.map((team, index) => {
          return (
            <div key={index} className="team_card">
              <a href="#" onClick={(e)=>{
                    e.preventDefault();
                    fetchFixtureById(team.team.id);
              }}>{team.team.name}</a>
            </div>
          );
        })}
      </div>
        


      <div id="team_matches">
           <Box pastFixture={pastFixture} nextFixture={nextFixture} />
        </div>
    </>
  );
}

export default ByTeams;
