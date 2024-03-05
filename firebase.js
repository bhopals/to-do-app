// Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyA0Rbp35cPeWo-jBTZBjvAiTEbb1aPxymw",
    authDomain: "to-do-app-f4bc6.firebaseapp.com",
    projectId: "to-do-app-f4bc6",
    storageBucket: "to-do-app-f4bc6.appspot.com",
    messagingSenderId: "888856971912",
    appId: "1:888856971912:web:a25e8f8ea00506827e2d3d",
    measurementId: "G-53YYSQNVP4"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
let db = firebase.firestore();
