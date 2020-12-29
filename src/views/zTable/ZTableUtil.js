
export default class ZTableUtil {
    constructor() {
        this.numberVal = []
    }


    getNumberTotalsFromData = (data) => {

        data.forEach((obj, index) => {
            Object.values(obj).map((val, i) => {
                this.checkIfItsNumberVal(val, i, index)
            })
        })

        return this.numberVal;
    }

    checkIfItsNumberVal = (num, colIndex, rowIndex) => {

        let number = parseInt(num);
        if (Number.isFinite(number) && !number.seconds && number !== isNaN) {
            this.addToSumVal(number, colIndex)

        } else {


            if (rowIndex === 0&&colIndex === 0) {
                const index = this.numberVal.findIndex((e, i) => parseInt(Object.keys(e)[0]) === colIndex);
                if (index === -1) {
                    // this.pushToTotalValState({ [colIndex]: "-" })
                    this.numberVal.push({ [colIndex]: "Total" })
                }
            }else if (rowIndex === 0){
                const index = this.numberVal.findIndex((e, i) => parseInt(Object.keys(e)[0]) === colIndex);
                if (index === -1) {
                    // this.pushToTotalValState({ [colIndex]: "-" })
                    this.numberVal.push({ [colIndex]: "-" })
                }
            }
            // if (rowIndex === 0) {
            //     const index = this.numberVal.findIndex((e, i) => parseInt(Object.keys(e)[0]) === colIndex);
            //     if (index === -1) {
            //         this.numberVal.push({ [colIndex]: "-" })
            //     }




            // }
        }

    }


    addToSumVal = (newval, colIndex) => {

        const index = this.numberVal.findIndex((e, i) => parseInt(Object.keys(e)[0]) === colIndex);
        if (index === -1) {
            this.numberVal.push({ [colIndex]: newval });
        } else {

            const oldVal = Object.values(this.numberVal[index]);
            if (oldVal !== "-") {
                this.numberVal[index] = { [colIndex]: parseInt(oldVal) + newval }
            }
        }

    }



    orderList = (list, mapOrder) => {

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

}









