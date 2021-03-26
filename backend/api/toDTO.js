class toDTO {

    activities(activitiesDb) {
        return activitiesDb.map(a => {
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

    friends(friendsDb) {
        return friendsDb.map(f => {
            let { username, distance, activities } = f
            activities = this.activities(activities)

            return { username, distance, activities }
        })
    }

    friendRequests(friendRequestsDb) {
        return friendRequestsDb.map(f => {
            let { username, distance, activities } = f
            activities = this.activities(activities)

            return { username, distance, activities }
        })
    }

    matches(matchesDb) {
        return matchesDb.map(m => {
            let { username, distance, activities } = m
            activities = this.activities(activities)

            return { username, distance, activities }
        })
    }

    wasSuccessful(dbResult) {
        const filteredData = dbResult.filter(element => { return element['@res'] })

        if (!filteredData.length) return false

        return filteredData[0]['@res'] == 1
    }

    reportedUsers(reportedUsersDb) {
        //[{"ReportedID":1,"RportedDate":"0000-00-00 00:00:00","UserComments":0,"AdminID":null,"AdminComments":"4"},{"ReportedID":2,"RportedDate":"0000-00-00 00:00:00","UserComments":1,"AdminID":null,"AdminComments":null},{"ReportedID":3,"RportedDate":"0000-00-00 00:00:00","UserComments":1,"AdminID":null,"AdminComments":null}]
        return reportedUsersDb.map(r => {
            const { username, UserComments, timesReported, ReportedID } = r
            return { username, reporterComments: UserComments, timesReported, primaryKey: ReportedID }
        })
    }

    accountType(dbResult) {
        //Database -> exec -> [{"UserType":"Regular"},{"UserType":"Regular"},{"UserType":"Regular"},{"UserType":"Premium"},{"UserType":"Premium"},{"UserType":"Premium"},{"UserType":"Freemium"},{"UserType":"Freeloader"},{"UserType":"Freeloader"},{"fieldCount":0,"affectedRows":0,"insertId":0,"serverStatus":34,"warningCount":0,"message":"","protocol41":true,"changedRows":0}]
        const element =  dbResult.find(e => {
            return !!e.UserType
        })

        if (!element) throw Error ('Unable to parse accountType from ' + dbResult)
        return element.UserType
    }

}

const obj = new toDTO()

module.exports = obj
