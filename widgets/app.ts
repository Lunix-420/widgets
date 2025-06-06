import { App } from "astal/gtk3"
import style from "./style.scss"
import Main from "./widget/Main"

App.start({
    css: style,
    main() {
        App.get_monitors().map(Main)
    },
})
