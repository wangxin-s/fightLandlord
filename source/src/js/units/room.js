/**
 * Created by ex-wangxin on 2018/9/29.
 */

//判断当前牌的类型
export function cardType(list) {
    newSort(list);
    let newData=countScore(list);
    let score = newData.score;//牌分值数组
    let arr = newData.arr;//牌相同张数数组  list--[1,1,2,2,3,3]   arr--[2,2,2]
    let clockwise = newData.clockwise;//判断是否为顺子
    let arrLen = arr.length;//数组长度
    let listLen = list.length;//数组长度
    if (listLen == 1) return '单牌';
    if (listLen == 2 && score[0] >= 13 && score[1] >= 13) return '火箭';

    if (clockwise) {//判断顺牌
        if (arr[0] == 1 && arrLen >= 5) {
            let check = true;
            score.map((item, i)=> {
                if (i < listLen - 1) {
                    if (score[i + 1] - item != 1) check = false;
                }
                if(item>=12){
                    check = false
                }
            });
            if (check) {
                return '单顺'
            }
        } else if (arr[0] == 2 && arrLen >= 3) {
            let check = true;
            for (let i = 0; i < listLen; i = i + 2) {
                if (i < listLen - 2) {
                    if (score[i + 2] - score[i] != 1) check = false;
                }
                if(score[i]>=12){
                    check = false
                }
            }
            if (check) {
                return '双顺'
            }
        } else if (arr[0] == 3 && arrLen >= 2) {
            let check = true;
            for (let i = 0; i < listLen; i = i + 3) {
                if (i < listLen - 3) {
                    if (score[i + 3] - score[i] != 1) check = false;
                }
                if(score[i]>=12){
                    check = false
                }
            }
            if (check) {
                return '三顺'
            }
        }
    } else {
        if (arrLen == 1) {
            if (arr[0] == 2) {
                return '对牌'
            } else if (arr[0] == 3) {
                return '三牌'
            } else if (arr[0] == 4) {
                return '炸弹'
            }
        } else if (arrLen == 2) {
            if (arr[0] == 1 && arr[1] == 3) {
                return '三带一'
            } else if (arr[0] == 2 && arr[1] == 3) {
                return '三带二'
            }else if(arr[0] == 2 && arr[1] == 4){
                return '四带二'
            }else if(arr[0] == 4 && arr[1] == 4){
                return '四带二'
            }
        } else if (arrLen == 3) {
            if (
                (arr[0] == 1 && arr[1] == 1 && arr[2] == 4) ||
                (arr[0] == 2 && arr[1] == 2 && arr[2] == 4)
            ) {
                return '四带二'
            }
        } else if (arrLen >= 4) {
            if (0) {//牌型是2的倍数
                let check = true;
                for (let i = 0; i < arrLen / 2; i++) {
                    if (
                        (i < arrLen / 2 - 1 && arr[i] != arr[i + 1]) ||
                        (arr[i] != 1 && arr[i] != 2)
                    ) {
                        check = false
                    }
                }
                for (let i = arrLen / 2; i < arrLen; i++) {
                    if (arr[i] != 3) check = false
                }
                if (check) return '飞机带翅膀'
            }else{
                let four=0;
                let three=0;
                let two=0;
                let one=0;
                let check=false;

                let threeN=0;//三顺数量 111 222   2  或者 111 222 333  3
                let tCount=1;

                newData.threeScore.map((item,i)=>{
                    if (i < listLen - 1) {
                        if (newData.threeScore[i + 1] - item == 1&&newData.threeScore[i + 1]<12){
                            tCount++;
                            if(tCount>threeN){
                                threeN=tCount;
                            }
                        }else{
                            tCount=1;
                        }
                    }
                    if(item>=12){
                        check = false;
                    }
                });


                arr.map((item,i)=>{
                    if(item==3){
                        three++;
                    }else if(item==2){
                        two++;
                    }else if(item==4){
                        four++;
                    }else{
                        one++;
                    }
                });
                if(one>0){
                    if(threeN==one+two*2+four*4+(three-threeN)*3){
                        check=true;
                    }
                }else if(two>0&&one==0){
                    if(threeN==two+four*2+(three-threeN)*3){
                        check=true;
                    }
                }else{
                    if(threeN==two*2+four*2+(three-threeN)*3){
                        check=true;
                    }
                }
                if (check) return '飞机带翅膀'
            }
        }
    }
    return false;//牌型不对
}

//比较当前要出的牌  和  上家已经出的牌的大小 是否能出牌
export function compareCard(myList,upList){
    /*
    myList  我当前要出的牌  和 上家已经出的牌
    * */
    let myNewData=countScore(myList);//我当前要出的牌
    let myType=cardType(myList);//我的牌的牌型
    let myLen=myList.length;//我的牌的牌型
    let myScore=myNewData.score;//我的牌的分值
    let myArrScore=myNewData.arrScore;//我的牌的分值--牌分类对应的分值

    let upNewData=countScore(upList);//上家已经出的牌
    let upType=cardType(upList);//上家已经出的牌--牌型
    let upLen=upList.length;//上家已经出的牌--长度
    let upScore=upNewData.score;//上家已经出的牌--分值
    let upArrScore=upNewData.arrScore;//上家已经出的牌--牌分类对应的分值

    if(myLen>0&&upLen>0){
        if(myType!=upType){//当前牌的类型不同
            if(
                !(myType=='火箭'||(myType=='炸弹'&&upType!='火箭'))
            ){
                console.log('牌型不同',myType,upType);
                return false;
            }
        }else{//相同的牌型
            if(myType == '单牌'||myType =='对牌'||myType=='三牌'||myType=='炸弹'){
                if(myScore[0]<=upScore[0]){
                    console.log('当前牌的分值小与上家已出牌的分值');
                    return false;
                }
            }
            if(myLen!=upLen){
                console.log('和上家已出牌的张数不同');
                return false;
            }else{
                if (myType == '单顺' || myType == '双顺' || myType == '三顺') {
                    if (myScore[0] <= upScore[0]) {
                        console.log('当前牌的分值小与上家已出牌的分值');
                        return false;
                    }
                }else if(myType=='三带一'||myType=='三带二'){
                    if(myArrScore[3]<=upArrScore[3]){
                        console.log('当前牌的分值小与上家已出牌的分值');
                        return false;
                    }
                }else if(myType=='四带二'){
                    if(myNewData.fourScore[myNewData.fourScore.length-1]<=upNewData.fourScore[upNewData.fourScore.length-1]){
                        console.log('当前牌的分值小与上家已出牌的分值');
                        return false;
                    }
                }else if(myType=='飞机带翅膀'){
                    if(myNewData.plane.length!=upNewData.plane.length){
                        console.log('飞机带翅膀 -- 飞机数量不同');
                        return false;
                    }
                    if(myNewData.plane[0]<=upNewData.plane[0]){
                        console.log('当前牌的分值小与上家已出牌的分值');
                        return false;
                    }
                }
            }
        }
    }else{
        return false;
    }
    return true;
}

//计算牌的分值  和  相同牌的个数  相同的牌每种有几个
export function countScore(list){
    newSort(list);
    let score = [];//牌分值数组
    list.map((val)=> {
        score.push(getVal(val))
    });
    let arr = [];//牌相同张数数组  list--[1,1,2,2,3,3]   arr--[2,2,2]
    let arrScore={};//牌的类型 对应的分值
    let cnt = 1;//记录相同的牌有几张
    let clockwise = true;//判断是否为顺子
    let threeScore=[];//飞机带翅膀的分值统计  都是三张的分值
    let fourScore=[];//四带一  四带二 分值计算
    score.map((item, i)=> {
        if (i < score.length - 1 && score[i + 1] == item) {
            cnt++
        } else {
            if (
                (arr.length > 0 && cnt != arr[arr.length - 1])
                || item >= 13 || score.length < 5
            ) {
                clockwise = false;
            }
            arr.push(cnt);
            arrScore[cnt]=item;
            if(cnt==3){
                threeScore.push(item);
            }
            if(cnt==4){
                fourScore.push(item);
            }
            cnt = 1;
        }
    });

    let checkThree=false;//判断三联是否为飞机
    let plane=[];//飞机数组
    //判断多个三张排除顺子
    threeScore.map((item,i)=>{
        if(i<threeScore.length-1&&item!=threeScore[i+1]-1){
            clockwise=false;
        }else{
            plane.push(item);
        }
    });

    if(fourScore.length==2){
        clockwise=false;
    }
    newSort(arr);//对相同牌的张数排序
    newSort(threeScore);//飞机带翅膀的分值统计  都是三张的分值
    newSort(plane);//飞机带翅膀的分值统计  都是三张的分值
    return {
        score,
        arr,
        clockwise,
        arrScore,
        threeScore,
        fourScore,
        plane,//飞机  三牌大小分值
    }
}

//排序方法
export function newSort(list) {
    list.sort(function (a, b) {
        return a - b
    })
}

//获取当前牌的分值
export function getVal(val) {
    return parseInt(val * 1 / 4)
}

//判断牌的长度
export function len(list) {
    return len.length;
}

export function cloneFun(list){
    return JSON.parse(JSON.stringify(list));
}