import React, { useRef } from 'react';
import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/slices/filterSlice';
import debounce from 'lodash.debounce';

const Search = () => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = React.useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = (): void => {
    setSearchValue('');
    dispatch(setSearch(''));
    inputRef.current?.focus();
  };

  const onChangeCallback = React.useCallback(
    debounce((e) => {
      dispatch(setSearch(e.target.value));
    }, 400),
    [],
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onChangeCallback(e);
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={searchValue}
        onChange={(e) => onChangeInput(e)}
      />
      {searchValue && (
        <img
          onClick={() => onClickClear()}
          className={styles.cross}
          src="img/cross-symbol_icon-icons.com_74149.svg"
          alt="serach-cross"
        />
      )}
    </div>
  );
};

export default Search;
