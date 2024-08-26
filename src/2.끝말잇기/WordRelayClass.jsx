const React = require('react');
const {Component} = React

class WordRelay extends Component {
    state = {
        word: "이경환",
        value: "",
        result: ""
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                word: this.value,
                value: "",
                result:  "정답"
            })
        } else {
        }
    };

    input;
    onRefInput = (c) => {
        this.input = c;
    };
    onChangeInput = () => {

    };

    render() {
        return (
            <>
                <div{this.state.word}></div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} value={this.state.value}
                           onChange={this.onChangeInput}/>
                </form>
                <div>{this.state.result}</div>
            </>
        )
    }
}

module.exports = WordRelay;
