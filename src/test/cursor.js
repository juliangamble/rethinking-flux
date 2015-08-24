import kurtsore from "kurtsore";
import {is} from "immutable";

let cursor = kurtsore.cursor(state),
    albums = cursor.derive('albums'),
    playlists = cursor.derive('playlists');

is(
    albums.deref(),
    state.deref().get('albums')
);
//=> true

is(
    playlists.deref(),
    state.deref().get('playlists')
);
//=> true

