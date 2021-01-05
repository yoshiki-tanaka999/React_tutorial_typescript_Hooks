import React, { useState } from 'react';
import { BookDescription } from './BookDescription';
import BookSearchItem from './BookSearchItem';

type BookSearchDialogProps = {
    maxResults: number;
    onBookAdd: (book: BookDescription) => void;
};

const BookSearchDialog = (props: BookSearchDialogProps) => {
    const [books, setBooks] = useState([] as BookDescription[]); // 初期値はからの配列
    const [title, setTitle] = useState('');   // 初期値は空文字列
    const [author, setAuthor] = useState(''); // 初期値は空文字列

    // 実際に、setXXX関数を呼び出し、stateの更新が確認されると、コンポーネントの再レンダリングが行われる
    // すなわち、BookSearchDialog関数が実行される
    const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleAuthorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value);
    };

    const handleSearchClick = () => {
        if(!title && !author) {
            alert('条件を入力してください');
            return;
        }
        // 検索実行
    };

    const handleBookAdd = (book: BookDescription ) => {
        props.onBookAdd(book);
    };
};