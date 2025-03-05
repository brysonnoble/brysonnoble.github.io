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
        }, 300);
      }, 500);
    });
  }

  async function selectionSort() {
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      for (let j = i + 1; j < n; j++) {
        bars[j].style.background = "blue";
        await new Promise(resolve => setTimeout(resolve, 200));
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
        }, 300);
      }, 500);
    });
  }

  async function bubbleSort() {
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      
      for (let j = 0; j < n - i - 1; j++) {
        bars[j].style.background = "blue";
        bars[j + 1].style.background = "blue";

        await new Promise(resolve => setTimeout(resolve, 200));

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

      await new Promise(resolve => setTimeout(resolve, 300));

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        bars[j + 1].style.height = `${arr[j]}px`;

        bars[j].style.background = "green"; // Mark the shifting elements

        await new Promise(resolve => setTimeout(resolve, 300));

        bars[j].style.background = "red";
        j = j - 1;
      }

      arr[j + 1] = key;
      bars[j + 1].style.height = `${key}px`;

      bars[i].style.background = "red"; // Reset key color

      await new Promise(resolve => setTimeout(resolve, 300));
    }

    for (let i = 0; i < n; i++) {
      bars[i].style.background = "purple"; // Mark sorted elements
    }
  }

  insertionSort();
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
});
