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

  async function quickSort(arr, left, right) {
    if (left >= right) return;

    let pivot = arr[Math.floor((left + right) / 2)];
    let i = left, j = right;

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
      await heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      await swap(0, i);
      await heapify(arr, i, 0);
    }
  }

  await heapSort(arr);
}

// Cycle Sort Visualization
async function cycleSortVisualizer(containerId) {
  const container = document.getElementById(containerId);
  const display = container.querySelector(".display");
  const bars = Array.from(display.children);
  let arr = bars.map(bar => parseFloat(bar.style.height));

  async function swap(i, j) {
    return new Promise(resolve => {
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
    });
  }

  async function cycleSort(arr) {
    let n = arr.length;

    for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
      let item = arr[cycleStart];
      let pos = cycleStart;

      for (let i = cycleStart + 1; i < n; i++) {
        if (arr[i] < item) pos++;
      }

      if (pos === cycleStart) continue;

      while (item === arr[pos]) pos++;

      let temp = arr[pos];
      arr[pos] = item;
      item = temp;

      await swap(pos, cycleStart);

      while (pos !== cycleStart) {
        pos = cycleStart;

        for (let i = cycleStart + 1; i < n; i++) {
          if (arr[i] < item) pos++;
        }

        while (item === arr[pos]) pos++;

        temp = arr[pos];
        arr[pos] = item;
        item = temp;

        await swap(pos, cycleStart);
      }
    }
  }

  await cycleSort(arr);
}

// 3-Way Merge Sort Visualization
async function threeWayMergeSortVisualizer(containerId) {
  const container = document.getElementById(containerId);
  const display = container.querySelector(".display");
  const bars = Array.from(display.children);
  let arr = bars.map(bar => parseFloat(bar.style.height));

  async function merge(arr, left, mid1, mid2, right) {
    let n1 = mid1 - left + 1;
    let n2 = mid2 - mid1;
    let n3 = right - mid2;

    let L = arr.slice(left, mid1 + 1);
    let M = arr.slice(mid1 + 1, mid2 + 1);
    let R = arr.slice(mid2 + 1, right + 1);

    let i = 0, j = 0, k = 0, l = left;

    while (i < n1 && j < n2 && k < n3) {
      if (L[i] <= M[j] && L[i] <= R[k]) {
        arr[l] = L[i++];
      } else if (M[j] <= L[i] && M[j] <= R[k]) {
        arr[l] = M[j++];
      } else {
        arr[l] = R[k++];
      }
      l++;
    }

    while (i < n1) arr[l++] = L[i++];
    while (j < n2) arr[l++] = M[j++];
    while (k < n3) arr[l++] = R[k++];

    for (let x = left; x <= right; x++) {
      bars[x].style.height = `${arr[x]}px`;
    }
  }

  async function threeWayMergeSort(arr, left, right) {
    if (left >= right) return;

    let mid1 = Math.floor((2 * left + right) / 3);
    let mid2 = Math.floor((left + 2 * right) / 3);

    await threeWayMergeSort(arr, left, mid1);
    await threeWayMergeSort(arr, mid1 + 1, mid2);
    await threeWayMergeSort(arr, mid2 + 1, right);

    await merge(arr, left, mid1, mid2, right);
  }

  await threeWayMergeSort(arr, 0, arr.length - 1);
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

  document.querySelector("#quickSort input[value='Run']").addEventListener("click", () => {
    quickSortVisualizer("quickSort");
  });

  document.querySelector("#heapSort input[value='Run']").addEventListener("click", () => {
    heapSortVisualizer("heapSort");
  });

  document.querySelector("#cycleSort input[value='Run']").addEventListener("click", () => {
    cycleSortVisualizer("cycleSort");
  });

  document.querySelector("#3WayMergeSort input[value='Run']").addEventListener("click", () => {
    threeWayMergeSortVisualizer("3WayMergeSort");
  });
});
