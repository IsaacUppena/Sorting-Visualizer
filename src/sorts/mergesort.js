export default getMergeSortAnimations;
export { testMergeSort };

function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function testMergeSort(array) {
  if (array.length > 1) {
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, []);
  }
  return array;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // Comparisons only occur during merge
    animations.push({
      type: 'comparison',
      cols: [i, j],
    });
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // Overwrite main array with val from aux array
      animations.push({
        type: 'overwrite',
        cols: [k, auxiliaryArray[i]],
      });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // Overwrite main array with val from aux array
      animations.push({
        type: 'overwrite',
        cols: [k, auxiliaryArray[j]],
      });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // Overwrite main array with val from aux array
    animations.push({
      type: 'overwrite',
      cols: [k, auxiliaryArray[i]],
    });
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // Overwrite main array with val from aux array
    animations.push({
      type: 'overwrite',
      cols: [k, auxiliaryArray[j]],
    });
    mainArray[k++] = auxiliaryArray[j++];
  }
}
