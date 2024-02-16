import LinkedList from './LinkedList.js';

function HashMap() {
  let bucketSize = 16;
  let buckets = Array(bucketSize).fill();

  const hash = (keyString) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < keyString.length; i++) {
      hashCode = primeNumber * hashCode + keyString.charCodeAt(i);
      hashCode = hashCode % bucketSize;
    }

    return hashCode;
  }

  const set = (key, value) => {
    const index = hash(key);
    if (index < 0 || index >= bucketSize) {
      throw new Error("Trying to access index out of bound");
    }

    if (buckets[index] === undefined) {
      // if bucket empty, create linked list with head equals to Node({key: key, value: value})
      const list = LinkedList();
      list.append({ key: key, value: value });
      buckets[index] = list;
      return;
    }

    // if bucket isn't empty, start traversing the list,
    let list = buckets[index];
    let current = list.head();
    while (current !== null) {
      if (key === current.value.key) {
        current.value.value = value;
      }

      current = current.next;
    }

    // else append { key, value } to the end of the list
    let tail = list.tail();
    tail.next = { value: { key, value }, next: null };
  }

  const get = (key) => {
    const index = hash(key);
    if (index < 0 || index >= bucketSize) {
      throw new Error("Trying to access index out of bound");
    }

    if (buckets[index] === undefined) {
      // no key here and no value here
      return null;
    }

    // traverse the linked list
    let list = buckets[index];
    let current = list.head();
    while (current !== null) {
      if (key === current.value.key) { // key found within linked list
        return current.value.value;
      }

      current = current.next;
    }

    return null; // not found the key within the linked list
  }

  const has = (key) => {
    const index = hash(key);
    if (index < 0 || index >= bucketSize) {
      throw new Error("Trying to access index out of bound");
    }

    if (buckets[index] === undefined) {
      // no key here and no value here
      return false;
    }

    // traverse linked list
    let list = buckets[index];
    let current = list.head();
    while (current !== null) {
      if (key === current.value.key) { // key found within linked list
        return true;
      }

      current = current.next;
    }

    return false; // not found the key within the linked list
  }

  const remove = (key) => {
    const index = hash(key);
    if (index < 0 || index >= bucketSize) {
      throw new Error("Trying to access index out of bound");
    }

    if (buckets[index] === undefined) {
      // no key here and no value here
      return false;
    }

    // traverse linked list
    let list = buckets[index];
    let current = list.head();
    let counter = 0;
    while (current !== null) {
      if (key === current.value.key) { // key found within linked list
        // remove the entry
        list.removeAt(counter);
        return true;
      }

      current = current.next;
      counter++;
    }

    return false; // not found the key within the linked list
  }

  const length = () => {
    let counter = 0;
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i] === undefined) continue;

      counter += buckets[i].size();
    }

    return counter;
  }

  const clear = () => {
    buckets = Array(bucketSize).fill(); // garbage collector do your job
  }

  return { hash, set, get, has, remove, length, clear };
}

const hashmap = HashMap();

hashmap.set("Kiril", "Kawasaki");
hashmap.set("Carlo", "Rodriguez");
hashmap.set("Brohehem", "DOooodewicz");
