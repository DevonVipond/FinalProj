const {ACCOUNT_TYPES} = require('../constants')

class toDTO {

    activities(activitiesDb) {
        return activitiesDb.filter(a => (a.Activity)).map(a => {
            return {
                name: a.Activity.toLowerCase(),
                skillLevel: a.SkillLevel.toLowerCase(),
            }
        })
    }

    distance(distanceDb) {
        const distance = distanceDb.map(idx => {
            return idx.Distance
        })

        if (!distance.length) return 10
        return distance[0]
    }

    location(locationDb) {
        const location = locationDb.find(f => {
            return f.Longitude && f.Latitude
        })

        if (!location) throw Error(' Unable to parse location! ' + locationDb)

        return {
            longitude: location.Longitude,
            latitude: location.Latitude,
        }
    }

    users(usersDb) {
        return usersDb.filter(u => {
            return u.UserName !== null
        }).map(u => {
            const { UserName, Distance, Latitude, Longitude }  = u
            return {
                username: UserName,
                distance: Distance,
                latitude: Latitude,
                longitude: Longitude,
            }

        })
    }

    //friends(friendsDb) {
    //    return this.users(friendsDb).map(m => {
    //        let { username, distance, activities } = m
    //        activities = this.activities(activities)

    //        return { username, distance, activities }
    //    })
    //}

    //friendRequests(friendRequestsDb) {
    //    return this.users(friendRequestsDb).map(f => {
    //        let { username, distance, activities } = f
    //        activities = this.activities(activities)

    //        return { username, distance, activities }
    //    })
    //}

    //matches(matchesDb) {
    //    return this.users(matchesDb).map(m => {
    //        let { username, distance, activities } = m
    //        activities = this.activities(activities)

    //        return { username, distance, activities }
    //    })
    //}

    wasSuccessful(dbResult) {
        const filteredData = dbResult.filter(element => { return element['@res'] })

        if (!filteredData.length) return false

        return filteredData[0]['@res'] == 1
    }

    reportedUsers(reportedUsersDb) {
        return reportedUsersDb.map(r => {
            const { username, UserComments, timesReported, ReportedID, TimesReported } = r
            return { username, reporterComments: UserComments, timesReported: TimesReported, primaryKey: ReportedID }
        })
    }

    accountType(dbResult) {
        const element =  dbResult.find(e => {
            return !!e.UserType
        })

        if (!element) return ACCOUNT_TYPES.ADMIN
        return element.UserType
    }

}

const obj = new toDTO()

module.exports = obj
