import { useState, useEffect } from 'react';
import { BookDescription } from './BookDescription';

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

export const useBookData = (title: string, author: string, maxResults: number) => {
    const [books, setBooks] = useState([] as BookDescription[]); // 初期値はからの配列

    useEffect(() => {
        if(title || author ) {
            const url = buildSearchUrl(title, author, maxResults);
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
    }, [title, author, maxResults]);

    //  BookSearchDialog コンポーネント側で必要とするため、戻り値として返却
    // TypeScriptでは、複数の型の値を配列で返却して呼び出し元で受け取るには、as constが必要
    return books;
}