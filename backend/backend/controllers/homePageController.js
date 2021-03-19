const db = []

const getHome = async (req, res) => {
    const { userId } = req.cookies
    const friends = await db.call('VERIFY USER LOGIN CREDENTIALS', username, password) 

    if (!loginSuccessful) {
        throw Error()
    }

    await db.call('ADD USERS LOCATION', longitude, latitude, city) // ENSURE THERE ARE NO MORE THAN 10 ENTRIES!!!

    res.status(200).send()
}

const connectWithMatch = async (req, res) => {
}

const reportFriend = async (req, res) => {
}

const acceptFriendRequest = async (req, res) => {
}

const rejectFriendRequest = async (req, res) => {
}

const rejectFriendRequest = async (req, res) => {
}