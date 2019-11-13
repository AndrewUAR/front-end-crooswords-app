import React from 'react';

class Games extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            games: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/games')
        .then(res => res.json())
        .then(data => {
            let games = [];
            data.forEach(game => {
                if(game.user_id == this.props.user.id){
                    games.push(game)
                }
            })
            this.setState({games})
        })
    }

    render(){
        return (<h1>{this.state.games.map(game => {return game.puzzle_id})}</h1>);
    }
}

export default Games;