import React from 'react';
import Game from './Game';
import Slider from 'react-slick';

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
        return (
            <div>
                {/* <ul className="list-group list-group-flush" style={{width: '18rem', overflow: 'auto', height: '47rem'}}> */}
                    {this.state.games.map(game => <Game game={game}/>)}
                {/* </ul> */}
            </div>
        );
    }
}

export default Games;