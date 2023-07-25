import { firebase, auth, db } from '../firebase.js'
import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL, USER_LOGOUT,
    USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL, USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    GET_PROFILE_REQUEST, GET_PROFILE_FAIL,
    GET_PROFILE_SUCCESS,SEARCH_PROFILE_REQUEST,
    SEARCH_PROFILE_SUCCESS,SEARCH_PROFILE_FAIL

} from "../constants/userConstants";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, doc, onSnapshot, getDoc, getDocs, query, where, setDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

    signInWithEmailAndPassword(auth, email, password)
        .then(async (response) => {
            const uid = response.user.uid
            try {
           
                dispatch({ type: USER_SIGNIN_SUCCESS, payload: { id: uid } });
               

            } catch (e) {
                console.error("Error adding document: ", e);
                dispatch({ type: USER_SIGNIN_FAIL, payload: e });
            }


        })
        .catch(error => {
            alert(error.message)
            dispatch({ type: USER_SIGNIN_FAIL, payload: error });
        })
}

const getProfile = (user_uid) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST, payload: {} });
    try {
        const docRef = doc(db, "users", user_uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data())
        dispatch({ type: GET_PROFILE_SUCCESS, payload: { ...docSnap.data() ,id:docSnap.id} });
    } catch (e) {
        dispatch({ type: GET_PROFILE_FAIL, payload: {} });
    }



}

const searchProfile = (phone) => async (dispatch) => {
    dispatch({ type: SEARCH_PROFILE_REQUEST, payload: {} });
    try {
        const q = query(collection(db, "users"), where('phone', "==", phone));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
           
           
            data.push({ ...doc.data(), id:doc.id})

        });
        dispatch({ type:SEARCH_PROFILE_SUCCESS, payload:data});
    } catch (e) {
        console.log(`error:${e}`)
        dispatch({ type: SEARCH_PROFILE_FAIL, payload: {} });
    }



}

const checkLogin = () => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: {} });
  
    try {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
            
                dispatch({ type: USER_SIGNIN_SUCCESS, payload: { id: user.uid } });
                
            } else {
                dispatch({ type: USER_SIGNIN_FAIL, payload: {} });
                
            }
        });


    } catch (e) {
        console.error("Error adding document: ", e);
        dispatch({ type: USER_SIGNIN_FAIL, payload: e });
    }


}


const signup = (email, password,type) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST, payload: { email, password, type} });

    createUserWithEmailAndPassword(auth, email, password,type)
        .then(async (response) => {
            const uid = response.user.uid
            const data = {
                fullName: '',
                type:type,
                
            };

            try {
               
                const docRef = await setDoc(doc(db, "users", uid), data);
                
                dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
            } catch (e) {
                console.error("Error adding user: " + e);
                
                dispatch({ type: USER_SIGNUP_FAIL, payload: e });
            }

        })
        .catch((error) => {
            // notifyMessage(error.message)
            dispatch({ type: USER_SIGNUP_FAIL, payload: error });
        });

}

const updateProfile = (name, image, id, phone,formattedValue, ic, admission_date, ndp, insitute, room_no ) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: {} });
    const Batch = writeBatch(db);

    const sfRef = doc(db, "users", id);

    if (image) {
        const { uri } = image;
        const imageurl = await uploadImageAsync(uri, name || 'defaultNaming')
        Batch.update(sfRef, { "image": imageurl });
    }

    if (name) {
        Batch.update(sfRef, { "fullName": name });
    }

    if (insitute) {
        Batch.update(sfRef, { "insitute": insitute });
    }

    if (room_no ) {
        Batch.update(sfRef, { "room_no": room_no  });
    }

    if (ic) {
        Batch.update(sfRef, { "ic": ic });
    }

    if (admission_date) {
        Batch.update(sfRef, { "admission_date": admission_date });
    }

    if (ndp) {
        Batch.update(sfRef, { "ndp": ndp });
    }

    if (phone) {
        Batch.update(sfRef, { "phone": phone });
    }



    try {
        await Batch.commit();
        dispatch({ type: USER_UPDATE_SUCCESS, payload: {} });

    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: error });
    }


}

async function uploadImageAsync(uri, name) {
    let blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    })

    // blob = null

    const fileRef = ref(getStorage(), name);
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it

    return await getDownloadURL(fileRef);
}


const logout = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT, payload: {} });
    signOut(auth).then(async (response) => {

    })
}


export { signin, logout, signup, updateProfile, getProfile, checkLogin ,searchProfile};