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

  const onDelete = targetId => {
    const newDiaryList = data.filter(it => it.id !== targetId);
    setData(newDiaryList);
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onDelete={onDelete} />
    </div>
  );
}

export default App;
