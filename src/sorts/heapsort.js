export default getHeapSortAnimations;
export { testHeapSort };

function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSort(array, array.length, animations);
  return animations;
}

function testHeapSort(array) {
  if (array.length > 1) heapSort(array, array.length, []);
  return array;
}

function heapSort(array, n, animations) {
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    maxHeapify(array, n, i, animations);
  }

  // Pull values from max heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    swap(array, 0, i);
    animations.push({
      type: "swap",
      cols: [0, i]
    });

    // Fix the heap
    maxHeapify(array, i, 0, animations);
  }
}

// n is the size of the heap and i is the root
function maxHeapify(array, n, i, animations) {

  // Initialize largest as root
  let largest = i;

  // Child node indicies are multiplied by 2 because
  // a heap is a binary tree
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  // If left child is largest so far
  if (left < n && array[left] > array[largest]) {
    largest = left;
    animations.push({
      type: "swap",
      cols: [largest, left],
    });
  }

  // Push comparison if possible to display
  if (array[left]) {
    animations.push({
      type: "comparison",
      cols: [largest, left],
    });
  }

  // If right child is largest so far
  if (right < n && array[right] > array[largest]) {
    largest = right;
    animations.push({
      type: "swap",
      cols: [largest, right],
    });
  }

  // Push comparison if possible to display
  if (array[right]) {
    animations.push({
      type: "comparison",
      cols: [largest, right],
    });
  }

  // If largest is not root
  if (largest !== i) {
    // Swap root with its larger child
    swap(array, i, largest);
    animations.push({
      type: "swap",
      cols: [largest, i],
    });

    // Fix the affected sub-tree
    maxHeapify(array, n, largest, animations);
  }
}

function swap(array, xPos, yPos) {
  let temp = array[xPos];
  array[xPos] = array[yPos];
  array[yPos] = temp;
}
