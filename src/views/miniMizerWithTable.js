import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DataContextConsumer } from '../controller/DataContext'

import ZTable from "./zTable/Ztable"

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "10px",
        width: '90%',

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    }, Container: {
        display: "block"
    }, AccordionMain: {
        // backgroundColor:"#18cc48"

    }, Table: {
        width: "100%",
        height: "100%",
    }, secondaryHeading: {
        right: "10%",
        position: "absolute",
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function SimpleAccordion(props) {
    let isAwaiting=props.isAwaiting??false;

    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel, closeall, isallOpen) => {
        if (isallOpen) {
            closeall();
            setExpanded(false);
        } else {
            setExpanded(panel);
        }
    };
    // style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    return (
        <DataContextConsumer>
            {
                (value) => <div className={classes.root} >
                    <Accordion elevation={1}
                        className={classes.AccordionMain}
                        expanded={value.state.expandAll ? true : expanded}
                        onChange={() => handleChange(!expanded, value.toggleExpandAll, value.state.expandAll)}
                        style={{ color:isAwaiting&&"#ff0000"}}>
                        <AccordionSummary

                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >

                            <Typography className={classes.heading}>{props.month}</Typography>
                            {!expanded && <Typography className={classes.secondaryHeading}
                            style={{color:isAwaiting&&"#ff0000" }}>{isAwaiting?"awaiting":"I am an accordion"}</Typography>}

                        </AccordionSummary>
                        <AccordionDetails className={classes.Container} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <ZTable data={props.Data} withBorder={false} className={classes.Table} mapOrder={props.mapOrder}  totalFooterVal={[]}  />      
                        </AccordionDetails>
                    </Accordion>

                </div>
            }
        </DataContextConsumer>
    );
}




//  function MinimizeTable(props) {

//     const classes = useStyles();


//     // <ZTable data={data} withBorder={false} />
//     return (
//         <div>
//             <SimpleAccordion monthOrDay={props.month} isMain={true}>

//             </SimpleAccordion>
//         </div>
//     );
// }
