import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Box from "../Components/Box";


function ByTeams() {
  let [value, setValue] = useState("");
  let [teams, setTeams] = useState([]);
  let [pastFixture, setPastFixture] = useState([]);
  let [nextFixture, setNextFixture] = useState([]);
  let [display, setDisplay] = useState(false);
  let [loadingMsg, setLoadingMsg] = useState(["Loading...", "Choose a team", ""]);
  let [num, setNum] = useState(2);
  

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

      if (response.data.response.length > 5) {
        setTeams([...response.data.response.slice(0, 5)]);
      } else {
        setTeams([...response.data.response]);
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(pastFixture);
    console.log(nextFixture);
  });

  return (
    <>
      <div id="byteams_container">
        <h2>Search your team!</h2>
        <form>
          <input
          placeholder="Search for a team"
            type="text"
            id="searchbar"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
  onClick={(e) => {
    setNum(0);
    let copyPastFixture = [];
    let copyNextFixture = [];
    setPastFixture(copyPastFixture);
    setNextFixture(copyNextFixture);
    e.preventDefault();
    let copyTeams = []; 
    setTeams(copyTeams);
    console.log("clicked");
    setValue("");
    setDisplay(true);

    const searchPromise = new Promise((resolve, reject) => {
      fetchData(value).then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
    
    searchPromise.then(() => {
      let newNum = 1;
      setNum(newNum);
    }).catch((error) => {
      console.error(error);
    });
  }}
>
  Search
</button>
        </form>

      {
        display ? <div id="team_info">
        {teams.map((team, index) => {
          return (
            <div key={index} className="team_card">
              <a
                href="#"
                onClick={(e) => {
                  let newNum = 0;
                  setNum(newNum);
                  e.preventDefault();
                  async function fetchFixtureById(fixtureID) {
                    const options = {
                      method: "GET",
                      url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
                      params: {
                        season: "2023",
                        team: fixtureID,
                      },
                      headers: {
                        "X-RapidAPI-Key":
                          "67142be9e1msha21067b17d884d6p1f558ejsn8dc79fea8402",
                        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
                      },
                    };
                    return await axios.request(options);
                  }

                  fetchFixtureById(team.team.id)
                    .then((response) => {
                      response.data.response.sort(
                        (a, b) =>
                          new Date(a.fixture.date).getTime() -
                          new Date(b.fixture.date).getTime()
                      );
                      let today = new Date();
                      let past = [];
                      let next = [];

                      response.data.response.forEach((fixture) => {
                        if (
                          new Date(fixture.fixture.date).getTime() <
                          today.getTime()
                        ) {
                          past.push(fixture);
                        } else {
                          next.push(fixture);
                        }
                      });
                      const lastFixture = past.pop();
                      const nextFixture = next.slice(0, 1);
                      setPastFixture(lastFixture);
                      setNextFixture(nextFixture);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                    setDisplay(false);
                }}
              >
                {team.team.name}
              </a>
            </div>
          );
        })}
      </div> : null
      }

      
      {pastFixture != [] && nextFixture.length != [] ? (
        <Box pastFixture={pastFixture} nextFixture={nextFixture} />
      ) : (
        <p>{loadingMsg[num]}</p>
      )}
      </div>
    </>
  );
}

export default ByTeams;
