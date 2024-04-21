function TopScorer({ i, topscorers, a }) {
    return (
      <div key={i} className="scorer_table">
        <div className="left">
          <span>{i + 1}.</span>
          <img src={a.player.photo} />
          <span>{a.player.name}</span>
        </div>
        <span>{a.statistics[0].goals.total}</span>
      </div>
    );
  }

  export default TopScorer;