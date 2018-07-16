import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './statistics.css';

var jsondata = "{}";
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        // Typical action to be performed when the document is ready:
        jsondata = JSON.parse(xhttp.responseText);
    }
}

function get(season, sort) {
    console.log("season = " + season + ", sort = " + sort);
    xhttp.open("GET", "https://us-central1-test-f1kaapo.cloudfunctions.net/scoretable?season=" + season + "&sort=" + sort, false);
    return xhttp.send();
}

var urlParams = new URLSearchParams(window.location.search);

let year = new Date();

let season = urlParams.has('season') ? urlParams.get('season') : year.getFullYear();
let sort = urlParams.has('sort') ? urlParams.get('sort') : 'totalscore';
get(season, sort);

function renderUsers(users) {
    if (users.length > 0) {
        return users.map((user, index) => (
            <User key={index} user={user} />
        ));
    } else {
        return [];
    }
}

const User = ({ user }) => {
    return (
        <tr id={user.userid}>
            <td>{user.userid}</td>
            <td>{user.qlpoints}</td>
            <td>{user.gppoints}</td>
            <td>{user.totalscore}</td>
            <td>{user.doubled}</td>
        </tr>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        }
    }

    render() {
        const users = renderUsers(jsondata);
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th><th>QL points</th><th>GP points</th><th>Totalscore</th><th>Doubled</th>
                        </tr>
                        {users}
                    </tbody>
                </table>
            </div>
        );
    }
}

class ScoreBoard extends React.Component {
    render() {
        return (
            <div className="scores">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <ScoreBoard />,
    document.getElementById('root')
);
