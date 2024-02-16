# HashMap

## HashMap factory with dynamic array size using `load factor` of 75%

## Factory methods:

#### hash(keyString)

hashing function which transforms a string into a number between 0 and `bucketSize`, which then gets used as an index of an array into which to insert a value

#### set(key, value)

puts the {key, value} inside of an array, using return value of hash(key) as an index
creates a new linked list if the key hasn't yet been assigned a spot in the array
appends {key,value} to the end of linked list if the bucket already has a linked list

#### get(key)

searches for a key inside of the HashMap, returns the value that is assigned to this key

#### has(key)

takes a key as an argument and returns true or false based on whether or not the key is in the hash map.

#### remove(key)

takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.

#### length()

returns the number of stored keys in the hash map.

#### clear()

removes all entries in the hash map.

#### keys()

returns an array containing all the keys inside the hash map.

#### values()

returns an array containing all the values.

#### entries()

returns an array that contains each key, value pair. Example: `[[firstKey, firstValue], [secondKey, secondValue]]`

#### \_capacity() private method

calculates and returns the current capacity of the hashmap based on the number of array indices occupied
this gets used in `set()` when calculating if the threshold of `load factor` has been surpassed

#### \_growBuckets private method

doubles the array size to accomodate more space for entries to fall into in order to minimize collisions (when multiple different keys gets assigned the same index of an array)
also copies everything to the new array with double the length
