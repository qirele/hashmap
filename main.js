import LinkedList from './LinkedList.js';

function HashMap() {
  let bucketSize = 16;
  let buckets = [];

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
    tail.next = {key, value};
  }

  return { hash, set };
}

const hashmap = HashMap();

hashmap.set("Kiril", "Kawasaki");
hashmap.set("Carlo", "Rodriguez");