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

        bars[i].style.background = "yellow";
        bars[j].style.background = "yellow";

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

      bars[i].style.background = "green";
    }
    bars[n - 1].style.background = "green";
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

        bars[i].style.background = "yellow";
        bars[j].style.background = "yellow";

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

      bars[n - i - 1].style.background = "green"; // Mark sorted elements

      if (!swapped) {
        for (let k = 0; k < n - i; k++) {
          bars[k].style.background = "green"; // Mark remaining sorted elements
        }
        break;
      }
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

        bars[j].style.background = "yellow"; // Mark the shifting elements

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
      bars[i].style.background = "green"; // Mark sorted elements
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
      bars[x].style.background = "green"; // Mark sorted elements
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

// Quick Sort Visualization
async function quickSortVisualizer(containerId) {
  const container = document.getElementById(containerId);
  const display = container.querySelector(".display");
  const bars = Array.from(display.children);
  let arr = bars.map(bar => parseFloat(bar.style.height));

  async function swap(i, j) {
    return new Promise(resolve => {
      setTimeout(() => {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        bars[i].style.height = `${arr[i]}px`;
        bars[j].style.height = `${arr[j]}px`;

        bars[i].style.background = "yellow";
        bars[j].style.background = "yellow";

        setTimeout(() => {
          bars[i].style.background = "red";
          bars[j].style.background = "red";
          resolve();
        }, 50);
      }, 50);
    });
  }

  async function quickSort(arr, left, right) {
    if (left >= right) return;

    let pivot = arr[Math.floor((left + right) / 2)];
    let i = left, j = right;

    bars[Math.floor((left + right) / 2)].style.background = "blue"; // Highlight the key element

    while (i <= j) {
      while (arr[i] < pivot) i++;
      while (arr[j] > pivot) j--;

      if (i <= j) {
        await swap(i, j);
        i++;
        j--;
      }
    }

    await quickSort(arr, left, j);
    await quickSort(arr, i, right);

    // Mark sorted bars green
    if (left === 0 && right === arr.length - 1) {
      for (let k = 0; k < arr.length; k++) {
        bars[k].style.background = "green";
      }
    }
  }

  await quickSort(arr, 0, arr.length - 1);
}

// Heap Sort Visualization
async function heapSortVisualizer(containerId) {
  const container = document.getElementById(containerId);
  const display = container.querySelector(".display");
  const bars = Array.from(display.children);
  let arr = bars.map(bar => parseFloat(bar.style.height));

  async function swap(i, j) {
    return new Promise(resolve => {
      setTimeout(() => {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        bars[i].style.height = `${arr[i]}px`;
        bars[j].style.height = `${arr[j]}px`;

        bars[i].style.background = "yellow";
        bars[j].style.background = "yellow";

        setTimeout(() => {
          bars[i].style.background = "red";
          bars[j].style.background = "red";
          resolve();
        }, 50);
      }, 50);
    });
  }

  async function heapify(arr, n, i) {    
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      await swap(i, largest);
      await heapify(arr, n, largest);
    }
  }

  async function heapSort(arr) {
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      bars[i].style.background = "blue"; // Highlight the key element
      
      await heapify(arr, n, i);

      bars[i].style.background = "red";
    }

    for (let i = n - 1; i > 0; i--) {
      bars[i].style.background = "blue"; // Highlight the key element
      
      await swap(0, i);
      await heapify(arr, i, 0);

      bars[i].style.background = "green"; // Mark sorted elements
    }

    bars[0].style.background = "green"; // Mark the remaining element as sorted
  }

  await heapSort(arr);
}

// Cycle Sort Visualization
function cycleSortVisualizer(containerId) {
  const container = document.getElementById(containerId);
  const display = container.querySelector(".display");
  const bars = Array.from(display.children);
  const n = bars.length;

  let arr = bars.map(bar => parseFloat(bar.style.height));

  async function cycleSort() {
    for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
      let item = arr[cycleStart];
      let pos = cycleStart;

      for (let i = cycleStart + 1; i < n; i++) {
        if (arr[i] < item) pos++;
      }

      if (pos === cycleStart) continue;

      while (item === arr[pos]) pos++;
      [arr[pos], item] = [item, arr[pos]];
      bars[pos].style.height = `${arr[pos]}px`;
      bars[pos].style.background = "yellow";
      await new Promise(resolve => setTimeout(resolve, 50));
      bars[pos].style.background = "red";

      while (pos !== cycleStart) {
        pos = cycleStart;
        for (let i = cycleStart + 1; i < n; i++) {
          if (arr[i] < item) pos++;
        }

        while (item === arr[pos]) pos++;
        [arr[pos], item] = [item, arr[pos]];
        bars[pos].style.height = `${arr[pos]}px`;
        bars[pos].style.background = "yellow";
        await new Promise(resolve => setTimeout(resolve, 50));
        bars[pos].style.background = "red";
      }
    }

    for (let i = 0; i < n; i++) {
      bars[i].style.background = "green"; // Mark sorted elements
    }
  }

  cycleSort();
}

// 3-Way Merge Sort Visualization
async function threeWayMergeSortVisualizer(containerId) {
  const container = document.getElementById(containerId);
  const display = container.querySelector(".display");
  const bars = Array.from(display.children);
  let arr = bars.map(bar => parseFloat(bar.style.height));

  async function merge(arr, left, mid1, mid2, right) {
    let size1 = mid1 - left + 1;
    let size2 = mid2 - mid1;
    let size3 = right - mid2;

    let leftArr = arr.slice(left, left + size1);
    let midArr = arr.slice(mid1 + 1, mid1 + 1 + size2);
    let rightArr = arr.slice(mid2 + 1, mid2 + 1 + size3);

    let i = 0, j = 0, k = 0, index = left;

    while (i < size1 || j < size2 || k < size3) {
      bars[index].style.background = "blue"; // Highlight comparing bars
      await new Promise(resolve => setTimeout(resolve, 50));

      if (i < size1 && (j >= size2 || leftArr[i] <= midArr[j]) && (k >= size3 || leftArr[i] <= rightArr[k])) {
        arr[index] = leftArr[i];
        bars[index].style.height = `${arr[index]}px`;
        i++;
      } else if (j < size2 && (k >= size3 || midArr[j] <= rightArr[k])) {
        arr[index] = midArr[j];
        bars[index].style.height = `${arr[index]}px`;
        j++;
      } else {
        arr[index] = rightArr[k];
        bars[index].style.height = `${arr[index]}px`;
        k++;
      }
      bars[index].style.background = "red"; // Reset color
      index++;
    }

    for (let x = left; x <= right; x++) {
      bars[x].style.background = "green"; // Mark sorted elements
    }
  }

  async function threeWayMergeSort(arr, left, right) {
    if (left >= right) return;

    let mid1 = Math.floor(left + (right - left) / 3);
    let mid2 = Math.floor(mid1 + (right - left) / 3);

    await threeWayMergeSort(arr, left, mid1);
    await threeWayMergeSort(arr, mid1 + 1, mid2);
    await threeWayMergeSort(arr, mid2 + 1, right);

    await merge(arr, left, mid1, mid2, right);
  }

  await threeWayMergeSort(arr, 0, arr.length - 1);
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
        "threeWayMergeSort",
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

  // Event listener for "Run All" button
  const runAllBtn = document.querySelector("input[value='Run All']");
  if (runAllBtn) {
    runAllBtn.addEventListener("click", () => {
      Promise.all([
        selectionSortVisualizer("selectionSort"),
        bubbleSortVisualizer("bubbleSort"),
        insertionSortVisualizer("insertionSort"),
        mergeSortVisualizer("mergeSort"),
        quickSortVisualizer("quickSort"),
        heapSortVisualizer("heapSort"),
        cycleSortVisualizer("cycleSort"),
        threeWayMergeSortVisualizer("threeWayMergeSort")
      ]);
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

  document.querySelector("#quickSort input[value='Run']").addEventListener("click", () => {
    quickSortVisualizer("quickSort");
  });

  document.querySelector("#heapSort input[value='Run']").addEventListener("click", () => {
    heapSortVisualizer("heapSort");
  });

  document.querySelector("#cycleSort input[value='Run']").addEventListener("click", () => {
    cycleSortVisualizer("cycleSort");
  });

  document.querySelector("#threeWayMergeSort input[value='Run']").addEventListener("click", () => {
    threeWayMergeSortVisualizer("threeWayMergeSort");
  });
});
