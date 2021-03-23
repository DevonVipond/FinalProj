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

            return {username, distance, activities}
        })
    }

    wasSuccessful(dbResult) {
        let flag = false

        dbResult.forEach((element) => {
            if (element.success !== null && element.success !== undefined) {
                flag = element.success
                return flag
            }
        })

        return flag
    }

    reportedUsers(reportedUsersDb) {
        //[{"ReportedID":1,"RportedDate":"0000-00-00 00:00:00","UserComments":0,"AdminID":null,"AdminComments":"4"},{"ReportedID":2,"RportedDate":"0000-00-00 00:00:00","UserComments":1,"AdminID":null,"AdminComments":null},{"ReportedID":3,"RportedDate":"0000-00-00 00:00:00","UserComments":1,"AdminID":null,"AdminComments":null}]
        return reportedUsersDb.map(r => {
            const { username, reporterComments, timesReported, ReportedID } = r
            return { username, reporterComments, timesReported, primaryKey: ReportedID }
        })
    }

    accountType(dbResult) {
        const element =  dbResult.find(e => {
            return !!e.accountType
        })

        if (!element) throw Error ('Unable to parse accountType from ' + dbResult)
        return element.accountType
    }

}

const singleton = new toDTO()

module.exports = singleton
