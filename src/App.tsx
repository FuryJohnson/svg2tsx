import * as React from 'react';
import * as CopyToClipboard from 'react-copy-to-clipboard';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


function readFile(file: any): Promise<string> {
  const reader = new FileReader();

  return new Promise((resolve) => {
    reader.onload = () => {
      resolve((reader as any).result.toString());
    };
    reader.readAsText(file);
  });
}


export class Upload extends React.Component {
  state={
    items: [],
    parsedItems: '',
    isLoading: false,
    value: '',
    mystr: '',
    copied: false,
  }
constructor(props: any){
  super(props);

  this.importText  = this.importText.bind(this);
  this.onConvert  = this.onConvert.bind(this);

}

useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

handleUnload(items: any) {
  console.log(items)
    this.setState((state)=>{
      return {
        ...state,
        items,
      }
    }, ()=>console.log(this.state))
  }

  convert(myString: any) {
    var viewBox;
    var mystr = "<g>";
    var str = "</g>";
    var regex = RegExp(' d="([^"]+)"', "g");
    while ((viewBox = regex.exec(myString)) !== null) {
      mystr += "<path d=" + '"' + viewBox[1] + '" />';
    }
    return (mystr + str);
  }

  onConvert = (event: any) => {
    this.setState((state: any) => {
      return {
        ...state,
        parsedItems: this.convert(state.items),
      }
    }, ()=>console.log(this.state));
  }


  onCopy = () => {
    this.setState({copied: true});
  }

  render(){
    return (
      <form>
        <div>
      <input
      type='file'
      onChange={this.importText}/>
      </div>
      <div>
      <TextField
        id="standard-multiline-static"
        label="SVG"
        multiline
        value={this.state.items}
        rows="20"
        margin="normal"
      />
      </div>
      <div>
      <button type="button" onClick={this.onConvert}
      >
        convert
      </button>
      </div>
      <div>
          <CopyToClipboard text={this.state.parsedItems}
            onCopy={() => this.setState({ copied: true })}>
            <button type="button">Copy</button>
          </CopyToClipboard>
      </div>
      <span>
      <TextField
        id="standard-multiline-static"
        label="TSX"
        multiline
        value={this.state.parsedItems}
        rows="20"
        margin="normal"
      />
      </span>
      </form>
    );
  }

  importText(event: any) {

    const file = event.currentTarget.files.item(0);
    readFile(file).then((content) => {
         this.handleUnload(content);
        }
    )}
}

export default function InteractiveList() {

return <Upload/>
}

