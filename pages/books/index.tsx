import { useEffect, useState } from "react";
import { Book } from "../../constants/books";
import Link from "next/link";

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/books");
      const data: Book[] = await response.json();
      setBooks(data);
    };
    fetchData();
  }, []);

  const postBook = async ({ id, title, about }: Book) => {
    await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, title: title, about: about }),
    });
  };
  return (
    <>
      <h1>本一覧</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link href={`/books/${book.id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
      <button onClick={() => postBook({ id: 5, title: "post", about: "aaaa" })}>
        本追加
      </button>
    </>
  );
};

export default Books;
