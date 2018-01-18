import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import Popover from "./index"
import Tag from "../Tag"

const body = (
  <div className="popover-container">
    <h3 className="popover-header">Lorem ipsum</h3>
    <p className="popover-content">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </p>
  </div>
)

storiesOf("Popover", module).add("Default", () => (
  <div style={{ paddingTop: "20%", textAlign: "center", height: "900px" }}>
    <div>
      <Popover
        className="myclassname"
        preferPlace="left"
        body={body}
        toggleOnOut
        onOuterAction={action("onOuterAction")}
      >
        <Tag>Left</Tag>
      </Popover>

      <Popover
        className="myclassname"
        preferPlace="above"
        body={body}
        toggleOnOut
        onOuterAction={action("onOuterAction")}
      >
        <Tag>Above</Tag>
      </Popover>

      <Popover
        className="myclassname"
        preferPlace="below"
        body={body}
        toggleOnOut
        onOuterAction={action("onOuterAction")}
      >
        <Tag>Below</Tag>
      </Popover>

      <Popover
        className="myclassname"
        preferPlace="right"
        body={body}
        toggleOnOut
        onOuterAction={action("onOuterAction")}
      >
        <Tag>Right</Tag>
      </Popover>
    </div>
    <br />
    <br />
    <br />
    <div>
      <Popover
        className="myclassname"
        preferPlace="above"
        body={body}
        toggleOnOut
        onOuterAction={action("onOuterAction")}
      >
        {props => <Tag onClick={props.toggle}>As a function child</Tag>}
      </Popover>
    </div>
  </div>
))