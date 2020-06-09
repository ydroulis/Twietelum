import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet'

import Cabecalho from '../../components/Cabecalho'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import { TweetsContainer }  from "../../containers/TweetsContainer"
import { TweetsService } from '../../services/TweetsService';
import { ReactReduxContext } from "react-redux";
import { TweetsThunkActions } from "../../stores/ducks/tweets"



class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            novoTweet: "",
            totalTweets: 0
        };
    }

    static contextType = ReactReduxContext;

    componentDidMount() {
        const store = this.context.store;
        store.subscribe(() => {
            this.setState({
                totalTweets: store.getState().tweets.data.length
            });
        });
       
    }

    

    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Twitelum - ({`${this.state.totalTweets}`}) tweets</title>
                </Helmet>

                <Cabecalho usuario="@omariosouto" />
                <div className="container">
                    <Dashboard>
                        <Widget>
                            <form className="novoTweet" onSubmit={this.adicionaTweet}>
                                <div className="novoTweet__editorArea">
                                    <span className={`
                                        novoTweet__status 
                                        ${
                                        this.state.novoTweet.length > 140
                                            ? 'novoTweet__status--invalido'
                                            : ''
                                        }
                                    `}>{this.state.novoTweet.length}/140</span>
                                    <textarea className="novoTweet__editor"
                                        placeholder="O que está acontecendo?"
                                        value={this.state.novoTweet}
                                        onChange={(event) => this.setState({ novoTweet: event.target.value })}>
                                    </textarea>
                                </div>
                                <button type="submit"
                                    className="novoTweet__envia"
                                    disabled={this.state.novoTweet.length === 0 || this.state.novoTweet.length > 140}>Tweetar</button>
                            </form>
                        </Widget>
                        <Widget>
                            <TrendsArea />
                        </Widget>
                    </Dashboard>
                    <Dashboard posicao="centro">
                        <Widget>
                         <TweetsContainer/>
                        </Widget>
                    </Dashboard>
                </div>                                 
                
            </Fragment>
        );
    }
}

export default HomePage;
