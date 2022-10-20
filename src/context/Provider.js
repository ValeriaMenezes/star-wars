import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [inputFilter, setInputFilter] = useState('');
  const [inputColumn, setInputColumn] = useState('population');
  const [inputComparison, setInputComparison] = useState('maior que');
  const [inputValue, setInputValue] = useState(0);

  // -----------------Requisito1-------------------
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

  // -----------------Requisito2--------------------

  const handleInputChange = ({ target }) => {
    const { value } = target;
    setInputFilter(value);
  };

  // -----------------Requisito3--------------------

  const handleInputColumn = ({ target }) => {
    const { value } = target;
    setInputColumn(value);
  };

  const handleInputComparison = ({ target }) => {
    const { value } = target;
    setInputComparison(value);
  };

  const handleInputValue = ({ target }) => {
    const { value } = target;
    setInputValue(value);
  };

  const handleClickFilter = () => {
    const skywalker = data.filter((i) => {
      switch (inputComparison) {
      case 'maior que': return Number(i[inputColumn]) > Number(inputValue);
      case 'menor que': return Number(i[inputColumn]) < Number(inputValue);
      default: return Number(i[inputColumn]) === Number(inputValue);
      }
    });
    setData(skywalker);
  };

  const contextState = useMemo(() => ({
    data,
    inputFilter,
    inputColumn,
    inputComparison,
    inputValue,
    handleInputChange,
    handleInputColumn,
    handleInputComparison,
    handleInputValue,
    handleClickFilter,
  }), [data, inputFilter, inputColumn, inputComparison, inputValue]);

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
