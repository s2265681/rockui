import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
  
} from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
// import Transition from '../Transition/transition'
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
  value: string;
}
// 使用的时候根据用户传入的类型T，使用泛型操作，加上自己的定义的value，结合在一起
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement; // 自定义模版设置
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const tirrgerSearch = useRef(false)  // 作为一个js对象用, 不用更新组件
  const comRef = useRef<HTMLDivElement>(null)    // 作为获取dom节点使用
  const debounceValue = useDebounce(inputValue, 500);
  // 点击外面关闭下拉框
  useClickOutside(comRef,()=>{setSuggestions([]);setHighlightIndex(-1)})
  
  useEffect(() => {
    if (debounceValue && tirrgerSearch.current) {
      const results = fetchSuggestions(debounceValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setSuggestions(data);
          setLoading(false);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
  }, [debounceValue, fetchSuggestions]);

  // 选择高亮
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    tirrgerSearch.current = true
    switch (e.keyCode) {
      case 13:  // 选中
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38: // 上
        highlight(highlightIndex - 1);
        break;
      case 40: // 下
        highlight(highlightIndex + 1);
        break;
      case 27:  // esc
        // setShowDropdown(false)
        setSuggestions([])
        break;
      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if(suggestions.length===0){
      setHighlightIndex(-1)
    }
  };

  const handleSelect = (item: DataSourceType) => {
    tirrgerSearch.current = false
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) onSelect(item);
    setHighlightIndex(-1)
  };

  const handleTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropdown = () => {

    return (
      <ul className="rock-suggestion-list">
        {suggestions.map((item, index) => {
          console.log(highlightIndex,'highlightIndex');
          const cnames = classNames("suggestion-item", {
            "is-active": index === highlightIndex,
          });
          return (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className={cnames}
            >
              {handleTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div ref={comRef} className="rock-auto-complete">
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {loading && (
        <ul>
          <Icon icon="spinner" spin></Icon>
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
