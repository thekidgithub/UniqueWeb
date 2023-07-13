let arr1 = [37, 29, 39, 11, 2];
insertionSort(arr1, arr1.length);
console.log(arr1);

function insertionSort(arr, n) {
    let i, j, key;
    for (i = 1; i < n; i++) {
        key = arr[i];//确定枢轴
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];//后移
            j--;
        }
        arr[j + 1] = key;//插入
    }
}

let arr2 = [37, 29, 39, 11, 2];
heapSort(arr2, arr2.length);
console.log(arr2);
function heapAdjust(arr, n, i) {
    let now = i;
    let left = i * 2;
    let right = i * 2 + 1;
    if (left < n && arr[left] > arr[now]) now = left;
    if (right < n && arr[right] > arr[now]) now = right;//找出左右孩子中最大的元素
    if (now != i) {
        let temp;
        temp = arr[now];
        arr[now] = arr[i];
        arr[i] = temp;
        heapAdjust(arr, n, now);//如果不是根元素，就交换，再对子树堆调整
    }
}

function heapSort(arr, n) {
    let i;
    for (i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapAdjust(arr, n, i);//初始堆调整
    }
    for (i = n - 1; i > 0; i--) {
        let temp;
        temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;//把最大值移到末尾
        heapAdjust(arr, i, 0);//对剩下的元素堆调整
    }
}

let arr3 = [37, 29, 39, 11, 2];
quickSort(arr3, 0, arr3.length - 1);
console.log(arr3);

function quickSort(arr, l, r) {
    if (l < r) {
        let pivot = partition(arr, l, r);//确定中点位置
        quickSort(arr, l, pivot - 1);
        quickSort(arr, pivot + 1, r);
    }
}

function partition(arr, l, r) {
    let pivot = arr[r];
    let i = l - 1;
    let j;
    for (j = l; j <= r - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            let temp;
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;//把小的数移到左边，大的保留在右边
        }
    }
    let temp;
    temp = arr[i + 1];
    arr[i + 1] = arr[r];
    arr[r] = temp;
    return i + 1;
}

let arr4 = [37, 29, 39, 11, 2];
mergeSort(arr4, 0, arr4.length - 1);
console.log(arr4);

function mergeSort(arr, l, r) {
    if (l < r) {
        let mid = l + Math.floor((r - l) / 2);
        mergeSort(arr, l, mid);
        mergeSort(arr, mid + 1, r);//递归排序
        merge(arr, l, mid, r);//归并排好序的数组
    }
}

function merge(arr, l, mid, r) {
    let L = [], R = [];
    let n1 = mid - l + 1, n2 = r - mid;
    let i, j, k;
    for (i = 0; i < n1; i++) L[i] = arr[l + i];
    for (j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];//确定左右两个临时数组
    i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {//对两个数组做递增归并
        if (L[i] < R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) {
        arr[k] = L[i];
        k++;
        i++;
    }
    while (j < n2) {
        arr[k] = R[j];
        k++;
        j++;
    }//复制剩余元素
}