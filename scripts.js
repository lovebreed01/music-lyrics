// global variables

const searchBtn = document.querySelector('#search-btn')

const clearSearch = () => {
    let searches = document.querySelector('.searched-songs')
    document.querySelector('#songs-head').style.display = 'none'
    searches.innerHTML = ''
}
// function that controls the search operation
const searchByArtistName = async () => {
    const search = document.querySelector('#search')
    if (search.value == '') {
        
        return false
    }
    else {
        clearSearch()
        searchBtn.innerHTML = `<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
<span class="sr-only">Loading...</span>`
        try {
       const response = await  fetch(`https://genius.p.rapidapi.com/search?q=${search.value}`, {
        "method": "GET",
        "headers": {
		"x-rapidapi-host": "genius.p.rapidapi.com",
		"x-rapidapi-key": "7cdb72d0d9msh58d22c0ddbc27edp104290jsnfa0d9bd5e6bc"
	    }
        })
        const data = await response.json()
            searchBtn.innerHTML = '<i class="fa fa-search" aria-hidden="true"></i>'
            search.value = ''
        const result = data.response.hits
            console.log(result);
            const searchedSongs = document.querySelector('.searched-songs')
            document.querySelector('#songs-head').style.display = 'block'
            result.map((song, index) => {
                let {result} = song
             let songName = `
                <div class='searched-container'>
                <a href=' ${result.url}'>
                <img src='${result.header_image_url}' >
                <p>${result.full_title}</p>
                
                </a>
                </div>
            `   
                searchedSongs.innerHTML += songName  
            })
     }
    catch (error) {
        console.log(error);
    }
    }
    
   
    
    
}

//function gets random songs from the genius api and then displays each song on the screen  with its image and title
const getSongs = async () => {
    const body = document.body 
    const page = document.getElementById('page')
    document.querySelector('#songs-head').style.display = 'none'
    page.style.display = 'none'
    const loader = document.createElement('div')
    loader.setAttribute('class', 'loader')
    body.appendChild(loader)
    try {
        const response = await fetch('https://genius.p.rapidapi.com/artists/350/songs',
            {
                'method': 'GET',
                'headers': {
                    "x-rapidapi-host": "genius.p.rapidapi.com",
                    "x-rapidapi-key": "7cdb72d0d9msh58d22c0ddbc27edp104290jsnfa0d9bd5e6bc",
                }
            })
        const data = await response.json()
        const songs = data.response.songs
        page.style.display = 'block'
        body.removeChild(loader)
        console.log(songs)
        songs.map((song, i ) => {
            let songName = `
            <div class='container'>
            <a href='${i} ${song.url}'>
             <img src='${song.song_art_image_url}' >
            <p>${song.full_title}</p>
               
            </a>
            </div>
            `
            document.querySelector('.songs').innerHTML += songName
        })
        
    } catch (error) {
        console.log(error)
    }
    
}

window.addEventListener('load', getSongs)
searchBtn.addEventListener('click', searchByArtistName)
