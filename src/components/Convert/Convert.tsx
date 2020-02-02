import * as React from "react";
import Button from "@material-ui/core/Button";

export class Convert extends React.Component {
    state = {
      items: [],
      parsedItems: "",
      isLoading: false,
      value: "",
      mystr: "",
    };
    constructor(props: any) {
      super(props);

      this.onConvert = this.onConvert.bind(this);
    }
    convert(myString: any) {
        var viewBox;
        var mystr = "<g>";
        var str = "</g>";
        var regex = RegExp(' d="([^"]+)"', "g");
        while ((viewBox = regex.exec(myString)) !== null) {
          mystr += "<path d=" + '"' + viewBox[1] + '" />';
        }
        return mystr + str;
      }

      onConvert = (event: any) => {
        this.setState(
          (state: any) => {
            return {
              ...state,
              parsedItems: this.convert(state.items)
            };
          },
          () => console.log(this.state)
        );
      };

      render() {
        return (
          <form>
            <div>
              <Button type="button" onClick={this.onConvert}>
                &gt;
              </Button>
            </div>
          </form>
        );
      }
    }

    export default function InteractiveList() {
      return <Convert />;
    }