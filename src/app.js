import React  from 'react'
import axios from "axios"
import {HashRouter, Route, Link} from 'react-router-dom'



class App extends React.Component{
    constructor(){
        super()
        this.state = {
            getUsers: [],
            getThings: [],
            getFavs: []
        }
        //this.getUser = this.getUser.bind(this)
    }
    

    render(){
        const {getUsers, getThings, getFavs} = this.state 
        if(getUsers.length <= 0 || getThings.length <= 0) {
            return null
        } else {
        return (
            <HashRouter>
                <React.Fragment>
                <Link to="/users" className="nav nav-pills"> <button getUsers={getUsers}> Users {getUsers.length} </button></Link>
                <Link to="/things" className="nav nav-pills"> <button getThings={getThings}>Things {getThings.length}</button> </Link>
                <Route exact path="/users" render = {()=> <Users users={getUsers} things={getThings} favs={getFavs} />} />
                <Route exact path="/things" render= {() => <Things things={getThings} users={getUsers} favs={getFavs} />} />
                </React.Fragment>
            </HashRouter>

        )
    }
}
    componentDidMount(){
        axios.get("/users").then((allUsers)=>{
            //console.log("getUser")
            return allUsers
        }).then((allUsersData)=>{
            this.state.getUsers = allUsersData.data
            return this.setState({})
        })

        axios.get("/things").then((allThings)=>{
            return allThings
        }).then((allThingsData)=>{
            this.state.getThings = allThingsData.data
            return this.setState({})
        })

        axios.get("/favorites").then((allFavs)=>{
            return allFavs
        }).then((allFavsData)=>{
            this.state.getFavs = allFavsData.data
            return this.setState({})
        })
    }

}

const Users = ({users, favs, things}) => {
    

    //console.log(users)
    return users.map((row)=> {
    return ( 
   
        
       <div key={row.id}> {row.name} <li> (Ranked:#) </li></div>

   
    )})
    
}
 
const Things = ({things, favs, users}) => {
    //console.log(props)
    const favID = favs.map((favRow)=> favRow.thingId )
    console.log(favID)
    return things.map((row)=> {
        
        //console.log(row.id)
        return ( 
        
            
           <div key={row.id}> 
           
                {row.name} 
                <li> favorited by: </li>
           
           </div>
    
        
        )})
}

const Favourites = ({favs}) => {
    

    //console.log(props.users)
    return favs.map((row)=> {
    return ( 
   
        
       <li key={row.id}> {row.name} </li>

   
    )})
    
}

export default App