/**
 * Created by ex-wangxin on 2018/9/29.
 */
import React from 'react';

class MyCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 90
        };
    }

    componentDidMount() {

    }

    // 渲染所有牌
    brandData(list,statusArr) {
        let is_ml0 = true;
        let imgData = [];
        if(list.length>0) {
            list.forEach((item, index) => {
                // let i=1061;
                // if(item*1==51||item*1==50||item*1==49||item*1==48){
                //     i=1061+item*1-48
                // }else if(item*1==52){
                //     i=1114;
                // }else if(item*1==53){
                //     i=1113;
                // }else{
                //     i=(1065+item*1);
                // }
                let src=require('../../../images/card/card_'+item.icon+'.png');
                if(is_ml0 && statusArr[index]!='out') {//当前第一张图片  margin-left 0
                    imgData.push(
                        <img key={index} src={src} className={['ml0',statusArr[index] ? 'transition-selection' : '', statusArr[index] == 'out' ? 'transition-out' : ''].join(' ')} onClick={this.props.cardClick.bind(this,index)} alt="" />
                    )
                    is_ml0 = false;
                }else {
                    imgData.push(
                        <img key={index} src={src} className={[statusArr[index] ? 'transition-selection' : '',statusArr[index] == 'out' ? 'transition-out' : ''].join(' ')} onClick={this.props.cardClick.bind(this,index)} alt="" />
                    )
                }
    
            })
        }
        
        return imgData;

    }

    render() {
        return (
            <div className="show-card" style={{ display: "inline-block", verticalAlign: "bottom" }}>
                {this.brandData(this.props.list,this.props.cardStatusArr)}
            </div>
        );
    }
}

export default MyCard;
