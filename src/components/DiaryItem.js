const DiaryItem = ({ id, author, content, emotion, createdDate }) => {
  return (
    <div className="diary-item">
      <div className="info">
        <div>
          작성자 : {author} | 감정점수 : {emotion}
        </div>
        <div className="date">{new Date(createdDate).toLocaleString()}</div>
      </div>
      <div className="content">{content}</div>
    </div>
  );
};

export default DiaryItem;
