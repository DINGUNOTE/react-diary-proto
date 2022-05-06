const DiaryItem = ({ id, author, content, emotion, createdDate, onRemove }) => {
  return (
    <div className="diary-item">
      <div className="info">
        <div>
          작성자 : {author} | 감정점수 : {emotion}
        </div>
        <div className="date">{new Date(createdDate).toLocaleString()}</div>
      </div>
      <div className="content">{content}</div>
      <button
        type="button"
        onClick={() => {
          console.log(id);
          if (window.confirm(`${id}번 째 일기를 삭제하시겠습니까?`)) {
            onRemove(id);
          }
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default DiaryItem;
