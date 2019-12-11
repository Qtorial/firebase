import functions from './functions';
import PathOperators from './models/path-oerators';
import { URL } from 'url';
import Tutorial  from './models/tutorial';
import Ga from './models/ga';
import admin from './admin';
import Step from './models/step';

export const onTutorialCreate = functions.firestore
  .document('/users/{userID}/tutorials/{tutorialID}')
  .onCreate(async (snap, context) => {
    const newValue: any = snap.data();
    const pathPriority = PathOperators.find(p => p.value === newValue.pathOperator)!.pathPriority;
    try {
      await snap.ref.update({
        pathPriority
      })
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  });

export const onTutorialUpdate = functions.firestore
  .document('/users/{userID}/tutorials/{tutorialID}')
  .onUpdate(async (snap, context) => {
    const newValue: any = snap.after.data();
    const pathPriority = PathOperators.find(p => p.value === newValue.pathOperator)!.pathPriority;
    try {
      await snap.after.ref.update({
        pathPriority
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  });

export const onTutorialDelete = functions.firestore
  .document('/users/{userID}/tutorials/{tutorialID}')
  .onDelete(async (snap, context) => {
    try {
      const querySnapshot = await snap.ref.collection('steps').get();
      await Promise.all(querySnapshot.docs.map(doc => doc.ref.delete()));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  });


export const getTutorial = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  if (request.method === 'OPTIONS') {
    response.set('Access-Control-Allow-Methods', 'POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    return response.status(204).send('');
  } else if (request.method === 'POST') {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    if (request.body === undefined || request.body.url === undefined || request.body.key === undefined || request.body.once === undefined) {
      return response.status(422).send('Unprocessable Entity');
    }
    let selectedTutorial: Tutorial|null = null;
    let ga: object|null = null;
    const url = new URL(request.body.url);
    const userKey = request.body.key;
    const once: string[] = request.body.once;

    const tutorialRefs: FirebaseFirestore.QuerySnapshot = await admin.firestore().collection("users").doc(userKey).collection('tutorials').where('isActive', '==', true).orderBy('pathPriority', 'asc').get();
    // tutorialsをループしてpathvalueをチェックする
    const matchedTutorials: Tutorial[] = [];
    tutorialRefs.forEach(ref => {
      const tutorial = new Tutorial({
        ...ref.data(),
        id: ref.id,
      });
      if (!once.includes(ref.id) && tutorial.couldBeShownOn(url)) {
        if (tutorial.hasSameParameters(url)) {
          if (!tutorial.domain || tutorial.couldBeShownOn(url, true)) {
            matchedTutorials.push(tutorial);
          }
        }
      }
    });
    if (matchedTutorials.length > 0) {
      selectedTutorial = matchedTutorials[0];
    }
    if (selectedTutorial) {
      const selectedTutorialRef = admin.firestore().collection("users").doc(userKey).collection('tutorials').doc(selectedTutorial.id!)
      const stepRefs = await selectedTutorialRef.collection('steps').orderBy('order', 'asc').get();
      selectedTutorial.steps = stepRefs.docs.map(ref => {
        return new Step({
          id: ref.id,
          ...ref.data()
        });
      })
      if (selectedTutorial.gaId) {
        const gaRef = await admin.firestore().collection("users").doc(userKey).collection('gas').doc(selectedTutorial.gaId).get();
        if (gaRef.exists) {
          ga = new Ga({
            id: gaRef.id,
            ...gaRef.data(),
          });
        }
      }
    }
    return response.status(200).send({
      tutorial: selectedTutorial,
      ga,
    });
  }
  return response.status(405).send('Method Not Allowed');
});

export const storePerformance = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  if (request.method === 'OPTIONS') {
    response.set('Access-Control-Allow-Methods', 'POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    return response.status(204).send('');
  } else if (request.method === 'POST') {
    const tutorialId: string = request.body.tutorialId;
    const userKey: string = request.body.key;
    if (!request.body || !tutorialId) {
      return response.status(422).send('Unprocessable Entity');
    }
    const ref = admin.firestore().collection("users").doc(userKey).collection('tutorials').doc(tutorialId).collection("performances").doc();
    await ref.set({
      completeSteps: request.body.completeSteps,
      allSteps: request.body.allSteps,
      complete: request.body.complete,
      elapsedTime: request.body.elapsedTime,
      euId: request.body.euId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return response.sendStatus(200);
  }
  return response.status(405).send('Method Not Allowed');
});
