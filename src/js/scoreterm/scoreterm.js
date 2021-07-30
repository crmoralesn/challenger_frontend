import React, {Component, Fragment} from "react";
import {URL_API} from '../common/constants';

class ScoreTerms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            page: props.page,
            words: [],
            size: 5
        }
        this.handleGetRanking = this.handleGetRanking.bind(this);
        this.reloadRanking = this.reloadRanking.bind(this);
    }

    componentDidMount() {
        this.handleGetRanking(5);
    }

    reloadRanking(value) {
        this.setState({size: value});
        this.handleGetRanking(value);
    }

    handleGetRanking(size) {
        const {id, page} = this.state;
        fetch(URL_API + 'word-counter/scoreterms?' + new URLSearchParams({
            id: id,
            page: page,
            size: size
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
                <dl className="row">
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-2 fw-bold">
                            Palabra
                        </div>
                        <div className="col-md-2 fw-bold">
                            Número de ocurrencias
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                    {terms}
                </dl>
            </div>
        );
    }
}

export default ScoreTerms;
