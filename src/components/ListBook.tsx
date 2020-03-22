import React from 'react';
import { Book } from '../models/Book';
import { IonList, IonItem, IonAvatar, IonLabel, IonText, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router';
import "../theme/theme.css";
import "../theme/variables.css"


type ListBooksProps = {
  books: Book[];
}

const ListBooksProps: React.FC<ListBooksProps> = ({ books }) => {

  const history = useHistory();

  const handleShowDetails = (id: string) => {
    history.push(`/book/${id}`);
  }



  return (
    <>
      <IonList color="dark" className="booklist">
        {books.map((book, ) => {
          return (
            <IonItem key={book.objectId} button onClick={() => handleShowDetails(book.objectId.toString())}>
              <IonAvatar className="imgavatar" >
                <img src={book.cover} alt="" />
              </IonAvatar>

              <IonLabel color="tertiary">
                {book.title}
                <h4>Autor: {book.author.name}</h4>
                <h4>Publicações: {book.quantity}</h4>
              </IonLabel>

            </IonItem>
          )
        }
        )}
      </IonList>
    </>
  )
}

export default ListBooksProps;