import React, { useEffect, useState } from 'react';
import { IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLoading, IonButton, IonIcon, IonToast } from '@ionic/react';
import { AuthorService } from '../services/AuthorService';
import { Author } from '../models/Author';
import { useHistory } from 'react-router';
import "../theme/theme.css";
import "../theme/variables.css"


const Authors: React.FC = () => {

  const [authors, setAuthors] = useState<Author[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setShowLoading(true);

    AuthorService.getAuthors()
      .then((value) => {
        setAuthors(value);

        setShowLoading(false);

      }).catch(() => {
        setShowToast(true);
      });

  }, [])

  const handleShowListBooksOfAuthor = (authorID: string) => {
    history.push(`/author/books/${authorID}`)
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Autores</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonLoading isOpen={showLoading} onDidDismiss={() => setShowLoading(false)}
                    message={'Por favor aguarde carregando autores...'} />
        <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)}
                  message={"Erro ao tentar carregar autores..."} duration={4000} />
        <IonList  className="listAuthors" color="dark">
          {authors.map((author, ) => {
            return (
              <IonItem key={author.objectId} button onClick={() => handleShowListBooksOfAuthor(author.objectId.toString())}>
                <IonLabel color="tertiary">{author.name}</IonLabel>
              </IonItem>
            )
          })}
        </IonList>
      </IonContent>
    </IonPage >

  )
}

export default Authors;