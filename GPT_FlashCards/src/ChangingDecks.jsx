import React from "react";
import { observer } from "mobx-react";
import myStore from "./myStore";
import { makeAutoObservable } from "mobx";

const MyComponent = observer(() => {
  return (
    <div>
      <div>{myStore.myData}</div>
      <button onClick={() => myStore.updateData("New data!")}>
        Update data
      </button>
    </div>
  );
});



const myStore = new MyStore();

class MyStore {
    myData = "Hello, world!";
    
    constructor() {
        makeAutoObservable(this);
    }
    
    updateData(data) {
        this.myData = data;
    }
}


export default MyComponent;