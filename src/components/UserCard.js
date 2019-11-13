import React from 'react';

const UserCard = props => {
    return(
        <div class="col-sm-4 mt-3" style={{opacity: "0.9"}}>
            <div class="card">
                <div class="card-body">
                    <div class="col-sm-12">
                        <div class="card-body">
                            <h5 class="card-title">{props.user.username}</h5>
                            <p class="card-text">SCORE: {props.user.score}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;