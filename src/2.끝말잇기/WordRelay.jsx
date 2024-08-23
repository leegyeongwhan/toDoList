const React = require('react');
const {Component} = React

class WordRelay extends Component {
    state = {
        word: "이경환",
        value: "",
        result: ""
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
