/**
 * Created by ex-fuyunfeng on 2018/11/5.
 */
import React from 'react';

class Ready extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {

    }

    render() {
        let roomPlayerInfo = this.props.roomPlayerInfo;
        let mySeat = this.props.mySeat;
        return (
            <div className="my-operating" style={{display:roomPlayerInfo.subStatus== 'playLandlord' && roomPlayerInfo[mySeat].isPlayLandlordTitle!='' ?'block':'none'}}>
                <div className="isplayLandlordTitle">
                    {roomPlayerInfo[mySeat].isPlayLandlordTitle}
                </div>
            </div>
        );
    }
}

export default Ready;