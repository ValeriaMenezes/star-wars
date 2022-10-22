import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  // O aluno Romulo Silva me ajudou quando travei na lógica dos requisitos 6 e 7
  const [data, setData] = useState([]);
  const [dataOriginal, setDataOriginal] = useState([]);
  const [inputFilter, setInputFilter] = useState('');
  const [inputColumn, setInputColumn] = useState('population');
  const [inputComparison, setInputComparison] = useState('maior que');
  const [inputValue, setInputValue] = useState(0);
  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [filters, setFilters] = useState([]);

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
      setDataOriginal(filteringResult);
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

  // -----------------Requisito6--------------------

  const handleFilters = useCallback(() => {
    const objFilters = {
      column: inputColumn,
      comparison: inputComparison,
      value: inputValue,
    };
    setFilters((prevState) => ([
      ...prevState,
      objFilters,
    ]));
  });

  const handleClickFilter = useCallback(() => {
    const skywalker = data.filter((i) => {
      switch (inputComparison) {
      case 'maior que': return Number(i[inputColumn]) > Number(inputValue);
      case 'menor que': return Number(i[inputColumn]) < Number(inputValue);
      default: return Number(i[inputColumn]) === Number(inputValue);
      }
    });

    setData(skywalker);

    const optionsFilter = options.filter((e) => e !== inputColumn);
    setOptions(optionsFilter);
    setInputColumn(optionsFilter[0]);
    handleFilters();
  }, [data, handleFilters, inputColumn, inputComparison, inputValue, options]);

  // -----------------Requisito7--------------------

  const handleRemove = useCallback(({ target }) => {
    const buscaIndex = filters.findIndex((element) => element
      .column === target.parentElement.firstElementChild.innerText);
    // console.log('buscaIndex', buscaIndex);
    const wordColumn = filters[buscaIndex].column;
    // console.log('wordColumn', wordColumn);
    setInputColumn((prevState) => [
      wordColumn,
      ...prevState,
    ]);
    filters.splice(buscaIndex, 1);

    // const teste = filters.filter((e) => e.column !== i.column);
    // setOptions((prevState) => [i.column, ...prevState]);
    // setFilters(teste);
    // não deu certo  e então Romulo me ajudou com lógica acima

    const array = [];
    const mapFilter = filters.map(({ column, comparison, value }) => {
      const filterColumn = dataOriginal.filter((e) => {
        switch (comparison) {
        case 'maior que': return Number(e[column]) > Number(value);
        case 'menor que': return Number(e[column]) < Number(value);
        default: return Number(e[column]) === Number(value);
        }
      });
      return filterColumn;
    });
    mapFilter.forEach((e) => array.push(...e));
    if (array.length > 0) {
      setData(array);
    } else {
      setData(dataOriginal);
    }
  });

  const contextState = useMemo(() => ({
    data,
    inputFilter,
    inputColumn,
    inputComparison,
    inputValue,
    options,
    filters,
    dataOriginal,
    setDataOriginal,
    setData,
    setFilters,
    setOptions,
    handleInputChange,
    handleInputColumn,
    handleInputComparison,
    handleInputValue,
    handleClickFilter,
    handleRemove,
    // handleFilters,
  }), [data,
    inputFilter,
    inputColumn,
    inputComparison,
    inputValue,
    options,
    filters,
    dataOriginal,
    handleClickFilter,
    handleRemove]);

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
