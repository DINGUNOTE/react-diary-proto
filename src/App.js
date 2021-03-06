import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from 'react';
import DiaryEditor from './components/DiaryEditor';
import DiaryList from './components/DiaryList';
import './App.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const createdDate = new Date().getTime();
      const newItem = {
        ...action.data,
        createdDate,
      };
      return [newItem, ...state];
    }
    case 'EDIT': {
      return state.map(it =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it,
      );
    }
    case 'REMOVE': {
      return state.filter(it => it.id !== action.targetId);
    }
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();

export const DiaryDispatchContext = React.createContext();

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/comments',
    ).then(response => response.json());

    const initData = response.slice(0, 20).map(it => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        createdDate: new Date().getTime(),
        id: dataId.current++,
      };
    });

    dispatch({ type: 'INIT', data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.currnet += 1;
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: 'EDIT', targetId, newContent });
  }, []);

  const onRemove = useCallback(targetId => {
    dispatch({ type: 'REMOVE', targetId });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, [onCreate, onRemove, onEdit]);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter(it => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor />
          <div>?????? ?????? : {data.length}</div>
          <div>?????? ?????? ?????? ?????? : {goodCount}</div>
          <div>?????? ?????? ?????? ?????? : {badCount}</div>
          <div>?????? ?????? ?????? ?????? : {goodRatio}</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;
