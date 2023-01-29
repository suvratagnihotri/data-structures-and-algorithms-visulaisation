package web.visualise.algorithms.algorithms;

//QuickSort algorithm is bases on divide and conquer algorithm .
//In this algorithm we take a pivot element and put all the 
//larger elements than pivot on one side and smaller elements on the other side.
public class QuickSort {

    public void swap(int [] unsortedArray, int i, int j){
        int temp = unsortedArray[i];
        unsortedArray[i] = unsortedArray[j];
        unsortedArray[j] = temp;
    }

    public int getPivotElement(int[] unsortedArray){
        int pivot = unsortedArray[unsortedArray.length-1];
        int i = 0;

        for(int j = 0;j<unsortedArray.length; j++){
            if(unsortedArray[j]<pivot){
                i++;
                this.swap(unsortedArray,i,j);
            }
        }
        swap(unsortedArray,i+1,unsortedArray.length);
        return i+1;

    }
    public int [][] run(int [] unsortedArray){
        int pivotElement = this.getPivotElement(unsortedArray);
        return null;
    }
}
