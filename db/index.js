const { SyncAndSeed, Thing, User} = require("./conn")


Thing.belongsToMany(User,{through: "Favorite"})
User.belongsToMany(Thing,{through: "Favorite"})

SyncAndSeed()