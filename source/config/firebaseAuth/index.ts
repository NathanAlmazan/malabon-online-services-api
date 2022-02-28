import * as firebaseAdmin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = require('./malabon-online-services-firebase-adminsdk-3r6ib-b8eb7b868b.json');

const firebaseAdminApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

const firebaseAdminAuth = getAuth(firebaseAdminApp);

export default firebaseAdminAuth;