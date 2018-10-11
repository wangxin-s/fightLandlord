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
    brandData(list,imgArr) {
        let is_ml0 = true;
        let imgData = [];
        list.forEach((item, index) => {
            let i=1061;
            if(item*1==51||item*1==50||item*1==49||item*1==48){
                i=1061+item*1-48
            }else if(item*1==52){
                i=1114;
            }else if(item*1==53){
                i=1113;
            }else{
                i=(1065+item*1);
            }
            let src=require('../../../images/card/card_'+i+'@2x.png');
            if(is_ml0 && imgArr[index]!='out') {//当前第一张图片  margin-left 0
                imgData.push(
                    <img key={index} src={src} className={['ml0',imgArr[index] ? 'transition-selection' : '', imgArr[index] == 'out' ? 'transition-out' : ''].join(' ')} onClick={this.props.imgClick.bind(this,index)} alt="" />
                )
                is_ml0 = false;
            }else {
                imgData.push(
                    <img key={index} src={src} className={[imgArr[index] ? 'transition-selection' : '',imgArr[index] == 'out' ? 'transition-out' : ''].join(' ')} onClick={this.props.imgClick.bind(this,index)} alt="" />
                )
            }

        })
        return imgData;

    }

    render() {
        return (
            <div className="show-card" style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
                {this.brandData(this.props.list,this.props.imgArr)}
            </div>
        );
    }
}

export default MyCard;
