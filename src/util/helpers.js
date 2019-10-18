import fetch from 'node-fetch'
import _ from 'lodash'

export const fetchGame = (id) => {
  return new Promise((resolve, reject) => {
    //401163174
    fetch('http://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event='+ id +'&lang=en&region=us&contentorigin=espn&showAirings=buy,live&showZipLookup=true&buyWindow=1m')
      .then((response) => {
        return response.json()
      }).then((data) => {
        resolve(normalizeData(data))
      })
  })
}

const normalizeData = (data) => {
  const boxscore = _.get(data, 'boxscore') || {},
    awayTeam = _.get(boxscore, 'teams[0].team') || {},
    homeTeam = _.get(boxscore, 'teams[1].team') || [],
    awayTeamStats = _.get(boxscore, 'teams[0].statistics') || [],
    homeTeamStats = _.get(boxscore, 'teams[1].statistics') || [],
    teamThreesArray = [],
    teams = [_.get(awayTeam, 'displayName'), _.get(homeTeam, 'displayName')]


  _.forEach([awayTeamStats, homeTeamStats], (stats, i) =>{
    const threeObj = _.find(stats, (stat) => {
      // return three stats if it matches with enabled stats since it's the only enabled stat
      return _.includes(enabledStats, _.get(stat, 'name'))
    }),
      threeString = _.get(threeObj, 'displayValue'),
      threeSplit = threeString && threeString.split('-')
    if(threeSplit && threeSplit.length === 2){
      teamThreesArray.push({
        teamName: teams[i],
        made: threeSplit[0],
        attemped: threeSplit[1],
        madeAttempted: threeString,
        surplus: 1
      })
    }
  })

  return {
    threes: teamThreesArray
  }
}

const enabledStats = ['threePointFieldGoalsMade-threePointFieldGoalsAttempted']
