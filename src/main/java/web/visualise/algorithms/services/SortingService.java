package web.visualise.algorithms.services;

import java.util.Arrays;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;


@Service
public class SortingService {
    String selectedAlgorithm;
    public int [] getData(String data){
        JSONObject jsonObject = new JSONObject(data);
        String content =  jsonObject.getString("content");
        JSONObject algorithmData = new JSONObject(content);
        String algorithm = algorithmData.getString("sorting-algorithm");
        this.selectedAlgorithm = algorithm.trim();
        JSONArray array = new JSONArray(algorithmData.get("poles-heights").toString());
        int[] unsortedArray = new int[array.length()];
        for(int i = 0; i<array.length()-1; i++){
            unsortedArray[i] = (Integer)array.get(i);
            System.out.println((Integer)array.get(i));
        }
        return unsortedArray;
    }

    public int [][] runSelectionSort(int [] unsortedArray){
        int tempNumber;
        int sortingProcess [][] = new int [unsortedArray.length][unsortedArray.length];
        for(int i = 0; i<unsortedArray.length; i++){
            for(int j = i ; j<unsortedArray.length; j++){
                if(unsortedArray[j]<unsortedArray[i]){
                    tempNumber = unsortedArray[i];
                    unsortedArray[i] = unsortedArray[j];
                    unsortedArray[j] = tempNumber;
                }
            }
            System.out.println(Arrays.toString(unsortedArray));
            for(int k = 0 ; k<unsortedArray.length; k++){
                sortingProcess[i][k] = unsortedArray[k];
            }
        }
        
        return sortingProcess;
    }
    public int [][] runSortingAlgorithm(String data){
        int unsortedArray[] =  this.getData(data);
        System.out.println("Length :"+unsortedArray.length);
        int sortingProcess [][];
        if(this.selectedAlgorithm.equals("merge-sort")){
            System.out.println("Selected Algorith is Merge Sort");
        }
        else if(this.selectedAlgorithm.equals("quick-sort")){
            System.out.println("Selected Algorith is Quick Sort");
            

        }
        else if(this.selectedAlgorithm.equals("selection-sort")){
            System.out.println("Selected Algorith is Selection Sort");
            sortingProcess = this.runSelectionSort(unsortedArray);
            System.out.println("Length :"+sortingProcess.length);

            for (int[] i : sortingProcess) {
                System.out.println(i);
            }
            return sortingProcess;
        }
        return null;
    }
}
