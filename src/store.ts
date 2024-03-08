import { makeAutoObservable } from "mobx";

class Store {
  value = 0;

  constructor() {
    makeAutoObservable(this);
  }

  // dummy methods for example
  increment() {
    this.value++;
  }

  decrement() {
    this.value--;
  }
}

export default new Store();
