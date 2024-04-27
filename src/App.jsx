import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link, Routes, Route, useNavigate, Outlet } from "react-router-dom";
import "./scss/small/App.scss";
import "./scss/medium/Medium.App.scss";
import "./scss/large/Large.App.scss";
import Topscore from "./Pages/Topscore";
import LiveMatches from "./Pages/LiveMatches";
import Coming_Matches from "./Pages/Coming_Matches";
import FavoriteMatches from "./Pages/FavoriteMatches";
import ByTeams from "./Pages/Byteams";
function App() {


  return (
    <div className="app_container">
      <div className="header_container">
        <Link to="/"><h2>Soccer Lives </h2></Link>

        <nav id="table_menu">
          <ul>
              <li>
                <Link to="/" className="home_link">
                  Live Matches
                </Link>
              </li>
            
            <li>
              <Link to="/coming" className="home_link">
                Upcoming Matches
              </Link>
            </li>
            <li>
              <Link to="/topscorers" className="home_link">
                Top Scorers 
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="home_link">
                My favorites
              </Link>
            </li>
            <li>
              <Link to="/byteams" className="home_link">
                Search Teams
              </Link>
            </li>
          </ul>
        </nav>
        
        <Dropdown data-bs-theme="dark" className="dropdown_menu" id="dropdown">
          <Dropdown.Toggle id="dropdown-custom-1" variant="secondary">
            &#9776;
          </Dropdown.Toggle>

          <Dropdown.Menu>

            <Dropdown.Item href="#/action-1">
              <Link to="/" className="home_link">
                Home
              </Link>
            </Dropdown.Item>

            <Dropdown.Item href="#/action-1">
              <Link to="/coming" className="home_link">
                Upcoming Matches
              </Link>
            </Dropdown.Item>

            <Dropdown.Item href="#/action-1">
              <Link to="/topscorers" className="home_link">
                Top Scorers
              </Link>
            </Dropdown.Item>

            <Dropdown.Item href="#/action-1">
              <Link to="/favorites" className="home_link">
                My favorites
              </Link>
            </Dropdown.Item>

            <Dropdown.Item href="#/action-1">
              <Link to="/byTeams" className="home_link">
                Search Teams
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
        </div>
        <Outlet />
        <Routes>
          <Route path="/" element={<LiveMatches />} />
          <Route path="/coming" element={<Coming_Matches />} />
          <Route path="/topscorers" element={<Topscore />} />
          <Route path="/favorites" element={<FavoriteMatches />} />
          <Route path="/byteams" element={<ByTeams />} />
        </Routes>

    </div>
  );
}

export default App;
