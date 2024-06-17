export default function getKeys(array, excludeKeys = []) {
    let keys = [];

    if (array.length !== 0) {
        keys = Object.keys(array[0]).filter(
            (key) => !excludeKeys.includes(key)
        );
    }

    return keys;
}
