import defaultModule from './firebaseInitializer'
import firebase from 'firebase'



const fireStore = firebase.firestore(defaultModule);


// var db = firebase.database(defaultModule);

const usersCollection = fireStore.collection('usersPreviledge');
const stockRecords = fireStore.collection('stockRecords');
const salesRecords = fireStore.collection('salesRecords');
const salesRecordsAwaitingApproval = fireStore.collection('salesRecordsAwaitingApproval');
// const recordTotals = fireStore.collection('recordTotals');


const paymentRecords = fireStore.collection('paymentRecords');


export async function getAllProjects() {
    return await fireStore.collection("users").get();

}

export async function addUsersType(uid, data) {
    usersCollection.doc(uid).set(data, { merge: true })

}


export async function getAllUserData(uid) {
    return await usersCollection.doc(uid).get();
}

////////// stock records


export async function addStockRecords(presentYear, data) {
    await stockRecords.doc(presentYear).set(data, { merge: true })
    // stockRecords.doc(presentYear).set(data,{merge:true})
}

export async function updateStockRecords(presentYear, presentMonth, data) {
    return await stockRecords.doc(presentYear).update(presentMonth, firebase.firestore.FieldValue.arrayUnion(data));
}

// export async function addStockRecords(presentYear, data) {
//     return await stockRecords.doc(presentYear).set(data)
// }


export async function getAllStockRecordsByYear(presentYear) {
    const snapShort = await stockRecords.doc(presentYear).get();
    return snapShort.data();
}

export async function getAllStockRecordsByYearStream(presentYear, setData) {
    stockRecords.doc(presentYear).onSnapshot({
        includeMetadataChanges: true
    }, (doc) => {
        if (doc.exists)
            setData(doc)
    })
}




export async function getAllStockRecordsList() {
    const snapShort = await stockRecords.get();
    return snapShort.docs.map(doc => doc.data());
}


export async function isStockRecordDataExist(presentYear) {
    let doc = await stockRecords.doc(presentYear).get();
    return doc.exists
}






//////////// sales records


export async function addSalesRecords(presentYear, data) {
    await salesRecords.doc(presentYear).set(data, { merge: true })
}

export async function updateSalesRecords(presentYear, presentMonth, data) {
    return await salesRecords.doc(presentYear).update(presentMonth, firebase.firestore.FieldValue.arrayUnion(data));
}


export async function getAllSalesRecordsByYear(presentYear) {
    const snapShort = await salesRecords.doc(presentYear).get();
    return snapShort.data();
}

export async function getAllSalesRecordsByYearStream(presentYear, setData) {
    salesRecords.doc(presentYear).onSnapshot({
        includeMetadataChanges: true
    }, (doc) => {
        if (doc.exists)
            setData(doc)
    })
}


export async function getAllSalesRecordsList() {
    const snapShort = await salesRecords.get();
    return snapShort.docs.map(doc => doc.data());
}


export async function isSalesRecordDataExist(presentYear) {
    let doc = await salesRecords.doc(presentYear).get();
    return doc.exists
}



//////////////////  all payment Records


export async function addAllPaymentRecordsRecords(presentYear, data) {
    await paymentRecords.doc(presentYear).set(data, { merge: true })
}

export async function updatePaymentRecords(presentYear, presentMonth, data) {
    return await paymentRecords.doc(presentYear).update(presentMonth, firebase.firestore.FieldValue.arrayUnion(data));
}


export async function getAllPaymentRecordsByYear(presentYear) {
    const snapShort = await paymentRecords.doc(presentYear).get();
    return snapShort.data();
}

export async function getAllPaymentRecordsByYearStream(presentYear, setData) {
    paymentRecords.doc(presentYear).onSnapshot({
        includeMetadataChanges: true
    }, (doc) => {
        if (doc.exists){
            setData(doc)
        }
    })
}


export async function getAllPaymentRecordsList() {
    const snapShort = await paymentRecords.get();
    return snapShort.docs.map(doc => doc.data());
}


export async function isPaymentRecordDataExist(presentYear) {
    let doc = await paymentRecords.doc(presentYear).get();
    return doc.exists
}



/// sales Awaiting approval


export async function addAllSalesAwaitingAproval(presentYear, data) {
    await salesRecordsAwaitingApproval.doc(presentYear).set(data, { merge: true })
}

export async function updateSalesAwaitingAproval(presentYear, presentMonth, data) {
    return await salesRecordsAwaitingApproval.doc(presentYear).update(presentMonth, firebase.firestore.FieldValue.arrayUnion(data));
}


export async function deleteSalesAwaitingAproval(presentYear, presentMonth) {
    return await salesRecordsAwaitingApproval.doc(presentYear).delete()
}

export async function getAllSalesAwaitingAproval(presentYear) {
    const snapShort = await salesRecordsAwaitingApproval.doc(presentYear).get();
    return snapShort.data();
}

export async function getAllSalesAwaitingAprovalStream(presentYear, setData) {
    salesRecordsAwaitingApproval.doc(presentYear).onSnapshot({
        includeMetadataChanges: true
    }, (doc) => {
        if (doc.exists){
            setData(doc)
        }
    })
}

export async function isSalesAwaitingAproval(presentYear) {
    let doc = await salesRecordsAwaitingApproval.doc(presentYear).get();
    return doc.exists
}











/////////////  total data records


const recordTotals = fireStore.collection('recordTotals');


export async function updateSalesTotal( increment) {
    return recordTotals.doc("salesAndProductTotals").update("SalesTotal",firebase.firestore.FieldValue.increment(increment))
}

export async function updateProductTotal(increment) {
    return recordTotals.doc("salesAndProductTotals").update("ProductTotal",firebase.firestore.FieldValue.increment(increment))
}

// export async function updateProductTotal(increment) {
//     recordTotals.doc("salesAndProductTotals").update("ProductTotal",Firestore.FieldValue.increment(increment))
// }

export async function createProductSalesTotalifNotExist(data) {
  return recordTotals.doc("salesAndProductTotals").set(data)
}

export async function checkIfProductSalesTotalExist() {
    return  (await recordTotals.doc("salesAndProductTotals").get()).exists
     
}


export async function getTotalProductAndSalesStream( salesAndProduct) {
    recordTotals.doc("salesAndProductTotals").onSnapshot({
        includeMetadataChanges: true
    }, (doc) => {
        if (doc.exists){
            salesAndProduct(doc.data())
        }
    })

}




export async function getTotalMonthAndDayStream(monthly, daly) {
    recordTotals.doc("monthlyTotals").onSnapshot({
        includeMetadataChanges: true
    }, (doc) => {
        if (doc.exists){
            
            // monthly(doc.data())
        }
    })

    recordTotals.doc("weeklyTotals").onSnapshot({
        includeMetadataChanges: true
    }, (doc) => {
        if (doc.exists){
            // daly(doc.data())
        }
    })
}

export async function isrecordWeeklyTotalsAvailable() {
    let doc = await recordTotals.doc("weeklyTotals").get()
    return doc.exists
}

export async function isrecordMonthlyTotalsAvailable() {
    let doc = await recordTotals.doc("monthlyTotals").get()
    return doc.exists
}
