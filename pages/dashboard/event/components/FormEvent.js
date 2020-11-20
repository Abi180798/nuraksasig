import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { notifyPosition, notifyType, ShowNotify } from '../../../../utils/notification'
import { EventAPI } from '../../../api/EventAPI'
import * as Yup from 'yup'
import fconfig from '../../../../config/fconfig'

const conf = fconfig.storage()

export default function FormEvent({ dataEvent, mode }) {
  const router = useRouter()
  const [state, setState] = useState({
    loading: false,
    tanggal_event: new Date(),
    url: null
  })
  const uploadedImageProfile = React.useRef(null);
  const changeImg = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImageProfile;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      }
      reader.readAsDataURL(file);
      setState({ ...state, profilePicture: file.name })
      return file
    }
  }
  const ExampleCustomTimeInput = ({ date, value, onChange }) => (
    <input
      className={state.tanggal_event ? "" : "d-none"}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ border: "solid 1px pink" }}
    />
  );
  async function getImages() {
    if (dataEvent && dataEvent.gambar_event) {
      const urls = await conf.ref(`images-event`).child(dataEvent.gambar_event).getDownloadURL()
      setState({ ...state, url: urls })
    }
  }
  useEffect(() => {
    getImages()
  }, [])
  return (
    <Formik
      initialValues={{
        gambar_event: dataEvent && dataEvent.gambar_event || '',
        judul_event: dataEvent && dataEvent.judul_event || '',
        deskripsi_event: dataEvent && dataEvent.deskripsi_event || '',
        tanggal_event: dataEvent && new Date(dataEvent.tanggal_event) || new Date(),
      }}
      validationSchema={
        Yup.object({
          judul_event: Yup.string().required("Harus diisi"),
          tanggal_event: Yup.string().required(" Harus diisi"),
          deskripsi_event: Yup.string().required(" Harus diisi"),
        })
      }
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          const [file] = values.gambar_event
          const finalValues = {
            judul_event: values.judul_event,
            deskripsi_event: values.deskripsi_event,
            gambar_event: file && file.name,
            tanggal_event: moment(values.tanggal_event).format("DD-MM-YYYY, HH:mm")
          }
          setState({ ...state, loading: true })
          if(file){
            try{
              conf.ref(`images-event/${file.name}`).put(file)
            }catch(err){
              console.log(err)
            }
          }
          if (router.pathname.split("/")[3] === "addz") {
            const response = await EventAPI.addEvent(finalValues)
            if (response.status === 500) {
              ShowNotify("Network error", notifyPosition.topCenter, notifyType.error)
            } else if (response.status === 401) {
              ShowNotify("Invalid Token.", notifyPosition.topCenter, notifyType.error)
            } else if (response.status === 422) {
              ShowNotify("Pengisian Form Salah.", notifyPosition.topCenter, notifyType.error)
            } else {
              ShowNotify(`Berhasil tambah event!`, notifyPosition.topCenter, notifyType.success, () => {
                // router.back()
              })
            }
          } else if (router.pathname.split("/")[3] === "editz") {
            // var files = new FormData()
            // files.append("photo", file)
            // const img = await EventAPI.uploadImg(window.location.pathname.split("editz/")[1], files)
            const response = await EventAPI.putEvent(finalValues, window.location.pathname.split("editz/")[1])
            if (response.status === 500) {
              ShowNotify("Network error", notifyPosition.topCenter, notifyType.error)
            } else if (response.status === 401) {
              ShowNotify("Invalid Token.", notifyPosition.topCenter, notifyType.error)
            } else if (response.status === 422) {
              ShowNotify("Pengisian Form Salah.", notifyPosition.topCenter, notifyType.error)
            } else {
              ShowNotify(`Berhasil edit event!`, notifyPosition.topCenter, notifyType.success, () => {
                // router.back()
              })
            }
          }
          setState({ ...state, loading: false })
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue
        /* and other goodies */
      }) => (
          <form onSubmit={handleSubmit}>
            {/* {mode !== "add" && */}
            <div className="form-group">
              <div className="avatar-form">
                <div className="avatarnya">
                  <img ref={uploadedImageProfile} src={dataEvent && dataEvent.gambar_event !== "" && state.url ?
                    state.url

                    // `http://tahurawisata.herokuapp.com/wisata/wisatas/photo/${dataEvent && dataEvent.gambar_event}` 
                    : "../../../../static/assets/img/imgnotfound.png"} />
                </div>
                <div className="label-avatar">
                  <label>Foto</label>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {mode !== "detail" && <label for="upload-pp" className="upload-photos">Choose File</label>}
                    <span className="pl-3">{state.profilePicture}</span>
                  </span>
                  <input
                    id="upload-pp"
                    style={{ display: "none" }}
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      changeImg(e)
                      setFieldValue("gambar_event", e.target.files)
                    }} />
                  <span></span>
                </div>
              </div>
            </div>
            {/* } */}
            <div className="row">
              <div className="col-xl-4">
                <label className="label-login">Judul Event</label>
              </div>
              <div className="col-xl-8">
                <input
                  className="form-control input-wisata"
                  placeholder="Masukkan Nama Event"
                  type="text"
                  name="judul_event"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.judul_event}
                />
                <small className="label-login-error">{errors.judul_event && touched.judul_event && errors.judul_event}</small>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-xl-4">
                <label className="label-login">Deskripsi Event</label><br />
              </div>
              <div className="col-xl-8">
                <textarea
                  className="form-control input-wisata"
                  placeholder="Masukkan Deskripsi Event"
                  type="text"
                  name="deskripsi_event"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.deskripsi_event}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-xl-4">
                <label className="label-login">Tanggal Event</label><br />
              </div>
              <div className="col-xl-8">
                <DatePicker
                  className="form-control form-control-md"
                  selected={values.tanggal_event ? values.tanggal_event : state.tanggal_event}
                  dateFormat="dd-MM-yyyy, HH:mm"
                  onChange={date => {
                    setState({ ...state, tanggal_event: date });
                    setFieldValue("tanggal_event", date)
                  }}
                  isClearable
                  showTimeInput
                  customTimeInput={<ExampleCustomTimeInput />}
                  placeholderText="Pilih Tanggal Event"
                />
                <small className="label-login-error">{errors.tanggal_event && touched.tanggal_event && errors.tanggal_event}</small>
              </div>
            </div>
            <br />
            <div>
              {router.pathname.split("/")[3] !== "detailz" &&
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  Submit
           </button>
              }
              <button onClick={e => router.push("/dashboard/event")} type="button" className="btn btn-dark float-right" disabled={isSubmitting}>
                Back
           </button>
            </div>
          </form>
        )}
    </Formik>
  )
}