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
