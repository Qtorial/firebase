import admin from './admin';
import functions from './functions';
import {
  onTutorialDelete,
  onTutorialCreate,
  onTutorialUpdate,
  getTutorial,
  storePerformance,
  logError,
} from './tutorial';

admin.initializeApp(functions.config().firebase);

exports.onTutorialDelete = onTutorialDelete;
exports.onTutorialCreate = onTutorialCreate;
exports.onTutorialUpdate = onTutorialUpdate;

exports.getTutorial = getTutorial;
exports.logError = logError;
exports.storePerformance = storePerformance;
