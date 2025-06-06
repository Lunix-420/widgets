import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Variable } from "astal";

const timeLocal = Variable("").poll(1000, "date '+%H:%M:%S'");

const timePacific = Variable("").poll(
  1000,
  `bash -c "TZ=America/Los_Angeles date '+%H:%M'"`
);

const timeEastern = Variable("").poll(
  1000,
  `bash -c "TZ=America/New_York date '+%H:%M'"`
);

const timeJapan = Variable("").poll(
  1000,
  `bash -c "TZ=Asia/Tokyo date '+%H:%M'"`
);

function getHourDifference(local: string, other: string) {
  const localHour = parseInt(local.split(":")[0], 10);
  const otherHour = parseInt(other.split(":")[0], 10);

  let diff = otherHour - localHour;
  
  // handle wrap-around (-12 to +12)
  if (diff > 12) diff -= 24;
  if (diff < -12) diff += 24;

  return (diff >= 0 ? "+" : "") + diff;
}

const showTimeDiff = Variable(false);

const timeDiffPacific = Variable.derive(
  [showTimeDiff, timeLocal, timePacific],
  (show, local, pacific) =>
    show == true ? ` | CET${getHourDifference(local, pacific)}` : ""
);

const timeDiffEastern = Variable.derive(
  [showTimeDiff, timeLocal, timeEastern],
  (show, local, eastern) =>
    show == true ? ` | CET${getHourDifference(local, eastern)}` : ""
);

const timeDiffJapan = Variable.derive(
  [showTimeDiff, timeLocal, timeJapan],
  (show, local, japan) =>
    show == true ? ` | CET${getHourDifference(local, japan)}` : ""
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
            <eventbox onButtonPressEvent={() => {
              showTimeDiff.set(!showTimeDiff.get());
            }}>
              <box vertical className="panel clock">
                <box className="time-home">
                  <label className="home" label={timeLocal(v => v)} />
                </box>
                <box 
                  className="time-others" 
                  vertical
                  halign={END}>
                  <box className="time-pacific" halign={END}>
                    <label className="time-name" label="Pacific: " />
                    <label label={timePacific(v => v)} />
                    <label className="time-dif" label={timeDiffPacific(v => v)} />
                  </box>
                  <box className="time-eastern" halign={END}>
                    <label className="time-name" label="Eastern: " />
                    <label label={timeEastern(v => v)} />
                    <label className="time-dif" label={timeDiffEastern(v => v)} />
                  </box>
                  <box className="time-japan" halign={END}>
                    <label className="time-name" label="Japan: " />
                    <label label={timeJapan(v => v)} />
                    <label 
                      className="time-dif" label={timeDiffJapan(v => v)} /> 
                  </box>
                </box>
              </box>
            </eventbox>
          </box>
        </box> 
      </box>
    </window>
  );
}

