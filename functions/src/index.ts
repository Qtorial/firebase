import admin from './admin';
import functions from './functions';
import {
  onTutorialDelete,
  onTutorialCreate,
  onTutorialUpdate,
  deleteGaId,
  getTutorial,
  storePerformance,
  logError,
} from './tutorial';
import {
  updateAssets,
} from './asset';

admin.initializeApp(functions.config().firebase);

exports.onTutorialDelete = onTutorialDelete;
exports.onTutorialCreate = onTutorialCreate;
exports.onTutorialUpdate = onTutorialUpdate;
exports.deleteGaId = deleteGaId;

exports.getTutorial = getTutorial;
exports.logError = logError;
exports.storePerformance = storePerformance;

exports.updateAssets = updateAssets;
