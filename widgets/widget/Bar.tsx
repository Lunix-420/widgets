
import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Variable } from "astal";

const timeLocal = Variable("").poll(1000, "date '+%H:%M:%S'");

const timeEastern = Variable("").poll(
  1000,
  `bash -c "TZ=America/New_York date '+%H:%M'"`
);

const timePacific = Variable("").poll(
  1000,
  `bash -c "TZ=America/Los_Angeles date '+%H:%M'"`
);

const timeJapan = Variable("").poll(
  1000,
  `bash -c "TZ=Japan/Tokyo date '+%H:%M'"`
);

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
        vertical
        halign={CENTER}
        valign={CENTER}>
        <box
          className="col"
          horizontal
          halign={START}
          valign={START}>
          <box
            className="row"
            vertical
            halign={START}
            valign={START}>
            <box
              vertical
              className="panel clock">
              <box className="time-home">
                <label className="home" label={timeLocal(v => v)} />
              </box>
              <box 
                className="time-others" 
                vertical
                halign={END}>
                <box 
                  className="time-eastern"
                  halign={END}>
                  <label label="Eastern: " />
                  <label className="home" label={timeEastern(v => v)} />
                </box>
                <box 
                  className="time-pacific"
                  halign={END}>
                  <label label="Pacific: " />
                  <label className="home" label={timePacific(v => v)} />
                </box>
                <box 
                  className="time-japan"
                  halign={END}>
                  <label label="Japan: " />
                  <label className="home" label={timeJapan(v => v)} />
                </box>
              </box>
            </box>
          </box>
        </box> 
      </box>
    </window>
  );
}


