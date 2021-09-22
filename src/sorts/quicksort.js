export default getQuickSortAnimations;
export { testQuickSort };

function getQuickSortAnimations(array) {
  const animations = [];
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}

function testQuickSort(array) {
  quickSort(array, 0, array.length - 1, []);
  return array;
}

function quickSort(array, left, right, animations) {
  let index;
  if (array.length > 1) {
    index = partition(array, left, right, animations); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSort(array, left, index - 1, animations);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      quickSort(array, index, right, animations);
    }
  }
  return array;
}

function partition(array, left, right, animations) {
  let pivotIdx = Math.floor((right + left) / 2)
  let pivot = array[pivotIdx]; // middle element
  let i = left; // left pointer
  let j = right; // right pointer
  while (i <= j) {
    while (array[i] < pivot) {
      animations.push({
        type: "comparison",
        cols: [i, pivotIdx]
      })
      i++;
    }
    while (array[j] > pivot) {
      animations.push({
        type: "comparison",
        cols: [j, pivotIdx]
      })
      j--;
    }
    if (i <= j) {
      animations.push({
        type: "swap",
        cols: [i, j]
      })
      swap(array, i++, j--);
    }
  }
  return i;
}

function swap(array, xPos, yPos) {
  let temp = array[xPos];
  array[xPos] = array[yPos];
  array[yPos] = temp;
}
