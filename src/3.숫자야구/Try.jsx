import React, {Component} from "react";

class Try extends Component {
    render() {
        return (
            <li>
                <b>{this.props.value.fruit}</b> - {this.props.index}
                <div>content1</div>
                <div>content2</div>
                <div>content3</div>
            </li>
        )
    }
}

export default Try;