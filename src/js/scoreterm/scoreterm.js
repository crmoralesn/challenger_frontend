import React, {Component, Fragment} from "react";
import {URL_API} from '../common/constants';

class ScoreTerms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            page: props.page,
            words: [],
        }
        this.handleGetRanking = this.handleGetRanking.bind(this);
    }

    componentDidMount() {
        this.handleGetRanking(5);
    }

    handleGetRanking() {
        const {id, page} = this.state;
        fetch(URL_API + 'word-counter/scoreterms?' + new URLSearchParams({
            id: id,
            page: page
        }))
            .then((response) => response.json())
            .then((data) => {
                this.setState({words: data})
            });
    }

    render() {
            const terms = this.state.words.sort((a, b) => b.match - a.match).map((word, index) =>
            <Fragment key={index}>
                <div className="row">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-2">
                        {word.term}
                    </div>
                    <div className="col-md-2">
                        {word.matches}
                    </div>
                    <div className="col-md-4">
                    </div>
                </div>
            </Fragment>);
        return (
            <div>
                    <div className="row pt-3">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-2 ">
                            <h4>Palabra</h4>
                        </div>
                        <div className="col-md-2">
                            <h4>Apariciones</h4>
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                    {terms}
            </div>
        );
    }
}

export default ScoreTerms;
