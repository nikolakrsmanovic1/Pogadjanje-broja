import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomNumber: '',
      input: '',
      guessCount: 0,
      currentGuess: '',
      guessStatus: '',
      gameOver: false,
      gameStarted: false,
      gameCount: 0,
      correctGuesses: ''
    };
    this.inputFocus = React.createRef();
    this.handleGuess = this.handleGuess.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.initNumber = this.initNumber.bind(this);
  }

  initNumber() {
    this.setState({ guessStatus: '' })
    this.setState({ gameOver: false });
    this.setState({ gameStarted: false });
    this.setState({ guessCount: 0 });
    this.setState({ guessRange: '' });
    this.setState({ randomNumber: Math.floor(Math.random() * 100 + 1) });
  }

  componentWillMount() {
    this.setState({ randomNumber: Math.floor(Math.random() * 100 + 1) });
  }

  componentDidUpdate() {
    console.log(this.state.randomNumber);
  }

  componentDidMount() {
    console.log(this.state.randomNumber);
  }

  handleChange(e) {
    this.setState({ input: e.target.value })
  }

  handleGuess() {
    console.log(this.state.input)
    if (parseInt(this.state.input, 10) > this.state.randomNumber) {
      this.setState({ guessStatus: "Zamisljeni broj je manji" });
      this.updateStat();
    }
    else if (parseInt(this.state.input, 10) < this.state.randomNumber) {
      this.setState({ guessStatus: "Zamisljeni broj je veci" });
      this.updateStat();
    }
    else if (parseInt(this.state.input, 10) === this.state.randomNumber) {
      this.setState({ guessStatus: "Pogodio si!" });
      this.updateStat();
      this.setState({ gameOver: true })
      this.setState({ gameCount: this.state.gameCount + 1 })
    }
    else {
      this.setState({ gameStarted: true });
      this.setState({ guessStatus: "Unesi broj!" });
    }
  }

  updateStat() {
    this.setState({ gameStarted: true });
    this.setState({ input: '' });
    this.setState({ guessCount: this.state.guessCount + 1 })
    this.setState({ currentGuess: this.state.input });
    this.inputFocus.current.focus();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3 className="App-title">Pogadjanje broja od 1 do 100</h3>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="board">
                <h3>Pogodi broj koji je zamisljen od 1 do 100</h3>
                {/* Display input box and 'Guess' button when game isn't over */}
                {!this.state.gameOver &&
                  <div className='userInput'>
                    <input placeholder="Tvoj broj. . ." ref={this.inputFocus} value={this.state.input} type="number" maxLength="3" onChange={this.handleChange} />
                    <div>
                      <button onClick={this.handleGuess} className="btn btn-primary">
                        Pokusaj!
                      </button>
                    </div>
                  </div>}

                {/* Display the guess status and number of attempts once guess is submitted */}
                {(this.state.gameStarted && this.state.guessStatus !== "Unesi broj!") ?
                  <div>{this.state.guessStatus}<p>Trenutni pokusaj: {this.state.guessCount}</p>
                  </div> : <p className="text-danger">{this.state.guessStatus}</p>}

                {/* Display total number of attempts before guessing correctly */}
                {this.state.gameOver && <div><h1 className="text-success">{this.state.randomNumber}</h1>
                  <p>Totalno  pokusaja: {this.state.guessCount}</p><button onClick={this.initNumber} className="btn btn-primary">Igraj opet</button></div>}
              </div>
            </div>
          </div>
        </div>
        <div>
          {this.state.gameCount >= 1 && <p>You have played {this.state.gameCount} game(s)</p>}
        </div>
      </div>
    );
  }
}

export default App;
