import React, { useState, useRef, useEffect } from 'react';

const DiaryItem = ({
  id,
  author,
  content,
  emotion,
  createdDate,
  onEdit,
  onRemove,
}) => {
  useEffect(() => {
    console.log(`${id}번 째 아이템 렌더!`);
  });

  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  const handleRemove = () => {
    if (window.confirm(`${id}번 째 일기를 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  return (
    <div className="diary-item">
      <div className="info">
        <div>
          작성자 : {author} | 감정점수 : {emotion}
        </div>
        <div className="date">{new Date(createdDate).toLocaleString()}</div>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={e => setLocalContent(e.target.value)}
            ></textarea>
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button type="button" onClick={handleQuitEdit}>
            수정 취소
          </button>
          <button type="button" onClick={handleEdit}>
            수정 완료
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={toggleIsEdit}>
            수정하기
          </button>
        </>
      )}
      <button type="button" onClick={handleRemove}>
        삭제하기
      </button>
    </div>
  );
};

export default React.memo(DiaryItem);
