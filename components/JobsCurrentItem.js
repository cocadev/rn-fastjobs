import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { Actions } from 'react-native-router-flux'

export default class JobsCurrentItem extends React.Component {
 
  render() {
    const { item, manager } = this.props;
    return (
        <TouchableOpacity style={{backgroundColor:Colors.WHITE, marginTop:6 }} onPress={()=>Actions.jobdetail({manager})}>
          <Text style={{color:Colors.BLUE, fontSize:17, marginLeft:12, marginTop:12, fontWeight:'600'}}>{item.jobs.job_task}</Text>

          <View style={{flexDirection:'row', paddingHorizontal:12, marginVertical:10,}}>
            <View style={{ flex:3}}>
              <Text style={{color:Colors.GREY1, fontSize:16}}>{item.jobs.job_name}</Text>
              <Text style={{color:Colors.GREY1}}> {item.jobs.start_time}</Text>
              <Text style={{color:Colors.GREY1}}> {item.jobs.end_time}</Text>
              <Text style={{color:Colors.RED}}> {item.jobs.job_details}</Text>
              <Text style={{color:Colors.DARK}}> {item.employer.myState}</Text>

            </View>
            <View style={{ flex:1, padding:12}}>
              <Text style={{color:Colors.PINK, fontSize:15, fontWeight:'600'}}>Draft</Text>
            </View>
          </View>
        
        </TouchableOpacity>
    )
  }
}
