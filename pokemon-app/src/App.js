// cd pokemon-app
// npm start
// Will Jantscher and Andrew Rohn

// As a user, I want to be able to search for a specific Pokemon so that I can see all of the important/relevant information about them.

// import logo from './logo.svg'
import pokeball from './pokeball.gif'
import React from 'react'
import './App.css';
import Pokesearch from './Pokesearch'
import Allpokemon from './Allpokemon'

class App extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      inputPokemonTemp: '',
      inputPokemon: '',
      searching: false,
      pokemonData: {}
    }
  }

  //take input and store to value
  handlePokemonInput = (event) => {
    event.preventDefault()
    this.setState({inputPokemonTemp: event.target.value})
    //every time this is triggered, the value is sent to the itemInput state
  }
  handleSearchPokemon = () => {
    let value = this.state.inputPokemonTemp;
    this.setState({inputPokemon: value}, () => 
      {
        this.pokemonAPISearch()
      })
  }



  //life-cycle method
  componentDidMount() {}

  //async-await
  pokemonAPISearch = async () => {
      await fetch('https://pokeapi.co/api/v2/pokemon/'+this.state.inputPokemon)
        .then(res => res.json())
        .then(data => {
          //console.log(data)
          const pokeData = {
            name: data.name,
            id: data.id,
            types: data.types.map(slot => slot.type.name),
            abilities: data.abilities.map(ability => ability.ability.name),
            versions: data.game_indices.map(game => game.version.name),
            stats: data.stats.map(stat => {
              return `${stat.stat.name}: ${stat.base_stat}`
            })
          };
          var textarea = document.getElementById('output')
          textarea.innerHTML = JSON.stringify(pokeData)
          this.setState({pokemonData: pokeData}, () => console.log(this.state.pokemonData))
        })
        .catch(err => console.log(err))
  }

  handleDisplayAllPokemon = async () => {
    const allPokemon = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
    const allPokemonJson = await allPokemon.json();
    const allPokemonNames = await allPokemonJson.results.map(pokemon => {
      return (
        {name: pokemon.name,
        url: pokemon.url
        })
    })

    // let arr = []
    // const res = async () => {
    //   return Promise.all(allPokemonNames.map(item => arr.push(fetch(item.url))))
    // }
    // console.log(await arr)


    //need promises.all here before looping
    console.log(await allPokemonNames)
      
    // for (let pokemon in await allPokemonNames) {
    //   //console.log(pokemon)
    //   let data = await fetch(pokemon.url);
    //   //console.log(await data)
    //   // images.push(dataJson.sprite.front_shiny)
    //   // console.log(images)
    // }

    
    //console.log(allPokemonNames)
    //console.log(allPokemonJson.results[0])
  }

  //need to create an array of all pokemon urls using fetch
    //https://pokeapi.co/api/vs/pokemon/pokemon?limt=2000
      //returns results array
        //each item in array has name and url (store these into new array)
          //fetch each new page and store the url for the .sprite.front_shiny
            //pass on the url and pokemon name
              //fetch each image from the url and store as image
                //pass out 


    //pokemon page has a sprites object
      //sprites has a front_shiny key with the url for the image
      //will need to set this url inside <image></image> and return for each

  render () {
    return (
      <div className="App">
      <header className="App-header">

        <img src={pokeball} alt="loading..." />

        <Allpokemon 
          onDisplayAllPokemon={this.handleDisplayAllPokemon}
        />

        <br></br>

        <Pokesearch 
          onPokemonInput={this.handlePokemonInput}
          onSearchPokemon={this.handleSearchPokemon}
        />
        
        <div>
          <p>Name: {JSON.stringify(this.state.pokemonData.name)}</p>
          <p>Id: {JSON.stringify(this.state.pokemonData.id)}</p>
          <p>Type: {JSON.stringify(this.state.pokemonData.types)}</p>
          <p>Abilities: {JSON.stringify(this.state.pokemonData.abilities)}</p>
          <p>Version: {JSON.stringify(this.state.pokemonData.versions)}</p>
          <p>Stats: {JSON.stringify(this.state.pokemonData.stats)}</p>
        </div>

        <textarea id="output"></textarea>
        
        </header>

      </div>
    )
  }
}

export default App;
