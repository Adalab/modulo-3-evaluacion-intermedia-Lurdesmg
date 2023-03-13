/* SECCIÓN DE IMPORT */
import '../styles/App.scss';
import objFriends from '../data/data.json';
import { useState } from 'react';
import ls from '../service/localStorage';

function App() {
  const [data , setData] = useState(objFriends);
  const [search , setSearch] = useState(ls.get('search' , ''));
  const [actor , setActor] = useState (ls.get('actor' , ''));
  const [newPhrase , setNewPhrase] = useState ({
    quote: '',
    character: '',
  });

  const renderList = () => {
    return data
    .filter((eachActor) => {
      return eachActor.quote.toLowerCase().includes(search.toLowerCase());
    })
    .filter ((eachActor) =>{
      return eachActor.character.toLowerCase().includes(actor.toLowerCase());
    })
    .map((eachActor, i) => (
      <li className="itemList" key={i}>
          <p className="phraseActor">{eachActor.quote} - 
          <span className="nameActor">{eachActor.character}</span></p>
      </li>
    ))
  }

  const handleFilter = (ev) => {
    ls.set('search', ev.target.value);
    setSearch(ev.target.value);
  }

  const handleFilterActor = (ev) => {
    ls.set('actor', ev.target.value);
    setActor(ev.target.value);
  }

  const handleNewPhrase = (ev) => {
    setNewPhrase({...newPhrase, [ev.target.id] : ev.target.value});
  }

  const handleClick = (ev) => {
    ev.preventDefault();
    setData([...data, newPhrase]);
  }
  return (
    <div className="App"> 
      <header>
        <h1 className="title">Frases de Friends</h1>
        <form>
          <fieldset>
            <legend></legend>
            <label htmlFor="name"> Filtrar por frase
                <input type="text" id='name' onChange={handleFilter} value={search}/>
            </label>
            <legend></legend>
            <label htmlFor='actor'> Filtrar por Personaje
                <select name="character" id="actor" onChange={handleFilterActor} value={actor}>Filtrar por personaje
                <option disabled selected value="">Todos</option>
                <option value="Ross">Ross</option>
                <option value="Chandler">Chandler</option>
                <option value="Joey">Joey</option>
                <option value="Phoebe">Phoebe</option>
                <option value="Rachel">Rachel</option>
                <option value="Monica">Monica</option>
                </select>
            </label>
            <legend></legend>
            <label htmlFor="name"> Añade una frase nueva:
            <input placeholder='' onChange={handleNewPhrase} value={newPhrase.value}/>
            <input className="new-phrase__btn" type="submit" value="Añadir" onClick={handleClick}/>
            </label>
          </fieldset>
        </form>
        </header>
        <main>
            <ul>
                {renderList()}
            </ul>
        </main>
  </div>

   );
}
export default App;
