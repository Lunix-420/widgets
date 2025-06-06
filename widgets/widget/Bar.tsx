import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Variable } from "astal";

const time = Variable("").poll(1000, "date '+%H:%M:%S'");

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;
  const { START, CENTER, END } = Gtk.Align;
  
  return (
    <window
      className="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={TOP | BOTTOM | LEFT | RIGHT}
      application={App}
      layer={Astal.Layer.BACKGROUND}
      margin-top={55}>
      <box
        className="cockpit"
        horizontal
        halign={CENTER}
        valign={CENTER}>
        <box
          className="row"
          horizontal
          halign={START}
          valign={START}>
          <box
            className="col"
            vertical
            halign={START}
            valign={START}>
            <box
              className="panel clock">
              <label label={time(v => v)} />
            </box>
          </box>
        </box>
      </box>
    </window>
  );
}

