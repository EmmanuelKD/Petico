import React from 'react'
import "../scss/Ztable.css"
import firebase from "firebase"
import ZTableutil from "./ZTableUtil"
import {monthIndex } from "../../utils"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"


function Table({ data, className, headStyle, headClassName, thStyle, thClassName, tdStyle, tdClassName, mapOrder, withFooter = true, totalFooterVal }) {

    console.log("fireing")

    React.useEffect(() => {
    }, [])

    let ZtableUtil = new ZTableutil();
    let sortedData = orderList(data, mapOrder);

    let numberVal = ZtableUtil.getNumberTotalsFromData(sortedData);



    return (<table className={`Ztable ${className}`} id={"Ztable"}>
        <THead data={sortedData[0]} className={headClassName} headStyle={headStyle}
            thStyle={thStyle}
            thClassName={thClassName}
        />
        <tbody>
            {

                sortedData.map((d, i) => {

                    return <TRow rowIndex={i} data={d}
                        key={i} tdStyle={tdStyle} tdClassName={tdClassName}
                        withFooter={withFooter} />

                })
            }
        </tbody>
        { withFooter && <TFooter numberVal={numberVal} />}
    </table>)

}
const initialState = {
    mouseX: null,
    mouseY: null,
  };
function TRow(props) {

    const [state, setState] = React.useState(initialState);

  const handleClick = (event) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setState(initialState);
  };

    // you can style the table Columns by the name of  data passed
    return <tr className={`Zth-tr`}  >
        {Object.values(props.data).map((data, index) => {

            return <td 
             style={{ ...props.tdStyle }} 
            className={`Ztd ${Object.keys(props.data)[index]} ${props.tdClassName}`} key={index}>{

                manipulateData(data)

            }
            <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>Copy</MenuItem>
        <MenuItem onClick={handleClose}>Print</MenuItem>
        <MenuItem onClick={handleClose}>Highlight</MenuItem>
        <MenuItem onClick={handleClose}>Email</MenuItem>
      </Menu>
            </td>
        }
        )}
    </tr>

}

function THead(props) {
    // you can style the table Columns by the name of toy data passed
    return <thead className={`Zthead ${props.headClassName}`} style={{ ...props.headStyle }}>
        <tr>
            {Object.keys(props.data).map((data, index) => <th style={{ ...props.thStyle }} className={`Zth ${data} ${props.thClassName}`} key={index}>


                {


                    manipulateData(data.replace(new RegExp("_", "g")," "))

                }


            </th>)}

        </tr></thead>

}

function TFooter(props) {

    console.log(props.numberVal)
    return <tfoot>
        <tr >
            {props.numberVal.map((data, index) => <td
                key={index}
            >
                {data[index]}

            </td>)}
        </tr>
    </tfoot>
}


function orderList(list, mapOrder) {

    var newList = [];
    
    if (mapOrder === null || mapOrder === undefined) {
        list.forEach((unordered) => {
            newList.push(Object.keys(unordered).sort().reduce(function (result, key) {
                result[key] = unordered[key];
                return result;
            }, {}))
        })
    } else {
        
        list.forEach((unordered) => {
            newList.push(Object.keys(unordered).sort(function (x, y) { return mapOrder[x] - mapOrder[y]; }).reduce(function (result, key) {
                result[key] = unordered[key];
                return result;
            }, {}))
        })
    }


    return newList;
}

function manipulateData(data="") {

    if (data.seconds) {
        data = new firebase.firestore.Timestamp(data.seconds, data.nanoseconds).toDate();
    }
    if (data instanceof Date) {
        var dd = data.getDate()
        var mm = data.getMonth()
        var yyyy = data.getFullYear();
        mm=getKey(mm).substring(0,3)
        return mm + '/' + dd + '/' + yyyy;

    } else {
        return data;
    }
}


function getKey(presentMonth) {// refactor needed
    let month;
    // Object.keys(monthIndex).find((keys, index) => monthIndex[keys] == presentMonth && keys

    Object.keys(monthIndex).find((keys, index) => {
        if (monthIndex[keys] == presentMonth
        ) month = keys;
    })
    return month;
}

export default React.memo(Table)



// export default class Table extends React.Component {
//     constructor(props) {
//         super(props)
//         let {
//             data, className, headStyle, headClassName,
//             thStyle, thClassName, tdStyle, tdClassName, mapOrder, withFooter
//         } = props;

//         this.data = data;
//         this.className = className;
//         this.headStyle = headStyle;
//         this.headClassName = headClassName;
//         this.thStyle = thStyle;
//         this.thClassName = thClassName;
//         this.tdStyl = tdStyle;
//         this.tdClassName = tdClassName;
//         this.mapOrder = mapOrder;
//         this.withFooter = withFooter ?? true;

//         this.totalVal = [];


//         this.sortedData = this.orderList(data, mapOrder);
//         console.log("fireing")

//         // this.state={
//         //   totalVal:[]
//         // }

//     }

//     componentDidMount(){
//         this.totalVal = [];
//     }

// // pushToTotalValState=(newVal)=>{
// //     this.setState({ totalVal: [...this.state.totalVal, newVal] }) 
// // }


// // changeTotalValState=(newVal)=>{
// //     this.setState({ totalVal: newVal}) 
// // }

//     shouldComponentUpdate(newProps,newState){

//         return newProps.data!==this.props.data
//     }

//     checkIfItsNumberVal = (num, colIndex, rowIndex) => {

//         let number = parseInt(num);
//         if (Number.isFinite(number) && !number.seconds && number !== isNaN) {

//             this.addToSumVal(number, colIndex)

//         } else {
            // if (rowIndex === 0&&colIndex === 0) {
            //     const index = this.totalVal.findIndex((e, i) => parseInt(Object.keys(e)[0]) === colIndex);
            //     if (index === -1) {
            //         // this.pushToTotalValState({ [colIndex]: "-" })
            //         this.totalVal.push({ [colIndex]: "Total" })
            //     }
            // }else if (rowIndex === 0){
            //     const index = this.totalVal.findIndex((e, i) => parseInt(Object.keys(e)[0]) === colIndex);
            //     if (index === -1) {
            //         // this.pushToTotalValState({ [colIndex]: "-" })
            //         this.totalVal.push({ [colIndex]: "-" })
            //     }
//             }
//         }

//     }


//     addToSumVal = (newval, colIndex) => {

//         const index = this.totalVal.findIndex((e, i) => parseInt(Object.keys(e)[0]) === colIndex);
//         if (index === -1) {

//             this.totalVal.push({[colIndex]: newval });
//         } else {
//             const oldVal = Object.values(this.totalVal[index]);

//             if (oldVal !== "-") {
//                 this.totalVal[index] ={[colIndex]: parseInt(oldVal) + newval}
//             }
//         }
//     }




//     orderList = (list, mapOrder) => {

//         var newList = [];

//         if (mapOrder === null || mapOrder === undefined) {
//             list.forEach((unordered) => {
//                 newList.push(Object.keys(unordered).sort().reduce(function (result, key) {
//                     result[key] = unordered[key];
//                     return result;
//                 }, {}))
//             })
//         } else {
//             list.forEach((unordered) => {
//                 newList.push(Object.keys(unordered).sort(function (x, y) { return mapOrder[x] - mapOrder[y]; }).reduce(function (result, key) {
//                     result[key] = unordered[key];
//                     return result;
//                 }, {}))
//             })
//         }


//         return newList;
//     }







//     render() {
//         function manipulateData(data) {

//             if (data.seconds) {
//                 data = new firebase.firestore.Timestamp(data.seconds, data.nanoseconds).toDate();
//             }
//             if (data instanceof Date) {
//                 var dd = data.getDate()
//                 var mm = data.getMonth()
//                 var yyyy = data.getFullYear();

//                 return mm + '/' + dd + '/' + yyyy;

//             } else {
//                 return data;
//             }
//         }


//         function TRow(props) {
//             // you can style the table Columns by the name of  data passed
//             return <tr className={`Zth-tr`}>
//                 {Object.values(props.data).map((data, index) => {

//                     if (data !== "") {
//                         props.withFooter && props.checkIfItsNumber(data, index, props.rowIndex)
//                     }
//                     return <td style={{ ...props.tdStyle }} className={`Ztd ${Object.keys(props.data)[index]} ${props.tdClassName}`} key={index}>{

//                         manipulateData(data)

//                     }</td>
//                 }
//                 )}
//             </tr>

//         }

//         function THead(props) {
//             // you can style the table Columns by the name of toy data passed
//             return <thead className={`Zthead ${props.headClassName}`} style={{ ...props.headStyle }}>
//                 <tr>
//                     {Object.keys(props.data).map((data, index) => <th style={{ ...props.thStyle }} className={`Zth ${data} ${props.thClassName}`} key={index}>


//                         {

//                             // data instanceof Date || data?.nanoseconds!==null || data?.nanoseconds!==undefined ?
//                             //     manipulateDate(data) :
//                             //     data !== " " && data
//                             manipulateData(data)

//                         }


//                     </th>)}

//                 </tr></thead>

//         }

//         function TFooter(props) {
//             // var ob={}
//             // Object.values(ob).length
//             console.log(props.totalVal)
//             return <tfoot>
//                 <tr >
//                     {props.totalVal?.map((data, index) => <td
//                         key={index}
//                     >
//                         {/* {data[index]!=="-"?parseInt(data[index])/2:data[index]} */}
//                         {data[index]}

//                     </td>)}
//                 </tr>
//             </tfoot>
//         }


//         return (<table className={`Ztable ${this.className}`}>
//             <THead data={this.sortedData[0]} className={this.headClassName} headStyle={this.headStyle}
//                 thStyle={this.thStyle}
//                 thClassName={this.thClassName}
//             />
//             <tbody>
//                 {

//                     this.sortedData.map((d, i) => {

//                         return <TRow rowIndex={i} data={d}
//                             key={i} tdStyle={this.tdStyle} tdClassName={this.tdClassName}
//                             checkIfItsNumber={this.checkIfItsNumberVal} withFooter={this.withFooter} />

//                     })
//                 }
//             </tbody>
//             { this.withFooter && <TFooter totalVal={this.totalVal} />}
//         </table>)
//     }

// }


