import React, { useContext } from 'react';
import Context from '../context/Context';

function Filters() {
  const {
    inputValue,
    options,
    handleInputChange,
    handleInputColumn,
    handleInputComparison,
    handleInputValue,
    handleClickFilter,
    filters,
    setFilters,
    setOptions,
    setData,
    dataOriginal,
    handleRemove,
    // handleFilters,
  } = useContext(Context);
  // console.log('1', filters);

  return (
    <div>
      <label htmlFor="name-filter">
        <input
          data-testid="name-filter"
          name="name-filter"
          onChange={ handleInputChange }
        />
      </label>
      <select
        data-testid="column-filter"
        name="inputColumn"
        onChange={ handleInputColumn }
      >
        {
          options.map((i) => (
            <option key={ i }>{i}</option>
          ))
        }
      </select>
      <select
        data-testid="comparison-filter"
        name="inputComparison"
        onChange={ handleInputComparison }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        value={ inputValue }
        name="inputValue"
        data-testid="value-filter"
        onChange={ handleInputValue }
      />
      <button
        type="button"
        data-testid="button-filter"
        name="inputValue"
        // value={ inputValue }
        onClick={ handleClickFilter }
      >
        Filtrar
      </button>
      <label htmlFor="select-ordem">
        Ordenar:
        <select
          data-testid="column-sort"
        >
          {
            options.map((i) => (
              <option value={ i } key={ i }>{i}</option>
            ))
          }
        </select>
      </label>
      {/* <label htmlFor="radio-asc">
        ASC
        <input
          data-testid="column-sort-input-asc"
          type="radio"
        />
      </label>
      <label htmlFor="radio-desc">
        DESC
        <input
          data-testid="column-sort-input-desc"
          type="radio"
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
      >
        Ordenar
      </button> */}
      <div>
        {
          filters.map((i) => (
            <div key={ i.column } data-testid="filter">
              <span>{ i.column }</span>
              {' '}
              <span>{ i.comparison }</span>
              {' '}
              <span>{ i.value }</span>
              {' '}
              <button
                type="button"
                onClick={ () => handleRemove(i) }
              >
                Remover
              </button>
            </div>
          ))
        }
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ () => {
            setFilters([]);
            setOptions([
              'population',
              'orbital_period',
              'diameter',
              'rotation_period',
              'surface_water',
            ]);
            setData(dataOriginal);
          } }
        >
          Remover Tudo
        </button>
      </div>
    </div>
  );
}

export default Filters;
