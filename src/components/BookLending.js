// src/components/BookLending.js
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './BookLending.css';

function BookLending() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    bookName: '',
    category: '',
    borrowDate: '',
    returnDate: '',
    borrower: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'books'));
      const booksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBooks(booksData);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'books', editingId), formData);
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'books'), formData);
      }
      setFormData({
        bookName: '',
        category: '',
        borrowDate: '',
        returnDate: '',
        borrower: ''
      });
      fetchBooks();
    } catch (error) {
      console.error('Error adding/updating book:', error);
    }
  };

  const handleEdit = (book) => {
    setFormData(book);
    setEditingId(book.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'books', id));
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="book-lending-container">
      <h1>ระบบยืมคืนหนังสือ</h1>
      
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label>ชื่อหนังสือ:</label>
          <input
            type="text"
            value={formData.bookName}
            onChange={(e) => setFormData({...formData, bookName: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>ประเภท:</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            required
          >
            <option value="">เลือกประเภท</option>
            <option value="นิยาย">นิยาย</option>
            <option value="การ์ตูน">การ์ตูน</option>
            <option value="วิชาการ">วิชาการ</option>
            <option value="อื่นๆ">อื่นๆ</option>
          </select>
        </div>

        <div className="form-group">
          <label>วันที่ยืม:</label>
          <input
            type="date"
            value={formData.borrowDate}
            onChange={(e) => setFormData({...formData, borrowDate: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>วันที่คืน:</label>
          <input
            type="date"
            value={formData.returnDate}
            onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>ชื่อผู้ยืม:</label>
          <input
            type="text"
            value={formData.borrower}
            onChange={(e) => setFormData({...formData, borrower: e.target.value})}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          {editingId ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล'}
        </button>
      </form>

      <div className="books-table-container">
        <table className="books-table">
          <thead>
            <tr>
              <th>ชื่อหนังสือ</th>
              <th>ประเภท</th>
              <th>วันที่ยืม</th>
              <th>วันที่คืน</th>
              <th>ผู้ยืม</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.bookName}</td>
                <td>{book.category}</td>
                <td>{book.borrowDate}</td>
                <td>{book.returnDate}</td>
                <td>{book.borrower}</td>
                <td>
                  <button onClick={() => handleEdit(book)} className="edit-btn">
                    แก้ไข
                  </button>
                  <button onClick={() => handleDelete(book.id)} className="delete-btn">
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookLending;