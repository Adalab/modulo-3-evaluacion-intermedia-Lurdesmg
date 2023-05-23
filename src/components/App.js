/* SECCIÓN DE IMPORT */
import '../styles/Reset.scss';
import '../styles/App.scss';
import '../styles/Mixins.scss';

import { useState, useEffect } from 'react';
import ls from '../service/localStorage';

function App() {
  const [quotes, setQuotes] = useState(ls.get('quotesInLS', []));
  const [filterPhrase, setFilterPhrase] = useState();
  const [filterActor, setFilterActor] = useState('all');
  // const [newPhrase , setNewPhrase] = useState ({
  //   quote: '',
  //   character: '',
  // });

  useEffect(() => {
    if (ls.notIncludes('quotesInLS')) {
      fetch('https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json')
        .then((response) => response.json())
        .then((data) => {
          setQuotes(data);
          ls.set('quotesInLS', data);
        });
    }
  }, []);

  const handleFilterPhrase = (ev) => {
    setFilterPhrase(ev.target.value);
  };

  const handleFilterActor = (ev) => {
    setFilterActor(ev.target.value);
  };

  const renderList = () => {
    return quotes
      .filter((oneQuote) => {
        return oneQuote.quote.toLocaleLowerCase().includes((filterPhrase || '').toLocaleLowerCase());
      })
      .filter((oneQuote) => {
        if (filterActor === 'all') {
          return true;
        } else {
          return oneQuote.character === filterActor;
        }
      })
      .map((oneQuote, index) => (
        <li className="main__itemList" key={index}>
          <p className="main__phraseActor">
            {oneQuote.quote} -<span className="main__nameActor">{oneQuote.character}</span>
          </p>
        </li>
      ));
  };

  // const handleNewPhrase = (ev) => {
  //   setNewPhrase({...newPhrase, [ev.target.id] : ev.target.value});
  // }

  // const handleClick = (ev) => {
  //   ev.preventDefault();
  //   setData([...data, newPhrase]);
  // }
  return (
    <div className="App">
      <header className="header">
        <form>
          <fieldset className="form">
            <label className="form__filterPhrase" htmlFor="name">
              {' '}
              Filtrar por frase:
              <input
                className="form__filterPhrase-input"
                name="phrase"
                type="text"
                id="name"
                onInput={handleFilterPhrase}
                value={filterPhrase}
              />
            </label>
            <label className="form__filterCharacter" htmlFor="actor">
              {' '}
              Filtrar por Personaje:
              <select
                className="form__filterCharacter-input"
                name="character"
                id="actor"
                onInput={handleFilterActor}
                value={filterActor}
              >
                Filtrar por personaje
                <option className="form__filterCharacter-option" value="all">
                  Todos
                </option>
                <option className="form__filterCharacter-option" value="Ross">
                  Ross
                </option>
                <option className="form__filterCharacter-option" value="Chandler">
                  Chandler
                </option>
                <option className="form__filterCharacter-option" value="Joey">
                  Joey
                </option>
                <option className="form__filterCharacter-option" value="Phoebe">
                  Phoebe
                </option>
                <option className="form__filterCharacter-option" value="Rachel">
                  Rachel
                </option>
                <option className="form__filterCharacter-option" value="Monica">
                  Monica
                </option>
              </select>
            </label>
            {/* <legend></legend>
            <label htmlFor="name"> Añade una frase nueva:
            <input placeholder='' onChange={handleNewPhrase} value={newPhrase.value}/>
            <input className="new-phrase__btn" type="submit" value="Añadir" onClick={handleClick}/>
            </label> */}
          </fieldset>
        </form>
      </header>
      <main className="main">
        <ul>{renderList()}</ul>
      </main>
      <footer className="footer">
        <p className="footer__copy">&copy Friends Web made by: Lourdes-mg </p>
      </footer>
    </div>
  );
}
export default App;
