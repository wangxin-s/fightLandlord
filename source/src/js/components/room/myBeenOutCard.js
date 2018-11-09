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
        let imgData = [];
        list.forEach((item, index) => {
            let src=require('../../../images/card/card_'+item+'.png');
            imgData.push(
                <img key={index} src={src} className={index==0 ?'ml0':''} alt="" />
            )

        })
        return imgData;
    }
    render() {
        let roomPlayerInfo = this.props.roomPlayerInfo;
        let mySeat = this.props.mySeat;
        return (
            <div className="been-out" style={{display:roomPlayerInfo[mySeat].showOutCardIcon.length!=0?'block':'none'}}>
                {roomPlayerInfo[mySeat].showOutCardIcon[0]!='notOut'?
                    this.beenOut(roomPlayerInfo[mySeat].showOutCardIcon):'不出'
                }
            </div>
        );
    }
}

export default MyBeenOutCard;
