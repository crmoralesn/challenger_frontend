import React, {Component} from "react";
import {URL_API} from '../common/constants';
import Pagination from "../navigator/pagination";
import ScoreTerms from "../scoreterm/scoreterm";

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
        this.handleNextPage = this.handleNextPage.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
    }

    componentDidMount() {
        fetch(URL_API + 'word-counter/text')
            .then((response) => response.json())
            .then((data) => {
                this.setState({page: data, loading: false})
            });
    }

    refreshPage(pagination) {
        this.setState({loading: true}, () => {
            const {id} = this.state.page;
            fetch(URL_API + 'word-counter/text?' + new URLSearchParams({
                id: id,
                page: pagination.currentPage
            }))
                .then((response) => response.json())
                .then((data) => {
                    this.setState({page: data, loading: false});
                });
        });
    }

    handleNextPage() {
        this.setState({loading: true}, () => {
            const {id, page} = this.state.page;
            fetch(URL_API + 'word-counter/text?' + new URLSearchParams({
                id: id,
                page: page + 1
            }))
                .then((response) => response.json())
                .then((data) => {
                    this.setState({page: data, loading: false});
                });
        });

    }

    render() {
        const {page, title, text, total_pages} = this.state.page;
        let pagination;
        if (total_pages > 1) {
            pagination = <Pagination onPageChanged={this.refreshPage} totalRecords={total_pages} actual={page}/>
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            {title}
                        </h2>
                        <p>
                            {text}
                        </p>
                        <p>
                            {pagination}
                        </p>
                        <div>
                            {this.state.page.page > 0 && !this.state.loading &&
                            <ScoreTerms id={this.state.page.id} page={this.state.page.page}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WordCounter;
