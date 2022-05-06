import DiaryEditor from './components/DiaryEditor';
import DiaryList from './components/DiaryList';
import './App.css';

const dummyList = [
  {
    id: 1,
    author: '홍길동',
    content: '오늘의 일기1',
    emotion: 5,
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    author: '아무개',
    content: '오늘의 일기2',
    emotion: 5,
    createdDate: new Date().getTime(),
  },
  {
    id: 3,
    author: '이순신',
    content: '오늘의 일기3',
    emotion: 5,
    createdDate: new Date().getTime(),
  },
  {
    id: 4,
    author: '이성계',
    content: '오늘의 일기4',
    emotion: 5,
    createdDate: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
