import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

import { QUERY_USER } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';
// import { DELETE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
  const [userData, setUserData] = useState({});

  const [deleteBook, {error: bookError, data: bookDetails}] = useMutation(DELETE_BOOK, {
    refetchQueries: [
      QUERY_USER,
        'getSingleUser'
    ],
   });
  console.log(bookDetails);
  const getID = Auth.getProfile().data._id;

  const { loading, error, data } = useQuery(QUERY_USER, {
      variables: { userId: getID }
      , pollInterval: 500
  });

  const bookData = data?.getSingleUser || [];

  if(!error&&!loading&&(bookData!==userData)){
    setUserData(bookData)
  }

  console.log(userData); 

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  console.log(userDataLength);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }  

        // const response = await getMe(token);

        // if (!response.ok) {
        //   throw new Error('something went wrong!');
        // }

        // const user = await response.json();

        // setUserData(user);
        console.log(data);

        
        
        console.log(userData);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [5]);
  // }, [userDataLength]);


  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    // console.log(bookId)
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    // const delBk = async() => {
    try {
      const { bookDetails } = await deleteBook({
        variables: {
          bookId: bookId,
          userId: getID,
        }
      }, {onCompleted: (data) => console.log(data)})
      removeBookId(bookId);
      console.log(bookDetails);
      const bookCheck = bookDetails;
      if(bookDetails){
        console.log(bookCheck);
        console.log("CHECKING");
      }      
      
      // const response = await deleteBook(bookId, token);

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      // const updatedUser = await response.json();
      // setUserData(bookDetails);
      // upon success, remove book's id from localStorage
      // removeBookId(bookId);

    } catch (err) {
      console.error(err);
    }
  // }
  // delBk().then(()=>{console.log(bookDetails);
                    // setUserData(bookDetails.deleteBook);
                    // console.log("UPDATING")});
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }
  // if (loading) {
  //   return <div>Loading...</div>
  // }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
