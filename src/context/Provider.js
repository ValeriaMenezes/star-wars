import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // delete retorna boolean, é necessário retornar o item
    const fetchData = async () => {
      const URL = 'https://swapi.dev/api/planets';
      const response = await fetch(URL);
      const { results } = await response.json();
      const filteringResult = results.map((item) => {
        delete item.residents;
        return item;
      });
      // console.log();
      setData(filteringResult);
    };

    fetchData();
  }, []);

  const contextState = useMemo(() => ({
    data,
  }), [data]);

  return (
    <Context.Provider value={ contextState }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
