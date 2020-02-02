import * as React from "react";

function readFile(file: any): Promise<string> {
    const reader = new FileReader();

    return new Promise(resolve => {
      reader.onload = () => {
        resolve((reader as any).result.toString());
      };
      reader.readAsText(file);
    });
  }

  export class Load extends React.Component {
    state = {
      items: [],
      parsedItems: "",
      isLoading: false,
      value: "",
      mystr: "",
    };
    constructor(props: any) {
      super(props);

      this.importText = this.importText.bind(this);
    }

    handleUnload(items: any) {
      console.log(items);
      this.setState(
        state => {
          return {
            ...state,
            items
          };
        },
        () => console.log(this.state)
      );
    }

    render() {
      return (
        <form>
          <div>
            <input type="file" onChange={this.importText} />
          </div>
        </form>
      );
    }

  importText(event: any) {
      const file = event.currentTarget.files.item(0);
      readFile(file).then(content => {
        this.handleUnload(content);
      });
    }
  }

  export default function InteractiveList() {
    return <Load />;
  }