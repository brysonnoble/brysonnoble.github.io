function randomizeAll(n) {
  const sortIds = [
    "selectionSort",
    "bubbleSort",
    "insertionSort",
    "mergeSort",
    "quickSort",
    "heapSort",
    "cycleSort",
    "3WayMergeSort",
    "countingSort",
    "radixSort",
    "bucketSort",
    "timSort",
    "combSort",
    "pigeonholeSort",
    "introSort",
    "timSortHybrid"
  ];

  sortIds.forEach(id => randomize(id, n));
}

function randomize(id, n) {
  const container = document.getElementById(id);
  if (!container) {
    console.error(`Element with id '${id}' not found.`);
    return;
  }

  const display = container.querySelector(".display");
  if (!display) {
    console.error(`Display div not found for '${id}'.`);
    return;
  }

  display.innerHTML = "";

  for (let i = 0; i < n; i++) {
    const bar = document.createElement('div');
    bar.style.width = `${400 / n}px`;
    bar.style.height = `${Math.random() * 200}px`;
    bar.style.background = "red";
    bar.style.display = "inline-block";
    bar.style.margin = "1px";

    display.appendChild(bar);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const randomizeAllBtn = document.querySelector("input[value='Randomize All']");
  if (randomizeAllBtn) {
    randomizeAllBtn.addEventListener("click", () => randomizeAll(20)); // Default 20 elements
  }
});
