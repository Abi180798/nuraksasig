export default function Kontak() {
  return (
    <section className="page-section bg-dark text-white">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center mt-5">
          <h2 className="mt-5">Let's Get In Touch!</h2>
          <hr className="divider my-4" />
          <p className="text-muted mb-5">Give us a call or send us an email and we will get back to you as soon as possible!</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
          <i className="fas fa-phone fa-3x mb-3 text-muted"></i>
          <div>087755906130</div>
        </div>
        <div className="col-lg-4 mr-auto text-center">
          <i className="fas fa-envelope fa-3x mb-3 text-muted"></i>
          <a className="d-block" href="google.com">habiburrahman180798@gmail.com</a>
        </div>
      </div>
    </section>
  )
}