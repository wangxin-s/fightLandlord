/**
 * Created by ex-wangxin on 2018/9/29.
 */
import React from 'react';

class MyBeenOutCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 90
        };
    }

    componentDidMount() {

    }

    // 已出的牌展示
    beenOut(list) {
        return list.map((item, index) => {
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
            return <img key={index} src={src} alt="" />
        })
    }
    render() {
        let isReady=this.props.show;
        return (
            <div className="been-out" style={{display:isReady=='hasDisCard'?'block':'none'}}>
                {this.beenOut(this.props.list)}
            </div>
        );
    }
}

export default MyBeenOutCard;
