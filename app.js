class App extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            display: '0',
            accumulator: 0,
            current: "",
            operator: "",
            decimal: false,
            negative: ""
        }
    }

    handleClear = () => {
        this.setState({
            display: '0',
            accumulator: 0,
            current: "",
            operator: "",
            decimal: false
        });
    }

    handleEqual = () => {
        if (this.state.operator) {
            const acc = eval(`${this.state.accumulator} ${this.state.operator} ${Number(this.state.current)}`).toFixed(8);
            this.setState({
                accumulator: acc,
                operator: "",
                display: acc,
                current: 0,
                decimal: false,
                negative: ""
            })
        }
        else {
            this.setState({
                accumulator: Number(this.state.current),
                current: 0,
                decimal: false,
                negative: ""
            })
        }
    }

    handleClick = (event) => {
        const clickedValue = event.target.innerText;

        if (!isNaN(Number(clickedValue))) {
            if (this.state.current) {
                this.setState(preveState => ({
                    current: preveState.current + clickedValue,
                    display: preveState.current + clickedValue
                }))
            }
            else {
                if (this.state.decimal) {
                    this.setState({
                        current: "0.",
                        display: "0."
                    })
                }
                else {
                    this.setState({
                        current: Number(this.state.negative + clickedValue),
                        display: Number(this.state.negative + clickedValue)
                    });
                }
            }
        }

        else if (clickedValue === ".") {
            if (!this.state.decimal) {
              this.setState(preveState => ({
                  display: preveState.current.toString() + ".",
                  current: preveState.current.toString() + ".",
                  decimal: true
              }));
            }
        }

        else if (clickedValue === "=") {
            this.handleEqual();
        }

        else {
            if (this.state.current === 0) {
                if (clickedValue === "-" && (this.state.operator === "*" || this.state.operator === "/")) {
                    this.setState({
                        negative: "-",
                        display: "-"
                    })
                }
                else {
                    this.setState({
                        operator: clickedValue,
                        display: clickedValue,
                        decimal: false,
                        negative: ""
                    })
                }
            }
            else {
                this.handleEqual();
                this.setState({
                operator: clickedValue,
                display: clickedValue,
                });
            }
        }
    }

    render () {
        return(
            <div id="calculator">
                <div id="display">{this.state.display}</div>
                <div id="keys">
                    <button id="clear" onClick={this.handleClear}>AC</button>
                    <button id="divide" onClick={this.handleClick}>/</button>
                    <button id="multiply" onClick={this.handleClick}>*</button>
                    <button id="nine" onClick={this.handleClick}>9</button>
                    <button id="eight" onClick={this.handleClick}>8</button>
                    <button id="seven" onClick={this.handleClick}>7</button>
                    <button id="six" onClick={this.handleClick}>6</button>
                    <button id="five" onClick={this.handleClick}>5</button>
                    <button id="four" onClick={this.handleClick}>4</button>
                    <button id="three" onClick={this.handleClick}>3</button>
                    <button id="two" onClick={this.handleClick}>2</button>
                    <button id="one" onClick={this.handleClick}>1</button>
                    <button id="zero" onClick={this.handleClick}>0</button>
                    <button id="decimal" onClick={this.handleClick}>.</button>
                    <button id="subtract" onClick={this.handleClick}>-</button>
                    <button id="add" onClick={this.handleClick}>+</button>
                    <button id="equals" onClick={this.handleClick}>=</button>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById("root"));
