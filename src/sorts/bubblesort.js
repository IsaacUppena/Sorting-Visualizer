export default getBubbleSortAnimations;
export { testBubbleSort };

function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSort(array, array.length, animations);
  return animations;
}

function testBubbleSort(array) {
  if (array.length > 1) bubbleSort(array, array.length, []);
  return array;
}

function bubbleSort(array, n, animations) {
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < n - i; j++) {
      
      if (array[j] < array[j - 1]) {
        swap(array, j, j - 1);
        animations.push({
          type: "swap",
          cols: [j, j - 1]
        });
      }
      animations.push({
        type: "comparison",
        cols: [j, j - 1]
      });
    }
  }
}

function swap(array, xPos, yPos) {
  let temp = array[xPos];
  array[xPos] = array[yPos];
  array[yPos] = temp;
}
