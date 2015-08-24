'use strict';

import React from "react";
import {CursorPropsMixin} from "react-kurtsore";

import {state} from "./state";
import {Albums, Playlists} from "./views";
import pubsub from "./pubsub";
import effects from "./effects";
import kurtsore from "kurtsore";

var k = require("kurtsore");

const App = React.createClass({

    mixins: [ CursorPropsMixin ],

    render(){
        let state = this.props.state;

        return (
            <div><h2>Albums</h2><br/>
                <Albums albums={state.derive('albums')} />
                <h2>Playlists</h2><br/>
                <Playlists playlists={state.derive('playlists')} />
            </div>
        );
    }
});

function render(state){
    React.render(<App state={state} />, document.querySelector("body"));
};

(function bootstrap(){
    // View
    render(kurtsore.cursor(state));
    state.addWatch(() => render(kurtsore.cursor(state)));

    // Pub-sub
//    let publication = pubsub.publication((ac) => ac.get("type"));

    // Effects
//    effects.start(publication, state);
})();

