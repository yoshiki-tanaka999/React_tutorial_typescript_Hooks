import React, { useState } from "react";
import "./App.css";
import { BookToRead } from "./BookToRead";
import BookRow from './BookRow';

import Modal from 'react-modal';
import BookSearchDialog from './BookSearchDialog';

const dummyBooks: BookToRead[] = [
  {
    id: 1,
    title: "はじめてのReact",
    authors: "ダミー",
    memo: ""
  },
  {
    id: 2,
    title: "React Hooks入門",
    authors: "ダミー",
    memo: ""
  },
  {
    id: 3,
    title: "実践Reactアプリケーション開発",
    authors: "ダミー",
    memo: ""
  }
];

Modal.setAppElement('#root'); // Modal表示時にオーバーレイで囲むDOM領域を指定

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0. 0.8)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)"
  }
};

const App = () => {
  const [books, setBooks] = useState(dummyBooks); // 引数には初期値が入る
  const [modalIsOpen, setModalIsOpen] = useState(false) //初期値はfalse

  const handleBookDelete = (id: number) => {
    const newBooks = books.filter((book) => book.id !== id); // 厳密には削除でなく、新しい配列に直す
    setBooks(newBooks);
  }

  const handleBookMemoChange = (id: number, memo: string) => {
    const newBooks = books.map((book) => {
      // 書籍データのうち、IDが合致した場合、メモ欄を更新した値で新しい配列に格納
      return book.id === id
      ? {...book, memo: memo}
      : book;
    });
    setBooks(newBooks); //あたらしい配列を、books(初期値は、dummyBooks)に更新する
  }

  const bookRows = books.map((book) => {
    return (
      <BookRow
        book={book}
        key={book.id}
        onMemoChange={(id, memo) => handleBookMemoChange(id, memo)}
        onDelete={(id) => handleBookDelete(id)}
      />
    );
  });

  const handleAddClick = () => {
    setModalIsOpen(true);
  }

  const handleModalClose = () => {
    setModalIsOpen(false);
  }

  return (
    <div className="App">
      <section className="nav">
        <h1>読みたい本リスト</h1>
        <div className="button-like" onClick={handleAddClick}>本を追加</div>
      </section>
      <section className="main">{bookRows}</section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        style={customStyles}
      >
        <BookSearchDialog maxResults={20} onBookAdd={(book) => {}}/>
      </Modal>
    </div>
  );
};

export default App;
