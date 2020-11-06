function Pokesearch(props) {
    return(
      <div>
        <label id="Pokemon" htmlFor="">Pokemon: </label>
        <input onChange={props.onPokemonInput} type="text" placeholder="pokemon name"></input>
        <button onClick={props.onSearchPokemon} type="submit">Search</button>
      </div>
    )
}

export default Pokesearch