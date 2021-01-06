import React, { useState, useEffect } from 'react';
import { BookDescription } from './BookDescription';
import BookSearchItem from './BookSearchItem';

// 検索処理
function buildSearchUrl(title: string, author: string, maxResults: number): string {
    let url = "https://www.googleapis.com/books/v1/volumes?q=";
    const conditions: string[] = [];
    if(title) {
        conditions.push(`intitle:${title}`);
    }
    if(author) {
        conditions.push(`inauthor:${author}`);
    }
    return url + conditions.join('+') + `&maxResults=${maxResults}`;
}

function extractBooks(json: any): BookDescription[] {
    const items: any[] = json.items;
    return items.map((item: any) => {
        const volumeInfo: any = item.volumeInfo;
        return {
            title: volumeInfo.title,
            authors: volumeInfo.authors ? volumeInfo.authors.join(', ') : '',
            thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : '',
        }
    });
}


type BookSearchDialogProps = {
    maxResults: number;
    onBookAdd: (book: BookDescription) => void;
};

const BookSearchDialog = (props: BookSearchDialogProps) => {
    const [books, setBooks] = useState([] as BookDescription[]); // 初期値はからの配列
    const [title, setTitle] = useState('');   // 初期値は空文字列
    const [author, setAuthor] = useState(''); // 初期値は空文字列
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if(isSearching) {
            const url = buildSearchUrl(title, author, props.maxResults);
            fetch(url)
                .then((res) => {
                    return res.json();
                })
                .then((json) => {
                    return extractBooks(json);
                })
                .then((books) => {
                    setBooks(books);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        setIsSearching(false);
    }, [isSearching]);

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
        setIsSearching(true);
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
                        onChange={handleTitleInputChange}
                        placeholder='タイトルで検索'
                    />
                    <input 
                        type="text"
                        onChange={handleAuthorInputChange}
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