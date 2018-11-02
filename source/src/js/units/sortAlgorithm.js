/**
 * Created by ex-wangxin on 2018/10/16.   排序算法
 */

// 排序算法----冒泡排序
export function sortBubble(list){
    let max='';
    let len=list.length;
    for(let i=0;i<len-1;i++){
        for(let j=0;j<len-1-i;j++){
            if(list[j]>list[j+1]){
                list[j]+=list[j+1];
                list[j+1]=list[j]-list[j+1];
                list[j]=list[j]-list[j+1];
            }
        }
    }
    // console.log(list);
}

//排序算法----定向冒泡排序
export function orientSortBubble(list){
    let max='';
    let len=list.length;
    let left=0,right=len-1;
    while(left<right){
        for(let j=0;j<right;j++){
            if(list[j]>list[j+1]){
                list[j]+=list[j+1];
                list[j+1]=list[j]-list[j+1];
                list[j]=list[j]-list[j+1];
            }
        }
        right--;
        for(let i=right;i>left;i--){
            if(list[i]<list[i-1]){
                list[i]+=list[i-1];
                list[i-1]=list[i]-list[i-1];
                list[i]=list[i]-list[i-1];
            }
        }
        left++;
    }
    // console.log(list);
}

//排序算法----选择排序
export function sortSelect(list){
    let len=list.length;
    for(let i=0;i<len-1;i++){
        let min=i;
        for(let j=i;j<len;j++){
            if(list[j]<list[min]){
                min=j;
            }
        }
        if(min!=i){
            list[min]+=list[i];
            list[i]=list[min]-list[i];
            list[min]=list[min]-list[i];
        }
    }
    // console.log(list);
}

//排序算法--插入排序
export function sortInsert(list){
    let len=list.length;
    for(let i=1;i<len;i++){
        let get=list[i],j=i-1;
        while(j>=0&&list[j]>get){
            list[j+1]=list[j];
            j--;
        }
        list[j+1]=get;
    }
    // console.log(list);
}

//排序算法--二分插入排序
export function sortHalfInsert(list){
    let len=list.length;
    for(let i=0;i<len;i++){
        let get=list[i];
        let left=0,right=i-1;
        while(left<=right){
            let middle=parseInt((left+right)/2);
            if(list[middle]>get){
                right=middle-1
            }else{
                left=middle+1
            }
        }
        for(let j=i-1;j>=left;j--){
            list[j+1]=list[j]
        }
        list[left]=get;
    }
    // console.log(list);
}

//排序算法--希尔排序（递减增量排序  不稳定排序  插入排序的一种）
export function sortShell(list){
    let len=list.length;
    let gap=parseInt(len/2);
    while(gap>=1){
        for(let j=gap;j<len;j++){
            let i,tem=list[j];
            for(i=j-gap;j>=0&&tem<list[i];i=i-gap){
                list[i+gap]=list[i];
            }
            list[i+gap]=tem;
        }
        gap=parseInt(gap/2);
    }
    // console.log(list);
}

//排序算法--归并排序
export function sortMerge(list){
    let len=list.length;
    function merge(list,left, mid,right){
        let len=right-left+1;
        let newList=new Array(len);
        let index=0;
        let i=left;
        let j=mid+1;
        while(i<=mid&&j<=right){
            newList[index++]=list[i]<=list[j]?list[i++]:list[j++];
        }
        while(i<=mid){
            newList[index++]=list[i++]
        }
        while(j<=right){
            newList[index++]=list[j++]
        }
        for(var k=0;k<len;k++){
            list[left++]=newList[k]
        }
    }
    function mergeSortRec(list,left,right){
        if(left==right){
            return;
        }
        let mid=parseInt((left+right)/2);
        mergeSortRec(list,left,mid);
        mergeSortRec(list,mid+1,right);
        merge(list,left,mid,right)
    }
    mergeSortRec(list,0,len-1);
    // console.log(list);
}

//排序方法--堆排序()
export function sortHeap(list){
    let len=list.length;
    let max=list[0];
    for(let i=0;i<len;i++){
        if(list[i]>list[max]){
            max=i
        }
    }
    if(max!=len-1){
        list[len-1]+=list[max];
        list[max]=list[len-1]-list[max];
        list[len-1]=list[len-1]-list[max];
    }
}

//计算排序算法--用时方法
export function countTime(fun,log,list){
    // console.time(log);
    fun(list);
    // console.timeEnd(log);
}