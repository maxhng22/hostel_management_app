import { firebase, auth, db } from '../firebase.js'
import {
    ITEM_STATUS_REQUEST, ITEM_STATUS_SUCCESS,
    ITEM_STATUS_FAIL,
    ITEM_ADD_REQUEST, ITEM_ADD_SUCCESS,
    ITEM_ADD_FAIL,ITEM_UPDATE_REQUEST,
    ITEM_UPDATE_SUCCESS,ITEM_UPDATE_FAIL,
    ITEMLIST_ADD_REQUEST, ITEMLIST_ADD_SUCCESS,
    ITEMLIST_ADD_FAIL
    
} from "../constants/itemConstants";
import { collection, addDoc, doc, onSnapshot, getDocs, query, where, deleteDoc, writeBatch, increment, getDoc } from "firebase/firestore";
// import notifyMessage from '../ulti/notification.js';

const getItemApplicationForm = (id,type) => async (dispatch) => {
    dispatch({ type: ITEM_STATUS_REQUEST, payload: { id } });
    // const uid = id
    try {
        let q
        if(type==='all'){
    
            q = query(collection(db, "item"));
        }else{
            q = query(collection(db, "item"), where('userId', "==", id));   
        }

        const querySnapshot = await getDocs(q);

        let data = [];
        querySnapshot.forEach((doc) => {
            let docData = doc.data()
            let checked = 0
            docData['items'].forEach(a => {
                if (a.status === true) {
                    checked++
                }
            })

            data.push({ ...doc.data(), checked: checked, itemId: doc.id })

        });

        dispatch({ type: ITEM_STATUS_SUCCESS, payload: data });

    } catch (e) {
        console.error("Error adding document: ", e);
        dispatch({ type: ITEM_STATUS_FAIL, payload: e });
    }
}

const getItemStatusReport= (id) => async (dispatch) => {
    dispatch({ type: ITEM_STATUS_REQUEST, payload: { id } });
    // const uid = id
    try {
        let q= query(collection(db, "item"), where('userId', "==", id)); 

        const querySnapshot = await getDocs(q);

        let data = [];
        querySnapshot.forEach((doc) => {
            let docData = doc.data()
            let checked = 0
            docData['items'].forEach(a => {
                if (a.status === true) {
                    checked++
                }
            })

            data.push({ ...doc.data(), checked: checked, itemId: doc.id })

        });

        dispatch({ type: ITEM_STATUS_SUCCESS, payload: data });

    } catch (e) {
        console.error("Error adding document: ", e);
        dispatch({ type: ITEM_STATUS_FAIL, payload: e });
    }
}



const addItemApplicationForm = (user, userId, room, date, items,image,admission_date,ic,ndp,formType) => async (dispatch) => {
    dispatch({ type: ITEM_ADD_REQUEST, payload: {} });
    items.forEach(a=>{
        if(!a.description){
            a.description=''
        }
    })
    const data = {
        user: user,
        userId: userId,
        room_no: room,
        date: date,
        image:image||'',
        items: items,
        admission_date:admission_date,
        ic:ic,
        ndp:ndp,
        viewStatus:'no',
        formType:formType

    };

    
    try {
        const docRef = await addDoc(collection(db, "item"), data);
        console.log("ITEM successfully added", docRef.id);
        dispatch({ type: ITEM_ADD_SUCCESS, payload: data });
    } catch (e) {
        console.error("Error adding ITEM: " + e);
        dispatch({ type: ITEM_ADD_FAIL, payload: e });
    }
}

const addItem = (item) => async (dispatch) => {
    dispatch({ type: ITEMLIST_ADD_REQUEST, payload: {} });
    const data = {
        item: item,
        number:0,
    };

    try {
        const docRef = await addDoc(collection(db, "itemlist"), data);
        console.log("ITEM successfully added", docRef.id);
        dispatch({ type: ITEMLIST_ADD_SUCCESS, payload: data });
    } catch (e) {
        console.error("Error adding ITEM: " + e);
        dispatch({ type: ITEMLIST_ADD_FAIL, payload: e });
    }
}


const updateReadStatus = ( id,status ) => async (dispatch) => {
    dispatch({ type: ITEM_UPDATE_REQUEST, payload: {} });
    const Batch = writeBatch(db);
    const sfRef = doc(db, "item", id);



    if (status) {
        Batch.update(sfRef, { "viewStatus": 'read' });
    }


    try {
        await Batch.commit();
        dispatch({ type: ITEM_UPDATE_SUCCESS, payload: {} });

    } catch (error) {
        dispatch({ type: ITEM_UPDATE_FAIL, payload: error });
    }


}

const deleteItemApplicationForm = (itemId) => async (dispatch) => {
    dispatch({ type: ITEM_UPDATE_REQUEST, payload: {} });
    try {
        await deleteDoc(doc(db, "item", itemId));
        console.log("eContact successfully delete");
        dispatch({ type: ITEM_UPDATE_SUCCESS, payload: {} });
    } catch (e) {
        console.error("Error adding eContact: " + e);
        dispatch({ type: ITEM_UPDATE_FAIL, payload: e });
    }
}




export { getItemApplicationForm, addItemApplicationForm,updateReadStatus,addItem,deleteItemApplicationForm };