export default function Main() {
    return (
        <div className="main">
            <div className="app_intro">
                <h1>Home</h1>
                <p>Welcome to Soccer Lives</p>
                <p>Here you can find the latest live matches, upcoming matches, top scorers by leagues, and your favorite matches.</p>
            </div>
            
            <div id="search_container">
                <input type="text" id="search_input" placeholder="Search fixtures of teams" />
            </div>
        </div>
    )
}