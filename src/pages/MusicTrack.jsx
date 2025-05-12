import { useState, useEffect } from 'react';

function MusicTrack() {
    const [timePeriod, setTimePeriod] = useState('1');
    const [statType, setStatType] = useState('artist');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [trackData, setTrackData] = useState(Array.from({ length: 3 }, () => null));
    const [artistData, setArtistData] = useState(Array.from({ length: 3 }, () => null));
    const [albumData, setAlbumData] = useState(Array.from({ length: 3 }, () => null));
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetched, setHasFetched] = useState(false);
    const statOptions = [
        { id: 'artist', label: 'Artist' },
        { id: 'album', label: 'Album' },
        { id: 'track', label: 'Track' }
    ];

    const timeOptions = [
        { id: '1', label: 'Weekly' },
        { id: '2', label: 'Monthly' },
        { id: '3', label: 'Yearly' }
    ];

    const fetchSpotifyTrackData = async (trackName, artistName, token) => {
        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=track:${encodeURIComponent(trackName)} artist:${encodeURIComponent(artistName)}&type=track&limit=1`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            const data = await response.json();
            
            if (data.tracks?.items?.[0]) {
                const trackId = data.tracks.items[0].id;
                const response = await fetch(
                    `https://api.spotify.com/v1/tracks/${trackId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                const trackData = await response.json();
                return trackData.album.images[0]?.url || null;
            }
            return null;
        } catch (error) {
            console.error('Error fetching Spotify track data:', error);
            return null;
        }
    };

    const fetchSpotifyArtistData = async (artistName, token) => {
        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            const data = await response.json();
            
            if (data.artists?.items?.[0]) {
                const artistId = data.artists.items[0].id;
                const artistResponse = await fetch(
                    `https://api.spotify.com/v1/artists/${artistId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                const artistData = await artistResponse.json();
                return artistData.images[0]?.url || null;
            }
            return null;
        } catch (error) {
            console.error('Error fetching Spotify artist data:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // fetches the spotify token using my worker
                const tokenFetch = await fetch("https://spotify-helper.colbyr416-927.workers.dev/getToken", {mode: "cors"});
                const token = await tokenFetch.json();
                const spotifyToken = token.access_token; 
        
                setIsLoading(true);
                const response1 = await fetch(`https://vscrobblerapihandler.colbyr416-927.workers.dev/gettoptracks`, {mode: "cors"});

                if (!response1.ok) {
                    throw new Error(`HTTP error! status: ${response1.status}`);
                }

                const data = await response1.json();
                // update track data
                const newTrackData = [...trackData];
                newTrackData[0] = data.d1?.toptracks?.track || [];
                newTrackData[1] = data.d2?.toptracks?.track || [];
                newTrackData[2] = data.d3?.toptracks?.track || [];

                // fetch images from spotify for tracks since lastfm doesn't have them for whatever reason
                for (let periodIndex = 0; periodIndex < 3; periodIndex++) {
                    if (newTrackData[periodIndex]) {
                        for (let track of newTrackData[periodIndex]) {
                            track.spotifyImage = await fetchSpotifyTrackData(track.name, track.artist.name, spotifyToken);
                        }
                    }
                }

                setTrackData(newTrackData);

                const response2 = await fetch(`https://vscrobblerapihandler.colbyr416-927.workers.dev/gettopalbums`, {mode: "cors"});
                const data2 = await response2.json();

                // update albums(lastfm has images for this)
                const newAlbumData = [...albumData];
                newAlbumData[0] = data2.d1?.topalbums?.album || [];
                newAlbumData[1] = data2.d2?.topalbums?.album || [];
                newAlbumData[2] = data2.d3?.topalbums?.album || [];
                setAlbumData(newAlbumData);

                const response3 = await fetch(`https://vscrobblerapihandler.colbyr416-927.workers.dev/gettopartists`, {mode: "cors"});
                const data3 = await response3.json();
                
                // update artists
                const newArtistData = [...artistData];
                newArtistData[0] = data3.d1?.topartists?.artist || [];
                newArtistData[1] = data3.d2?.topartists?.artist || [];
                newArtistData[2] = data3.d3?.topartists?.artist || [];

                // fetch images from spotify for artists
                for (let periodIndex = 0; periodIndex < 3; periodIndex++) {
                    if (newArtistData[periodIndex]) {
                        for (let artist of newArtistData[periodIndex]) {
                            artist.spotifyImage = await fetchSpotifyArtistData(artist.name, spotifyToken);
                        }
                    }
                }

                setArtistData(newArtistData);

            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
                setHasFetched(true)
            }
        };
        if(!hasFetched) {
            fetchData();
        }
    }, []);

    const selectedTimeOption = timeOptions.find(option => option.id === timePeriod);
    const getFilteredData = () => {
        const periodIndex = parseInt(timePeriod) - 1;
        
        switch(statType) {
            case 'track':
                return trackData[periodIndex] || [];
            case 'artist':
                return artistData[periodIndex] || [];
            case 'album':
                return albumData[periodIndex] || [];
            default:
                return [];
        }
    };

    const filteredData = getFilteredData();

    return (
        <div className="flex-1 flex flex-col p-4">
            <div className="text-white text-center text-2xl font-bold mb-2">My Music Stats</div>
            
            {/* Stat Selector */}
            <div className="flex justify-center mb-8">
                {statOptions.map((option, index) => (
                    <button
                        key={option.id}
                        onClick={() => setStatType(option.id)}
                        className={`px-4 transition-colors duration-300 cursor-pointer ${
                            statType === option.id
                                ? 'bg-white/20 text-white font-medium'
                                : 'bg-black/80 text-white hover:bg-black/90 hover:text-white'
                        } ${
                            index === 0 ? 'rounded-l-lg' : ''
                        } ${
                            index === 1 ? 'border-x border-white/10' : ''
                        } ${
                            index === 2 ? 'rounded-r-lg' : ''
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {/* Time Period Dropdown */}
            <div className="flex justify-center ml-30 mb-2">
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="cursor-pointer flex items-center justify-between w-26 px-2 py-1 bg-black/80 text-white hover:bg-black/90 rounded-lg transition-colors"
                    >
                        <span className="font-medium">{selectedTimeOption?.label}</span>
                        <span className="material-icons text-sm ml-2">
                            {isDropdownOpen ? 'expand_less' : 'expand_more'}
                        </span>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute top-full w-26 mt-1 bg-black/90 rounded-lg overflow-hidden z-10 shadow-xl border border-white/10">
                            {timeOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        setTimePeriod(option.id);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`cursor-pointer w-full px-4 py-2 text-left transition-colors ${
                                        timePeriod === option.id
                                            ? 'bg-white/20 text-white font-medium'
                                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Track Display Area */}
            <div className="grid grid-cols-1 gap-6">
                {isLoading ? (
                    <div className="text-white text-center">Loading...</div>
                ) : filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                        <div key={index} className="bg-black/80 rounded-lg p-4 ">
                            <div className="aspect-square bg-black/90 rounded-lg mb-3">
                                {statType === 'album' ? (
                                    item.image && item.image[2] && item.image[2]['#text'] && (
                                        <img 
                                            src={item.image[2]['#text']} 
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    )
                                ) : statType === 'track' ? (
                                    item.spotifyImage ? (
                                        <img 
                                            src={item.spotifyImage} 
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/50">
                                            No Image
                                        </div>
                                    )
                                ) : statType === 'artist' ? (
                                    item.spotifyImage ? (
                                        <img 
                                            src={item.spotifyImage} 
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/50">
                                            No Image
                                        </div>
                                    )
                                ) : null}
                            </div>
                            
                            {statType === 'artist' ? (
                                <>
                                    <h3 className="text-white text-lg font-semibold">{item.name}</h3>
                                    <p className="text-white/80">Times Played: {item.playcount}</p>
                                </>
                            ) : statType === 'album' ? (
                                <>
                                    <h3 className="text-white text-lg font-semibold">{item.name}</h3>
                                    <p className="text-white/80">{item.artist.name}</p>
                                    <p className="text-white/80">Times Played: {item.playcount}</p>
                                </>
                            ) : statType === 'track' ? (
                                <>
                                    <h3 className="text-white text-lg font-semibold">{item.name}</h3>
                                    <p className="text-white/80">{item.artist.name}</p>
                                    <p className="text-white/80">Times Played: {item.playcount}</p>
                                </>
                            ) : null}
                        </div>
                    ))
                ) : (
                    <div className="text-white text-center">No data available</div>
                )}
            </div>
        </div>
    );
}

export default MusicTrack; 