// ApiOptions.jsx

import React from 'react';

const ApiOptions = ({ live, next, favorite, teams, topscorers }) => {
  const commonHeaders = {
    'X-RapidAPI-Key': '67142be9e1msha21067b17d884d6p1f558ejsn8dc79fea8402',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  };

  if (live) {
    return {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      params: { live: 'all' },
      headers: commonHeaders
    };
  } else if (next) {
    return {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      params: { next: next.toString() },
      headers: commonHeaders
    };
  } else if(favorite) {
    return {
        method: "GET",
        url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
        headers: commonHeaders,
    }
  } else if (teams) {
    return {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/teams",
      headers: commonHeaders,
    }
  } else if (topscorers) {
    return {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/players/topscorers",
      headers: commonHeaders,
    }
  }
};


export default ApiOptions;
