import * as React from 'react';
import * as CopyToClipboard from 'react-copy-to-clipboard';

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
    parsedItems: [],
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
      <textarea value={this.state.items}>
        svg
      </textarea>
      </div>
      <div>
      <button type="button" onClick={this.onConvert}
      >
        convert
      </button>
      </div>
    <div>
        <textarea value={this.state.parsedItems}
          onChange={({target: {value}}) => this.setState({value, copied: false})} />
        {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
      </div>
      <div>
          <CopyToClipboard text={this.state.value}
            onCopy={() => this.setState({ copied: true })}>
            <button type="button">Copy</button>
          </CopyToClipboard>
      </div>
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