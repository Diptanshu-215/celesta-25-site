// firebase-bulk-users.js
// SINGLE FILE: Creates Auth users + Firestore user docs with Celesta ID
// Run with: node firebase-bulk-users.js
// npm init -y && npm i firebase-admin

const admin = require('firebase-admin');

// ===== YOUR CONFIGURATION HERE =====
const serviceAccount = require('../celesta-service-account.json');
const projectId = 'celesta-iitp'; // Edit this

const usersToCreate = [
  {name: 'Test0',
    email:'test0@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Vaishu Mishra',
    email: 'mishra.vaishu28@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Anshu Priyambada',
    email: 'anshupriyambada2@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Brajeswar',
    email: 'brajeswar520@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Ayan Bhui',
    email: 'ayanbhui121@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Vivek K',
    email: 'vivek.k3331@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Abhijeet Engineer',
    email: 'engineerabhijeet110@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Shubh Shresth',
    email: 'shubhshresth9@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Sujal Giri',
    email: 'sujalgiri5@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Sraj Saxena',
    email: 'srajsaxena30@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Shubh Krit',
    email: 'shubhkrit078@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Krishan Raj',
    email: 'krishanraj2214@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'H7177743',
    email: 'h7177743@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Akriti Singh',
    email: 'akritisingh15920@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Muna Kumar Ranjan',
    email: 'munakumarranjan1990@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Aradhya Ranjan',
    email: 'aradhyaranjan402@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Aph602',
    email: 'aph602@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Sg0910063',
    email: 'sg0910063@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Drishan Roy',
    email: 'drishanroy0610@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Monu Kumar',
    email: 'monukumar790302@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Iam Anurag',
    email: 'iamanurag991@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Abhishek Gupta',
    email: 'abhishekgupta40002@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Harshika',
    email: 'harshika03072007@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Mohit Yadav',
    email: 'mohityadav776622@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Mayank Chotu Yadav',
    email: 'mayankchotuyadav21@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Sidd Jain',
    email: 'jainsidd829@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Vaibhav Singh Srinate',
    email: 'singhsrinatevaibhav@gmail.com',
    password: 'Pass123!'
  },
  {
    name: 'Aarug',
    email: 'aarug859@gmail.com',
    password: 'Pass123!'
  }
];

// ===== INITIALIZE APP =====
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: projectId,
  });
}

const auth = admin.auth();
const db = admin.firestore();

// ===== HELPER FUNCTIONS =====
const IITP_REGEX = /^[a-zA-Z]+_[0-9]{4}[a-zA-Z]{2}[0-9]{2}@iitp\.ac\.in$/;

function generateCelestaId() {
  return `CEL26-${Math.floor(100000 + Math.random() * 900000)}`;
}

async function checkExistingUser(email) {
  try {
    await auth.getUserByEmail(email);
    return true;
  } catch (error) {
    if (error.code === 'auth/user-not-found') return false;
    throw error;
  }
}

async function checkExistingFirestoreDoc(uid) {
  const userDocRef = db.collection('users').doc(uid);
  const userDoc = await userDocRef.get();
  return userDoc.exists;
}

// ===== CORE CREATE FUNCTION =====
async function createUserWithFirestore(userData) {
  const { name, email, password } = userData;
  
  // 1. Create Auth user
  const userRecord = await auth.createUser({
    email,
    password,
    emailVerified: false,
    displayName: name,
  });
  
  const uid = userRecord.uid;
  
  // 2. Check Firestore doc doesn't exist
  if (await checkExistingFirestoreDoc(uid)) {
    console.log(`⚠️  Firestore doc exists, skipping: ${email}`);
    return { uid, skipped: true };
  }
  
  // 3. Create Firestore user doc (exact replica of your Next.js logic)
  const celestaId = generateCelestaId();
  const qrEnabled = true;
  
  await db.collection('users').doc(uid).set({
    role: 'user',
    displayName: name,
    email: email,
    celestaId,
    qrEnabled: true,
    createdAt: admin.firestore.Timestamp.now(),
    uid: uid,
  });
  
  console.log(`✅ Created Auth+Firestore: ${email} | UID: ${uid} | Celesta: ${celestaId} | QR: ${qrEnabled}`);
  return { uid, celestaId, qrEnabled };
}

// ===== BULK OPERATION =====
async function bulkCreateUsers() {
  console.log(`🚀 Seeding ${usersToCreate.length} users (Auth + Firestore)...\n`);
  
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const userData of usersToCreate) {
    try {
      // Skip if Auth user exists
      if (await checkExistingUser(userData.email)) {
        console.log(`⏭️  Skipped Auth (exists): ${userData.email}`);
        skipCount++;
        continue;
      }
      
      await createUserWithFirestore(userData);
      successCount++;
    } catch (error) {
      console.error(`❌ Error (${userData.email}):`, error.message);
      errorCount++;
    }
  }

  console.log('\n📊 SUMMARY:');
  console.log(`✅ Success (Auth+Firestore): ${successCount}`);
  console.log(`⏭️  Skipped: ${skipCount}`);
  console.log(`❌ Errors: ${errorCount}`);
}

// ===== INVOKE EVERYTHING =====
bulkCreateUsers()
  .then(() => {
    console.log('\n🎉 Complete! Check:');
    console.log('🔐 Firebase Console > Authentication > Users');
    console.log('📄 Firestore > users collection');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });

