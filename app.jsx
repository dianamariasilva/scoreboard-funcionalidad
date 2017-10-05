class Model {
    constructor(){
      this.PLAYERS = [
        {
          name: "Jim Hoskins",
          score: 31,
          id: 1,
        },
         {
          name: "Andree Hoskins",
          score: 35,
          id: 2,
        },
         {
          name: "Alena Hoskins",
          score: 42,
          id: 3,
        },
      ];
    this.todos = [];
    this.inputValue = null;
    this.callback = null;
    this.index = 0;
    };

  subscribe(render) {
    this.callback = render;
  }
   
  notify() {
    this.callback();
  }

  inform() {
    console.log(this.todos.map(e => e.text));
    this.render();
  }

  addPlayer(text) {
    this.todos.push({ 
        name: name, 
        score: 0 
    });
    this.inform();
  }
  
  addTodo(text) {
      this.todos.push({
         id: Utils.uuid(),
         text: text,
         completed: false
      });
      this.notify();
  }
  
  updateTodo(index, todo) {
      this.todos[index] = todo;
      this.notify();
  }
  
  removeTodo(todo) {
      this.todos = this.todos.filter(item => item !== todo);
      this.inform();
  }

  subtractPoint(index) {
    this.PLAYERS[index].score-- ;
    this.notify();
 }

  addPoint(index) {
    this.PLAYERS[index].score++ ;
    this.notify();
  }
}

const Header = props => {
  const totalPoints = props.players.reduce(function(total, player) {
    return total + player.score;
  }, 0);
  return(
    <div className="header">
    <table>
      <tbody>
      <tr>
        <td>
          <p>PLAYERS:{props.players.length}</p>
          <p>TOTAL POINTS: {totalPoints}</p>
        </td>
      </tr>
      </tbody>
    </table>
    <h1> Scoreboard</h1>
    <div className="stopwatch">
        <h2>STOPWHATCH</h2>
        <p className="stopwatch-time">0</p>
        <button className="">START</button>
        <button>RESET</button>
    </div>
    </div>
  )
}

const Stopwatch = React.createClass({
  getInitialState: function () {
    return ({
      running: false,
      previouseTime: 0,
      elapsedTime: 0,
    });
  },

  componentDidMount: function () {
    this.interval = setInterval(this.onTick);
  },

  componentWillUnmount: function () {
    clearInterval(this.interval);
  },


  onStart: function () {
    this.setState({
      running: true,
      previousTime: Date.now(),
    });
  },

  onTick: function () {
    if (this.state.running) {
      var now = Date.now();
      this.setState({
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
        previousTime: Date.now(),
      });
    }
  },

  render: function () {
    var seconds = Math.floor(this.state.elapsedTime / 1000);
    return (
      <div className="stopwatch" >
        <h2>Stopwatch</h2>
        <div className="stopwatch-time"> {seconds} </div>
        { this.state.running ?
          <button onClick={this.onStop}>Stop</button>
          :
          <button onClick={this.onStart}>Start</button>
        }
        <button onClick={this.onReset}>Reset</button>
      </div>
    )
  }
});

function divList(list, model){
  return(
    list.map((value, position) =>{
      return(
        <div>
          <div key={position}>
            <div className="player">
              <div className="player-name">{value.name}</div>
              <div className="player-score counter">
                <div onClick = {()=>model.subtractPoint(position)} className="counter-action decrement">-</div>
                <div className="counter-score">{value.score}</div>
                <div onClick = {()=>model.addPoint(position)} className="counter-action increment">+</div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  )
}

const PlayerList = props => {
  return(
    <div>  
      {divList(props.players,props.model)}
    </div>
  )
}

const PlayerForm = props => {
  return(
    <div className="add-player-form">
      <form action="">
        <input type="text" placeholder="Enter a name"></input>
        <input type="submit" value="ADD PLAYER"></input>
      </form>
    </div>
  )
}

const Application = ({title,model}) => {
   return (
     <div className ="scoreboard">
      <Header className="header" players={model.PLAYERS}/>
      <Stopwatch />
      <PlayerList className="stats" players={model.PLAYERS} model={model}/>
      <PlayerForm />
      </div>      
   ) ;
}


let model = new Model();
let render = () => {
  ReactDOM.render(
     <Application title="TodoApp" model={model} />,
     document.getElementById('container')
  );
};
model.subscribe(render);
render();