import React, {Component} from "react";
import Try from "./Try";

class NumberBaseball extends Component {
    state = {
        result: " ",
        value: " ",
        tries: [],
    };

    onSubmitForm = () => {
    };

    onChangeInput = () => {
    };

    fruits = [
        {fruit: "사과", taste: "맛있다"},
        {fruit: "배", taste: "맛있다"},
        {fruit: "귤", taste: "맛있다"},
    ];

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input
                        maxLength={4}
                        value={this.state.value}
                        onChange={this.onChangeInput}
                    />
                    <button type="submit">Submit</button>
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.fruits.map((v, i) => {
                        return (
                            <Try key={v.fruit + v.taste} value={v} vaindex={i}/>
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseball;