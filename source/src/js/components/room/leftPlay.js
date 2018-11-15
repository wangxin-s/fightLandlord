/**
 * Created by ex-wangxin on 2018/9/29.
 */
/**
 * Created by ex-wangxin on 2018/9/29.
 */
import React from 'react';

class MyBeenOutCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 30,
            playerLeft : '',//左边的人
            playerRight : '',//右边的人
            leftList : [],//左边的牌
            rightList : [],//右边的牌
            bottomList : [],//底下人的牌
            grabImg : false,           
        };

    }
    componentDidMount() {
        this.setState({
            count: 30,
            playerLeft : '',//左边的人
            playerRight : '',//右边的人
            leftList : [],//左边的牌
            rightList : [],//右边的牌
            bottomList : [],//底下人的牌
            grabImg : false,
        })
        let roomData = this.props.roomData;
        let name = this.props.roomId.name;
        let room = this.props.roomId.room;         
        this.dataFun(roomData,name,room)              
    }

    componentWillUnmount() {
        this.setState({
            count: 30,
            playerLeft : '',//左边的人
            playerRight : '',//右边的人
            leftList : [],//左边的牌
            rightList : [],//右边的牌
            bottomList : [],//底下人的牌
            grabImg : false,
        })
    }
    componentWillReceiveProps(nextProps) { 	
        let roomData = nextProps.roomData;
        let name = nextProps.roomId.name; 
        let room = nextProps.roomId.room;           
        this.dataFun(roomData,name,room)
    }

    dataFun(roomData,name,room,left,right,bottom){
        let playerLeft,playerRight,leftList=[],rightList=[],sit,dataList,isRob,showCard,grabImg;       
        roomData.map((item,i)=>{
            if(room == item.room){
                dataList = item.playerList;
                for(let j in item.playerList){                    
                    if(item.playerList[j].name == name){                       
                        sit = item.playerList[j].site;
                        isRob = item.playerList[j].isRob;                                               
                    }
                }                
            }
        });
        if(sit == 'left'){
            playerLeft = dataList[2].name;
            playerRight = dataList[1].name;
            leftList = dataList[2].cardsList;
            rightList = dataList[1].cardsList;
        }
        if(sit == 'right'){
            playerLeft = dataList[1].name;
            playerRight = dataList[0].name;
            leftList = dataList[1].cardsList;
            rightList = dataList[0].cardsList;
        }
        if(sit == 'bottom'){
            playerLeft = dataList[0].name;
            playerRight = dataList[2].name;
            leftList = dataList[0].cardsList;
            rightList = dataList[2].cardsList;
        }
        this.setState({
            playerLeft,
            playerRight,
            leftList,
            rightList
        })
    }
    // 左边玩家出牌展示
    leftCardData(list) {
        if(list == undefined)return;
        if(list.length >0){
            return list.map((item, index) => {
                return <img key={index} src={this.getSrc(item.icon)} alt="" />
            })
        }
    }

    // 右边玩家出牌展示
    rightCardData(list) {
        if(list == undefined)return;
        if(list.length >0){
            return list.map((item, index) => {
                return <img key={index} src={this.getSrc(item.icon)} alt="" />
            })
        }else{
            return
        }
    }

    getSrc(item){
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
        return require('../../../images/card/card_'+i+'@2x.png');
    }
    render() {
        // console.log(this.props.count);
        return (
            <div className="room-container-player">
                <div className="room-container-player-left" style={{display : this.state.playerLeft !==''?'inline-block':'none'}}>
                    <div className="player">
                        <div className="player-head text-r">
                            <img src={require('../../../images/player8.png')} alt="" />
                            <p>{this.state.playerLeft}</p>
                            <p>已准备</p>
                            <p className="color-y"><img className="beans"
                                src={require('../../../images/beans2.png')}></img>9999</p>
                        </div>
                        <div className="player-identity">
                            <img className="farmer" src={this.props.landlordShow == this.state.playerLeft ? require('../../../images/Landlord.png') : require('../../../images/farmer.png')} alt="" />
                            <div className="card-back">
                                17
                            </div>
                        </div>
                    </div>
                    <div className="out-brand">
                        {/* 左边玩家出牌区 */}
                        {this.leftCardData(this.state.leftList)}
                        {/* 提示 title */}
                        <div className="is-landlord" style={{ display: this.state.isTimer == 3 ? 'none' : 'block' }}></div>
                        {/* 倒计时 */}
                        <div className="timer" style={{ display: this.props.timerImg == this.state.playerLeft ? 'block' : 'none' }}>
                            {this.props.count}
                        </div>
                    </div>
                </div>
                <div className="room-container-player-right" style={{display : this.state.playerRight !==''?'inline-block':'none'}}>
                    <div className="out-brand">
                        {/* 右边玩家出牌区 */}
                        {this.rightCardData(this.state.rightList)}
                        {/* 提示 title */}
                        <div className="is-landlord" style={{ display: this.state.isTimer == 2 ? 'none' : 'block' }}></div>
                        {/* 倒计时 */}
                        <div className="timer" style={{ display: this.props.timerImg == this.state.playerRight ? 'block' : 'none' }}>
                            {this.props.count}
                        </div>
                    </div>
                    <div className="player">
                        <div className="player-identity">
                            <img className="farmer" src={this.props.landlordShow == this.state.playerRight ? require('../../../images/Landlord.png') : require('../../../images/farmer.png')} alt="" />
                            <div className="card-back">
                                17
                            </div>
                        </div>
                        <div className="player-head text-l">
                            <img src={require('../../../images/player8.png')} alt="" />
                            <p>{this.state.playerRight}</p>
                            <p>已准备</p>
                            <p className="color-y"><img className="beans"
                                src={require('../../../images/beans2.png')}></img>9999</p>
                        </div>

                    </div>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

export default MyBeenOutCard;
