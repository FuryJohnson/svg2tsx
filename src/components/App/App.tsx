import * as React from "react";
import TransferList from "../TransferList/TransferList";

export class Upload extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <form>
        <TransferList />
        <div>
                <a href="somefile.svg" download>download</a>
            </div>
      </form>
    );
  }
}

export default function InteractiveList() {
  return <Upload />;
}
