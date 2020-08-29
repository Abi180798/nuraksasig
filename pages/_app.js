import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/styles.scss'
import '../static/css/styles.css'

export default function MyApp({ Component, PageProps}) {
    return <Component {...PageProps} />
}