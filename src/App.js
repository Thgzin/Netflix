import React, {useEffect, useState} from 'react';
import MovieRow from './components/MovieRow'
import FeatureMovie from './components/FeatureMovie/FeatureMovie.js'
import './App.css';
import Header from './components/Header/Header.js'


import Tmdb from './TMDB'

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(true);

  useEffect(() => {
      
    const loadAll = async() => {

      //Pegando a lista total dos filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      //Pegando o Featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      
      setFeaturedData(chosenInfo);
    }

    loadAll();
    
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else{
          setBlackHeader(false)
        }
    }
    window.addEventListener('scroll', scrollListener);
    return() =>{
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return (
    <div className="page">

<Header black={blackHeader} />

    {featuredData &&
    <FeatureMovie item={featuredData}/>
    }



    <section className="lists">
      {movieList.map((item, key)=>(
      <MovieRow key={key} title={item.title} items={item.items} />
      ))}
    </section>

    <footer>
      Direitos de imagem para <span>Netflix</span><br/>
      Dados pegos do site hrefThemoviedb.org
    </footer>

    {movieList.length <= 0 &&

    <div className="loading">
      <img src="./assets/Netflix_LoadTime.gif" alt="Carregando ..." />
      </div> 
}
    </div>
  )
}


