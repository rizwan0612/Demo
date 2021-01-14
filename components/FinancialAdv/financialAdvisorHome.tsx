import React from 'react';
import { connect } from "react-redux";
import {Paper} from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../FinancialAdv/style/financialAdvisorHome.scss';
import {getFinancialAdvisorData,calculteTotalAmount} from './store/financoalAdvisonAction';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

class financialAdvisorHome extends React.Component<any, any> { 
    gridApi: any = null
    gridColumnApi: any = null   
    constructor(props: any) {
      super(props)
      this.state = {
        selectedRisk:"",
        open:false,
        selectedrow:[],
        totalAmt:0,bonds:0,large:0,mid:0,small:0,foreign:0,
        CalculateRows: [
          { Name: "Bonds $:", current:''  , difference:'',new:'', recommended:''},
          { Name: "Large Cap $", current: '' ,difference:'',new:'', recommended:''},
          { Name: "Mid Cap $", current: '' ,difference:'',new:'', recommended:''},
          { Name: "Foreign $:", current: '' ,difference:'',new:'', recommended:''},
          { Name: "Small Cap $:", current: '',difference:'' ,new:'', recommended:''}],        
        defaultColDef: {
            flex: 1, minWidth: 150, sortable: true, resizable: true,  unSortIcon: true, filter: true,
            filterParams: {
              applyButton: true,
              resetButton: true,
            },          
            rowSelection: 'single',             
          },
          columnDefs: [
              { headerName: "Risk", field: "risk" ,sortable: false},
              { headerName: "Bond %", field: "bonds" ,sortable: false},
              { headerName: "Large Cap %", field: "largecap",sortable: false },
              { headerName: "Mid Cap %", field: "midcap" ,sortable: false},
              { headerName: "Foreign %", field: "foreign" ,sortable: false},
              { headerName: "Smapp Cap %", field: "smallcap" ,sortable: false},
              { headerName: "Continue", field:"action", sortable: false, filter:false,
              
              cellRenderer: (params: any) => {
                const deletecolor = params.data.isActive==true?'gray':'black';
              
                var eDiv = document.createElement("div")
                 eDiv.innerHTML = `<span class="ag-header-cell-label">
                 <svg class="btn-row-view-${0} MuiSvgIcon-root mr-2 MuiSvgIcon-colorPrimary" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation" style="color: black;"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>
                 </span>`              
  
                var viewButton = eDiv.querySelectorAll(`.btn-row-view-${0}`)[0]
                viewButton.addEventListener("click", () => {
                  this.rowViewClick(params, true)
                })
    
                return eDiv
              }, }           
  
            ],
      }

      this.submitForm=this.submitForm.bind(this);
      this.onChange=this.onChange.bind(this);
}
componentDidMount() {    
    this.props.getFinancialAdvisorData();
  }

  onGridReady = (params:any) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

prepareTableHeader = () => {
let headers: any = [];   
const data = this.state.columnDefs;
if (data.length > 0) {
  headers = data;
}  
return headers;
} 

prepareTabledata = () => {
//this.props.getFinancialAdvisorData();
const financialAdvisorData : any =[
  { "risk": 1, "bonds": 80, "largecap": 20, "midcap": 0, "foreign": 0, "smallcap": 0  },
  { "risk": 2, "bonds": 70, "largecap": 15, "midcap": 15, "foreign": 0, "smallcap": 0  },
  { "risk": 3, "bonds": 60, "largecap": 15, "midcap": 15, "foreign": 10, "smallcap": 0  },
  { "risk": 4, "bonds": 50, "largecap": 20, "midcap": 20, "foreign": 10, "smallcap": 0  },
  { "risk": 5, "bonds": 40, "largecap": 20, "midcap": 20, "foreign": 20, "smallcap": 0  },
  { "risk": 6, "bonds": 35, "largecap": 25, "midcap": 5, "foreign": 30, "smallcap": 5  },
  { "risk": 7, "bonds": 20, "largecap": 25, "midcap": 25, "foreign": 25, "smallcap": 5  },
  { "risk": 8, "bonds": 10, "largecap": 20, "midcap": 40, "foreign": 20, "smallcap": 10  },
  { "risk": 9, "bonds": 5, "largecap": 15, "midcap": 40, "foreign": 25, "smallcap": 15  },
  { "risk": 10, "bonds": 0, "largecap": 5, "midcap": 25, "foreign": 30, "smallcap": 40  }
]

let rowData: any = [];   
const data = financialAdvisorData;
if (data.length > 0) {
  rowData = data;
}  
return rowData;   
}



refreshGrid = (rowdata :any) => { 
this.gridApi.setRowData(rowdata);
};

rowViewClick(param: any, view: boolean) {
  this.setState({open:true,selectedRisk:param.data.risk,selectedrow:param.data});
}
handleClose = () => {
  this.setState({open:false}); 
};

getData = () => {
  return( this.state.CalculateRows!=undefined?this.state.CalculateRows:[]);  
};

submitForm = () => {       
 const totalAmt=this.state.bonds+this.state.mid+this.state.small+this.state.large+this.state.foreign;
  let arr = [];
  this.getData().map((row:any) => (
    row.Name= row.Name,
    row.current=Number(this.state.bonds),    
    row.difference =  Math.floor(100*(this.state.selectedRisk.bonds * totalAmt))/100 - Number(row.current),
    row.new= Math.floor(100*(this.state.selectedRisk.bonds * totalAmt))/100,
    row.recommended =Math.floor(100*(this.state.selectedRisk.bonds * totalAmt))/100,
    arr.push(row)
 ))
 this.setState({CalculateRows: arr});
};

per(num:number, amount:number){
  return num*amount/100;
}

  // calculateAllocation(){
  //   let riskState = this.props.riskState;
  //   let riskLevel = riskState.risk.level;
  //   let riskRow = riskState.risk.table[riskLevel - 1];
  //   let riskRowValues = Object.values(riskRow).slice(1);
  //   let riskPercents = riskRowValues.map(value => {
  //         if(value == 0){
  //          return 0;
  //         } else {
  //         return value / 100;
  //         }
  //     });

  //   return [riskPercents.map(percent => {
  //     return Math.floor(100*(percent * this.state.money))/100
  //   }), riskRowValues]
  // }
  onChange=(e:any)=>{   
    const val = Number(e.target.value);
    if(e.target.id.indexOf("Bonds") !== -1)
    {
      this.setState({bonds: val });      
    }
    else if(e.target.id.indexOf("Large") !== -1)
    {
      this.setState({large: val });      
    }
    else if(e.target.id.indexOf("Mid") !== -1)
    {
      this.setState({mid: val });      
    }
    else if(e.target.id.indexOf("Small") !== -1)
    {
      this.setState({small: val });      
    }else if(e.target.id.indexOf("Foreign") !== -1)
    {
      this.setState({foreign: val });      
    }
   // this.props.calculateAmount(this.state.bonds+this.state.mid+this.state.small+this.state.large+this.state.foreign);
  }

  render() {
    return (
   <div  className={"table-view-main"}> 
   <div>
   <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{"Personalized Portfolio"}</DialogTitle>
                <DialogContent>
                  <Typography>{"Risk Level "+this.state.selectedRisk}</Typography>                                  
                 
            
      <Table className={'table'} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Bonds</TableCell>
            <TableCell align="right">Large Cap</TableCell>
            <TableCell align="right">Mid Cap</TableCell>
            <TableCell align="right">Foreign</TableCell>
            <TableCell align="right">Small Cap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
              <TableCell align="right">{this.state.selectedrow!=null ? this.state.selectedrow.bonds+"%":""}</TableCell>
              <TableCell align="right">{this.state.selectedrow!=null ? this.state.selectedrow.largecap+"%":""}</TableCell>
              <TableCell align="right">{this.state.selectedrow!=null ? this.state.selectedrow.midcap+"%":""}</TableCell>
              <TableCell align="right">{this.state.selectedrow!=null ? this.state.selectedrow.foreign+"%":""}</TableCell>
              <TableCell align="right">{this.state.selectedrow!=null ? this.state.selectedrow.smallcap+"%":""}</TableCell>
            </TableRow>
        </TableBody>
          </Table>
     
                <Typography >{"Please Enter Your Current Portfolio"}</Typography>    

                 <Table className={'table'} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align="right">Name</TableCell>
            <TableCell align="right">Current Amount</TableCell>
            <TableCell align="right">Difference</TableCell>
            <TableCell align="right">New Amount</TableCell>          
            <TableCell align="right">Recommended Transfers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.getData().map((row:any) => (
            <TableRow key={row.Name}>
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              <TableCell align="right">
              <TextField error={false} onChange={this.onChange}  defaultValue={row.current}  margin="dense" id={"current"+ row.Name}    type="text"  fullWidth required  />
              </TableCell>
              <TableCell align="right">
              <TextField margin="dense" id="difference"  disabled  defaultValue={row.difference} type="text"  fullWidth required  />
              </TableCell>
              <TableCell align="right">
              <TextField  margin="dense" id="new"  disabled defaultValue={row.new}   type="text"  fullWidth required  />
              </TableCell>
              <TableCell align="right">
              <TextField margin="dense" id="recommended" disabled  defaultValue={row.recommended} type="text"  fullWidth required  />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
          </Table>

                </DialogContent>
                <DialogActions>               
                  <Button onClick={this.handleClose} color="primary">Close</Button> 
                  <Button onClick={() => this.submitForm()} color="primary">Rebalance</Button>
                </DialogActions>
  </Dialog>

   </div>
          <Paper className={"search-results-table-min-height-cluster height-100"}> 
                <div className="ag-theme-balham ag-theme-alpine height-width-100">
                  <AgGridReact
                    // modules={this.state.modules}
                    enableSorting={true}
                    columnDefs={this.prepareTableHeader()}
                    defaultColDef={this.state.defaultColDef}
                    rowData={this.prepareTabledata()}
                    suppressMenuHide={true}
                    suppressMultiSort={false}
                    paginationPageSize={15}
                    pagination={true} 
                    onGridReady={this.onGridReady} 
                    // rowSelection={this.state.rowSelection}    
                  ></AgGridReact>
                </div>            
            </Paper> 
  </div>
  );
}

}
export default connect(
    (state:any) => state.financialAdvisor,
    (dispatch:any) => {
      return {    
        getFinancialAdvisorData: () => dispatch(getFinancialAdvisorData()),
        calculateAmount: (value:number) => dispatch(calculteTotalAmount(value))
      }
    }
  )(financialAdvisorHome)