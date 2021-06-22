/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Albums, Artists, Auth, Browse, Library, Player, Playlists, Search, Tracks, Users } from '@UpNext/spotify';
import { Service } from 'typedi';

export interface SpotifyApis {
  albums: Albums,
  artists: Artists,
  auth: Auth,
  browse: Browse,
  library: Library,
  player: Player,
  playlist: Playlists,
  search: Search,
  tracks: Tracks,
  users: Users,
}


@Service()
export class SpotifyService {
  private readonly _spotifyApis: SpotifyApis = {
    albums: new Albums(),
    artists: new Artists(),
    auth: new Auth(),
    browse: new Browse(),
    library: new Library(),
    player: new Player(),
    playlist: new Playlists(),
    search: new Search(),
    tracks: new Tracks(),
    users: new Users(),
  };
  
  get spotifyApis(): SpotifyApis {
    return this._spotifyApis;
  }
}
