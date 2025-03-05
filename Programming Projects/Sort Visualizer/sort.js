function randomize(id, n) {
  const container = document.getElementById(id);
  const display = container.querySelector(".display");

  display.innerHTML = "";

  for (let i = 0; i < n; i++) {
    const bar = document.createElement("div");
    bar.style.width = `${400 / n}px`;
    bar.style.height = `${Math.random() * 200}px`;
    bar.style.background = "red";
    bar.style.display = "inline-block";
    bar.style.margin = "1px";

    display.appendChild(bar);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Event listener for "Randomize All" button
  const randomizeAllBtn = document.querySelector("input[value='Randomize All']");
  if (randomizeAllBtn) {
    randomizeAllBtn.addEventListener("click", () => {
      const n = parseInt(document.getElementById("n")?.value || 20, 10);
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
    });
  }

  document.querySelectorAll(".visualizer").forEach(container => {
    const randomizeBtn = container.querySelector("input[value='Randomize']");
    if (randomizeBtn) {
      randomizeBtn.addEventListener("click", () => {
        const id = container.id;
        const n = parseInt(document.getElementById("n")?.value || 20, 10);
        randomize(id, n);
      });
    }
  });
});

// Selection Sort Visualization
function selectionSortVisualizer(containerId) {
  const container = document.getElementById(containerId);
  const display = container.querySelector(".display");
  const bars = Array.from(display.children);
  const n = bars.length;

  let arr = bars.map(bar => parseFloat(bar.style.height));

  async function swap(i, j) {
    return new Promise(resolve => {
      setTimeout(() => {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        bars[i].style.height = `${arr[i]}px`;
        bars[j].style.height = `${arr[j]}px`;

        bars[i].style.background = "green";
        bars[j].style.background = "green";

        setTimeout(() => {
          bars[i].style.background = "red";
          bars[j].style.background = "red";
          resolve();
        }, 50);
      }, 50);
    });
  }

  async function selectionSort() {
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      for (let j = i + 1; j < n; j++) {
        bars[j].style.background = "blue";
        await new Promise(resolve => setTimeout(resolve, 50));
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
        bars[j].style.background = "red";
      }

      if (minIdx !== i) {
        await swap(i, minIdx);
      }

      bars[i].style.background = "purple";
    }
    bars[n - 1].style.background = "purple";
  }

  selectionSort();
}

// Bubble Sort Visualization
function bubbleSortVisualizer(containerId) {
  const container = document.getElementById(containerId);
  const display = container.querySelector(".display");
  const bars = Array.from(display.children);
  const n = bars.length;

  let arr = bars.map(bar => parseFloat(bar.style.height));

  async function swap(i, j) {
    return new Promise(resolve => {
      setTimeout(() => {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        bars[i].style.height = `${arr[i]}px`;
        bars[j].style.height = `${arr[j]}px`;

        bars[i].style.background = "green";
        bars[j].style.background = "green";

        setTimeout(() => {
          bars[i].style.background = "red";
          bars[j].style.background = "red";
          resolve();
        }, 50);
      }, 50);
    });
  }

  async function bubbleSort() {
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      
      for (let j = 0; j < n - i - 1; j++) {
        bars[j].style.background = "blue";
        bars[j + 1].style.background = "blue";

        await new Promise(resolve => setTimeout(resolve, 50));

        if (arr[j] > arr[j + 1]) {
          await swap(j, j + 1);
          swapped = true;
        }

        bars[j].style.background = "red";
        bars[j + 1].style.background = "red";
      }

      bars[n - i - 1].style.background = "purple"; // Mark sorted elements

      if (!swapped) break;
    }
  }

  bubbleSort();
}

// Insertion Sort Visualization
function insertionSortVisualizer(containerId) {
  const container = document.getElementById(containerId);
  const display = container.querySelector(".display");
  const bars = Array.from(display.children);
  const n = bars.length;

  let arr = bars.map(bar => parseFloat(bar.style.height));

  async function insertionSort() {
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      bars[i].style.background = "blue"; // Highlight the key element

      await new Promise(resolve => setTimeout(resolve, 50));

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        bars[j + 1].style.height = `${arr[j]}px`;

        bars[j].style.background = "green"; // Mark the shifting elements

        await new Promise(resolve => setTimeout(resolve, 50));

        bars[j].style.background = "red";
        j = j - 1;
      }

      arr[j + 1] = key;
      bars[j + 1].style.height = `${key}px`;

      bars[i].style.background = "red"; // Reset key color

      await new Promise(resolve => setTimeout(resolve, 50));
    }

    for (let i = 0; i < n; i++) {
      bars[i].style.background = "purple"; // Mark sorted elements
    }
  }

  insertionSort();
}

// Merge Sort Visualization
async function mergeSortVisualizer(containerId) {
  const container = document.getElementById(containerId);
  const display = container.querySelector(".display");
  const bars = Array.from(display.children);
  let arr = bars.map(bar => parseFloat(bar.style.height));

  async function merge(arr, left, mid, right) {
    let n1 = mid - left + 1;
    let n2 = right - mid;

    let L = arr.slice(left, mid + 1);
    let R = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      bars[k].style.background = "blue"; // Highlight comparing bars
      await new Promise(resolve => setTimeout(resolve, 50));

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        bars[k].style.height = `${L[i]}px`;
        i++;
      } else {
        arr[k] = R[j];
        bars[k].style.height = `${R[j]}px`;
        j++;
      }
      bars[k].style.background = "red"; // Reset color
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      bars[k].style.height = `${L[i]}px`;
      i++;
      k++;
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    while (j < n2) {
      arr[k] = R[j];
      bars[k].style.height = `${R[j]}px`;
      j++;
      k++;
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    for (let x = left; x <= right; x++) {
      bars[x].style.background = "purple"; // Mark sorted elements
    }
  }

  async function mergeSort(arr, left, right) {
    if (left >= right) return;

    let mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
  }

  await mergeSort(arr, 0, arr.length - 1);
}

// Event listeners for "Run" buttons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#selectionSort input[value='Run']").addEventListener("click", () => {
    selectionSortVisualizer("selectionSort");
  });

  document.querySelector("#bubbleSort input[value='Run']").addEventListener("click", () => {
    bubbleSortVisualizer("bubbleSort");
  });

  document.querySelector("#insertionSort input[value='Run']").addEventListener("click", () => {
    insertionSortVisualizer("insertionSort");
  });

  document.querySelector("#mergeSort input[value='Run']").addEventListener("click", () => {
    mergeSortVisualizer("mergeSort");
  });
});
