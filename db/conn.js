const Sequelize = require('sequelize')
const conn = new Sequelize("postgres://localhost/acme_favorites_spa_4")

const User = conn.define("user", {
    name: Sequelize.STRING,
})

const Thing = conn.define("thing", {
    name: Sequelize.STRING,
})

const Favorite = conn.define("favorite", {
    rank: Sequelize.STRING,
})

Thing.belongsToMany(User,{through: Favorite})
User.belongsToMany(Thing,{through: Favorite})

const usernames = ['moe', 'larry', 'curly', 'shep'];
const things = ['foo', 'bar', 'bazz', 'quq', 'quip'];

const SyncAndSeed = () => {
    return ( conn.sync({force:true})).then(()=> {
        return Promise.all([
          Promise.all(
            usernames.map( name => User.create({ name }))
          )
          .then( items => items.reduce((acc, item)=> {
            acc[item.name] = item;
            return acc;
          }, {}))
          ,
          Promise.all(
            things.map( name => Thing.create({ name }))
          )
          .then( items => items.reduce((acc, item)=> {
            acc[item.name] = item;
            return acc;
          }, {}))
          
        ]);
      })
      
      .then(([userMap, thingMap])=> {
        return Promise.all([
          Favorite.create({ userId: userMap.moe.id, thingId: thingMap.foo.id, rank: 7}),
          Favorite.create({ userId: userMap.moe.id, thingId: thingMap.bar.id, rank: 5}),
          Favorite.create({ userId: userMap.moe.id, thingId: thingMap.bazz.id, rank: 1}),
          Favorite.create({ userId: userMap.larry.id, thingId: thingMap.bazz.id, rank: 2},
          Favorite.create({ userId: userMap.larry.id, thingId: thingMap.bar.id, rank: 1}))
        ]);
      })
      
}

module.exports = {
    conn, Thing, User, Favorite,SyncAndSeed
}