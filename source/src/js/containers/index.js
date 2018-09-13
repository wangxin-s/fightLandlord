/**
 * Created by ex-wangxin on 2018/9/11.
 */
import React from 'react';
class Index extends React.Component {
    test(){
        let a={name:'李白'};
        let b={age:'123'};
        console.log({...a,...b});
    }

    render(){
        return(
            <div>
                holle world
                {this.test()}
            </div>
        )
    }
}
export default Index