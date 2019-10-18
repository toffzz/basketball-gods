import fetch from 'node-fetch'
import _ from 'lodash'

export const fetchGames = (id) => {
  return new Promise((resolve, reject) => {
    fetch('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard')
      .then((response) => {
        return response.json()
      }).then((data) => {
        resolve(normalizeData(data))
      })
  })
}

const round = (value, decimals) => {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

const normalizeData = (data) => {
  const events = _.get(data, "events"),
    normalizedEvents = []

  if(events){
    _.forEach(events, (event, i) =>{
      const status = _.get(event, "status"),
        competitors = _.get(event, "competitions[0].competitors")
      let awayObj = {},
        homeObj = {}

      if(competitors){
        _.forEach(competitors, (competitor, j) => {
          const statistics = _.get(competitor, "statistics"),
            score = _.get(competitor, "score"),
            team = _.get(competitor, "team"),
            threePointPercentage = 1/3
          let madeThrees,
            attemptedThrees,
            surplus

          _.forEach(statistics, (stat) => {
            const statField = _.get(stat, "name")
            if(_.includes(enabledFields, statField)){
              const displayValue = _.get(stat, "displayValue")
              statField === "threePointFieldGoalsAttempted" ? attemptedThrees = displayValue : madeThrees = displayValue
            }
          })

          surplus = round(parseInt(madeThrees) - parseInt(attemptedThrees) * threePointPercentage, 2)
          const statsArray = { made: madeThrees, attempted: attemptedThrees, surplus, score }
          let teamObj = {
            team: team,
            stats: statsArray
          }
          _.get(competitor, "homeAway") === "home" ? homeObj = teamObj : awayObj = teamObj
        })
      }

      const homeSurplus = _.get(homeObj, "stats.surplus"),
        awaySurplus = _.get(awayObj, "stats.surplus"),
        surplusTeam = homeSurplus < awaySurplus ? 'home' : 'away',
        surplusDiff = round(Math.abs(homeSurplus - awaySurplus), 2),
        surplus = {
          team: surplusTeam === 'home' ? _.get(homeObj, 'team') : _.get(awayObj, 'team'),
          surplusDiff
        }



      normalizedEvents.push({
        home: homeObj,
        away: awayObj,
        surplus,
        status
      })
    })
  }

  return normalizedEvents
}

const enabledFields = ["threePointFieldGoalsAttempted", "threePointFieldGoalsMade"]
