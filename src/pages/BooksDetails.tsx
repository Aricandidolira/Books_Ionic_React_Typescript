import React, { useState, useEffect } from 'react';
import { Book } from '../models/Book';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonLoading, IonToast, IonBackButton, IonButtons } from '@ionic/react';
import { BookService } from '../services/BookService';
import { useParams } from 'react-router';
import '../theme/theme.css';
import '../theme/variables.css'

type Params = {
  bookID?: string
}

const BooksDetailsProps: React.FC = () => {

  const [showLoading, setShowLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [book, setBook] = useState<Book>();
  const [note, setNote] = useState<number>(0);
  const params: Params = useParams();

  useEffect(() => {
    setMessageLoading('Carregando detalhes do Livro, aguarde por favor...');
    setShowLoading(true);
    if (params.bookID) {
      BookService.getBook(params.bookID)
        .then((value) => {
          setBook(value);

          setMessageLoading('Carregando nota, aguarde por favor...');
          BookService.getReviews(value)
            .then((value) => {

              let sumNote: number = 0;
              value.forEach((review) => {
                sumNote += review.rating;
              })

              setNote(sumNote / (value.length > 0 ? value.length : 1));
            })
            .catch(() => {
              setShowToast(true);
            })

          setShowLoading(false);

        })
        .catch(() => {
          setShowLoading(false);
          setShowToast(true);
        });
    }
    else {
      setShowToast(true);
    }
  }, [])


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>

          {!book ? (
            <IonTitle>Livro</IonTitle>
          ) : (
              <IonTitle>{book.title}</IonTitle>
            )}

        </IonToolbar>
      </IonHeader>

      <IonContent color="dark">
        < IonToast isOpen={showToast} onDidDismiss={() => setShowLoading(false)} message={"Não foi possível carregar a lista de livros, por favor aguarde"} duration={4000} />

        {!book ? (
          <IonLoading isOpen={showLoading} message={messageLoading} />
        ) :
          (<>
            <div className="book" color="dark">
              <img className="BookImg" src={book.cover} alt="" />
              <p><IonLabel className="titlebook" >{book.title}</IonLabel></p>
            </div>
            <div className="detailbook">
              <IonLabel  className="ListBookLabel">Por: {book.author.name}</IonLabel>
              <br></br>
              <IonLabel className="ListBookLabel">Quantidade disponível: {book.quantity}</IonLabel>
              <br></br>
              <IonLabel  className="ListBookLabel">Nota: {note}</IonLabel>
              <br></br>
            </div>
          </>)}

      </IonContent>
    </IonPage>
  )
}

export default BooksDetailsProps;