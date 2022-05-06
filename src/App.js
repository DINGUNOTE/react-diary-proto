import { useState, useRef } from 'react';
import DiaryEditor from './components/DiaryEditor';
import DiaryList from './components/DiaryList';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const createdDate = new Date().getTime();
    const newItem = {
      id: dataId.current,
      author,
      content,
      emotion,
      createdDate,
    };
    dataId.currnet += 1;
    setData([newItem, ...data]);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map(it =>
        it.id === targetId ? { ...it, content: newContent } : it,
      ),
    );
  };

  const onRemove = targetId => {
    const newDiaryList = data.filter(it => it.id !== targetId);
    setData(newDiaryList);
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onEdit={onEdit} onRemove={onRemove} />
    </div>
  );
}

export default App;
