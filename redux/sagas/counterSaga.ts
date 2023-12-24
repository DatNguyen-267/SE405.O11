
import { takeEvery } from 'redux-saga/effects'; 

function* increment() {
    console.log(`This is increment saga`);
}

export function* watchIncrement() {
   
}

function* decrement() {
    console.log(`This is decrement saga`);
}

export function* watchDecrement() {
   
}