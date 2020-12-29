export const monthIndex = {
    January: 0, February: 1, March: 2,
    April: 3, May: 4, June: 5, July: 6,
    August: 7, September: 8, October: 9,
    November: 10, December: 11
}

export function printData() {
    var divToPrint = document.getElementById("Ztable").cloneNode(true);


    divToPrint.style.width = "100vw"
    divToPrint.style.textAlign = "center";
    divToPrint.style.verticalAlign = "middle";
    
    let thead = divToPrint.getElementsByTagName("thead")[0];
    thead.style.backgroundColor = "#000";
    thead.style.color = "#fff";

    let tfoot = divToPrint.getElementsByTagName("tfoot")[0];
    tfoot.style.backgroundColor = "#000";
    tfoot.style.color = "#fff";

    let tbody = divToPrint.getElementsByTagName("tbody")[0];
    tbody.style.backgroundColor = "#DCDCDC";
    tbody.style.color = "#000";


    let newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
}

export function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}