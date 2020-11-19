import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import dataWisatas from '../../../../mock/wisata.json'
import { notifyPosition, notifyType, ShowNotify } from '../../../../utils/notification'
import { WisataAPI } from '../../../api/WisataAPI'
import Loading from '../../../utils/Loading'
import * as Yup from 'yup'
import fconfig from '../../../../config/fconfig'
import Link from 'next/link'

const conf = fconfig.storage()

export default function FormWisata({ dataWisata, mode }) {
  const router = useRouter()
  const [state, setState] = useState({
    loading: false,
    url: null,
    progress: null
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
  useEffect(async () => {
    if (dataWisata && dataWisata.gambar_wisata) {
      const gambar = await conf.ref("images")
        .child(dataWisata.gambar_wisata)
        .getDownloadURL();

      setState({ ...state, url: gambar })
    }
  }, [])
  return (
    <div>
      <Formik
        initialValues={{
          gambar_wisata: dataWisata && dataWisata.gambar_wisata || '',
          nama_wisata: dataWisata && dataWisata.nama_wisata || '',
          alamat_wisata: dataWisata && dataWisata.alamat_wisata || '',
          deskripsi_wisata: dataWisata && dataWisata.deskripsi_wisata || '',
          kategori: dataWisata && dataWisata.kategori || '',
          latitude: dataWisata && dataWisata.latitude || '',
          longitude: dataWisata && dataWisata.longitude || ''
        }}
        validationSchema={
          Yup.object({
            nama_wisata: Yup.string().required("Harus diisi"),
            alamat_wisata: Yup.string().required(" Harus diisi"),
            deskripsi_wisata: Yup.string().required(" Harus diisi"),
            kategori: Yup.string().required(" Harus diisi"),
            latitude: Yup.number().typeError("Harus berupa angka dengan format latitude, contoh: -8.499").required(" Harus diisi"),
            longitude: Yup.number().typeError("Harus berupa angka dengan format longitude, contoh: 116.2935").required(" Harus diisi"),
          })
        }
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            const [file] = values.gambar_wisata
            const finalValues = {
              nama_wisata: values.nama_wisata,
              alamat_wisata: values.alamat_wisata,
              deskripsi_wisata: values.deskripsi_wisata,
              gambar_wisata: file && file.name,
              kategori: values.kategori,
              latitude: parseFloat(values.latitude),
              longitude: parseFloat(values.longitude)
            }

            setState({ ...state, loading: true })
            if(file){
              try{
                const conf = fconfig.storage()
                const uploadTask = conf.ref(`images/${file.name}`).put(file);
                // uploadTask.on(
                //   "state_changed",
                //   snapshot => {
                //     // progress function ...
                //     const progress = Math.round(
                //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                //     );
                //     setState({ ...state, progress: progress });
                //   },
                //   error => {
                //     // Error function ...
                //     console.log(error);
                //   },
                //   () => {
                //     // complete function ...
                //     // conf
                //     //   .ref("images")
                //     //   .child(file.name)
                //     //   .getDownloadURL()
                //     //   .then(url => {
                //     //     setState({ ...state, url: url });
                //     //   });
                //   }
                // );
              }catch(err){
                console.log(err)
              }
            }
            if (router.pathname.split("/")[3] === "addz") {
              const response = await WisataAPI.addWisata(finalValues)
              if (response.status === 500) {
                ShowNotify("Network error", notifyPosition.topCenter, notifyType.error)
              } else if (response.status === 401) {
                ShowNotify("Invalid Token.", notifyPosition.topCenter, notifyType.error)
              } else {
                ShowNotify(`Berhasil tambah wisata!`, notifyPosition.topCenter, notifyType.success, () => {
                  // window.location.reload()
                  router.back()
                })
              }
            } else if (router.pathname.split("/")[3] === "editz") {

              // var files = new FormData()
              // files.append("photo", file)
              // const img = await WisataAPI.uploadImg(window.location.pathname.split("editz/")[1], files)
              const response = await WisataAPI.putWisata(finalValues, window.location.pathname.split("editz/")[1])
              if (response.status === 500) {
                ShowNotify("Network error", notifyPosition.topCenter, notifyType.error)
              } else if (response.status === 401) {
                ShowNotify("Invalid Token.", notifyPosition.topCenter, notifyType.error)
              } else {
                ShowNotify(`Berhasil edit wisata!`, notifyPosition.topCenter, notifyType.success, () => {
                  // window.location.reload()
                    router.back()
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
                    <img ref={uploadedImageProfile} src={dataWisata && dataWisata.gambar_wisata && state.url !== "" ?
                      state.url
                      // `http://tahurawisata.herokuapp.com/wisata/wisatas/photo/${dataWisata && dataWisata.gambar_wisata}`
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
                        setFieldValue("gambar_wisata", e.target.files)
                      }} />
                    <span></span>
                  </div>
                </div>
              </div>
              {/* } */}
              <div className="row">
                <div className="col-xl-4 d-flex align-items-center">
                  <label className="label-login">Nama Wisata</label>
                </div>
                <div className="col-xl-8">
                  <input
                    className="form-control input-wisata"
                    placeholder="Masukkan Nama Wisata"
                    type="text"
                    name="nama_wisata"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nama_wisata}
                  />
                  <small className="label-login-error">{errors.nama_wisata && touched.nama_wisata && errors.nama_wisata}</small>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-xl-4 d-flex align-items-center">
                  <label className="label-login">Alamat Wisata</label><br />
                </div>
                <div className="col-xl-8">
                  <textarea
                    className="form-control input-wisata"
                    placeholder="Masukkan Alamat Wisata"
                    type="textarea"
                    name="alamat_wisata"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.alamat_wisata}
                  />
                  <small className="label-login-error">{errors.alamat_wisata && touched.alamat_wisata && errors.alamat_wisata}</small>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-xl-4 d-flex align-items-center">
                  <label className="label-login">Deskripsi Wisata</label><br />
                </div>
                <div className="col-xl-8">
                  <textarea
                    className="form-control input-wisata"
                    placeholder="Masukkan Deskripsi Wisata"
                    type="textarea"
                    name="deskripsi_wisata"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.deskripsi_wisata}
                  />
                  <small className="label-login-error">{errors.deskripsi_wisata && touched.deskripsi_wisata && errors.deskripsi_wisata}</small>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-xl-4 d-flex align-items-center">
                  <label className="label-login">Kategori</label><br />
                </div>
                <div className="col-xl-8">
                  <select
                    className="custom-select custom-select-md"
                    defaultValue={values.kategori !== "" ? values.kategori : ""}
                    onChange={e => setFieldValue("kategori", e.target.value)}
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Wisata Alam">Wisata Alam</option>
                    <option value="Wisata Binatang">Wisata Binatang</option>
                    <option value="Taman Hiburan">Taman Hiburan</option>
                    <option value="Wisata Religi">Wisata Religi</option>
                    <option value="Wisata Sejarah">Wisata Sejarah</option>
                  </select>
                  <small className="label-login-error">{errors.kategori && touched.kategori && errors.kategori}</small>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-xl-4 d-flex align-items-center">
                  <label className="label-login">Lokasi Wisata</label><br />
                </div>
                <div className="col-xl-8">
                  <div className="row">
                    <div className="col-xl-6">
                      <input
                        className="form-control input-wisata mt-1"
                        placeholder="Masukkan Latitude"
                        type="text"
                        name="latitude"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.latitude}
                      />
                      <small className="label-login-error">{errors.latitude && touched.latitude && errors.latitude}</small>
                    </div>
                    <div className="col-xl-6">
                      <input
                        className="form-control input-wisata mt-1"
                        placeholder="Masukkan Longitude"
                        type="text"
                        name="longitude"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.longitude}
                      />
                      <small className="label-login-error">{errors.longitude && touched.longitude && errors.longitude}</small>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div>
                {router.pathname.split("/")[3] !== "detailz" &&
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    Submit
                  </button>
                }
                {/* <Link href="/dashboard/wisata" >
                  <a> */}
                    <button onClick={e=>router.back()} className="btn btn-dark float-right" disabled={isSubmitting}>
                      Back
                    </button>
                  {/* </a>
                </Link> */}
              </div>
            </form>
          )}
      </Formik>
      {state.loading && <Loading />}
    </div>
  )
}