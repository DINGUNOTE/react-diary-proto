import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import DiaryEditor from './components/DiaryEditor';
import DiaryList from './components/DiaryList';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);

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

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    const createdDate = new Date().getTime();
    const newItem = {
      id: dataId.current,
      author,
      content,
      emotion,
      createdDate,
    };
    dataId.currnet += 1;
    setData(data => [newItem, ...data]);
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    setData(data =>
      data.map(it =>
        it.id === targetId ? { ...it, content: newContent } : it,
      ),
    );
  }, []);

  const onRemove = useCallback(targetId => {
    setData(data => data.filter(it => it.id !== targetId));
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter(it => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 갯수 : {goodCount}</div>
      <div>기분 나쁜 일기 갯수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList diaryList={data} onEdit={onEdit} onRemove={onRemove} />
    </div>
  );
};

export default App;
