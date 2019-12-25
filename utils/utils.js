import { AsyncStorage } from 'react-native';
import Colors from '../constants/Colors';

// import * as CONST from '../constant'

class UtilService {

    static filterExperience(data) {
        let filterd = []
        if(!data){ return [] }
        Object.keys(data).map(function (_) {
            filterd.push(data[_])
        })
        return filterd
    }

    static filterExperienceWithKey(data) {
        let filterd = []
        if(!data){ return [] }
        Object.keys(data).map(function (_) {
            filterd.push({
                data:data[_],
                key:_
            })
        })
        return filterd
    }

    

        static getJobType(index) {
            let msg = index;
            switch (index) {
                case 1:
                    msg = 'Part Time'; break;
                case 2:
                    msg = 'Full Time'; break;
                default:
                    msg = 'Contact'; break;
            }
            return msg
        }

    static getSaleryType(index) {
        let msg = index;
        switch (index) {
            case 1:
                msg = 'Per Hour'; break;
            case 2:
                msg = 'Per Day'; break;
            case 3:
                msg = 'Per Week'; break;
            case 4:
                msg = 'Per Month'; break;
            default:
                msg = 'Per Shift'; break;
        }
        return msg
    }

    static getDateTime(date) {
        if(!date){
            return false
        }
        let d = new Date(date);
        const padWithZero = number => {
          const string = number.toString();
          if (number < 10) {
            return "0" + string;
          }
          return string;
        };
        return padWithZero(d.getMonth()+1)+'-'+padWithZero(d.getDate()) + '-' + d.getFullYear()
    }

    static getDayTime(date) {
        let d = new Date(date);
        const padWithZero = number => {
          const string = number.toString();
          if (number < 10) {
            return "0" + string;
          }
          return string;
        };
        const Monthes = number => {
            const string = number.toString();
            if (number == 0) { return "Dec" }
            if (number == 1) { return "Jan" }
            if (number == 2) { return "Feb" }
            if (number == 3) { return "Mar" }
            if (number == 4) { return "Apr" }
            if (number == 5) { return "May" }
            if (number == 6) { return "Jun" }
            if (number == 7) { return "July" }
            if (number == 8) { return "Aug" }
            if (number == 9) { return "Sep" }
            if (number == 10) { return "Oct" }
            if (number == 11) { return "Nov" }
            if (number == 12) { return "Dec" }

            return string;
          };
        return Monthes(d.getMonth()+1)+' '+padWithZero(d.getDate())
    }

    static getHourMinutes(date){
        let dd = new Date(date)
        let h = dd.getHours(), m = dd.getMinutes()
        let AP = ' AM'
        if (h > 12){
            h = h - 12;
            AP = ' PM'
        }
        
        return h + '-'+ AP
    }

    static getDay(date){
        let dd = new Date(date)
        let h = dd.getDay()
        console.log('what is day ', h)
        if (h == 0){
            AP = ' Sunday '
        }if (h == 1){
            AP = ' Monday '
        }if (h == 2){
            AP = ' Tuesday '
        }if (h == 3){
            AP = ' Wednesday '
        }if (h == 4){
            AP = ' Thirsday '
        }if (h == 5){
            AP = ' Friday '
        }if (h == 6){
            AP = ' Saturday '
        }
        return AP
    }

    ////////////////////////
    ///// date systeme /////
    ////////////////////////
    // static getDateTime(date) {
    //     let d = new Date(date);
    //     const padWithZero = number => {
    //       const string = number.toString();
    //       if (number < 10) {
    //         return "0" + string;
    //       }
    //       return string;
    //     };
    //     return padWithZero(d.getMonth()+1)+'/'+padWithZero(d.getDate()) + '  ' + d.getFullYear()
    // }

    static getTimePeriod(date1, date2){
        let d1 = new Date(date1).getTime()
        let d2 = new Date(date2).getTime()

        let AP = Math.floor((d2-d1)/3600000);   
        
        
        return AP
    }

    static getHourMinutes(date){
        let dd = new Date(date)
        let h = dd.getHours(), m = dd.getMinutes()
        let AP = ' AM'
        if (h > 12){
            h = h - 12;
            AP = ' PM'
        }
        
        return h+''+ AP
    }

    static getDay(date){
        let dd = new Date(date)
        let h = dd.getDay()
        console.log('what is day ', h)
        if (h == 0){
            AP = ' Sunday '
        }if (h == 1){
            AP = ' Monday '
        }if (h == 2){
            AP = ' Tuesday '
        }if (h == 3){
            AP = ' Wednesday '
        }if (h == 4){
            AP = ' Thirsday '
        }if (h == 5){
            AP = ' Friday '
        }if (h == 6){
            AP = ' Saturday '
        }
        return AP
    }

    static getStatus(index){
        switch(index){
            case 0:
            text = 'In Progress';break;
            case 1:
            text = 'Confirmed';break;
            default:
            text = 'Completed';break;
        }
        return text
    }

    static getColor(index){
        let color = Colors.Orange
        if (index == 0){
            color = Colors.Orange
        }
        if (index == 1){
            color = Colors.BLUE
        }
        if (index == 2){
            color = Colors.PINK
        }
        return color
    }
}

export default UtilService
