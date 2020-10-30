import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { notifyPosition, notifyType, ShowNotify } from '../../../../utils/notification'
import { EventAPI } from '../../../api/EventAPI'
export default function FormEvent({ dataEvent }) {
  const router = useRouter()
  const [state, setState] = useState({
    loading:false,
    tanggal_event: new Date()
  })
  const ExampleCustomTimeInput = ({ date, value, onChange }) => (
    <input
      className={state.tanggal_event ? "" : "d-none"}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ border: "solid 1px pink" }}
    />
  );
  return (
    <Formik
      initialValues={{
        judul_event: dataEvent && dataEvent.judul_event || '',
        deskripsi_event: dataEvent && dataEvent.deskripsi_event || '',
        tanggal_event: dataEvent && new Date(dataEvent.tanggal_event) || new Date(),
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async() => {
          const finalValues = {
            judul_event: values.judul_event,
            deskripsi_event: values.deskripsi_event,
            tanggal_event: moment(values.tanggal_event).format("DD-MM-YYYY, HH:mm")
          }
          setState({...state,loading:true})
          if (router.pathname.split("/")[3] === "addz") {
            const response = await EventAPI.addEvent(finalValues)
            if (response.status === 500) {
              ShowNotify("Network error", notifyPosition.topCenter, notifyType.error)
            } else if (response.status === 401) {
              ShowNotify("Invalid Token.", notifyPosition.topCenter, notifyType.error)
            } else {
              ShowNotify(`Berhasil tambah event!`, notifyPosition.topCenter, notifyType.success, () => {
                router.back()
              })
            }
          } else if (router.pathname.split("/")[3] === "editz") {
            const response = await EventAPI.putEvent(finalValues, window.location.pathname.split("editz/")[1])
            if (response.status === 500) {
              ShowNotify("Network error", notifyPosition.topCenter, notifyType.error)
            } else if (response.status === 401) {
              ShowNotify("Invalid Token.", notifyPosition.topCenter, notifyType.error)
            } else {
              ShowNotify(`Berhasil edit event!`, notifyPosition.topCenter, notifyType.success, () => {
                router.back()
              })
            }
          }
          setState({...state,loading:false})
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
              </div>
              <small className="label-login-error">{errors.judul_event && touched.judul_event && errors.judul_event}</small>
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
              <small className="label-login-error">{errors.deskripsi_event && touched.deskripsi_event && errors.deskripsi_event}</small>
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
              </div>
              <small className="label-login-error">{errors.tanggal_event && touched.tanggal_event && errors.tanggal_event}</small>
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