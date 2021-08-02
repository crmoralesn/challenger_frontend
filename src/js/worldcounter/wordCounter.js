import React, {Component} from "react";
import {URL_API} from '../common/constants';
import ScoreTerms from "../scoreterm/scoreterm";
import Button from "react-bootstrap/Button";
import Pagination from '@material-ui/lab/Pagination';

class WordCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: {
                id: '',
                page: 0,
                title: '',
                total_pages: 0
            },
            loading: true
        }
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        fetch(URL_API + 'word-counter/text')
            .then((response) => response.json())
            .then((data) => {
                this.setState({page: data, loading: false})
            });
    }

    handlePageChange = (event, pageNumber) => {
        this.setState({loading: true}, () => {
            const {id} = this.state.page;
            fetch(URL_API + 'word-counter/text?' + new URLSearchParams({
                id: id,
                page: pageNumber
            }))
                .then((response) => response.json())
                .then((data) => {
                    this.setState({page: data, loading: false});
                });
        });
    }

    render() {
        const {page, title, text, total_pages} = this.state.page;
        return (
            <div className="container-fluid p-3">
                <div className="row" >
                    <div className="col-md-8">
                        <h3>{title}</h3>
                    </div>
                    <div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span>
                            {text}
                        </span>
                    </div>
                </div>
                {total_pages > 1 &&
                    <div className="row pt-3">
                        <div className="col-md-6">
                            Páginas:
                            <Pagination count={total_pages}
                                        page={page}
                                        variant="outlined"
                                        color="primary"
                                        shape="rounded"
                                        onChange={this.handlePageChange.bind(this)}/>
                        </div>
                    </div>
                }
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            {this.state.page.page > 0 && !this.state.loading &&
                            <ScoreTerms id={this.state.page.id} page={this.state.page.page}/>
                            }
                        </div>
                    </div>
                    <div>
                        <Button variant="primary"
                                onClick={() => window.location.reload(false)}>Analizar otro!
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default WordCounter;
