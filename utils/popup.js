import Swal from 'sweetalert2'
import {useRouter} from 'next/router'

export function popUpAlert(message, type) {
  Swal.fire({
    position: 'center',
    icon: `${type}`,
    title: `${message}`,
    confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
  })
}

export function popUpAlertEvent(message1,message2,type1,type2,txtBtn1,txtBtn2,redirect,event){
  const router = useRouter;
  Swal.fire({
    title: `${message1}`,
    icon: `${type1}`,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: `${txtBtn1}`,
    cancelButtonText: `${txtBtn2}`
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        title: `${message2}`,
        icon: `${type2}`,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.value) {
          redirect
          // window.location.reload()
        }
      })
      event
      // CategoryAPI.remove(isi)
      // history.push('/categories/')
      // window.location.reload()
    }
  })
}