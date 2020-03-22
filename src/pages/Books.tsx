import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLoading, IonToast, IonButtons, IonBackButton } from '@ionic/react';
import { Book } from '../models/Book';
import { BookService } from '../services/BookService';
import BookList from '../components/ListBook';
import { useParams } from 'react-router';

import "../theme/theme.css";
import "../theme/variables.css"

type Params = {
  authorID?: string
}

const Books: React.FC = () => {

  const [books, setBooks] = useState<Book[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const params: Params = useParams();

  useEffect(() => {
    setShowLoading(true);

    if (!params.authorID) {
      BookService.getBooks().then((value) => {
        setBooks(value);

        setShowLoading(false);
      }
      ).catch(() => {
        setShowToast(true)
      });
    }
    else {
      BookService.getListBooksOfAuthors(params.authorID)
        .then((value) => {
          setBooks(value);
          setShowLoading(false);
        }
        ).catch(() => {
          setShowLoading(false);
          setShowToast(true)
        });

    }
  }
    , [])

  return (
    <IonPage id="books" color="dark" className="books">
      <IonHeader>
        <IonToolbar color="tertiary">
          {params.authorID ? (
            
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
          ) : (
              <></>
            )}
          <IonTitle>Livros</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="book" color="dark">
        <IonLoading isOpen={showLoading} onDidDismiss={() => setShowLoading(false)}
                    message={'Por favor aguarde carregando Livros...'} />
        <IonToast color="dark" isOpen={showToast} onDidDismiss={() => setShowToast(false)}
                  message={"Ocorreu um erro ao tentar carrgar a lista de livros..."} position="bottom"
                  duration={4000}  />

        <BookList books={books} />

      </IonContent>

    </IonPage >
  )
}

export default Books;