// views.js

import React from "react";
import {CursorPropsMixin} from "react-kurtsore";

var k = require("kurtsore");

export const Album = React.createClass({

    mixins: [ CursorPropsMixin ],

    render(){
        let album = this.props.album.deref();
        return <li>{album.get('artist')} - {album.get('title')}</li>;
    }
});

export const Albums = React.createClass({

    mixins: [ CursorPropsMixin ],

    render(){

        let albums = this.props.albums.deref(),
            cursors = albums.map((a, idx) => this.props.albums.derive(idx));

        return (
            <ul>
                {cursors.map(
                    (a, idx) => <Album key={idx} album={a} />
                )}
            </ul>
        );
    }

});

export const Playlist = React.createClass({

    mixins: [ CursorPropsMixin ],

    render(){
        let playlist = this.props.playlist.deref();
        return <li>{playlist.get('name')} </li>;
    }
});

export const Playlists = React.createClass({

    mixins: [ CursorPropsMixin ],

    render() {

        let playlists = this.props.playlists.deref(),
            cursors = playlists.map((a, idx) => this.props.playlists.derive(idx));

    return (
            <ul>
                {cursors.map(
                    (a, idx) => <Playlist key={idx} playlist={a} />
                )}
            </ul>
        );
}
});

