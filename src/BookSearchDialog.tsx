import React, { useState, useRef } from 'react';
import { BookDescription } from './BookDescription';
import BookSearchItem from './BookSearchItem';
import { useBookData } from './useBookData';


type BookSearchDialogProps = {
    maxResults: number;
    onBookAdd: (book: BookDescription) => void;
};

const BookSearchDialog = (props: BookSearchDialogProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const books = useBookData(title, author, props.maxResults);

    const handleSearchClick = () => {
        if(!titleRef.current!.value && !authorRef.current!.value) {
            alert('条件を入力してください');
            return;
        }
        // 検索実行
        setTitle(titleRef.current!.value);
        setAuthor(authorRef.current!.value);
    };

    const handleBookAdd = (book: BookDescription ) => {
        props.onBookAdd(book);
    };

    const bookItems = books.map((book, idx) => {
        return (
            <BookSearchItem
                description={book}
                onBookAdd={(book) => handleBookAdd(book)}
                key={idx}
            />
        );
    });

    return (
        <div className='dialog'>
            <div className='operation'>
                <div className='conditions'>
                    <input 
                        type="text"
                        ref={titleRef}
                        placeholder='タイトルで検索'
                    />
                    <input 
                        type="text"
                        ref={authorRef}
                        placeholder='著者名で検索'
                    />
                </div>
                <div className='button-like' onClick={handleSearchClick}>
                    検索
                </div>
            </div>
            <div className='search-results'>{bookItems}</div>
        </div>
    );
};

export default BookSearchDialog;